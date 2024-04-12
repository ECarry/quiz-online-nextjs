"use client";

import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useModal } from "@/hooks/use-modal-store";
import { signOut } from "next-auth/react";

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
// import Avatar from "/public/images/avatar.jpg";

export function NavMenu() {
  const user = useCurrentUser();

  const AvatarImage = user?.image ? user.image : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="z-10">
        {user ? (
          <div className="flex h-8 md:h-11 items-center gap-x-0 md:gap-x-2 rounded-full w-8 md:w-20 cursor-pointer justify-between pl-0 md:pl-[6px] pr-0 md:pr-[14px] border-0 md:border hover:bg-primary-foreground">
            <Image
              src={AvatarImage || "/avatar.svg"}
              alt="avatar"
              width={32}
              height={32}
              className="size-8 rounded-full"
            />
            <Icons.menu className="size-4 hidden md:block dark:text-white" />
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
                <h1 className="font-medium leading-none">{user.name}</h1>
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
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="flex justify-between items-center" href={"/main"}>
            <span>Chanllenges</span>
            <Icons.arrowUpRight className="size-5" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            className="flex justify-between items-center"
            href={"https://github.com/ECarry/server-hub-nextjs"}
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
