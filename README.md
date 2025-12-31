# Research on Service Worker

## 1. Prerequisites

- Node.js >= 18
- Yalc
- Docker for example with metacom

- You don't need to install dependencies for examples 1-5.
- Example with metacom requires `metarhia-build` and `metacom` and `metautil` with esm bundle (not published to npm yet).
- Since metacom and metautil versions with esm bundle aren't published to npm, you need to clone them locally and install with yalc.

```sh
npm install -g yalc // only if you haven't installed it yet

./load_deps.sh
```

## 2. Run

There are several examples of Service Worker in subdirectories.
Run any of them with

```bash
node server.mjs -p 8080 -d 4
# or
npm start -- -d 4
```

Where -p is port (default 3000) and -d is directory number (default is 1 serves `1. no sw counter`).

Open `http://localhost:3000` in browser.

### 2.1 Metacom example

Metacom example is in `6. metacom` directory. It's a client of Metarhia Metacom.

```bash
npm start -- -d 6
```

**You need server with metacom enabled.**

- You can start it manually by cloning [Example](https://github.com/metarhia/Example) impress server and run locally as described in it's `README`. But ATM there is a bug in docker - DB is not initialized and metacom is not started.
- There is a fork with a fix: [Fix PR](https://github.com/samvimes01/impress-example/pull/1). To run it in docker use

```sh
./load_deps.sh --impress
```

- By default api runs on `ws://localhost:8002/api`.
