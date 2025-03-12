export type TInstructionDoc = {
  category: string;
  description: string;
  gas: string;
  fift: string;
  fift_examples: string[];
  opcode: string;
  stack: string;
};

export type TInstructionBytecodeOperandsRangeCheck = {
  length: number;
  from: number;
  to: number;
};

export type TInstructionBytecodeOperand = {
  name: string;
  type: string;
  size: number;
  min_value: number;
  max_value: number;
  display_hints?: { type: string; value?: number }[];
};

export type TInstructionBytecode = {
  tlb: string;
  prefix: string;
  operands_range_check?: TInstructionBytecodeOperandsRangeCheck;
  operands: TInstructionBytecodeOperand[];
};

export type TInstructionValueFlowItemStack = {
  type: string;
  name: string;
  value_types?: string[];
  value_type?: string;
  length_var?: string;
  array_entry?: {
    type: string;
    name: string;
  }[];
};

export type TInstructionValueFlowItemRegisters = {
  type: string;
  name?: string;
  var_name?: string;
  index?: number;
};

export type TInstructionValueFlowItem = {
  stack?: TInstructionValueFlowItemStack[];
  registers: TInstructionValueFlowItemRegisters[];
};

export type TInstructionValueFlow = {
  inputs: TInstructionValueFlowItem;
  outputs: TInstructionValueFlowItem;
};

export type TInstructionControlFlowBranch = {
  type: string;
  var_name?: string;
  index?: number;
};

export type TInstructionControlFlow = {
  branches: TInstructionControlFlowBranch[];
  nobranch?: boolean;
};

export type TInstruction = {
  mnemonic: string;
  since_version: number;
  doc: TInstructionDoc;
  bytecode: TInstructionBytecode;
  value_flow: TInstructionValueFlow;
  control_flow: TInstructionControlFlow;
};

export type TAlias = {
  mnemonic: string;
  alias_of: string;
  doc_fift: string;
  doc_stack: string;
  description: string;
  operands: Record<string, number>;
};

export type TInstructionsData = {
  $schema: string;
  instructions: TInstruction[];
  aliases: TAlias[];
};
