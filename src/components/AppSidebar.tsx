import { BarChart3, Brain, Play, Wind, Headphones, Podcast, Calendar, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Guided Sessions", url: "/", icon: Play },
  { title: "Profile", url: "/profile", icon: User },
  { title: "AI Guide", url: "/ai-guide", icon: Brain },
  { title: "Breathing", url: "/breathing", icon: Wind },
  { title: "Soundscapes", url: "/soundscapes", icon: Headphones },
  { title: "Podcasts", url: "/podcasts", icon: Podcast },
  { title: "Schedule", url: "/schedule", icon: Calendar },
  { title: "Stats", url: "/stats", icon: BarChart3 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-meditation-primary/20 text-meditation-primary border-r-2 border-meditation-primary" 
      : "text-muted-foreground hover:text-meditation-primary hover:bg-meditation-primary/5";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} border-r border-border/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end text-meditation-primary" />

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground/70 px-3 mb-2">
            NeuroBloom
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `${getNavCls({ isActive })} flex items-center px-3 py-2 rounded-lg transition-all duration-200`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3 text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}