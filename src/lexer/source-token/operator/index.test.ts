import { describe, expect, it } from "bun:test";
import { fakePos } from "../testing/fixtures";
import { createOperatorToken } from "./";
import type { OperatorToken } from "./";

type Token = OperatorToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "operator",
      token: createOperatorToken("+", fakePos, fakePos),
      expected: {
        type: "operator",
        value: "+",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});

describe("create token with range", () => {
  const cases: Case[] = [
    {
      name: "operator",
      token: createOperatorToken("+", { begin: fakePos, end: fakePos }),
      expected: {
        type: "operator",
        value: "+",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});
