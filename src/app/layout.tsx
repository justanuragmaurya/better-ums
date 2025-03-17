import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { SiteSidebar } from '@/components/sidebar'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "next-themes";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${popins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <SiteSidebar />
            <SidebarInset>
              <header className="flex h-16 items-center gap-4 border-b px-6">
                <div className="flex gap-2 justify-center ">
                  <SidebarTrigger />
                  <div className="font-semibold">Better<span className="bg-gradient-to-r from-orange-400 to-orange-500 text-transparent bg-clip-text">UMS</span></div>
                </div>
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 h-[calc(100vh-4rem)] overflow-hidden">
                {children}
                <Toaster />
              </main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}