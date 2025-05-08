import { describe, expect, it } from "bun:test";
import { fakePos } from "../testing/fixtures";
import { createEndToken, createIllegalStringLiteralToken, createIllegalToken } from "./";
import type { EndToken, IllegalStringLiteralToken, IllegalToken } from "./";

type Token = EndToken | IllegalStringLiteralToken | IllegalToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "illegal",
      token: createIllegalToken("$", fakePos, fakePos),
      expected: {
        type: "illegal",
        value: "$",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "illegal string",
      token: createIllegalStringLiteralToken("foo", fakePos, fakePos),
      expected: {
        type: "illegal string",
        value: "foo",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "end",
      token: createEndToken("$end", fakePos, fakePos),
      expected: {
        type: "end",
        value: "$end",
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
      name: "illegal",
      token: createIllegalToken("$end", { begin: fakePos, end: fakePos }),
      expected: {
        type: "illegal",
        value: "$end",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "illegal string",
      token: createIllegalStringLiteralToken("foo", { begin: fakePos, end: fakePos }),
      expected: {
        type: "illegal string",
        value: "foo",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "end",
      token: createEndToken("$end", { begin: fakePos, end: fakePos }),
      expected: {
        type: "end",
        value: "$end",
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
