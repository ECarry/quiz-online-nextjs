"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { links } from "./links";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RxPencil2 } from "react-icons/rx";

const MainNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
      <Link
        href="/dashboard"
        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
      >
        <RxPencil2 className="h-5 w-5 transition-all group-hover:scale-110" />
        <span className="sr-only">Exam</span>
      </Link>

      {links.map((link) => (
        <Tooltip key={link.href}>
          <TooltipTrigger asChild>
            <Link
              href={link.href}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
                pathname.replace(/^\/dashboard/, "") ===
                  link.href.replace(/^\/dashboard/, "") &&
                  "text-foreground bg-accent"
              )}
            >
              {link.icon}
              <span className="sr-only">{link.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{link.label}</TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
};

export default MainNav;
