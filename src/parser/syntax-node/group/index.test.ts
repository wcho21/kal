import { expect, it } from "bun:test";
import { fakePos } from "../testing/fixtures";
import { createBlockNode, createProgramNode } from "./";
import type { BlockNode, ProgramNode } from "./";

type Node = BlockNode | ProgramNode;
type Case = { name: string; node: Node; expected: Node };

const cases: Case[] = [
  {
    name: "program",
    node: createProgramNode({ statements: [] }, fakePos, fakePos),
    expected: {
      type: "program",
      statements: [],
      range: { begin: fakePos, end: fakePos },
    },
  },
  {
    name: "block",
    node: createBlockNode({ statements: [] }, fakePos, fakePos),
    expected: {
      type: "block",
      statements: [],
      range: { begin: fakePos, end: fakePos },
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
