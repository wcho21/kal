[![English](https://img.shields.io/badge/Lang-en-green)][readme-en]
[![Korean](https://img.shields.io/badge/Lang-ko-blue)][readme-ko]

[readme-en]: ./
[readme-ko]: ./docs/README.ko.md



# 🗡️ KALANG

<img src="./docs/images/kal-logo.png" alt="KALANG logo" width="192px" height="192px" />

_KALANG: Korean Programming Language_.

- < 0.03 MB.
- Tested with >250 cases
- Written in JavaScript, natively runs on web browsers.
- Minimal syntax with Korean keywords.

Try _KALANG_ at [Playground][playground].

You can load a _KALANG_ interpreter in browsers, or build manually (see below).

[playground]: https://kal-playground.rooi.dev/



## 🗡️ Installation

Load the interpreter script in HTML as follows:

```HTML
<script src="https://cdn.jsdelivr.net/gh/wcho21/kal@latest/dist/index.min.js"></script>
```

After that, you can execute _KALANG_ code with `kal.execute(code-to-execute)` as follows:

```javascript
kal.execute("5+5"); // === 10
```

You can attach an event handler for standard output writing as follows:
```javascript
const stdouts = [];

kal.execute("쓰기('사과')", stdout => stdouts.push(stdout)); // stdout === ["사과"]
```



## 🗡️ Examples

### Statements and expressions

Variable assignment:
```
사과 = 42
```

Comparison:
```
사과 < 99
```

Conditional statement:
```
만약 사과 < 99 {
    사과 = 99
} 아니면 {
    사과 = 100
}
```

Defining and calling function:
```
더하기 = 함수(숫자1, 숫자2) {
    결과 숫자1 + 숫자2
}

더하기(42, 10)
```
which yields `52`.

Closure:
```
더하기 = 함수(숫자1) {
    결과 함수(숫자2) {
        결과 숫자1 + 숫자2
    }
}

하나더하기 = 더하기(1)

하나더하기(42)
```
which yields `43`.



### Builtin functions

`쓰기()`:
```
쓰기('사과')
쓰기('포도', '바나나')
```
which yields
```
사과
포도 바나나
```

`길이()`:
```
길이('사과')
```
which yields `2`.



### Types

_Number type_: any floating-point numbers
```
사과 = 42
포도 = -9.5
```

_String type_: characters surrounded with single quotes
```
사과 = '맛있음'
```

_Boolean type_: `참`, `거짓`
```
사과 = 참
포도 = 거짓
```



## 🗡️ Building

Note that building process is based on [Node.js][node].

With [`pnpm`][pnpm], you can build a _KALANG_ interpreter by running `pnpm install && pnpm build`.

The output will be in the directory `/dist/index.min.js`.

[node]: https://nodejs.org/
[pnpm]: https://pnpm.io/
