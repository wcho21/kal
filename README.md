# 🗡️ KAL

<img src="./docs/images/kal-logo.png" alt="KAL logo" width="128px" height="128px" />

Korean algorithmic language.

Based on [TypeScript][ts] and [Node.js][node].

[ts]: https://www.typescriptlang.org/
[node]: https://nodejs.org/



## 🗡️ What is this?

A simple interpreted language which supports Korean.

You can load the interpreter in browsers (see below).

Try KAL in your browser at [Playground][playground].

[playground]: https://kal-playground.rooi.dev/



## 🗡️ Manual building and installation

### How to build

With `pnpm`, you can build by running `pnpm build && pnpm bundle`.

The output will be in the directory `/bundle/index.js`.



### How to use in browsers

Put the bundled file `index.js` (see above) in your directory, and load the file in HTML as following:

```HTML
<script src="/your-directory/index.js"></script>
```

After that, you can execute KAL code with `window.kal.execute(code-to-execute)` as follows:

```HTML
<script>
    window.kal.execute("5+5"); // === 10
</script>
```
