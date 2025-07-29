import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Clock, Download } from "lucide-react";

const Podcasts = () => {
  const podcasts = [
    {
      id: 1,
      title: "The Science of Meditation",
      host: "Dr. Sarah Chen",
      description: "Exploring the neuroscience behind mindfulness practices and their impact on brain plasticity.",
      duration: "32 min",
      published: "2 days ago",
      category: "Science"
    },
    {
      id: 2,
      title: "Sleep Stories for Deep Rest",
      host: "Marcus Williams",
      description: "Calming narratives designed to guide you into peaceful, restorative sleep.",
      duration: "45 min",
      published: "1 week ago",
      category: "Sleep"
    },
    {
      id: 3,
      title: "Mindful Leadership",
      host: "Emma Rodriguez",
      description: "How meditation practices can transform your approach to leadership and decision-making.",
      duration: "28 min",
      published: "1 week ago",
      category: "Leadership"
    },
    {
      id: 4,
      title: "Ancient Wisdom, Modern Life",
      host: "Lama Tenzin",
      description: "Traditional Buddhist teachings adapted for contemporary mindfulness practice.",
      duration: "38 min",
      published: "2 weeks ago",
      category: "Philosophy"
    },
    {
      id: 5,
      title: "Stress and the Body",
      host: "Dr. Michael Park",
      description: "Understanding how chronic stress affects our physical health and healing through meditation.",
      duration: "25 min",
      published: "3 weeks ago",
      category: "Health"
    },
    {
      id: 6,
      title: "Meditation for Parents",
      host: "Lisa Thompson",
      description: "Practical mindfulness techniques for busy parents to find peace in daily chaos.",
      duration: "22 min",
      published: "1 month ago",
      category: "Family"
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