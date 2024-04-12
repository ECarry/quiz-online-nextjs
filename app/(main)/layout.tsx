import Sidebar from "./_components/sidebar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full flex-col w-56 z-50 fixed inset-0">
        <Sidebar />
      </div>
      {children}
    </div>
  );
};

export default MainLayout;
