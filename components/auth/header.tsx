import Link from "next/link";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-8 items-center justify-center">
      <Link href={"/"}>EXAM</Link>

      <p className="text-3xl font-bold">{label}</p>
    </div>
  );
};

export default Header;
