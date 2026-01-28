import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  ClipboardCheck, 
  BarChart3,
  LogOut,
  User
} from "lucide-react";

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Marks form state
  const [studentEmail, setStudentEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [marksObtained, setMarksObtained] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [examType, setExamType] = useState("");
  const [semester, setSemester] = useState("");

  // Attendance upload state
  const [attendanceFile, setAttendanceFile] = useState<File | null>(null);
  const [uploadBranch, setUploadBranch] = useState("");
  const [uploadSemester, setUploadSemester] = useState("");
  const [uploadWeekNo, setUploadWeekNo] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Poll form state
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [pollCategory, setPollCategory] = useState("");
  const [pollDuration, setPollDuration] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  // Notice form state
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [noticeCategory, setNoticeCategory] = useState("");
  const [noticePriority, setNoticePriority] = useState("");
  const [noticeDepartment, setNoticeDepartment] = useState("");
  const [isPinned, setIsPinned] = useState(false);

  // User creation form state
  const [userType, setUserType] = useState<"student" | "faculty">("student");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGmail, setUserGmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRollNo, setUserRollNo] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const [userSemester, setUserSemester] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      const hasAdminRole = roles?.some(r => r.role === "admin");
      
      if (!hasAdminRole) {
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleUploadMarks = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Find student by email in profiles table
      const { data: studentProfile, error: profileError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", studentEmail)
        .single();
      
      if (profileError || !studentProfile) {
        toast({
          title: "Error",
          description: "Student not found",
          variant: "destructive",
        });
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      const { error } = await supabase.from("marks").insert({
        student_id: studentProfile.user_id,
        subject,
        marks_obtained: parseFloat(marksObtained),
        total_marks: parseFloat(totalMarks),
        exam_type: examType,
        semester,
        uploaded_by: session?.user.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Marks uploaded successfully!",
      });

      // Reset form
      setStudentEmail("");
      setSubject("");
      setMarksObtained("");
      setTotalMarks("");
      setExamType("");
      setSemester("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUploadAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!attendanceFile) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Not authenticated");
      }

      const formData = new FormData();
      formData.append('file', attendanceFile);
      formData.append('branch', uploadBranch);
      formData.append('semester', uploadSemester);
      formData.append('weekNo', uploadWeekNo);
      formData.append('markedBy', session.user.id);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-attendance`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const result = await response.json();

      toast({
        title: "Success!",
        description: `Uploaded ${result.recordsProcessed} attendance records for ${result.subjects?.length || 0} subjects`,
      });

      // Reset form
      setAttendanceFile(null);
      setUploadBranch("");
      setUploadSemester("");
      setUploadWeekNo("");
      
      // Reset file input
      const fileInput = document.getElementById('attendance-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload attendance",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const durationInDays = parseInt(pollDuration);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + durationInDays);

      const options = pollOptions.filter(opt => opt.trim() !== "").map((opt, idx) => ({
        id: idx + 1,
        text: opt,
        votes: 0
      }));

      const { error } = await supabase.from("polls").insert({
        title: pollTitle,
        description: pollDescription,
        options: options,
        category: pollCategory,
        duration: `${pollDuration} days`,
        created_by: session?.user.id,
        expires_at: expiresAt.toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Poll created successfully!",
      });

      // Reset form
      setPollTitle("");
      setPollDescription("");
      setPollCategory("");
      setPollDuration("");
      setPollOptions(["", ""]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUploadNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { session } } = await supabase.auth.getSession();

      const { error } = await supabase.from("notices").insert({
        title: noticeTitle,
        content: noticeContent,
        category: noticeCategory,
        priority: noticePriority,
        department: noticeDepartment,
        is_pinned: isPinned,
        created_by: session?.user.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Notice uploaded successfully!",
      });

      // Reset form
      setNoticeTitle("");
      setNoticeContent("");
      setNoticeCategory("");
      setNoticePriority("");
      setNoticeDepartment("");
      setIsPinned(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingUser(true);

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userName,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            user_id: authData.user.id,
            full_name: userName,
            email: userEmail,
            roll_no: userType === "student" ? userRollNo : null,
            branch: userType === "student" ? userBranch : null,
            semester: userType === "student" ? userSemester : null,
          });

        if (profileError) throw profileError;

        // Assign role
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({
            user_id: authData.user.id,
            role: userType,
          });

        if (roleError) throw roleError;

        // Send confirmation email
        const { error: emailError } = await supabase.functions.invoke('send-credentials-email', {
          body: {
            to: userGmail,
            name: userName,
            email: userEmail,
            password: userPassword,
            role: userType,
            rollNo: userType === "student" ? userRollNo : undefined,
            department: userType === "faculty" ? userDepartment : undefined,
          },
        });

        if (emailError) {
          console.error("Email send error:", emailError);
          toast({
            title: "Warning",
            description: "User created but email notification failed. Please inform the user manually.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: `${userType === "student" ? "Student" : "Faculty"} account created and confirmation email sent!`,
          });
        }

        // Reset form
        setUserName("");
        setUserEmail("");
        setUserGmail("");
        setUserPassword("");
        setUserRollNo("");
        setUserBranch("");
        setUserSemester("");
        setUserDepartment("");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreatingUser(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Manage campus operations</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">
              <User className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="marks">
              <Upload className="mr-2 h-4 w-4" />
              Marks
            </TabsTrigger>
            <TabsTrigger value="attendance">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="polls">
              <BarChart3 className="mr-2 h-4 w-4" />
              Polls
            </TabsTrigger>
            <TabsTrigger value="notices">
              <FileText className="mr-2 h-4 w-4" />
              Notices
            </TabsTrigger>
          </TabsList>

          {/* Create Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Create User Accounts</CardTitle>
                <CardDescription>
                  Generate credentials for students and faculty members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="student" value={userType} onValueChange={(v) => setUserType(v as "student" | "faculty")}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="student">Create Student</TabsTrigger>
                    <TabsTrigger value="faculty">Create Faculty</TabsTrigger>
                  </TabsList>

                  <TabsContent value="student">
                    <form onSubmit={handleCreateUser} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="student-name">Full Name</Label>
                          <Input
                            id="student-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Ajay Gupta"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-roll">Roll Number</Label>
                          <Input
                            id="student-roll"
                            value={userRollNo}
                            onChange={(e) => setUserRollNo(e.target.value)}
                            placeholder="2305251540007"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-email">College Email</Label>
                          <Input
                            id="student-email"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="bit23ds08@bit.ac.in"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-gmail">Personal Gmail</Label>
                          <Input
                            id="student-gmail"
                            type="email"
                            value={userGmail}
                            onChange={(e) => setUserGmail(e.target.value)}
                            placeholder="student@gmail.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-password">Initial Password</Label>
                          <Input
                            id="student-password"
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-branch">Branch</Label>
                          <Input
                            id="student-branch"
                            value={userBranch}
                            onChange={(e) => setUserBranch(e.target.value)}
                            placeholder="Computer Science"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-semester">Semester</Label>
                          <Input
                            id="student-semester"
                            value={userSemester}
                            onChange={(e) => setUserSemester(e.target.value)}
                            placeholder="3"
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isCreatingUser}>
                        {isCreatingUser ? "Creating Student Account..." : "Create Student Account"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="faculty">
                    <form onSubmit={handleCreateUser} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="faculty-name">Full Name</Label>
                          <Input
                            id="faculty-name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Dr. Shashank Srivastava"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="faculty-dept">Department</Label>
                          <Input
                            id="faculty-dept"
                            value={userDepartment}
                            onChange={(e) => setUserDepartment(e.target.value)}
                            placeholder="Computer Science"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="faculty-email">College Email</Label>
                          <Input
                            id="faculty-email"
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="faculty@bit.ac.in"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="faculty-gmail">Personal Gmail</Label>
                          <Input
                            id="faculty-gmail"
                            type="email"
                            value={userGmail}
                            onChange={(e) => setUserGmail(e.target.value)}
                            placeholder="faculty@gmail.com"
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="faculty-password">Initial Password</Label>
                          <Input
                            id="faculty-password"
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isCreatingUser}>
                        {isCreatingUser ? "Creating Faculty Account..." : "Create Faculty Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Marks */}
          <TabsContent value="marks">
            <Card>
              <CardHeader>
                <CardTitle>Upload Student Marks</CardTitle>
                <CardDescription>Add examination marks for students</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadMarks} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-email">Student Email</Label>
                      <Input
                        id="student-email"
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marks-obtained">Marks Obtained</Label>
                      <Input
                        id="marks-obtained"
                        type="number"
                        value={marksObtained}
                        onChange={(e) => setMarksObtained(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-marks">Total Marks</Label>
                      <Input
                        id="total-marks"
                        type="number"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exam-type">Exam Type</Label>
                      <Select value={examType} onValueChange={setExamType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="midterm">CT-01</SelectItem>
                          <SelectItem value="final">CT-01</SelectItem>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">PUT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Input
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        placeholder="05"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Upload Marks
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Attendance */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Upload Attendance (XLSX)</CardTitle>
                <CardDescription>
                  Upload attendance data via Excel file. File should contain: Roll No, Name, and subject columns with attendance status (P/A/L or Present/Absent/Late)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadAttendance} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch</Label>
                      <Input
                        id="branch"
                        placeholder="e.g., Computer Science"
                        value={uploadBranch}
                        onChange={(e) => setUploadBranch(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upload-semester">Semester</Label>
                      <Input
                        id="upload-semester"
                        placeholder="e.g., 3"
                        value={uploadSemester}
                        onChange={(e) => setUploadSemester(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="week-no">Week Number</Label>
                      <Input
                        id="week-no"
                        type="number"
                        placeholder="e.g., 1"
                        value={uploadWeekNo}
                        onChange={(e) => setUploadWeekNo(e.target.value)}
                        required
                        min="1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendance-file">Attendance File (XLSX)</Label>
                    <Input
                      id="attendance-file"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => setAttendanceFile(e.target.files?.[0] || null)}
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      Upload an Excel file with columns: Roll No, Name, and subject abbreviations (e.g., DBMS, CC, DAV)
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Upload className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Attendance
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Poll */}
          <TabsContent value="polls">
            <Card>
              <CardHeader>
                <CardTitle>Create Community Poll</CardTitle>
                <CardDescription>Engage with the campus community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePoll} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="poll-title">Poll Title</Label>
                    <Input
                      id="poll-title"
                      value={pollTitle}
                      onChange={(e) => setPollTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="poll-description">Description</Label>
                    <Textarea
                      id="poll-description"
                      value={pollDescription}
                      onChange={(e) => setPollDescription(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="poll-category">Category</Label>
                      <Select value={pollCategory} onValueChange={setPollCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="campus">Campus</SelectItem>
                          <SelectItem value="academics">Academics</SelectItem>
                          <SelectItem value="events">Events</SelectItem>
                          <SelectItem value="facilities">Facilities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="poll-duration">Duration (days)</Label>
                      <Input
                        id="poll-duration"
                        type="number"
                        min="1"
                        value={pollDuration}
                        onChange={(e) => setPollDuration(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Poll Options</Label>
                    {pollOptions.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...pollOptions];
                          newOptions[index] = e.target.value;
                          setPollOptions(newOptions);
                        }}
                        placeholder={`Option ${index + 1}`}
                        required
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPollOptions([...pollOptions, ""])}
                    >
                      Add Option
                    </Button>
                  </div>
                  <Button type="submit" className="w-full">
                    Create Poll
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Notice */}
          <TabsContent value="notices">
            <Card>
              <CardHeader>
                <CardTitle>Upload Notice</CardTitle>
                <CardDescription>Post announcements to the digital notice board</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadNotice} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notice-title">Notice Title</Label>
                    <Input
                      id="notice-title"
                      value={noticeTitle}
                      onChange={(e) => setNoticeTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notice-content">Content</Label>
                    <Textarea
                      id="notice-content"
                      value={noticeContent}
                      onChange={(e) => setNoticeContent(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="notice-category">Category</Label>
                      <Select value={noticeCategory} onValueChange={setNoticeCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="examination">Examination</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-priority">Priority</Label>
                      <Select value={noticePriority} onValueChange={setNoticePriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notice-department">Department</Label>
                      <Input
                        id="notice-department"
                        value={noticeDepartment}
                        onChange={(e) => setNoticeDepartment(e.target.value)}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pin-notice"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="rounded border-input"
                    />
                    <Label htmlFor="pin-notice" className="cursor-pointer">
                      Pin this notice
                    </Label>
                  </div>
                  <Button type="submit" className="w-full">
                    Upload Notice
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
