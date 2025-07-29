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
              <div className="ml-4">
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