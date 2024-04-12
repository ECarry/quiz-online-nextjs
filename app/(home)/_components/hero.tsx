import ShimmerButton from "@/components/shimmer-button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div>
      <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
        Better every day
      </span>
      <h3 className="text-4xl md:text-6xl font-semibold">
        Get Ready to Embrace Challenges!
      </h3>
      <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
        Explore our vast collection of quizzes and simulated exams, designed to
        help you conquer challenges and excel in your academic journey.
      </p>
      <div className="md:pt-4">
        <Link href={"/main"}>
          <ShimmerButton label="Ready to Challenges!" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
