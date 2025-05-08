import { describe, expect, it } from "bun:test";
import { fakePos } from "../testing/fixtures";
import { createBooleanLiteralToken, createNumberLiteralToken, createStringLiteralToken } from "./";
import type { BooleanLiteralToken, NumberLiteralToken, StringLiteralToken } from "./";

type Token = BooleanLiteralToken | NumberLiteralToken | StringLiteralToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "number literal",
      token: createNumberLiteralToken("0", fakePos, fakePos),
      expected: {
        type: "number literal",
        value: "0",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "boolean literal",
      token: createBooleanLiteralToken("참", fakePos, fakePos),
      expected: {
        type: "boolean literal",
        value: "참",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "string literal",
      token: createStringLiteralToken("foo", fakePos, fakePos),
      expected: {
        type: "string literal",
        value: "foo",
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
      name: "number literal",
      token: createNumberLiteralToken("0", { begin: fakePos, end: fakePos }),
      expected: {
        type: "number literal",
        value: "0",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "boolean literal",
      token: createBooleanLiteralToken("참", { begin: fakePos, end: fakePos }),
      expected: {
        type: "boolean literal",
        value: "참",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "string literal",
      token: createStringLiteralToken("foo", { begin: fakePos, end: fakePos }),
      expected: {
        type: "string literal",
        value: "foo",
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
