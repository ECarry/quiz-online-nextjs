import Link from "next/link";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-black shadow-sm">
      <div className="p-6">
        <Link href="/main">
          <span className="text-xl mr-2">💫</span>
          <span className="font-bold text-sm select-none">
            Quiz Master Zone
          </span>
        </Link>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
