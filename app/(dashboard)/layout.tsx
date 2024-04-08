import AsideBar from "../_components/aside-bar";
import HeaderBar from "../_components/header-bar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AsideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <HeaderBar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
