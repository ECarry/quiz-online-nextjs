import Link from "next/link";

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-8 items-center justify-center">
      <Link href="/">
        <span className="text-3xl mr-2">💫</span>
        <span className="font-bold text-lg select-none">Quiz Master Zone</span>
      </Link>

      <p className="text-3xl font-bold">{label}</p>
    </div>
  );
};

export default Header;
