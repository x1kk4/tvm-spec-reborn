import { useState, useRef } from "react";

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  ColumnResizeDirection,
  SortDirection,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/ui/table";
import { cn } from "@/shadcn/utils";

type TDataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
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

export function DataTable<TData, TValue>({ data, columns }: TDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange");
  const [columnResizeDirection] = useState<ColumnResizeDirection>("ltr");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    columnResizeMode,
    columnResizeDirection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 20,
  });

  return (
    <div
      style={{ direction: table.options.columnResizeDirection }}
      ref={parentRef}
      className='overflow-auto h-[800px]'
    >
      <Table
        containerStyle={{ height: `${virtualizer.getTotalSize()}px` }}
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  {...{
                    key: header.id,
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
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
                  <div
                    {...{
                      onDoubleClick: () => header.column.resetSize(),
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: cn(
                        "absolute top-0 h-full w-[5px] bg-black/50 cursor-col-resize select-none touch-none",
                        table.options.columnResizeDirection === "rtl" ? "left-0" : "right-0",
                        header.column.getIsResizing() && "bg-blue-500 opacity-100",
                        "opacity-0 hover:opacity-100"
                      ),
                      style: {
                        transform:
                          columnResizeMode === "onEnd" && header.column.getIsResizing()
                            ? `translateX(${
                                (table.options.columnResizeDirection === "rtl" ? -1 : 1) *
                                (table.getState().columnSizingInfo.deltaOffset ?? 0)
                              }px)`
                            : "",
                      },
                    }}
                  />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {virtualizer.getVirtualItems().map((virtualRow, index) => {
            const row = rows[virtualRow.index];

            return (
              <TableRow
                key={row.id}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    {...{
                      key: cell.id,
                      style: {
                        width: cell.column.getSize(),
                      },
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
