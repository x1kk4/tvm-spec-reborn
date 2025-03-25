import { Button } from "@/shadcn/ui/button";

import styles from "./Filters.module.css";
import { Table } from "@tanstack/react-table";

type TFiltersProps<T> = {
  table: Table<T>;
};

const Filters = <TData,>({ table }: TFiltersProps<TData>) => {
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

export { Filters };
