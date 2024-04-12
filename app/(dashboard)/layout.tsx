import { Metadata } from "next";
import AsideBar from "./_components/aside-bar";
import HeaderBar from "./_components/header-bar";

export const metadata: Metadata = {
  title: {
    template: "%s - Dashboard - Quiz Master Zone",
    default: "Quiz Master Zone",
  },
  description:
    "Welcome to QuizMasterZone - your ultimate destination for online quizzes and simulated exams! Whether you're looking to practice for an upcoming test or simulate the exam environment, we've got you covered. Explore a wide range of quizzes across various subjects and levels, and sharpen your skills for success. Start your journey towards mastery today with QuizMasterZone!",
};

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
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
