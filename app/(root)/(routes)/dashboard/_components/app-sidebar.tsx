'use client'

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
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

const items = [  {
    title: "Search",
    url: "#",
    icon: Search,
    className: "flex items-center gap-2 px-4 py-2 text-[#501854] hover:bg-[#E4D5E6] rounded-md"
  },
  {
    title: "New Chat",
    url: "#",
    noIcon:true,
    className: "flex justify-center px-4 py-2 rounded-md bg-[#D76A9D] text-white font-medium shadow-md hover:bg-[#C25A8C] transition-all duration-150"
  }
]

export function AppSidebar() {
  const router = useRouter()
  
  const handleNewChat = () => {
    localStorage.removeItem('currentChat')
    router.refresh()
  }

  const handleLogin = () => {
    router.push("/")
  }

  return (
    <Sidebar className="bg-[#F9DDFD] border-r">
      <SidebarContent className="bg-[#F2E4F4] border-r">
        <SidebarGroup>
          <SidebarGroupLabel className="p-2 text-xl text-[#CA0277]">T3.chat</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button 
                      className={item.className}
                      onClick={item.title === "New Chat" ? handleNewChat : undefined}
                    >
                      {!item.noIcon && item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </button>
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
