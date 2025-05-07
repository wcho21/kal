import { fakePos } from "../testing/fixtures";
import { createOperatorToken } from "./";

describe("create token with begin and end position", () => {
  const cases = [
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
  const cases = [
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
