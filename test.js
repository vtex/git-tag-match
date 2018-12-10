const assert = require('assert')
const mockFs = require('mock-fs')
const { stubExecOnce } = require('stub-spawn-once')
const gitTagMatch = require('./index')

const gitCommand = 'git describe --exact-match HEAD'

function handleError(error) {
  console.error(error)
  process.exit(1)
}

// Match test
mockFs({ 'right-package.json': '{ "version": "1.0.0" }' })
stubExecOnce(gitCommand, null, 'v1.0.0', '')
gitTagMatch('right-package.json')
  .then(result => {
    assert(
      result.match === true,
      'Should return match true when versions match'
    )
  })
  .catch(handleError)

// Not match test
mockFs({ 'wrong-package.json': '{ "version": "1.0.1" }' })
stubExecOnce(gitCommand, null, 'v1.0.0', '')
gitTagMatch('wrong-package.json')
  .then(result => {
    assert(
      result.match === false,
      'Should return match false when versions doesnt match'
    )
  })
  .catch(handleError)
