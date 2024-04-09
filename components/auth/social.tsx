"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Social = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const onClick = (provider: "google" | "github") => {
    if (provider === "google") {
      setIsGoogleLoading(true);
    } else if (provider === "github") {
      setIsGithubLoading(true);
    }

    signIn(provider, {
      callbackUrl: "http://localhost:3000",
    });
  };

  return (
    <>
      <div className="w-full space-y-4 flex-col">
        <Button
          className="w-full space-x-2 rounded-2xl"
          variant="outline"
          size={"lg"}
          onClick={() => onClick("google")}
          disabled={isGoogleLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FcGoogle className="w-5 h-5" />
          )}
          <span>Continue with Google</span>
        </Button>

        <Button
          className="w-full space-x-2 rounded-2xl"
          variant="outline"
          size={"lg"}
          onClick={() => onClick("github")}
          disabled={isGithubLoading}
        >
          {isGithubLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGithub className="w-5 h-5" />
          )}

          <span>Continue with Github</span>
        </Button>
      </div>
      <div className="relative flex h-20 items-center justify-center">
        <hr className="h-[2px] grow border-divider-primary" />
        <h3 className="w-11 shrink-0 text-center text-body-small-bold text-fg-secondary">
          or
        </h3>
        <hr className="h-[2px] grow border-divider-primary" />
      </div>
    </>
  );
};

export default Social;
