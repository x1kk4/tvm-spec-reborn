import { FC } from "react";
import json from "@/cp0.json";
import { TInstruction } from "./types";
import { columns } from "./DataTable/columns";
import { DataTable } from "./DataTable";
// import { shortInstructions } from "./DataTable/temp";

const instructions = json.instructions as TInstruction[];

const InstructionsPage: FC = () => {
  return (
    <DataTable
      columns={columns}
      data={instructions}
      // height='calc(100vh - 15px)'
    />
  );
};

export { InstructionsPage };
