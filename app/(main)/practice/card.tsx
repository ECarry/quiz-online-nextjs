import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  emoji: string;
  link: string;
  total?: number;
}

const Card = ({ title, description, emoji, link, total }: CardProps) => {
  return (
    <Link href={link} className="relative">
      <div className="border border-b-2 py-6 px-4 flex flex-col gap-2 rounded-2xl hover:dark:bg-black/20 hover:bg-sky-100 transition relative overflow-hidden">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-muted-foreground mr-10">{description}</p>
        <div className="absolute text-[72px] -right-5 top-0">{emoji}</div>
      </div>

      {total && (
        <div className="absolute -right-2 -top-2 px-2 py-1 flex items-center justify-center p-1 rounded-full bg-rose-500">
          <span className="text-xs text-white font-semibold">{total}</span>
        </div>
      )}
    </Link>
  );
};

export default Card;
