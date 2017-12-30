const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const { promisify } = require('util')

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const projectsPath = __dirname
const output = path.join(__dirname, '..', 'client', 'assets',  'projects.json')

async function build () {
  const files = await readdir(projectsPath)

  let projects = await Promise.all(
    files
      .filter(file => file !== 'build.js')
      .map(file => readFile(path.join(projectsPath, file), 'utf8'))
  )

  projects = projects
    .map(project => yaml.safeLoad(project))
    .map((project) => {
      project.date = (project.date === 'active') ? new Date() : new Date(project.date)

      return project
    })
    .sort((a, b) => b.date - a.date)

  await writeFile(output, JSON.stringify(projects))
}

console.log('Building projects')

build()
  .catch((err) => {
    throw err
  })
