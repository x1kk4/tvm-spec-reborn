import { SortDirection } from "@tanstack/react-table";

import styles from "./SortIndicator.module.css";

export function SortingIndicator({ isSorted }: { isSorted: SortDirection | false }) {
  if (!isSorted) return null;
  return (
    <div className={styles.root}>
      {
        {
          asc: "↑",
          desc: "↓",
        }[isSorted]
      }
    </div>
  );
}
