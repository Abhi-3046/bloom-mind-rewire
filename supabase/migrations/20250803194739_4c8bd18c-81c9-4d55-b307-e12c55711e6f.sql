-- Fix missing RLS policies for other tables

-- Fix brain_rewire_metrics RLS policies
CREATE POLICY "Users can view their own metrics" 
ON public.brain_rewire_metrics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own metrics" 
ON public.brain_rewire_metrics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Fix feedback RLS policies  
CREATE POLICY "Users can create feedback" 
ON public.feedback 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own feedback" 
ON public.feedback 
FOR SELECT 
USING (auth.uid() = user_id);

-- Fix animated_characters RLS policies
CREATE POLICY "Users can view all characters" 
ON public.animated_characters 
FOR SELECT 
USING (true);