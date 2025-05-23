import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(root)/(routes)/dashboard/_components/app-sidebar";


interface childrenProps {
    children : React.ReactNode
}



export default function DashboardLayout({
  children,
}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
   <main className="flex">
            <AppSidebar />
            <div className="flex-1">
              <SidebarTrigger />
              {children}
            </div>
          </main>
    </SidebarProvider>
     
  );
}

 
         
     