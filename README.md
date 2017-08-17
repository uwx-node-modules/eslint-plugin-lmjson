# eslint-plugin-lmjson

[![Greenkeeper badge](https://badges.greenkeeper.io/uwx/eslint-plugin-lmjson.svg)](https://greenkeeper.io/)

Lint LMJSON files

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-lmjson`:

```
$ npm install eslint-plugin-lmjson --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-lmjson` globally.

## Usage

Add `lmjson` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lmjson"
    ]
}
```

You can run ESLint on individual LMJSON files or you can use the `--ext` flag to add LMJSON files to the list.

```
eslint . --ext .lmjson --ext .js
eslint example.lmjson
```
