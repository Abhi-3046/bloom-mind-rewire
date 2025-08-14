-- Fix security vulnerability: Restrict users table SELECT policy
-- Users should only be able to view their own data, not all users' data

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;

-- Create a secure policy that only allows users to view their own data
CREATE POLICY "Users can view their own data only" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);