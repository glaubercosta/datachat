import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AppSidebar"
import { Bell, Search, Sun, Moon, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { setTheme, theme } = useTheme()

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-14 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="h-full px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="lg:hidden" />
                <div className="relative max-w-sm hidden md:block">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar..." 
                    className="pl-9 h-9 bg-background/50 border-border/50 focus:bg-background"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-primary rounded-full"></span>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {theme === "light" ? (
                        <Sun className="h-4 w-4" />
                      ) : theme === "dark" ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Monitor className="h-4 w-4" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      Claro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      Escuro
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      <Monitor className="mr-2 h-4 w-4" />
                      Sistema
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gradient-subtle">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}