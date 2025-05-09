import { expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../../../util/position/index.test.fixture";
import { createBlockNode, createProgramNode } from "./";
import type { BlockNode, ProgramNode } from "./";

type Node = BlockNode | ProgramNode;
type Case = { name: string; node: Node; expected: Node };

const cases: Case[] = [
  {
    name: "program",
    node: createProgramNode({ statements: [] }, fakePos1, fakePos2),
    expected: {
      type: "program",
      statements: [],
      range: fakeRange,
    },
  },
  {
    name: "block",
    node: createBlockNode({ statements: [] }, fakePos1, fakePos2),
    expected: {
      type: "block",
      statements: [],
      range: fakeRange,
    },
  },
];

it.each(cases)("create $name node", ({ node, expected }) => {
  expect(node).toEqual(expected);
});
