import { X } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between mx-auto w-full">
      <X
        onClick={() => {}}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />
    </header>
  );
};

export default Header;
