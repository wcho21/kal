import {
  createGroupDelimiterToken,
  createBlockDelimiterToken,
  createSeparatorToken,
} from "./";
import { fakePos } from "../testing/fixtures";

describe("create token with begin and end position", () => {
  const cases = [
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
  const cases = [
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
