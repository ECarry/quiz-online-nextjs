import { Home, LibraryBig, Users2 } from "lucide-react";

export const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/dashboard/categories",
    label: "Categories",
    icon: <LibraryBig className="h-5 w-5" />,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: <Users2 className="h-5 w-5" />,
  },
];
