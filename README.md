# git-tag-match

> Check if the git tag matches package.json version

## Install

```sh
$ yarn add git-tag-match --dev
```

## Usage

### CLI

```sh
git-tag-match
```

Optional parameter `fileName`, example:

```sh
git-tag-match manifest.json
```

### Node

```js
const gitTagMatch = require('git-match-tag')

const fileName = 'package.json'

const result = await gitTagMatch(fileName)
// {
//   referenceVersion: '1.0.0',
//   gitVersion: '1.0.0',
//   match: true
// }
```

## License

MIT © [VTEX](https://www.vtex.com)