import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Star, Flame, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserProgress {
  total_xp: number;
  current_level: number;
  streak_count: number;
}

interface Character {
  id: string;
  name: string;
  description: string;
  level_required: number;
  theme: string;
}

const RewardSystem = () => {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProgress();
    fetchCharacters();
  }, []);

  const fetchUserProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_progress')
        .select('total_xp, current_level, streak_count')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setUserProgress(data);
      } else {
        // Create initial progress record
        const { data: newProgress, error: createError } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            total_xp: 0,
            current_level: 1,
            streak_count: 0
          })
          .select('total_xp, current_level, streak_count')
          .single();

        if (createError) throw createError;
        setUserProgress(newProgress);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
      toast.error('Failed to load progress');
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async () => {
    try {
      const { data, error } = await supabase
        .from('animated_characters')
        .select('id, name, description, level_required, theme')
        .order('level_required');

      if (error) throw error;
      setCharacters(data || []);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const getXPForNextLevel = (level: number) => {
    return level * 100; // 100 XP per level
  };

  const getCurrentLevelXP = (totalXP: number, currentLevel: number) => {
    const prevLevelXP = (currentLevel - 1) * 100;
    return totalXP - prevLevelXP;
  };

  const getNextLevelXP = (currentLevel: number) => {
    return getXPForNextLevel(currentLevel);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  const currentLevelXP = userProgress ? getCurrentLevelXP(userProgress.total_xp, userProgress.current_level) : 0;
  const nextLevelXP = userProgress ? getNextLevelXP(userProgress.current_level) : 100;
  const progressPercentage = (currentLevelXP / nextLevelXP) * 100;

  return (
    <div className="space-y-6">
      {/* Level Progress Card */}
      <Card className="border-meditation-primary/20 bg-gradient-subtle">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-meditation-primary" />
            Level {userProgress?.current_level || 1}
          </CardTitle>
          <p className="text-muted-foreground">Awakening Journey</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{currentLevelXP} XP</span>
              <span>{nextLevelXP} XP</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-meditation-primary font-bold text-lg">
                <Star className="h-4 w-4" />
                {userProgress?.total_xp || 0}
              </div>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-meditation-primary font-bold text-lg">
                <Flame className="h-4 w-4" />
                {userProgress?.streak_count || 0}
              </div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* XP System Info */}
      <Card className="border-meditation-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-meditation-primary" />
            Earn Meditation Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Complete meditation</span>
                <Badge variant="secondary">+10 XP</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">3-day streak</span>
                <Badge variant="secondary">+30 XP</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Sleep session</span>
                <Badge variant="secondary">+15 XP</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weekly goal</span>
                <Badge variant="secondary">+100 XP</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Character Rewards */}
      <Card className="border-meditation-primary/20">
        <CardHeader>
          <CardTitle>Character Collection</CardTitle>
          <p className="text-muted-foreground">Unlock new meditation companions as you level up</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map((character) => {
              const isUnlocked = (userProgress?.current_level || 1) >= character.level_required;
              return (
                <div
                  key={character.id}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isUnlocked
                      ? 'border-meditation-primary/50 bg-meditation-primary/5'
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className={`w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center ${
                      isUnlocked ? 'border-meditation-primary bg-meditation-primary/10' : 'border-muted bg-muted'
                    }`}>
                      <span className="text-2xl">🧘‍♂️</span>
                    </div>
                    <h3 className={`font-medium ${isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {character.name}
                    </h3>
                    <p className={`text-xs ${isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                      {character.description}
                    </p>
                    <Badge variant={isUnlocked ? "default" : "secondary"} className="text-xs">
                      {isUnlocked ? 'Unlocked' : `Level ${character.level_required}`}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardSystem;