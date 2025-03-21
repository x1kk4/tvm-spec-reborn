import { TInstruction } from "../types";

export const shortInstructions: TInstruction[] = [
  {
    mnemonic: "NOP",
    since_version: 0,
    doc: {
      category: "stack_basic",
      description: "Does nothing.",
      gas: "18",
      fift: "NOP",
      fift_examples: [],
      opcode: "00",
      stack: "-",
    },
    bytecode: { tlb: "#00", prefix: "00", operands: [] },
    value_flow: {
      inputs: { stack: [], registers: [] },
      outputs: { stack: [], registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCHG_0I",
    since_version: 0,
    doc: {
      category: "stack_basic",
      description: "Interchanges `s0` with `s[i]`, `1 <= i <= 15`.",
      gas: "18",
      fift: "s[i] XCHG0",
      fift_examples: [],
      opcode: "0i",
      stack: "",
    },
    bytecode: {
      tlb: "#0 i:(## 4) {1 <= i}",
      prefix: "0",
      operands_range_check: { length: 4, from: 1, to: 15 },
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 1,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCHG_IJ",
    since_version: 0,
    doc: {
      category: "stack_basic",
      description: "Interchanges `s[i]` with `s[j]`, `1 <= i < j <= 15`.",
      gas: "26",
      fift: "s[i] s[j] XCHG",
      fift_examples: [],
      opcode: "10ij",
      stack: "",
    },
    bytecode: {
      tlb: "#10 i:(## 4) j:(## 4) {1 <= i} {i + 1 <= j}",
      prefix: "10",
      operands_range_check: { length: 4, from: 1, to: 15 },
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 1,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCHG_0I_LONG",
    since_version: 0,
    doc: {
      category: "stack_basic",
      description: "Interchanges `s0` with `s[ii]`, `0 <= ii <= 255`.",
      gas: "26",
      fift: "s0 [ii] s() XCHG",
      fift_examples: [],
      opcode: "11ii",
      stack: "",
    },
    bytecode: {
      tlb: "#11 ii:uint8",
      prefix: "11",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 8,
          min_value: 0,
          max_value: 255,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCHG_1I",
    since_version: 0,
    doc: {
      category: "stack_basic",
      description: "Interchanges `s1` with `s[i]`, `2 <= i <= 15`.",
      gas: "18",
      fift: "s1 s[i] XCHG",
      fift_examples: [],
      opcode: "1i",
      stack: "",
    },
    bytecode: {
      tlb: "#1 i:(## 4) {2 <= i}",
      prefix: "1",
      operands_range_check: { length: 4, from: 2, to: 15 },
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 2,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PUSH",
    since_version: 0,
    doc: {
      category: "stack_basic",
      description: "Pushes a copy of the old `s[i]` into the stack.",
      gas: "18",
      fift: "s[i] PUSH",
      fift_examples: [],
      opcode: "2i",
      stack: "",
    },
    bytecode: {
      tlb: "#2 i:uint4",
      prefix: "2",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "POP",
    since_version: 0,
    doc: {
      category: "stack_basic",
      description: "Pops the old `s0` value into the old `s[i]`.",
      gas: "18",
      fift: "s[i] POP",
      fift_examples: [],
      opcode: "3i",
      stack: "",
    },
    bytecode: {
      tlb: "#3 i:uint4",
      prefix: "3",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCHG3",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s2 s[i] XCHG` `s1 s[j] XCHG` `s[k] XCHG0`.",
      gas: "26",
      fift: "s[i] s[j] s[k] XCHG3",
      fift_examples: [],
      opcode: "4ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#4 i:uint4 j:uint4 k:uint4",
      prefix: "4",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCHG2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s1 s[i] XCHG` `s[j] XCHG0`.",
      gas: "26",
      fift: "s[i] s[j] XCHG2",
      fift_examples: [],
      opcode: "50ij",
      stack: "",
    },
    bytecode: {
      tlb: "#50 i:uint4 j:uint4",
      prefix: "50",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCPU",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] XCHG0` `s[j] PUSH`.",
      gas: "26",
      fift: "s[i] s[j] XCPU",
      fift_examples: [],
      opcode: "51ij",
      stack: "",
    },
    bytecode: {
      tlb: "#51 i:uint4 j:uint4",
      prefix: "51",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PUXC",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] PUSH` `SWAP` `s[j] XCHG0`.",
      gas: "26",
      fift: "s[i] s[j-1] PUXC",
      fift_examples: [],
      opcode: "52ij",
      stack: "",
    },
    bytecode: {
      tlb: "#52 i:uint4 j:uint4",
      prefix: "52",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PUSH2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] PUSH` `s[j+1] PUSH`.",
      gas: "26",
      fift: "s[i] s[j] PUSH2",
      fift_examples: [],
      opcode: "53ij",
      stack: "",
    },
    bytecode: {
      tlb: "#53 i:uint4 j:uint4",
      prefix: "53",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCHG3_ALT",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Long form of `XCHG3`.",
      gas: "34",
      fift: "s[i] s[j] s[k] XCHG3_l",
      fift_examples: [],
      opcode: "540ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#540 i:uint4 j:uint4 k:uint4",
      prefix: "540",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XC2PU",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] s[j] XCHG2` `s[k] PUSH`.",
      gas: "34",
      fift: "s[i] s[j] s[k] XC2PU",
      fift_examples: [],
      opcode: "541ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#541 i:uint4 j:uint4 k:uint4",
      prefix: "541",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCPUXC",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s1 s[i] XCHG` `s[j] s[k-1] PUXC`.",
      gas: "34",
      fift: "s[i] s[j] s[k-1] XCPUXC",
      fift_examples: [],
      opcode: "542ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#542 i:uint4 j:uint4 k:uint4",
      prefix: "542",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "XCPU2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] XCHG0` `s[j] s[k] PUSH2`.",
      gas: "34",
      fift: "s[i] s[j] s[k] XCPU2",
      fift_examples: [],
      opcode: "543ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#543 i:uint4 j:uint4 k:uint4",
      prefix: "543",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PUXC2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] PUSH` `s2 XCHG0` `s[j] s[k] XCHG2`.",
      gas: "34",
      fift: "s[i] s[j-1] s[k-1] PUXC2",
      fift_examples: [],
      opcode: "544ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#544 i:uint4 j:uint4 k:uint4",
      prefix: "544",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PUXCPU",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] s[j-1] PUXC` `s[k] PUSH`.",
      gas: "34",
      fift: "s[i] s[j-1] s[k-1] PUXCPU",
      fift_examples: [],
      opcode: "545ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#545 i:uint4 j:uint4 k:uint4",
      prefix: "545",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PU2XC",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] PUSH` `SWAP` `s[j] s[k-1] PUXC`.",
      gas: "34",
      fift: "s[i] s[j-1] s[k-2] PU2XC",
      fift_examples: [],
      opcode: "546ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#546 i:uint4 j:uint4 k:uint4",
      prefix: "546",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 2 }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PUSH3",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s[i] PUSH` `s[j+1] s[k+1] PUSH2`.",
      gas: "34",
      fift: "s[i] s[j] s[k] PUSH3",
      fift_examples: [],
      opcode: "547ijk",
      stack: "",
    },
    bytecode: {
      tlb: "#547 i:uint4 j:uint4 k:uint4",
      prefix: "547",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
        {
          name: "k",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "BLKSWAP",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description:
        "Permutes two blocks `s[j+i+1] ... s[j+1]` and `s[j] ... s0`.\n`0 <= i,j <= 15`\nEquivalent to `[i+1] [j+1] REVERSE` `[j+1] 0 REVERSE` `[i+j+2] 0 REVERSE`.",
      gas: "26",
      fift: "[i+1] [j+1] BLKSWAP",
      fift_examples: [],
      opcode: "55ij",
      stack: "",
    },
    bytecode: {
      tlb: "#55 i:uint4 j:uint4",
      prefix: "55",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [{ type: "stack" }, { type: "add", value: 1 }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "PUSH_LONG",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Pushes a copy of the old `s[ii]` into the stack.\n`0 <= ii <= 255`",
      gas: "26",
      fift: "[ii] s() PUSH",
      fift_examples: [],
      opcode: "56ii",
      stack: "",
    },
    bytecode: {
      tlb: "#56 ii:uint8",
      prefix: "56",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 8,
          min_value: 0,
          max_value: 255,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "POP_LONG",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Pops the old `s0` value into the old `s[ii]`.\n`0 <= ii <= 255`",
      gas: "26",
      fift: "[ii] s() POP",
      fift_examples: [],
      opcode: "57ii",
      stack: "",
    },
    bytecode: {
      tlb: "#57 ii:uint8",
      prefix: "57",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 8,
          min_value: 0,
          max_value: 255,
          display_hints: [{ type: "stack" }],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "ROT",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `1 2 BLKSWAP` or to `s2 s1 XCHG2`.",
      gas: "18",
      fift: "ROT",
      fift_examples: [],
      opcode: "58",
      stack: "a b c - b c a",
    },
    bytecode: { tlb: "#58", prefix: "58", operands: [] },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "ROTREV",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `2 1 BLKSWAP` or to `s2 s2 XCHG2`.",
      gas: "18",
      fift: "ROTREV\n-ROT",
      fift_examples: [],
      opcode: "59",
      stack: "a b c - c a b",
    },
    bytecode: { tlb: "#59", prefix: "59", operands: [] },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "SWAP2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `2 2 BLKSWAP` or to `s3 s2 XCHG2`.",
      gas: "18",
      fift: "SWAP2\n2SWAP",
      fift_examples: [],
      opcode: "5A",
      stack: "a b c d - c d a b",
    },
    bytecode: { tlb: "#5A", prefix: "5A", operands: [] },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "DROP2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `DROP` `DROP`.",
      gas: "18",
      fift: "DROP2\n2DROP",
      fift_examples: [],
      opcode: "5B",
      stack: "a b - ",
    },
    bytecode: { tlb: "#5B", prefix: "5B", operands: [] },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "DUP2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s1 s0 PUSH2`.",
      gas: "18",
      fift: "DUP2\n2DUP",
      fift_examples: [],
      opcode: "5C",
      stack: "a b - a b a b",
    },
    bytecode: { tlb: "#5C", prefix: "5C", operands: [] },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "OVER2",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `s3 s2 PUSH2`.",
      gas: "18",
      fift: "OVER2\n2OVER",
      fift_examples: [],
      opcode: "5D",
      stack: "a b c d - a b c d a b",
    },
    bytecode: { tlb: "#5D", prefix: "5D", operands: [] },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "REVERSE",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Reverses the order of `s[j+i+1] ... s[j]`.",
      gas: "26",
      fift: "[i+2] [j] REVERSE",
      fift_examples: [],
      opcode: "5Eij",
      stack: "",
    },
    bytecode: {
      tlb: "#5E i:uint4 j:uint4",
      prefix: "5E",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "BLKDROP",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `DROP` performed `i` times.",
      gas: "26",
      fift: "[i] BLKDROP",
      fift_examples: [],
      opcode: "5F0i",
      stack: "",
    },
    bytecode: {
      tlb: "#5F0 i:uint4",
      prefix: "5F0",
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
  {
    mnemonic: "BLKPUSH",
    since_version: 0,
    doc: {
      category: "stack_complex",
      description: "Equivalent to `PUSH s(j)` performed `i` times.\n`1 <= i <= 15`, `0 <= j <= 15`.",
      gas: "26",
      fift: "[i] [j] BLKPUSH",
      fift_examples: [],
      opcode: "5Fij",
      stack: "",
    },
    bytecode: {
      tlb: "#5F i:(## 4) j:uint4 {1 <= i}",
      prefix: "5F",
      operands_range_check: { length: 4, from: 1, to: 15 },
      operands: [
        {
          name: "i",
          type: "uint",
          size: 4,
          min_value: 1,
          max_value: 15,
          display_hints: [],
        },
        {
          name: "j",
          type: "uint",
          size: 4,
          min_value: 0,
          max_value: 15,
          display_hints: [],
        },
      ],
    },
    value_flow: {
      inputs: { registers: [] },
      outputs: { registers: [] },
    },
    control_flow: { branches: [], nobranch: true },
  },
];
