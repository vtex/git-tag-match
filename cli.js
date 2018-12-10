const argv = require('minimist')(process.argv.slice(2))
const matchGitTag = require('./index')

const fileName = argv['_'][0]

matchGitTag(fileName)
.then(result => {
  if (!result.match) {
    console.error(`Ops! Version in ${fileName} doesn't match git tag!`)
    console.error(`${fileName} \t${result.referenceVersion}`)
    console.error('git \t\t', result.gitVersion)
    process.exit(1)
    return
  }

  console.log('☑️  Alright!')
  process.exit(0)
})
.catch(error => {
  console.error('Error while trying to get git tag of the latest commit')
  console.error(error)
  return
})
