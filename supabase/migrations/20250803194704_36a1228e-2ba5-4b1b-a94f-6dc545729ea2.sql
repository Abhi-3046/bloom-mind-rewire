-- Create user_progress table for tracking XP and levels
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_xp INTEGER NOT NULL DEFAULT 0,
  current_level INTEGER NOT NULL DEFAULT 1,
  last_meditation TIMESTAMP WITH TIME ZONE,
  streak_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own progress" 
ON public.user_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress" 
ON public.user_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.user_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update animated_characters table to include level requirements
ALTER TABLE public.animated_characters 
ADD COLUMN level_required INTEGER DEFAULT 1,
ADD COLUMN description TEXT,
ADD COLUMN is_unlocked BOOLEAN DEFAULT false;

-- Insert character rewards data
INSERT INTO public.animated_characters (name, description, level_required, theme) VALUES
('The Beginner Monk', 'Sitting calmly, eyes closed', 1, 'peaceful'),
('The Meditating Student', 'Floating slightly with books circling around', 3, 'learning'),
('The Office Zen Guy', 'Hovering cross-legged above keyboard', 5, 'balance'),
('The Enlightened Sage', 'Radiating golden aura while flying', 8, 'wisdom'),
('Cosmic Being', 'Merged with universe, glowing silhouette', 10, 'transcendent');