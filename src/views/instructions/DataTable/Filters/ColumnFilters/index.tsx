import { Button } from "@/shadcn/ui/button";

import styles from "./ColumnFilters.module.css";
import { Table } from "@tanstack/react-table";

type TColumnFiltersProps<T> = {
  table: Table<T>;
};

const ColumnFilters = <TData,>({ table }: TColumnFiltersProps<TData>) => {
  return (
    <div className={styles.root}>
      {table.getAllColumns().map((column) => (
        <Button
          className={styles.button}
          key={column.id}
          disabled={!column.getCanHide()}
          onClick={() => column.toggleVisibility()}
          variant={column.getIsVisible() ? "default" : "secondary"}
        >
          {column.columnDef.header as string}
        </Button>
      ))}
    </div>
  );
};

export { ColumnFilters };
