"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="icon"
        className="h-7 w-7"
        type="button"
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Back
      </h1>
    </div>
  );
};

export default BackButton;
