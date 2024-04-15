import { NavMenu } from "@/components/nav-menu";
import { Spotlight } from "@/components/ui/spotlight";
import Link from "next/link";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <header className="z-[50] fixed top-0 w-full bg-transparent border-b border-transparent">
        <div className="container flex h-16 items-center max-w-[88rem] mx-auto">
          <Link href="/">
            <span className="text-3xl mr-2">💫</span>
            <span className="font-bold text-lg select-none">
              Quiz Master Zone
            </span>
          </Link>

          <div className="ml-auto">
            <NavMenu />
          </div>
        </div>
      </header>
      <div className="overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 hidden dark:block"
          fill="white"
        />
        <div className="absolute pointer-events-none inset-0 dark:bg-grid-white/[0.06] bg-grid-black/[0.04] [mask-image:linear-gradient(to_bottom,white_10%,transparent_70%)]" />
      </div>
      {children}
    </div>
  );
};

export default HomeLayout;
