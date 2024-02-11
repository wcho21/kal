[![English](https://img.shields.io/badge/Lang-en-green)][readme-en]
[![Korean](https://img.shields.io/badge/Lang-ko-blue)][readme-ko]

[readme-en]: ../
[readme-ko]: ./



# 🗡️ KALANG

<img src="./images/kal-logo.png" alt="KALANG logo" width="192px" height="192px" />

_KALANG: Korean Programming Language_.

한국어 프로그래밍 언어.

- < 0.03 MB.
- 250 개 이상의 테스트 케이스.
- 브라우저에서 바로 동작하는 자바스크립트 구현체.
- 한국어 키워드로 구성된 간단한 문법.

_KALANG_ 을 [플레이그라운드][playground]에서 체험해보세요.

_KALANG_ 인터프리터를 브라우저에 로드하거나 직접 빌드하는 방법은 아래를 참고하세요.

[playground]: https://kal-playground.rooi.dev/



## 브라우저에서 사용하기

다음과 같이 인터프리터 스크립트를 HTML 상에서 로드합니다.

```HTML
<script src="https://cdn.jsdelivr.net/gh/wcho21/kal@latest/dist/index.min.js"></script>
```

이후, _KALANG_ 코드는 다음과 같이 `kal.execute(code-to-execute)`로 실행합니다.

```javascript
kal.execute("5+5"); // === 10
```

표준 출력을 위해 이벤트 핸들러를 등록할 수 있습니다.
```javascript
const stdouts = [];

kal.execute("쓰기('사과')", stdout => stdouts.push(stdout)); // stdout === ["사과"]
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

클로저 및 커링:
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
결과는 둘 다 `42`입니다.



### 내장 함수

`쓰기()`:
```
쓰기('사과')
쓰기('포도', '바나나')
```
결과는 다음과 같습니다.
```
사과
포도 바나나
```

`길이()`:
```
길이('사과')
```
결과는 `2`입니다.



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

[`pnpm`][pnpm]을 이용해, _KALANG_ 인터프리터를 `pnpm install && pnpm build`로 빌드할 수 있습니다.

빌드 결과는 `/dist/index.min.js` 디렉토리에 위치합니다.

[node]: https://nodejs.org/
[pnpm]: https://pnpm.io/
