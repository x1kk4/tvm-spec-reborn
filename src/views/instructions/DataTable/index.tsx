"use client";

import {
  ColumnDef,
  Row,
  SortDirection,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TableCell, TableHead, TableRow } from "@/shadcn/ui/table";
import { HTMLAttributes, forwardRef, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { cn } from "@/shadcn/utils";

// Do not use the Table from shadcn, it does not work with react-virtuoso out of the box
const TableComponent = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      // style={{ tableLayout: "fixed" }}
      {...props}
    />
  )
);

const TableRowComponent =
  <TData,>(rows: Row<TData>[]) =>
  (props: HTMLAttributes<HTMLTableRowElement>) => {
    // @ts-expect-error data-index is a valid attribute
    const index = props["data-index"];
    const row = rows[index];

    if (!row) return null;

    return (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        {...props}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            style={{
              //temp
              maxWidth: cell.column.getSize(),
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    );
  };

function SortingIndicator({ isSorted }: { isSorted: SortDirection | false }) {
  if (!isSorted) return null;
  return (
    <div>
      {
        {
          asc: "↑",
          desc: "↓",
        }[isSorted]
      }
    </div>
  );
}

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  height: string;
};

export function DataTable<TData, TValue>({ columns, data, height }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    enableColumnResizing: true,
  });

  const { rows } = table.getRowModel();

  return (
    <div className='rounded-md border'>
      <TableVirtuoso
        style={{ height }}
        totalCount={rows.length}
        components={{
          Table: TableComponent,
          TableRow: TableRowComponent(rows),
        }}
        fixedHeaderContent={() =>
          table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className='bg-card hover:bg-muted'
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{
                      maxWidth: header.getSize(),
                      minWidth: header.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className='flex items-center'
                        {...{
                          style: header.column.getCanSort()
                            ? {
                                cursor: "pointer",
                                userSelect: "none",
                              }
                            : {},
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <SortingIndicator isSorted={header.column.getIsSorted()} />
                      </div>
                    )}

                    {/* {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`absolute right-0 top-0 h-full w-2 cursor-col-resize ${
                          header.column.getIsResizing() ? "bg-blue-500" : "hover:bg-gray-300"
                        }`}
                      />
                    )} */}
                  </TableHead>
                );
              })}
            </TableRow>
          ))
        }
      />
    </div>
  );
}
