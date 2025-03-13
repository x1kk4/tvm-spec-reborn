import { Moon, Sun } from "lucide-react";

import { Button } from "@/shadcn/ui/button";

import { FC } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import styles from "./ThemeSelect.module.css";

const ThemeSelect: FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <Button
      variant='outline'
      size='icon'
      className={styles.root}
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
          return;
        }

        if (theme === "light") {
          setTheme("dark");
          return;
        }

        if (theme === "system") {
          if (systemTheme === "dark") {
            setTheme("light");
            return;
          }

          if (systemTheme === "light") {
            setTheme("dark");
            return;
          }
        }
      }}
    >
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    </Button>
  );
};

export { ThemeSelect };
