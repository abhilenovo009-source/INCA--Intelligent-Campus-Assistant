import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const clientId = Deno.env.get("NOTIFICATIONAPI_CLIENT_ID");
const clientSecret = Deno.env.get("NOTIFICATIONAPI_CLIENT_SECRET");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CredentialsEmailRequest {
  to: string;
  name: string;
  email: string;
  password: string;
  role: string;
  rollNo?: string;
  department?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, name, email, password, role, rollNo, department }: CredentialsEmailRequest = await req.json();

    const roleInfo = role === "student" 
      ? `Roll Number: ${rollNo}`
      : `Department: ${department}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Welcome to INCA!</h1>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; color: white; margin: 20px 0;">
          <h2 style="margin-top: 0;">Hello ${name}!</h2>
          <p style="font-size: 16px;">Your ${role} account has been created successfully by the administrator.</p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Login Credentials:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; color: #333;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Password:</strong></td>
              <td style="padding: 10px 0; color: #333;">${password}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>Role:</strong></td>
              <td style="padding: 10px 0; color: #333; text-transform: capitalize;">${role}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666;"><strong>${role === 'student' ? 'Roll Number' : 'Department'}:</strong></td>
              <td style="padding: 10px 0; color: #333;">${role === 'student' ? rollNo : department}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;"><strong>⚠️ Security Notice:</strong> Please change your password after your first login for security purposes.</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'lovable.app') || 'https://your-app.lovable.app'}" 
             style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
            Login to UniVerse Assist
          </a>
        </div>

        <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
          If you didn't expect this email or have any questions, please contact your administrator.
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #999; font-size: 12px; text-align: center;">
          © 2024 UniVerse Assist. Empowering campus life with AI innovation.
        </p>
      </div>
    `;

    // Send email via NotificationAPI
    const payload = {
      type: "credentials_email",
      to: {
        id: email,
        email: to
      },
      email: {
        subject: "Your UniVerse Assist Account Credentials",
        html: htmlContent,
        senderName: "UniVerse Assist",
        senderEmail: "noreply@universeassist.com"
      }
    };

    const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
    
    const response = await fetch(`https://api.notificationapi.com/${clientId}/sender`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`NotificationAPI error: ${response.status} - ${errorText}`);
    }

    const emailResponse = await response.json();
    console.log("Credentials email sent successfully via NotificationAPI:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-credentials-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
