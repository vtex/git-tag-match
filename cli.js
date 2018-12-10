#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2))
const gitTagMatch = require('./index')

const fileName = argv['_'][0] || 'package.json'

gitTagMatch(fileName)
  .then(result => {
    if (!result.match) {
      console.error(`Ops! Version in ${fileName} doesn't match git tag!`)
      console.error(`${fileName} \t${result.referenceVersion}`)
      console.error(`git \t\t${result.gitVersion}`)
      process.exit(1)
      return
    }

    console.log(`☑️  Version in ${fileName} matches git tag.`)
    process.exit(0)
  })
  .catch(error => {
    console.error('Error while trying to get git tag of the latest commit\n')
    console.error(error)
    process.exit(1)
    return
  })
