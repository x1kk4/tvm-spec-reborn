import { useState, useRef, ReactNode } from "react";

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
import styles from "./DataTable.module.css";
import { Tooltip, TooltipContent, TooltipProvider } from "@/shadcn/ui/tooltip";

type TDataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
};

function SortingIndicator({ isSorted }: { isSorted: SortDirection | false }) {
  if (!isSorted) return null;
  return (
    <div className={styles.sorting}>
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

  const [hoveredCell, setHoveredCell] = useState<{
    id: string;
    rect: DOMRect;
    node: ReactNode;
    height: number;
    width: number;
  } | null>(null);

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
      className={styles.root}
    >
      <Table
        containerStyle={{ height: `${virtualizer.getTotalSize()}px` }}
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <TableHeader className={styles.header}>
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
                  {header.column.getCanResize() && (
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
                  )}
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
                    key={cell.id}
                    className={styles.cell}
                    style={{
                      width: cell.column.getSize(),
                      maxWidth: cell.column.getSize(),
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredCell({
                        id: cell.id,
                        rect,
                        node: flexRender(cell.column.columnDef.cell, cell.getContext()),
                        height: rect.height,
                        width: rect.width,
                      });
                    }}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        {hoveredCell && (
          <TooltipProvider>
            <Tooltip open={!!hoveredCell}>
              <TooltipContent
                align='start'
                className={styles.tooltip}
                style={{
                  position: "fixed",
                  top: hoveredCell.rect.bottom + window.scrollY - hoveredCell.height,
                  left: hoveredCell.rect.left + window.scrollX,
                  pointerEvents: "none",
                  height: hoveredCell.height,
                  minWidth: hoveredCell.width,
                }}
              >
                {hoveredCell.node}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </Table>
    </div>
  );
}
