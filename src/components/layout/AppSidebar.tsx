import { useState } from "react"
import { 
  MessageSquare, 
  Settings, 
  Database, 
  Key, 
  Brain, 
  Users, 
  BarChart3,
  Sparkles,
  Home,
  ChevronDown
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

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
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const mainItems = [
  { title: "Painel", url: "/", icon: Home },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
]

const adminItems = [
  { title: "Configuração DB", url: "/admin/database", icon: Database },
  { title: "Chaves API", url: "/admin/api-keys", icon: Key },
  { title: "Models LLM", url: "/admin/models", icon: Brain },
  { title: "Usuários", url: "/admin/users", icon: Users },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const [adminOpen, setAdminOpen] = useState(true)

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-accent/50 text-muted-foreground hover:text-foreground"

  const collapsed = state === "collapsed"

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar border-r">
        {/* Logo/Brand */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-base font-semibold text-foreground">
                  LLM Config
                </h1>
                <p className="text-xs text-muted-foreground">Painel</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
            {!collapsed && "PRINCIPAL"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup>
          <Collapsible open={adminOpen} onOpenChange={setAdminOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer text-xs font-medium text-muted-foreground px-2 hover:text-foreground transition-colors">
                {!collapsed && (
                  <>
                    <span>ADMIN</span>
                    <ChevronDown className={`h-3 w-3 transition-transform ${adminOpen ? 'rotate-180' : ''}`} />
                  </>
                )}
                {collapsed && <Settings className="h-4 w-4" />}
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild className="h-10">
                        <NavLink to={item.url} className={getNavCls}>
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span className="text-sm">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto p-3 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">A</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Admin</p>
                <p className="text-xs text-muted-foreground truncate">admin@exemplo.com</p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}