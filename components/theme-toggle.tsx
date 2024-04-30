"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div className="flex space-x-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex space-x-1">
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="icon"
        className="w-full"
        onClick={() => setTheme("dark")}
      >
        <span className="size-5">🌙</span>
      </Button>
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="icon"
        className="w-full"
        onClick={() => setTheme("light")}
      >
        <span className="size-5">☀️</span>
      </Button>
      <Button
        variant={theme === "system" ? "default" : "outline"}
        size="icon"
        className="w-full"
        onClick={() => setTheme("system")}
      >
        <span className="size-5">💻</span>
      </Button>
    </div>
  );
}
