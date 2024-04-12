import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    template: "%s - Login - Quiz Master Zone",
    default: "Login - Quiz Master Zone",
  },
  description:
    "Welcome to QuizMasterZone - your ultimate destination for online quizzes and simulated exams! Whether you're looking to practice for an upcoming test or simulate the exam environment, we've got you covered. Explore a wide range of quizzes across various subjects and levels, and sharpen your skills for success. Start your journey towards mastery today with QuizMasterZone!",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-dvh">
      <div className="flex items-center justify-center py-12">{children}</div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
