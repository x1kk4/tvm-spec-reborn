import React from "react";
import "./temp.css";

import {
  useReactTable,
  ColumnResizeMode,
  getCoreRowModel,
  ColumnDef,
  flexRender,
  ColumnResizeDirection,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

export function DataTable<TData>({ data, columns }: DataTableProps<TData>) {
  const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");
  const [columnResizeDirection] = React.useState<ColumnResizeDirection>("ltr");

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 20,
  });

  return (
    <div className='p-0'>
      <div
        style={{ direction: table.options.columnResizeDirection }}
        ref={parentRef}
        className='overflow-auto h-[800px]'
      >
        <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${table.options.columnResizeDirection} ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
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
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {virtualizer.getVirtualItems().map((virtualRow, index) => {
                const row = rows[virtualRow.index];

                return (
                  <tr
                    key={row.id}
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        {...{
                          key: cell.id,
                          style: {
                            width: cell.column.getSize(),
                          },
                        }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
