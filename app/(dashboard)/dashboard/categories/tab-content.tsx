import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { Exam, Subject } from "@prisma/client";
import formatDate from "@/lib/format-date";
import Link from "next/link";
import { useModal } from "@/hooks/use-modal-store";

interface SubjectWithExams extends Subject {
  exams: Exam[];
}

interface Props {
  categories: SubjectWithExams[] | undefined;
}

const TabContent = ({ categories }: Props) => {
  const { onOpen } = useModal();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Total Exam</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead className="hidden md:table-cell">Updated at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="hidden sm:table-cell">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src={category.image || "/placeholder.svg"}
                width="64"
              />
            </TableCell>
            <TableCell className="font-medium group">
              <Link href={`/dashboard/categories/${category.slug}`}>
                {category.name}
              </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {category.exams.length}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(category.createAt)}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {formatDate(category.updateAt)}
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
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onOpen("editCategory", { category })}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {}}
                  >
                    Delete
                  </DropdownMenuItem>
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
