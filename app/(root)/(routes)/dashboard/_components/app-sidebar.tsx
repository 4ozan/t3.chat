'use client'

import { Button } from "@/components/ui/button"
import {Home, Inbox, Settings, PlusCircle } from "lucide-react"
import { useRouter } from 'next/navigation'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const router = useRouter()
  
  const handleNewChat = () => {
    localStorage.removeItem('currentChat')
    router.refresh()
  }

  const handleLogin = () => {
    router.push("/auth/login")
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Taiba</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="overflow-y-auto" >
                <SidebarMenuButton asChild onClick={handleNewChat}>
                  <button className="flex items-center gap-2 w-full" onClick={handleLogin}>
                    <PlusCircle size={18} />
                    <span>Login</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
