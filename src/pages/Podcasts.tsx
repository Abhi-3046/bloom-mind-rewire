import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Download } from "lucide-react";

const Podcasts = () => {
  const podcasts = [
    {
      id: 1,
      title: "Your Brain On… Meditation",
      host: "Season 3, Episode 4",
      description: "Explores how meditation reshapes attention networks, breaks phone addiction, and offers long-term cognitive advantages.",
      duration: "Episode",
      published: "Latest",
      category: "Neuroscience",
      url: "https://podcasts.apple.com/us/podcast/your-brain-on-meditation/id1730984252?i=1000666873403"
    },
    {
      id: 2,
      title: "How Do I Keep My Brain Healthy?",
      host: "Dr. Sonja Blum",
      description: "Practical habits to support brain health, including meditation and lifestyle factors for cognitive wellness.",
      duration: "Health Matters",
      published: "Recent",
      category: "Health",
      url: "https://podcasts.apple.com/nl/podcast/how-do-i-keep-my-brain-healthy/id1679632229?i=1000710254210"
    },
    {
      id: 3,
      title: "Meditation Changes Your Brain. Here's How.",
      host: "Dr. Richard Davidson",
      description: "Research-backed insights into how meditation reshapes the brain—emotional regulation, stress resilience, and measurable improvements in mental health outcomes.",
      duration: "Colloquy Podcast",
      published: "Featured",
      category: "Research",
      url: "https://colloquy.simplecast.com/episodes/meditation-changes-your-brain-HDlJo5Q4"
    },
    {
      id: 4,
      title: "Brain Waves & Meditation",
      host: "Science News Highlight",
      description: "Study from Mount Sinai found that loving-kindness meditation can shift beta and gamma brain wave patterns in the amygdala and hippocampus—regions tied to emotional regulation and memory.",
      duration: "Study Review",
      published: "Latest Research",
      category: "Science",
      url: "https://health-matters.simplecast.com/episodes/how-do-i-keep-my-brain-healthy-Rhxu0tzg"
    },
    {
      id: 5,
      title: "How Meditation Works & Science-Based Effective Meditations",
      host: "Dr. Andrew Huberman",
      description: "Dr. Huberman explains biological mechanisms behind meditation—how it alters default mood, reduces anxiety, improves focus, promotes neuroplasticity, sleep, relaxation, and long-term happiness.",
      duration: "Huberman Lab",
      published: "Stanford Research",
      category: "Science",
      url: "https://youtu.be/wTBSGgbIvsY?si=9INYBEY75l-_zKLn"
    }
  ];

  const categories = ["All", "Science", "Sleep", "Leadership", "Philosophy", "Health", "Family"];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-light text-foreground">Podcasts</h1>
        <p className="text-muted-foreground mt-2">Mindfulness talks and guided sessions</p>
      </div>

      {/* Featured Episode */}
      <Card className="border-meditation-primary/20 bg-gradient-to-r from-meditation-primary/5 to-meditation-secondary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs bg-meditation-primary text-white px-2 py-1 rounded">Featured</span>
              <CardTitle className="text-2xl mt-2">The Science of Meditation</CardTitle>
              <p className="text-muted-foreground">with Dr. Sarah Chen</p>
            </div>
            <Button className="bg-meditation-primary hover:bg-meditation-primary/90">
              <Play className="h-4 w-4 mr-2" />
              Play Now
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Exploring the neuroscience behind mindfulness practices and their impact on brain plasticity.
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              32 min
            </span>
            <span>•</span>
            <span>2 days ago</span>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            className="border-meditation-primary/30 text-meditation-primary hover:bg-meditation-primary/10"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Episodes List */}
      <div className="space-y-4">
        {podcasts.map((podcast) => (
          <Card key={podcast.id} className="border-meditation-primary/20 hover:border-meditation-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-meditation-primary/20 text-meditation-primary px-2 py-1 rounded">
                      {podcast.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{podcast.published}</span>
                  </div>
                  
                  <h3 className="font-semibold text-foreground">{podcast.title}</h3>
                  <p className="text-sm text-muted-foreground">by {podcast.host}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {podcast.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {podcast.duration}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-meditation-primary/30 text-meditation-primary hover:bg-meditation-primary/10"
                    onClick={() => {
                      const params = new URLSearchParams({
                        title: podcast.title,
                        host: podcast.host,
                        url: podcast.url,
                        description: podcast.description
                      });
                      window.location.href = `/podcast-player?${params.toString()}`;
                    }}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-meditation-primary"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;