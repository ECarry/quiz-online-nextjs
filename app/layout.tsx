import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { auth } from "@/auth";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Nextjs App Template",
  description: "Nextjs Full Stack App Template",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <TooltipProvider>{children}</TooltipProvider>
            <ModalProvider />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
        <TailwindIndicator />
      </body>
    </html>
  );
}
