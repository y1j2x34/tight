# TXON ![GitHub](https://img.shields.io/github/license/y1j2x34/txon.svg?style=social) [![Build Status](https://travis-ci.org/y1j2x34/txon.svg?branch=master)](https://travis-ci.org/y1j2x34/txon) [![codecov](https://codecov.io/gh/y1j2x34/txon/branch/master/graph/badge.svg)](https://codecov.io/gh/y1j2x34/txon)

TXON, not a new serialization format, is also JSON, but the content is somewhat different from the result generated from native JSON, that makes it more expressive than the native JSON.

## Why

- Support references, saves more space.
- Support circular structure, no (`Uncaught TypeError: Converting circular structure to JSON`) ever.
- Can serialize/deserialize anything, just need a parser.

Currently supported by default:

- anything JSON supported
- `Date`
- `NaN` and ±`Infinity`
- `ArrayBuffer` and `TypedArray`s

## Installation

`npm install txon`

## Usage

Please refer to the unit test codes in `/test/` directory.
