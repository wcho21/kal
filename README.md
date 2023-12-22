[![English](https://img.shields.io/badge/Lang-en-green)][readme-en]
[![Korean](https://img.shields.io/badge/Lang-ko-blue)][readme-ko]

[readme-en]: ./
[readme-ko]: ./docs/README_KR.md



# 🗡️ KAL

<img src="./docs/images/kal-logo.png" alt="KAL logo" width="128px" height="128px" />

_KAL: Korean Algorithmic Language_.

A simple interpreted language which supports Korean.

You can load a _KAL_ interpreter in browsers, or build manually (see below).

Try _KAL_ at [KAL Playground][playground].

[playground]: https://kal-playground.rooi.dev/



## 🗡️ Installation

Load the interpreter script in HTML as follows:

```HTML
<script src="https://cdn.jsdelivr.net/gh/wcho21/kal@latest/dist/index.min.js"></script>
```

After that, you can execute _KAL_ code with `kal.execute(code-to-execute)` as follows:

```HTML
<script>
  kal.execute("5+5"); // === 10
</script>
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

With [`pnpm`][pnpm], you can build a _KAL_ interpreter by running `pnpm install && pnpm build && pnpm bundle`.

The output will be in the directory `/bundle/index.js`.

[pnpm]: https://pnpm.io/
[node]: https://nodejs.org/
