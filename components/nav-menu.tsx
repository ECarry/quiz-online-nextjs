"use client";

import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";
import { useCurrentRole } from "@/hooks/user-current-role";

import { Icons } from "@/components/icons";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";

export function NavMenu() {
  const user = useCurrentUser();
  const role = useCurrentRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="z-10">
        {user ? (
          <div className="flex h-8 md:h-11 items-center gap-x-0 md:gap-x-2 rounded-full w-8 md:w-20 cursor-pointer justify-between pl-0 md:pl-[6px] pr-0 md:pr-[14px] border-0 md:border hover:bg-primary-foreground relative">
            <Image
              src={user.image || "/avatar.svg"}
              alt="avatar"
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
            <Icons.menu className="size-4 hidden md:block dark:text-white" />
            {role === "ADMIN" && (
              <span className="absolute top-0 left-0 size-2 rounded-full text-lg">
                ⭐️
              </span>
            )}
            {role === "PLUS" && (
              <span className="absolute top-0 left-0 size-2 rounded-full text-lg">
                🚀
              </span>
            )}
          </div>
        ) : (
          <Button
            variant="outline"
            size="lg"
            className="w-11 px-0 cursor-pointer"
          >
            <Icons.menu className="size-4 dark:text-white" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {user && (
          <>
            <DropdownMenuLabel className="font-normal select-none">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium leading-none">
                  {user.name}
                  <span className="ml-2 text-muted-foreground text-xs">
                    {role}
                  </span>
                </h1>
                <p className="text-sm leading-none text-muted-foreground">
                  {user.email}
                </p>
                {/* <Button
                  variant={"secondary"}
                  className="mt-2 text-sm"
                  onClick={() => {}}
                >
                  Request content
                </Button> */}
              </div>

              <DropdownMenuSeparator />
            </DropdownMenuLabel>
          </>
        )}
        {user && (
          <DropdownMenuItem asChild>
            <div
              className="flex justify-start items-center gap-x-2"
              onClick={() => {}}
            >
              <Icons.settings className="size-5" />
              <span>Settings</span>
              <Badge variant="secondary">TODO</Badge>
            </div>
          </DropdownMenuItem>
        )}
        {!user && (
          <DropdownMenuLabel className="font-normal select-none">
            <Button asChild variant={"secondary"} className="text-sm w-full">
              <Link href="/auth/login">Login</Link>
            </Button>
            <DropdownMenuSeparator />
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link
              className="flex justify-between items-center"
              href="/dashboard"
            >
              <span>Dashboard</span>
              <Icons.arrowUpRight className="size-5" />
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link className="flex justify-between items-center" href="/main">
            <span>Chanllenges</span>
            <Icons.arrowUpRight className="size-5" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link className="flex justify-between items-center" href="/">
            <span>Homepage</span>
            <Icons.arrowUpRight className="size-5" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex justify-between items-center"
            href="https://github.com/ECarry/server-hub-nextjs"
            target="_blank"
          >
            <span>Github</span>
            <Icons.arrowUpRight className="size-5" />
          </Link>
        </DropdownMenuItem>
        {user && (
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="w-full h-full cursor-pointer"
              onClick={() => signOut()}
            >
              Log out
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
