import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseRewardSystemReturn {
  addMeditationXP: () => Promise<void>;
  addStreakXP: () => Promise<void>;
  addSleepXP: () => Promise<void>;
  addWeeklyXP: () => Promise<void>;
  checkLevelUp: (oldLevel: number, newLevel: number) => void;
}

export const useRewardSystem = (): UseRewardSystemReturn => {
  const updateUserProgress = async (xpToAdd: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current progress
      const { data: currentProgress, error: fetchError } = await supabase
        .from('user_progress')
        .select('total_xp, current_level, streak_count')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      let newTotalXP: number;
      let newLevel: number;

      if (currentProgress) {
        newTotalXP = currentProgress.total_xp + xpToAdd;
        newLevel = Math.floor(newTotalXP / 100) + 1; // Level up every 100 XP

        // Update existing record
        const { error: updateError } = await supabase
          .from('user_progress')
          .update({
            total_xp: newTotalXP,
            current_level: newLevel,
            last_meditation: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;

        // Check for level up
        if (newLevel > currentProgress.current_level) {
          checkLevelUp(currentProgress.current_level, newLevel);
        }
      } else {
        // Create new progress record
        newTotalXP = xpToAdd;
        newLevel = Math.floor(newTotalXP / 100) + 1;

        const { error: createError } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            total_xp: newTotalXP,
            current_level: newLevel,
            last_meditation: new Date().toISOString(),
            streak_count: 0
          });

        if (createError) throw createError;
      }

      toast.success(`+${xpToAdd} XP earned! 🌟`);
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const updateStreak = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: currentProgress, error } = await supabase
        .from('user_progress')
        .select('streak_count, last_meditation')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      const today = new Date();
      const lastMeditation = currentProgress.last_meditation ? new Date(currentProgress.last_meditation) : null;
      
      let newStreak = 1;
      
      if (lastMeditation) {
        const daysDiff = Math.floor((today.getTime() - lastMeditation.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
          // Consecutive day
          newStreak = currentProgress.streak_count + 1;
        } else if (daysDiff === 0) {
          // Same day, keep streak
          newStreak = currentProgress.streak_count;
        } else {
          // Streak broken
          newStreak = 1;
        }
      }

      const { error: updateError } = await supabase
        .from('user_progress')
        .update({ streak_count: newStreak })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Award streak bonus XP for 3+ day streaks
      if (newStreak > 0 && newStreak % 3 === 0) {
        await updateUserProgress(30);
        toast.success(`🔥 ${newStreak} day streak! Bonus XP!`);
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const addMeditationXP = async () => {
    await updateUserProgress(10);
    await updateStreak();
  };

  const addStreakXP = async () => {
    await updateUserProgress(30);
  };

  const addSleepXP = async () => {
    await updateUserProgress(15);
  };

  const addWeeklyXP = async () => {
    await updateUserProgress(100);
  };

  const checkLevelUp = (oldLevel: number, newLevel: number) => {
    // Show level up animation/celebration
    toast.success(`🎉 Level Up! You reached Level ${newLevel}!`, {
      duration: 5000,
    });
    
    // Check if new character is unlocked
    checkCharacterUnlock(newLevel);
  };

  const checkCharacterUnlock = async (level: number) => {
    try {
      const { data: characters, error } = await supabase
        .from('animated_characters')
        .select('name, level_required')
        .eq('level_required', level);

      if (error) throw error;

      if (characters && characters.length > 0) {
        characters.forEach(character => {
          toast.success(`🧘‍♂️ New character unlocked: ${character.name}!`, {
            duration: 5000,
          });
        });
      }
    } catch (error) {
      console.error('Error checking character unlock:', error);
    }
  };

  return {
    addMeditationXP,
    addStreakXP,
    addSleepXP,
    addWeeklyXP,
    checkLevelUp
  };
};
