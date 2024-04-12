import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="h-full">
      <div className="h-20 md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full flex-col w-56 z-50 fixed inset-0">
        <Sidebar />
      </div>

      <main className="md:ml-56">{children}</main>
    </div>
  );
};

export default MainLayout;
