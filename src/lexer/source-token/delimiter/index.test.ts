import { describe, expect, it } from "bun:test";
import { fakePos1, fakePos2, fakeRange } from "../../../util/position/index.test.fixture";
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
      name: "group delimiter '('",
      token: createGroupDelimiterToken("(", fakePos1, fakePos2),
      expected: {
        type: "group delimiter",
        value: "(",
        range: fakeRange,
      },
    },
    {
      name: "group delimiter ')'",
      token: createGroupDelimiterToken(")", fakePos1, fakePos2),
      expected: {
        type: "group delimiter",
        value: ")",
        range: fakeRange,
      },
    },
    {
      name: "block delimiter '{'",
      token: createBlockDelimiterToken("{", fakePos1, fakePos2),
      expected: {
        type: "block delimiter",
        value: "{",
        range: fakeRange,
      },
    },
    {
      name: "block delimiter '}'",
      token: createBlockDelimiterToken("}", fakePos1, fakePos2),
      expected: {
        type: "block delimiter",
        value: "}",
        range: fakeRange,
      },
    },
    {
      name: "list delimiter '['",
      token: createListDelimiterToken("[", fakePos1, fakePos2),
      expected: {
        type: "list delimiter",
        value: "[",
        range: fakeRange,
      },
    },
    {
      name: "list delimiter ']'",
      token: createListDelimiterToken("]", fakePos1, fakePos2),
      expected: {
        type: "list delimiter",
        value: "]",
        range: fakeRange,
      },
    },
    {
      name: "separator ','",
      token: createSeparatorToken(",", fakePos1, fakePos2),
      expected: {
        type: "separator",
        value: ",",
        range: fakeRange,
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
      name: "group delimiter '('",
      token: createGroupDelimiterToken("(", fakeRange),
      expected: {
        type: "group delimiter",
        value: "(",
        range: fakeRange,
      },
    },
    {
      name: "group delimiter ')'",
      token: createGroupDelimiterToken(")", fakeRange),
      expected: {
        type: "group delimiter",
        value: ")",
        range: fakeRange,
      },
    },
    {
      name: "block delimiter '{'",
      token: createBlockDelimiterToken("{", fakeRange),
      expected: {
        type: "block delimiter",
        value: "{",
        range: fakeRange,
      },
    },
    {
      name: "block delimiter '}'",
      token: createBlockDelimiterToken("}", fakeRange),
      expected: {
        type: "block delimiter",
        value: "}",
        range: fakeRange,
      },
    },
    {
      name: "list delimiter '['",
      token: createListDelimiterToken("[", fakeRange),
      expected: {
        type: "list delimiter",
        value: "[",
        range: fakeRange,
      },
    },
    {
      name: "list delimiter ']'",
      token: createListDelimiterToken("]", fakeRange),
      expected: {
        type: "list delimiter",
        value: "]",
        range: fakeRange,
      },
    },
    {
      name: "separator",
      token: createSeparatorToken(",", fakeRange),
      expected: {
        type: "separator",
        value: ",",
        range: fakeRange,
      },
    },
  ];

  it.each(cases)("create $name token", ({ token, expected }) => {
    expect(token).toEqual(expected);
  });
});
