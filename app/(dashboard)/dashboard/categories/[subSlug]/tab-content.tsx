import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Exam, Question } from "@prisma/client";
import formatDate from "@/lib/format-date";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ExamWithQuiz extends Exam {
  questions: Question[];
}

interface Props {
  exams: ExamWithQuiz[] | undefined;
  slug: string;
}

const TabContent = ({ exams, slug }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead className="hidden md:table-cell">Updated at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exams?.map((exam) => (
          <TableRow key={exam.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src="/placeholder.svg"
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium group">
              <Link href={`/dashboard/categories/${slug}/${exam.slug}`}>
                {exam.name}
              </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">desc</TableCell>
            <TableCell className="">
              <Badge
                variant={exam.status === "DRAFT" ? "destructive" : "default"}
              >
                {exam.status}
              </Badge>
            </TableCell>
            <TableCell className="">{exam.questions.length}</TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(exam.createAt)}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(exam.updateAt)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TabContent;
