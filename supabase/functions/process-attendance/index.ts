import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";
import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const branch = formData.get('branch') as string;
    const semester = formData.get('semester') as string;
    const weekNo = parseInt(formData.get('weekNo') as string);
    const markedBy = formData.get('markedBy') as string;

    if (!file || !branch || !semester || !weekNo || !markedBy) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing attendance file:', { branch, semester, weekNo });

    // Read the Excel file
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });

    console.log('Parsed data rows:', data.length);

    if (data.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No data found in the file' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get column headers (subjects) - exclude roll_no and name columns
    const firstRow = data[0] as Record<string, any>;
    const allColumns = Object.keys(firstRow);
    const subjectColumns = allColumns.filter(
      col => col.toLowerCase() !== 'roll_no' && 
             col.toLowerCase() !== 'name' &&
             col.toLowerCase() !== 'rollno' &&
             col.toLowerCase() !== 'roll no'
    );

    console.log('Detected subjects:', subjectColumns);

    // Use AI to classify and normalize subject names
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are an attendance classification system. Given subject abbreviations, return full subject names. Return ONLY a JSON object mapping abbreviations to full names.'
          },
          {
            role: 'user',
            content: `Classify these subject abbreviations into full subject names: ${subjectColumns.join(', ')}. Return JSON format: {"abbreviation": "Full Subject Name"}`
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      console.error('AI API error:', await aiResponse.text());
      return new Response(
        JSON.stringify({ error: 'AI classification failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices[0].message.content;
    
    // Extract JSON from AI response
    let subjectMapping: Record<string, string> = {};
    try {
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        subjectMapping = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: use original names
        subjectColumns.forEach(col => {
          subjectMapping[col] = col;
        });
      }
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      subjectColumns.forEach(col => {
        subjectMapping[col] = col;
      });
    }

    console.log('Subject mapping:', subjectMapping);

    // Process attendance data
    const attendanceRecords = [];
    const errors = [];

    for (const row of data) {
      const rowData = row as Record<string, any>;
      const rollNo = rowData['roll_no'] || rowData['rollno'] || rowData['Roll No'] || rowData['ROLL_NO'];

      if (!rollNo) {
        errors.push({ row: rowData, error: 'Missing roll number' });
        continue;
      }

      // Find student by roll_no
      const { data: student, error: studentError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('roll_no', rollNo.toString())
        .maybeSingle();

      if (studentError || !student) {
        errors.push({ rollNo, error: 'Student not found' });
        continue;
      }

      // Process each subject for this student
      for (const subjectCol of subjectColumns) {
        const attendanceValue = rowData[subjectCol];
        if (!attendanceValue) continue;

        // Normalize attendance status
        const normalizedStatus = normalizeAttendanceStatus(attendanceValue);
        const fullSubjectName = subjectMapping[subjectCol] || subjectCol;

        attendanceRecords.push({
          student_id: student.user_id,
          subject: fullSubjectName,
          status: normalizedStatus,
          date: new Date().toISOString().split('T')[0],
          marked_by: markedBy,
          week_no: weekNo,
          branch: branch,
          semester: semester,
        });
      }
    }

    console.log('Total attendance records to insert:', attendanceRecords.length);

    if (attendanceRecords.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid attendance records found', errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Batch insert attendance records
    const { error: insertError } = await supabase
      .from('attendance')
      .insert(attendanceRecords);

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to insert attendance records', details: insertError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        recordsProcessed: attendanceRecords.length,
        errors: errors.length > 0 ? errors : undefined,
        subjects: Object.values(subjectMapping),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error processing attendance:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function normalizeAttendanceStatus(value: string): string {
  const normalized = value.toString().toLowerCase().trim();
  
  if (normalized === 'p' || normalized === 'present' || normalized === '1') {
    return 'present';
  } else if (normalized === 'a' || normalized === 'absent' || normalized === '0') {
    return 'absent';
  } else if (normalized === 'l' || normalized === 'late') {
    return 'late';
  }
  
  return 'absent'; // Default to absent for unclear values
}
