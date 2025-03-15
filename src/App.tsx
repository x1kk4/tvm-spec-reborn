import { FC } from "react";
import { InstructionsPage } from "./views/instructions";
import { MainLayout } from "./layouts/MainLayout";

export const App: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <MainLayout>
        <InstructionsPage />
      </MainLayout>
    </div>
  );
};
