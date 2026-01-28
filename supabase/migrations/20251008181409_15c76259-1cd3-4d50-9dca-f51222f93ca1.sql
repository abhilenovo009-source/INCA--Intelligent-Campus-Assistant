-- Fix RLS policies to allow signup
-- Allow users to insert their own profile during signup
CREATE POLICY "Users can insert own profile during signup" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to insert their initial role during signup
CREATE POLICY "Users can insert own role during signup" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);