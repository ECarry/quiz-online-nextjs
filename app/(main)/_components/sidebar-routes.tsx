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
    href: "/posts",
    icon: "🗞️",
    label: "Posts",
    disabled: false,
  },
  {
    href: "/rank",
    icon: "🥇",
    label: "Rank",
    disabled: true,
  },
  {
    href: "/ai",
    icon: "🤖",
    label: "Ask AI",
    disabled: true,
  },
  {
    href: "/profile",
    icon: "🧑🏻",
    label: "Propfile",
    disabled: true,
  },
  {
    href: "/settings",
    icon: "⚙️",
    label: "Settings",
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
