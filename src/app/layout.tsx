import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar";
import { SiteSidebar } from '@/components/sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

const popins = Poppins({
  variable: "--font-popins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Better UMS",
  description: "An improved University Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${popins.className} antialiased`}
      >
        <SidebarProvider>
          <SiteSidebar />
          <SidebarInset>
          <header className="flex h-16 items-center gap-4 border-b px-6">
              <SidebarTrigger />
              <div className="font-semibold">Better<span className="bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">UMS</span></div>
            </header>
            <main className="flex-1 h-[calc(100vh-4rem)] overflow-hidden">
              {children}
              <Toaster />
            </main>
          </SidebarInset>
        </SidebarProvider>
        
      </body>
    </html>
  );
}