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

it("execute assignment", () => {
  expect(execute("변수1 = 4  변수2 = 9  (변수2 - 변수1) * 변수1")).toBe("20");
});
