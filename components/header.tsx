import { MainNav } from "./main-nav";
import { ModeToggle } from "./mode-toggle";
import UserButton from "./user-button";

export default function Header() {
  return (
    <header className="sticky top-0 flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 max-w-3xl px-4 mx-auto sm:px-6">
        <MainNav />
        <UserButton />
        <ModeToggle />
      </div>
    </header>
  );
}
