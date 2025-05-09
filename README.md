# 🗡️ Kal

<img src="./docs/images/kal-logo.png" alt="Kal logo" width="192px" height="192px" />

***Kal***: _Korean Algorithmic Language_.

- < 0.03 MB.
- Tested with > 300 cases.
- JavaScript-bundled, which runs natively on web browsers.
- Minimal syntax with Korean keywords.
- No dependencies (made from scratch).

Try ***Kal*** at [Playground][playground].

[playground]: https://kal-playground.rooi.dev/

You can load a ***Kal*** interpreter in browsers, and build manually (see below).



## 🗡️ Installation

Load and use the interpreter in HTML as follows:

```HTML
<script type="module">
  import { execute } from "https://cdn.jsdelivr.net/gh/wcho21/kal@0.3.1/dist/index.min.js";
  execute("5+5") === "10"; // true
</script>
```

You can attach an handler on standard output event as follows:

```javascript
const outputs = [];

execute("쓰기('사과')", stdout => outputs.push(stdout)); // outouts === ["사과"]
```

## 🗡️ Examples

### Statements and Expressions

**Variable assignment**:

```
사과 = 42
```

**Conditional statement**:

```
만약 사과 < 99 {
    사과 = 99
} 아니면 {
    사과 = 100
}
```

**Defining and calling a function**:

```
더하기 = 함수(숫자1, 숫자2) {
    결과 숫자1 + 숫자2
}

더하기(42, 10)
```

which yields `52`.

**Closure and currying**:

```
더하기 = 함수(숫자1) {
    결과 함수(숫자2) {
        결과 숫자1 + 숫자2
    }
}

하나더하기 = 더하기(1)

하나더하기(42)

더하기(1)(42)
```

which yields `43` twice.

### Builtin functions

**`쓰기()`**:

```
쓰기('안녕')
```

which yields `안녕`.

**`넣기()`**:

```
넣기(['사과'], '포도')
```

which yields `['사과', '포도']`.

**`빼기()`**:

```
빼기(['사과', '포도'])
```

which yields `['사과']`.

**`찾기()`**:

```
찾기(['사과', '포도', '바나나'], 2)
```

which yields `바나나`.

**`길이()`**:

```
길이('사과')
```

which yields `2`.

### Types

**Number**: any floating-point numbers

```
사과 = 42
포도 = -9.5
```

**String**: characters surrounded with single quotes

```
사과 = '맛있음'
```

**Boolean**: `참`, `거짓`

```
사과 = 참
포도 = 거짓
```

**List**: comma-separated elements surrounded with square brackets

```
['사과', '포도', '바나나']
```



## 🗡️ Building

Building process is based on [Bun][bun]

You can build a ***Kal*** interpreter by executing `bun run build`.
The output will be in the directory `/dist/index.min.js`.

[bun]: https://bun.sh
