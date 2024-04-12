import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelLeft } from "lucide-react";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <PanelLeft />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-56">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
