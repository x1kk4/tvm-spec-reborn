import { TColumns } from "@/views/instructions/types";
import { Row } from "@tanstack/react-table";
import Fuse from "fuse.js";

//eslint-disable-next-line
export const globalFilterFn = (row: Row<any>, columnId: string, value: string) => {
  if (!value) return true;

  const column: TColumns = columnId as TColumns;

  // is column not visible - pass here and not trying to search..
  // const isColumnVisible = Boolean(
  //   row
  //     .getAllCells()
  //     .find((item) => item.column.id === column)
  //     ?.column.getIsVisible()
  // );

  // if (!isColumnVisible) {
  //   return false;
  // }

  let fuse;

  if (column === "mnemonic") {
    fuse = new Fuse([row.original], {
      keys: Object.keys(row.original),
      threshold: 0.2,
      includeScore: true,
    });
  }

  if (["category", "description", "gas", "opcode", "stack", "fift"].includes(column)) {
    fuse = new Fuse([row.original.doc], {
      keys: Object.keys(row.original.doc),
      threshold: 0.2,
      includeScore: true,
    });
  } else {
    fuse = new Fuse([row.original.bytecode], {
      keys: Object.keys(row.original.bytecode),
      threshold: 0.2,
      includeScore: true,
    });
  }

  const result = fuse.search(value);

  return result.length > 0;
};
