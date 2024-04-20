"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { labels } from "./data";

export type Payment = {
  type: string;
  id: string;
  question: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => {
      const label = labels.find((label) => label?.value === row.original.type);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("question")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
