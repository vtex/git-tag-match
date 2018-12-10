const path = require('path')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

function getGitVersion() {
  return exec('git describe --exact-match HEAD').then(response => {
    const version = response.stdout.replace(/v|\n/gi, '')
    return version
  })
}

function getReferenceFile(fileName) {
  const filePath = path.join(process.cwd(), fileName)
  const file = require(filePath)
  return file
}

function gitTagMatch(referenceFileName) {
  const file = getReferenceFile(referenceFileName)
  const referenceVersion = file.version

  return getGitVersion().then(gitVersion => {

    return {
      gitVersion: gitVersion,
      referenceVersion: referenceVersion,
      match: gitVersion === referenceVersion,
    }
  })
}

module.exports = gitTagMatch