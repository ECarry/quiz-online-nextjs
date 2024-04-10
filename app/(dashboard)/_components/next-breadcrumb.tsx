"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

const NextBreadcrumb = () => {
  const paths = usePathname();

  const pathNames = paths.split("/").filter((path) => path);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathNames.map((path, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          if (path === "dashboard") {
            href = "/dashboard";
          }

          return (
            <div key={path} className="flex items-center gap-2">
              <BreadcrumbItem>
                {index === pathNames.length - 1 ? (
                  <BreadcrumbPage className="capitalize">
                    {path.slice(0, 30).replace(/-/g, " ")}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {path.slice(0, 30).replace(/-/g, " ")}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {pathNames.length !== index + 1 && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NextBreadcrumb;
