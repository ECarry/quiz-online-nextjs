import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: string;
}

const SidebarItem = ({ href, label, icon }: SidebarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-2">
        <span className="text-2xl">{icon}</span>
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
