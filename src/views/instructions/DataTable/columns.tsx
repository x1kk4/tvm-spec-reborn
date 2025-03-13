"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TInstruction } from "../types";
import { categoryMapping } from "./mapping";

export const columns: ColumnDef<TInstruction>[] = [
  {
    accessorFn: (row) => row.mnemonic,
    id: "mnemonic",
    header: "Mnemonic",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.doc.category,
    id: "category",
    header: "Category",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => categoryMapping[info.getValue() as string],
  },
  {
    accessorFn: (row) => row.doc.description,
    id: "description",
    header: "Description",
    size: 300,
    minSize: 100,
    maxSize: 500,
    enableResizing: true,
    cell: (info) => info.getValue() || "N/A",
  },
  {
    accessorFn: (row) => row.doc.gas,
    id: "gas",
    header: "Gas",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => info.getValue() || "N/A",
  },
  {
    accessorFn: (row) => row.doc.opcode,
    id: "opcode",
    header: "Opcode",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => info.getValue() || "N/A",
  },
  {
    accessorFn: (row) => row.doc.stack,
    id: "stack",
    header: "Stack",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => info.getValue() || "N/A",
  },
  {
    accessorFn: (row) => row.doc.fift,
    id: "fift",
    header: "Fift",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => info.getValue() || "N/A",
  },
  {
    accessorFn: (row) => row.bytecode.tlb,
    id: "tlb",
    header: "TLB",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => info.getValue() || "N/A",
  },
  {
    accessorFn: (row) => row.bytecode.prefix,
    id: "prefix",
    header: "Prefix",
    size: 150,
    minSize: 100,
    maxSize: 250,
    enableResizing: true,
    cell: (info) => info.getValue() || "N/A",
  },
];
