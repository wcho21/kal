import { execute } from "./";

it("execute -5", () => {
  expect(execute("-5")).toBe("-5");
});

it("execute --5", () => {
  expect(execute("--5")).toBe("5");
});

it("execute 4-(3-(2-1))", () => {
  expect(execute("4-(3-(2-1))")).toBe("2");
});

it("execute 2.5/0.5", () => {
  expect(execute("2.5/0.5")).toBe("5");
});

it("execute 참", () => {
  expect(execute("참")).toBe("true"); // TODO(?): display as "참"
});

it("execute 1 == 2", () => {
  expect(execute("1 == 2")).toBe("false");
});

it("execute 2 > 1 == 참", () => {
  expect(execute("2 > 1 == 참")).toBe("true");
});

it("execute 1 != 1 == 거짓", () => { // note that comparison is left associative
  expect(execute("1 != 1 == 거짓")).toBe("true");
});

it("execute 거짓 == (1 < 1+1)", () => {
  expect(execute("거짓 == (1 < 1+1)")).toBe("false");
});

it("execute 만약 1 == 1 { 2 } 아니면 { 3 }", () => {
  expect(execute("만약 1 == 1 { 2 } 아니면 { 3 }")).toBe("2");
});

it("execute 만약 1 != 1 { 2 } 아니면 { 3 }", () => {
  expect(execute("만약 1 != 1 { 2 } 아니면 { 3 }")).toBe("3");
});

it("execute single assignment", () => {
  expect(execute("변수1 = 4  변수1")).toBe("4");
});

it("execute assignment and calculation", () => {
  expect(execute("변수1 = 4  변수2 = 9  ((변수1 - 변수2) * 변수1)")).toBe("-20");
});
