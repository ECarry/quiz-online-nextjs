"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between w-full">
      <h1>Exam</h1>
      <Button asChild>
        <Link href={"/exam/new"}>
          <Plus size={22} />
          New Question
        </Link>
      </Button>
    </div>
  );
};

export default Header;
