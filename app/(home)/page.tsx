import { NavMenu } from "@/components/nav-menu";
import { Meteors } from "@/components/ui/meteors";

export default function Home() {
  return (
    <div className="w-full">
      <header className="h-20 w-full flex items-center justify-end p-4 max-w-7xl">
        <NavMenu />
      </header>
      <Meteors number={50} />
    </div>
  );
}
