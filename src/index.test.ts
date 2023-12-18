import { execute } from "./";

it("execute -5", () => {
  expect(execute("-5")).toBe("-5");
});

it("execute --5", () => {
  expect(execute("--5")).toBe("5");
});
