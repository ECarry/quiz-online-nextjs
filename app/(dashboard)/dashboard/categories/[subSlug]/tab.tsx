"use client";

import { useModal } from "@/hooks/use-modal-store";

import { ListFilter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Exam, Question } from "@prisma/client";
import TabContent from "./tab-content";

interface ExamWithQuiz extends Exam {
  questions: Question[];
}

interface Props {
  exams: ExamWithQuiz[] | undefined;
  id: string;
  slug: string;
}

const Tab = ({ exams, id, slug }: Props) => {
  const { onOpen } = useModal();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            className="h-7 gap-1"
            onClick={() => onOpen("createExam", { id })}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Exam
            </span>
          </Button>
        </div>
      </div>
      {/* TABLE  */}
      {exams && exams?.length > 0 ? (
        <Card x-chunk="dashboard-06-chunk-1">
          <CardHeader>
            <CardTitle>Exams</CardTitle>
            <CardDescription>
              Manage your Exams and view their questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TabContent exams={exams} slug={slug} />
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>32</strong> products
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-col items-center gap-y-8 pb-16">
          <h2 className="text-heading-small">No Exam yet</h2>
          <p className="w-[300px] text-center text-body-medium text-gray-500">
            You haven&apos;t created any exam yet. When you do, it&apos;ll show
            up here.
          </p>
          <div className="flex w-[240px] flex-col items-stretch">
            <Button onClick={() => onOpen("createExam", { id })}>
              Create an Exam
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tab;
