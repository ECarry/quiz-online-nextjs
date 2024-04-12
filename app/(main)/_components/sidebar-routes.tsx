"use client";

import SidebarItem from "./sidebar-item";

const routes = [
  {
    href: "/main",
    icon: "🏝️",
    label: "Browse",
  },
  {
    href: "/practice-hub",
    icon: "🥊",
    label: "Practice",
  },
  {
    href: "/rank",
    icon: "🥇",
    label: "Rank",
  },
];

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          label={route.label}
          href={route.href}
          icon={route.icon}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
