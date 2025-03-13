import { FC, PropsWithChildren } from "react";
import { ThemeSelect } from "../ThemeSelect";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <ThemeSelect />
    </>
  );
};

export { MainLayout };
