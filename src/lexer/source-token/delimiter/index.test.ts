import { describe, expect, it } from "bun:test";
import { fakePos } from "../testing/fixtures";
import type { BlockDelimiterToken, GroupDelimiterToken, ListDelimiterToken, SeparatorToken } from "./";
import {
  createBlockDelimiterToken,
  createGroupDelimiterToken,
  createListDelimiterToken,
  createSeparatorToken,
} from "./";

type Token = BlockDelimiterToken | GroupDelimiterToken | ListDelimiterToken | SeparatorToken;
type Case = { name: string; token: Token; expected: Token };

describe("create token with begin and end position", () => {
  const cases: Case[] = [
    {
      name: "group delimiter",
      token: createGroupDelimiterToken("(", fakePos, fakePos),
      expected: {
        type: "group delimiter",
        value: "(",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "block delimiter",
      token: createBlockDelimiterToken("{", fakePos, fakePos),
      expected: {
        type: "block delimiter",
        value: "{",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "list delimiter",
      token: createListDelimiterToken("[", fakePos, fakePos),
      expected: {
        type: "list delimiter",
        value: "[",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "separator",
      token: createSeparatorToken(",", fakePos, fakePos),
      expected: {
        type: "separator",
        value: ",",
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
      name: "group delimiter",
      token: createGroupDelimiterToken("(", { begin: fakePos, end: fakePos }),
      expected: {
        type: "group delimiter",
        value: "(",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "block delimiter",
      token: createBlockDelimiterToken("{", { begin: fakePos, end: fakePos }),
      expected: {
        type: "block delimiter",
        value: "{",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "list delimiter",
      token: createListDelimiterToken("[", { begin: fakePos, end: fakePos }),
      expected: {
        type: "list delimiter",
        value: "[",
        range: {
          begin: fakePos,
          end: fakePos,
        },
      },
    },
    {
      name: "separator",
      token: createSeparatorToken(",", { begin: fakePos, end: fakePos }),
      expected: {
        type: "separator",
        value: ",",
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
