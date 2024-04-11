import { useModal } from "@/hooks/use-modal-store";
import { X } from "lucide-react";
import React from "react";

const Header = () => {
  const { onOpen } = useModal();
  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between mx-auto w-full">
      <X
        onClick={() => onOpen("exit")}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
    </header>
  );
};

export default Header;
