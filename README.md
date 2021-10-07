<!-- <img src=".logo.png" alt=firebase-functions-extended-client/><br/> -->

<div align="center">

[![npm](https://img.shields.io/npm/v/firebase-functions-extended-client)](https://www.npmjs.com/package/firebase-functions-extended-client)
[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![npm](https://img.shields.io/npm/dw/firebase-functions-extended-client)](https://www.npmjs.com/package/firebase-functions-extended-client)
</div>

# firebase-functions-extended-client

Client for the [firebase-functions-extended](https://github.com/SrBrahma/firebase-functions-extended) package. It's for my personal uses for now, so I won't write a proper readme for it, but its use is quite straightforward, if you got to understand the firebase-functions-extended, also without a readme.

## Installation
```bash
npm install firebase-functions-extended-client
# or
yarn add firebase-functions-extended-client
```

## Usage

* If data is an object, undefined properties are removed (deep copy non-undefined props). Before, as done automatically by firebase-functions, undefined props were turned to null.

## [Changelog](CHANGELOG.md)