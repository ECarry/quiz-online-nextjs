"use client";

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
import { Question } from "@prisma/client";
import TabContent from "./tab-content";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  questions: Question[] | undefined;
}

const Tab = ({ questions }: Props) => {
  const pathname = usePathname();

  return (
    <>
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
          <Button size="sm" className="h-7 gap-1" asChild>
            <Link href={`${pathname}/new`}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Question
              </span>
            </Link>
          </Button>
        </div>
      </div>
      {/* TABLE  */}
      {questions && questions?.length > 0 ? (
        <Card x-chunk="dashboard-06-chunk-1">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>Manage your Questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <TabContent questions={questions} />
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of{" "}
              <strong>{questions.length}</strong> questions
            </div>
          </CardFooter>
        </Card>
      ) : (
        <div className="flex flex-col items-center gap-y-8 pb-16">
          <h2 className="text-heading-small">No Question yet</h2>
          <p className="w-[300px] text-center text-body-medium text-gray-500">
            You haven&apos;t created any question yet. When you do, it&apos;ll
            show up here.
          </p>
          <div className="flex w-[240px] flex-col items-stretch">
            <Button asChild>
              <Link href={`${pathname}/new`}>Create a Question</Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Tab;
