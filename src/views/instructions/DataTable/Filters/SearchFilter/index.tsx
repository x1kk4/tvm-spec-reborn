import { Input } from "@/shadcn/ui/input";
import { Dispatch, FC, SetStateAction } from "react";
import styles from "./SearchFilter.module.css";

type TSearchFilterProps = {
  searchFilter: string;
  setSearchFilter: Dispatch<SetStateAction<string>>;
};

const SearchFilter: FC<TSearchFilterProps> = ({ searchFilter, setSearchFilter }) => {
  return (
    <Input
      className={styles.root}
      value={searchFilter}
      onChange={(e) => setSearchFilter(e.target.value)}
      placeholder='Try to search something...'
    />
  );
};

export { SearchFilter };
