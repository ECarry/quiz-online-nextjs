"use client";

import SidebarItem from "./sidebar-item";

const routes = [
  {
    href: "/main",
    icon: "🏝️",
    label: "Browse",
    disabled: false,
  },
  {
    href: "/practice",
    icon: "🥊",
    label: "Practice",
    disabled: false,
  },
  {
    href: "/rank",
    icon: "🥇",
    label: "Rank",
    disabled: true,
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
          disabled={route.disabled}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
