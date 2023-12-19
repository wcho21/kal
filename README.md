# 🗡️ KAL

<img src="./docs/images/kal-logo.png" alt="KAL logo" width="128px" height="128px" />

_KAL: Korean Algorithmic Language_.

A simple interpreted language which supports Korean.

You can load a _KAL_ interpreter in browsers, or build manually (see below).

Try _KAL_ at [KAL Playground][playground].

[playground]: https://kal-playground.rooi.dev/



## 🗡️ Manual building and installation

### How to build

Note that building process is based on [Node.js][node].

With [`pnpm`][pnpm], you can build a _KAL_ interpreter by running `pnpm install && pnpm build && pnpm bundle`.

The output will be in the directory `/bundle/index.js`.

[pnpm]: https://pnpm.io/
[node]: https://nodejs.org/



### How to use in browsers

Put the bundled file `index.js` (see above) in your directory, and load the file in HTML as following:

```HTML
<script src="/your-directory/index.js"></script>
```

After that, you can execute _KAL_ code with `kal.execute(code-to-execute)` as follows:

```HTML
<script>
  kal.execute("5+5"); // === 10
</script>
```
