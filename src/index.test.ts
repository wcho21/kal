import { beforeEach, describe, expect, it } from "bun:test";
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
  expect(execute("참")).toBe("참");
});

it("execute 1 == 2", () => {
  expect(execute("1 == 2")).toBe("거짓");
});

it("execute 참 == 2 > 1", () => {
  expect(execute("참 == 2 > 1")).toBe("참");
});

it("execute []", () => {
  expect(execute("[]")).toBe("[]");
});

it("execute [1, 참, 'foo']", () => {
  expect(execute("[1, 참, 'foo']")).toBe("[1, 참, foo]");
});

it("execute [42+1, !참, 길이('foo')]", () => {
  expect(execute("[42+1, !참, 길이('foo')]")).toBe("[43, 거짓, 3]");
});

it("execute 거짓 == 1 != 1", () => {
  // note that comparison is left associative
  expect(execute("거짓 == 1 != 1")).toBe("참");
});

it("execute 거짓 == (1 < 1+1)", () => {
  expect(execute("거짓 == (1 < 1+1)")).toBe("거짓");
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

describe("execute builtin function 길이()", () => {
  it("string", () => {
    expect(execute("길이('사과')")).toBe("2");
  });
  it("list", () => {
    expect(execute("길이([1, 2, 3])")).toBe("3");
  });
});

describe("execute builtin function 넣기()", () => {
  it("list", () => {
    expect(execute("넣기([1], 2, 3)")).toBe("[1, 2, 3]");
  });
  it("original list not changing on insert", () => {
    expect(execute("원본 = [1] 넣기(원본, 2, 3) 원본")).toBe("[1]");
  });
});

describe("execute builtin function 찾기()", () => {
  it("list", () => {
    expect(execute("찾기([4, 42], 1)")).toBe("42");
  });
  it("list, with negative index", () => {
    expect(execute("찾기([4, 42], -1)")).toBe("42");
  });
});

describe("execute builtin function 빼기()", () => {
  it("list", () => {
    expect(execute("빼기([4, 42])")).toBe("[4]");
  });
  it("original list not changing on insert", () => {
    expect(execute("원본 = [1, 2] 빼기(원본) 원본")).toBe("[1, 2]");
  });
});

describe("execute builtin function 쓰기()", () => {
  let stdouts: string[] = [];
  const onStdout = (toWrite: string) => stdouts.push(toWrite);

  beforeEach(() => {
    stdouts = [];
  });

  it("string", () => {
    execute("쓰기('사과') 쓰기('포도', '바나나')", onStdout);

    expect(stdouts).toEqual(["사과", "포도 바나나"]);
  });

  it("list", () => {
    execute("쓰기([42, 참, 'foo'])", onStdout);

    expect(stdouts).toEqual(["[42, 참, foo]"]);
  });

  it("nested list", () => {
    execute("쓰기([ [[]], [1, [2]] ])", onStdout);

    expect(stdouts).toEqual(["[[[]], [1, [2]]]"]);
  });
});

it("execute function", () => {
  expect(execute("사과 = 함수(포도) { 결과 포도+1 } 사과(42)")).toBe("43");
});

it("execute closure", () => {
  expect(execute("사과 = 함수(포도) { 결과 함수(바나나) { 결과 포도 + 바나나 } } 수박 = 사과(42) 수박(99)")).toBe(
    "141",
  );
});

it("execute curried function", () => {
  expect(execute("사과 = 함수(포도) { 결과 함수(바나나) { 결과 포도 + 바나나 } } 사과(42)(99)")).toBe("141");
});

describe("sample program", () => {
  it("empty", () => {
    expect(execute("")).toBe("(없음)");
  });

  it("whitespaces only", () => {
    expect(execute(" \t \r\r\r \n\n\n \r\n\r\n")).toBe("(없음)");
  });

  it("factorial calculation", () => {
    const source = `
      팩토리얼 = 함수(숫자) {
        만약 (숫자 <= 1) {
          결과 1
        }

        결과 숫자 * 팩토리얼(숫자 - 1)
      }

      팩토리얼(3)
    `;

    expect(execute(source)).toBe("6");
  });
});
