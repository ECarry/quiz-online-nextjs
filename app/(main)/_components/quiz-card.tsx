import Image from "next/image";
import Link from "next/link";
import pic from "@/public/pic.png";

interface QuizCardProps {
  id: string;
  name: string;
  total: number;
}

const QuizCard = ({ id, name, total }: QuizCardProps) => {
  return (
    <Link href={`/quiz/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image src={pic} alt={name} placeholder="blur" />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {name}
          </div>
          <p className="text-xs text-muted-foreground">📌 {total}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuizCard;
