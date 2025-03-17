'use client'

import * as React from 'react'
import { Bell, MessageCircle,  Users,  Home, LayoutDashboard, LogInIcon } from 'lucide-react'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'


export function SiteSidebar() {
  // Get the current active segment to highlight the active menu item
  const segment = useSelectedLayoutSegment()
    const [isAuthenticated , setAuth ] = React.useState(false);
    const router = useRouter()

    const handleLogut = ()=>{
        localStorage.setItem("cookie","")
        localStorage.setItem("student_details","");
        setAuth(false)
        router.push("/")
    }
    React.useEffect(()=>{
        if(window.localStorage.getItem("cookie")){
            setAuth(true)
        }
    },[])
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          <div className='text-xl font-black'>Better<span className='bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text'>UMS</span></div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={segment === 'detail' || segment === null}>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={segment === 'announcements'}>
                  <Link href="/announcements">
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Announcements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Chat Channels</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={segment === 'section-chat'}>
                  <Link href="/section-chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>Section Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={segment === 'programme-chat'}>
                  <Link href="/programme-chat">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Programme Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={segment === 'lpu-chat'}>
                  <Link href="/lpu-chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>LPU Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Authentication</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={segment === 'detail' || segment === null}>
                  <Link href="/login">
                  <LogInIcon/>
                  <div>{isAuthenticated?<div onClick={handleLogut}>Logout</div>:<div onClick={()=>{router.push("/login")}}>Login</div>}</div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-4 py-2 text-xs text-muted-foreground">
          Made with ❤️ by Anurag Maurya
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}