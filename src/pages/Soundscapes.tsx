import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const Soundscapes = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [volume, setVolume] = useState([75]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const soundscapes = [
    {
      id: "forest",
      name: "Forest Rain",
      description: "Gentle rainfall in a peaceful forest",
      duration: "30 min",
      category: "Nature"
    },
    {
      id: "ocean",
      name: "Ocean Waves",
      description: "Rhythmic waves on a calm beach",
      duration: "45 min", 
      category: "Water"
    },
    {
      id: "mountain",
      name: "Mountain Stream",
      description: "Babbling brook in the mountains",
      duration: "60 min",
      category: "Water"
    },
    {
      id: "birds",
      name: "Morning Birds",
      description: "Dawn chorus in a tranquil garden",
      duration: "25 min",
      category: "Nature"
    },
    {
      id: "binaural",
      name: "40 Hz Binaural Beats",
      description: "Focus, memory and concentration frequency",
      duration: "varies",
      category: "Frequency",
      audioSrc: "/audio/soundscapes/Pure 40 HZ Binaural Beats The Frequency for FOCUS, MEMORY, and CONCENTRATION - Be Inspired STUDIO (1).mp3"
    },
    {
      id: "tibetan",
      name: "Tibetan Bowls",
      description: "Sacred singing bowl meditation",
      duration: "35 min",
      category: "Instrumental"
    },
    {
      id: "flute",
      name: "Bamboo Flute",
      description: "Soothing bamboo flute melodies",
      duration: "50 min",
      category: "Instrumental",
      audioSrc: "/audio/soundscapes/Inner Calm Bamboo Flute Meditation Music Relaxing Flute Music_2.mp3"
    }
  ];

  const categories = ["All", "Nature", "Water", "Frequency", "Instrumental"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSoundscapes = selectedCategory === "All" 
    ? soundscapes 
    : soundscapes.filter(s => s.category === selectedCategory);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100;
    }
  }, [volume]);

  const togglePlay = (id: string) => {
    const soundscape = soundscapes.find(s => s.id === id);
    
    if (currentlyPlaying === id) {
      // Pause current audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentlyPlaying(null);
    } else {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Play new audio if it has a source
      if (soundscape?.audioSrc) {
        audioRef.current = new Audio(soundscape.audioSrc);
        audioRef.current.volume = volume[0] / 100;
        audioRef.current.loop = true;
        audioRef.current.play().catch(console.error);
      }
      
      setCurrentlyPlaying(id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">Soundscapes</h1>
        <p className="text-muted-foreground mt-2">Immersive audio environments for deep meditation</p>
      </div>

      {/* Volume Control */}
      <Card className="border-meditation-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Volume2 className="h-4 w-4 text-meditation-primary" />
            <div className="flex-1">
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <span className="text-sm text-muted-foreground w-12">{volume[0]}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category
                ? "bg-meditation-primary hover:bg-meditation-primary/90"
                : "border-meditation-primary/30 text-meditation-primary hover:bg-meditation-primary/10"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Soundscapes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSoundscapes.map((soundscape) => (
          <Card key={soundscape.id} className="border-meditation-primary/20 hover:border-meditation-primary/40 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{soundscape.name}</CardTitle>
                  <span className="text-xs bg-meditation-primary/20 text-meditation-primary px-2 py-1 rounded mt-1 inline-block">
                    {soundscape.category}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{new Date().toLocaleTimeString()}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{soundscape.description}</p>
              
              {/* Waveform Visualization */}
              <div className="h-12 bg-muted/20 rounded flex items-center justify-center">
                <div className="flex space-x-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-meditation-primary/60 rounded transition-all duration-300 ${
                        currentlyPlaying === soundscape.id 
                          ? `animate-pulse-gentle h-${Math.floor(Math.random() * 8) + 2}` 
                          : 'h-2'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <Button
                onClick={() => togglePlay(soundscape.id)}
                variant={currentlyPlaying === soundscape.id ? "outline" : "default"}
                className={
                  currentlyPlaying === soundscape.id
                    ? "w-full border-meditation-primary text-meditation-primary"
                    : "w-full bg-meditation-primary hover:bg-meditation-primary/90"
                }
              >
                {currentlyPlaying === soundscape.id ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Soundscapes;