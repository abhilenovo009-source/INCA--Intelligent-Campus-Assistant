-- Add roll_no, branch, and semester to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS roll_no TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS branch TEXT,
ADD COLUMN IF NOT EXISTS semester TEXT;

-- Add week_no, branch, and semester to attendance table
ALTER TABLE public.attendance
ADD COLUMN IF NOT EXISTS week_no INTEGER,
ADD COLUMN IF NOT EXISTS branch TEXT,
ADD COLUMN IF NOT EXISTS semester TEXT;

-- Create index on roll_no for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_roll_no ON public.profiles(roll_no);

-- Create index on attendance for common queries
CREATE INDEX IF NOT EXISTS idx_attendance_branch_semester ON public.attendance(branch, semester, week_no);