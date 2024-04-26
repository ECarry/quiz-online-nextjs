"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { labels, types } from "./data";

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
      return (
        <div className="flex space-x-2">
          <span className="max-w-[200px]  sm:max-w-[300px] md:max-w-[400px] lg:max-w-[700px] truncate font-medium">
            {row.getValue("question")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = types.find((type) => type.value === row.getValue("type"));

      if (!type) {
        return null;
      }

      return <>{type && <Badge variant="outline">{type.label}</Badge>}</>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
