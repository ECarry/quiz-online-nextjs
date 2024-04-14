import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  emoji: string;
  link: string;
}

const Card = ({ title, description, emoji, link }: CardProps) => {
  return (
    <Link href={link} className="relative overflow-hidden">
      <div className="border border-b-2 py-6 px-4 flex flex-col gap-2 rounded-2xl hover:dark:bg-black/20 hover:bg-sky-100 transition">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mr-10">{description}</p>
      </div>
      <div className="absolute text-[72px] -right-10 top-0">{emoji}</div>
    </Link>
  );
};

export default Card;
