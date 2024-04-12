import React from "react";
import MobileSidebar from "./mobile-sidebar";
import { NavMenu } from "@/components/nav-menu";

const Navbar = () => {
  return (
    <nav className="p-4 border-b flex items-center bg-white dark:bg-black">
      <MobileSidebar />
      <div className="ml-auto">
        <NavMenu />
      </div>
    </nav>
  );
};

export default Navbar;
