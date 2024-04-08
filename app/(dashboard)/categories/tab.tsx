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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Subject } from "@prisma/client";
import TabContent from "./tab-content";

interface Props {
  categories: Subject[] | undefined;
}

const Tab = ({ categories }: Props) => {
  const { onOpen } = useModal();
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
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
            onClick={() => onOpen("createCategory")}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Category
            </span>
          </Button>
        </div>
      </div>
      {categories && categories.length > 0 ? (
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-1">
            <CardHeader>
              <CardTitle>Categores</CardTitle>
              <CardDescription>
                Manage your Categores and view their exams.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabContent categories={categories} />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      ) : (
        <div className="flex flex-col items-center gap-y-8 pb-16">
          <h2 className="text-heading-small">No content yet</h2>
          <p className="w-[300px] text-center text-body-medium text-gray-500">
            You haven&apos;t created any content yet. When you do, it&apos;ll
            show up here.
          </p>
          <div className="flex w-[240px] flex-col items-stretch">
            <Button onClick={() => onOpen("createCategory")}>
              Create a Category
            </Button>
          </div>
        </div>
      )}
    </Tabs>
  );
};

export default Tab;
