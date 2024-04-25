import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center gap-8">
      <h2 className="text-2xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Image
        src="/not-found.gif"
        width={500}
        height={500}
        alt="404"
        unoptimized
      />
      <Link href="/">Return Home</Link>
    </div>
  );
}
