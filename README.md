# hookdebug

A simple but useful tool, which hook the npm bin from `#!/usr/bin/env node` to `#!/usr/bin/env node --inpect --debug-brk`. Then the process could be started with support of [attaching to the VS Code debugger](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_attaching-to-nodejs).

Tested in macOS, maybe compatible with Linux, but not Windows.

---

## Install

```
$ npm i -g hookdebug
```

## Usage

```
  Usage: hookd <bin> [bin options]
```

### Examples

Debug `yarn`:

```
$ hookd yarn
```

Debug `roadhog build`:

```
$ hookd roadhog build
```

Debug `npm -h`

```
$ hookd npm -h
```
