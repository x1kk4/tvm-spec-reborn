import { Input } from "@/shadcn/ui/input";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./Search.module.css";

type TSearchProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const Search: FC<TSearchProps> = ({ search, setSearch }) => {
  return (
    <Input
      className={styles.root}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export { Search };
