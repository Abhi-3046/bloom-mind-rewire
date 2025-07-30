-- Fix missing RLS policies for existing tables
CREATE POLICY "Enable read access for all users" ON public.background_sounds FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.meditations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Enable insert access for all users" ON public.meditations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable update access for all users" ON public.meditations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Enable delete access for all users" ON public.meditations FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Enable read access for all users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON public.users FOR INSERT WITH CHECK (true);

-- Fix search path for the function
DROP FUNCTION IF EXISTS public.update_updated_at_column();
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;