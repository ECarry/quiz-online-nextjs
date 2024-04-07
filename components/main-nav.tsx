"use client";

import CustomLink from "./custom-link";
import React from "react";
import { Button } from "./ui/button";

export function MainNav() {
  return (
    <div className="flex gap-4 items-center">
      <CustomLink href="/">
        <Button variant="ghost" className="p-0">
          Server Side
        </Button>
      </CustomLink>
      <CustomLink href="/client-example">
        <Button variant="ghost" className="p-0">
          Client Side
        </Button>
      </CustomLink>
      <CustomLink href="/exam">
        <Button variant="ghost" className="p-0">
          Exam
        </Button>
      </CustomLink>
    </div>
  );
}
