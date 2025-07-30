import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI meditation guide. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (replace with actual AI service later)
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string) => {
    // Simple response logic - replace with actual AI integration
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("stress") || lowerMessage.includes("anxious")) {
      return "I understand you're feeling stressed. Try a 5-minute breathing exercise: breathe in for 4 counts, hold for 4, and exhale for 6. This activates your parasympathetic nervous system.";
    }
    
    if (lowerMessage.includes("sleep") || lowerMessage.includes("insomnia")) {
      return "For better sleep, try our evening wind-down meditation. Practice progressive muscle relaxation starting from your toes and working up to your head.";
    }
    
    if (lowerMessage.includes("focus") || lowerMessage.includes("concentrate")) {
      return "To improve focus, try mindfulness meditation. Start with 10 minutes daily, focusing on your breath. When your mind wanders, gently bring attention back to breathing.";
    }
    
    if (lowerMessage.includes("meditation") || lowerMessage.includes("meditate")) {
      return "Great choice! Start with 5-10 minutes daily. Find a quiet space, sit comfortably, and focus on your breath. Consistency is more important than duration.";
    }
    
    return "Thank you for sharing. Based on your meditation patterns, I recommend starting with mindful breathing. Would you like me to guide you through a quick session?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-96 border border-meditation-primary/20 rounded-lg bg-background">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.isBot ? "justify-start" : "justify-end"
              }`}
            >
              {message.isBot && (
                <div className="flex-shrink-0 w-8 h-8 bg-meditation-primary/10 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-meditation-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isBot
                    ? "bg-meditation-primary/10 text-foreground"
                    : "bg-meditation-primary text-white ml-auto"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              {!message.isBot && (
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-meditation-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-meditation-primary" />
              </div>
              <div className="bg-meditation-primary/10 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-meditation-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-meditation-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-meditation-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-meditation-primary/20">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about meditation, stress relief, sleep..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="bg-meditation-primary hover:bg-meditation-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;