import { Metadata } from "next";
import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s - Home - Quiz Master Zone",
    default: "Home - Quiz Master Zone",
  },
  description:
    "Welcome to QuizMasterZone - your ultimate destination for online quizzes and simulated exams! Whether you're looking to practice for an upcoming test or simulate the exam environment, we've got you covered. Explore a wide range of quizzes across various subjects and levels, and sharpen your skills for success. Start your journey towards mastery today with QuizMasterZone!",
};

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

      <main className="md:ml-56 pt-20 h-full">{children}</main>
    </div>
  );
};

export default MainLayout;
