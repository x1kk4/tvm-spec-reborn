import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@/providers/ThemeProvider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { Providers };
