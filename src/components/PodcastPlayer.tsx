import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ExternalLink, AlertCircle } from 'lucide-react';

interface PodcastPlayerProps {
  title?: string;
  host?: string;
  url?: string;
  isYoutube?: boolean;
  description?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ 
  title, 
  host, 
  url, 
  isYoutube = false,
  description 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current.addEventListener('error', () => {
        setError('Failed to load audio');
        setIsPlaying(false);
      });
    }
  }, []);

  const isExternalPlatform = url && (
    url.includes('podcasts.apple.com') ||
    url.includes('simplecast.com') ||
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    url.includes('spotify.com')
  );

  const handlePlayPause = () => {
    if (!url) {
      setError('No podcast URL available');
      return;
    }

    // For all external podcast platforms, open in new tab
    if (isExternalPlatform) {
      window.open(url, '_blank');
      return;
    }

    // For direct audio URLs only
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          setError('Failed to play audio');
          setIsPlaying(false);
        });
        setIsPlaying(true);
      }
    }
  };

  const handleYouTubeOpen = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  if (!url) {
    return (
      <Card className="border-meditation-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2 text-muted-foreground">
            <AlertCircle className="h-5 w-5" />
            <span>No podcast available</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-meditation-primary/20">
      <CardHeader>
        {title && <CardTitle className="text-xl">{title}</CardTitle>}
        {host && <p className="text-muted-foreground">with {host}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        
        {error && (
          <div className="flex items-center space-x-2 text-destructive text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <Button
            onClick={handlePlayPause}
            variant="default"
            className="bg-meditation-primary hover:bg-meditation-primary/90"
            disabled={!!error}
          >
            {isExternalPlatform ? (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                Listen on Platform
              </>
            ) : (
              <>
                {isPlaying ? (
                  <Pause className="h-4 w-4 mr-2" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                {isPlaying ? 'Pause' : 'Play'}
              </>
            )}
          </Button>

          {isYoutube && (
            <Button
              onClick={handleYouTubeOpen}
              variant="outline"
              className="border-meditation-primary/30 text-meditation-primary hover:bg-meditation-primary/10"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Listen on YouTube
            </Button>
          )}
        </div>

        {/* Hidden audio element for direct URLs */}
        {!isYoutube && (
          <audio
            ref={audioRef}
            src={url}
            preload="metadata"
            className="hidden"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PodcastPlayer;