import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import TimeBasedTheme from "@/components/TimeBasedTheme";


interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <TimeBasedTheme>
      <SidebarProvider>
        <div className="min-h-screen w-full flex">
          <AppSidebar />
          
          <div className="flex-1 flex flex-col">
            {/* Header with global trigger */}
            <header className="h-12 flex items-center border-b border-border/10 bg-background/95 backdrop-blur px-4">
              <SidebarTrigger className="text-meditation-primary" />
              <div className="ml-4 flex items-center gap-3">
                <img 
                  src="/lovable-uploads/052f559b-0d7a-4a55-b75a-de97d59535de.png" 
                  alt="NeuroBloom Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm font-medium text-foreground">
                  Neuro<span className="text-meditation-primary">Bloom</span>
                </span>
              </div>
            </header>

            {/* Main content */}
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TimeBasedTheme>
  );
}