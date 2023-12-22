[![English](https://img.shields.io/badge/Lang-en-green)][readme-en]
[![Korean](https://img.shields.io/badge/Lang-ko-blue)][readme-ko]

[readme-en]: ../
[readme-ko]: ./



# 🗡️ KAL

<img src="./images/kal-logo.png" alt="KAL logo" width="128px" height="128px" />

_KAL: Korean Algorithmic Language_.

한국어를 지원하는 인터프리터 언어.

_KAL_ 인터프리터를 브라우저에 로드하거나 직접 빌드하는 방법은 아래를 참고하세요.

_KAL_ 을 [플레이그라운드][playground]에서 체험해보세요.

[playground]: https://kal-playground.rooi.dev/



## 브라우저에서 사용하기

다음과 같이 인터프리터 스크립트를 HTML 상에서 로드합니다.

```HTML
<script src="https://cdn.jsdelivr.net/gh/wcho21/kal@latest/dist/index.min.js"></script>
```

이후, _KAL_ 코드는 다음과 같이 `kal.execute(code-to-execute)`로 실행합니다.

```HTML
<script>
  kal.execute("5+5"); // === 10
</script>
```



## 🗡️ 예시

### 문법들

변수 대입하기:
```
사과 = 42
```

값 비교하기:
```
사과 < 99
```

조건문 쓰기:
```
만약 사과 < 99 {
    사과 = 99
} 아니면 {
    사과 = 100
}
```

함수 사용하기:
```
더하기 = 함수(숫자1, 숫자2) {
    결과 숫자1 + 숫자2
}

더하기(42, 10)
```
결과는 `52`입니다.

클로저:
```
더하기 = 함수(숫자1) {
    결과 함수(숫자2) {
        결과 숫자1 + 숫자2
    }
}

하나더하기 = 더하기(1)

하나더하기(42)
```
결과는 `42`입니다.



### 타입들

_숫자 타입_: 아무 부동소수점 숫자
```
사과 = 42
포도 = -9.5
```

_문자열 타입_: 작은따옴표로 둘러싼 문자들
```
사과 = '맛있음'
```

_불리언 타입_: `참`, `거짓`
```
사과 = 참
포도 = 거짓
```



## 🗡️ 빌드와 설치

### 빌드하기

빌드 과정은 [Node.js][node]를 기반으로 합니다.

_KAL_ 인터프리터를 다음 커맨드로 [`pnpm`]을 이용해 빌드합니다.

```
pnpm install && pnpm build && pnpm bundle`
```



결과는 `/bundle/index.js` 디렉토리에 위치합니다.

[pnpm]: https://pnpm.io/
[node]: https://nodejs.org/
