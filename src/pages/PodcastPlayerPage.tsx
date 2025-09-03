import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PodcastPlayer from '../components/PodcastPlayer';

const PodcastPlayerPage = () => {
  const [searchParams] = useSearchParams();
  
  const title = searchParams.get('title') || 'Podcast';
  const host = searchParams.get('host') || '';
  const url = searchParams.get('url') || '';
  const description = searchParams.get('description') || '';
  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">Podcast Player</h1>
        <p className="text-muted-foreground mt-2">Listen to guided meditations and mindfulness talks</p>
      </div>

      <PodcastPlayer
        title={title}
        host={host}
        url={url}
        isYoutube={isYoutube}
        description={description}
      />
    </div>
  );
};

export default PodcastPlayerPage;