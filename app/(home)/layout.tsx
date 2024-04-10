import { NavMenu } from "@/components/nav-menu";

const HomeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default HomeLayout;
