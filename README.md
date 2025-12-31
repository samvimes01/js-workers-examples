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

## References

| Paper                                                                  | Repo PR                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Part 1: Building metarhia stack bundler.][part1]                      | [bundler](https://github.com/metarhia/metarhia-build/pull/2)           |
| [Part 2: Refactoring Metacom: Achieving Single Source of Truth][part2] | [metacom bundler](https://github.com/metarhia/metacom/pull/524)        |
| [Part 3: Service Workers and Metacom: IIFE Bundles in Action][part3]   | [metacom service worker](https://github.com/samvimes01/metacom/pull/2) |

[part1]: https://dev.to/oleks/refactoring-metarhia-technology-stack-7n0-temp-slug-7663052?preview=4de0a3fbc3ea739f182652c5dcb7058dd4d6fb6cc59159fbe3e0719215e526ff24fc80317e4f1d8af6f248d39204a9c760492bbe280cb9b8a97d8aba
[part2]: https://dev.to/oleks/refactor-metarhia-metacom-147l-temp-slug-9240332?preview=6578d3fda7d5643052260982fbccc07f84c3e53c040e59b73ea6d347786943fc346e1dffd7a14f725bd7babbdfac100fbb663164ee65344090a2d6b9
[part3]: https://dev.to/oleks/service-workers-and-metacom-iife-bundles-in-action-hjg-temp-slug-4019028?preview=3e2bb6257d86b65f97f6a7afb7afe2540c2033dc655e7c9e61c264d6835cbc071dc244cf218c9a3454b97cd9c767099960d142bcaeb033b516825f17
