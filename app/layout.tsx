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
  title: {
    template: "%s - Quiz Master Zone",
    default: "Quiz Master Zone: Get Ready to Embrace Challenges!",
  },
  description:
    "Welcome to QuizMasterZone - your ultimate destination for online quizzes and simulated exams! Whether you're looking to practice for an upcoming test or simulate the exam environment, we've got you covered. Explore a wide range of quizzes across various subjects and levels, and sharpen your skills for success. Start your journey towards mastery today with QuizMasterZone!",
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
