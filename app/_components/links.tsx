import { Home, Package2, School2, Users2 } from "lucide-react";

export const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/categories",
    label: "Categories",
    icon: <School2 className="h-5 w-5" />,
  },
  {
    href: "/users",
    label: "Users",
    icon: <Users2 className="h-5 w-5" />,
  },
];
