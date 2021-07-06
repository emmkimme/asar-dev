'use strict'

const { promisify } = require('util')
const path = require('path')

const fs = require('./wrapped-fs')
const glob = promisify(require('glob'))

async function determineFileType (rootdir, filename, options) {
  const stat = await fs.lstat(filename)
  if (stat.isFile()) {
    return { type: 'file', stat }
  } else if (stat.isDirectory()) {
    return { type: 'directory', stat }
  } else if (stat.isSymbolicLink()) {
    const realpathname = fs.realpathSync(filename)
    const link = path.relative(fs.realpathSync(rootdir), realpathname)
    const isOuterLink = link.substr(0, 2) === '..'
    if (isOuterLink && options.follow) {
      console.warn(`/!\\ link detected and expanded in the archive: ${filename} => ${realpathname}`)
      return { type: 'directory', stat }
    } else {
      if (isOuterLink) {
        throw new Error(`${filename}: file links out of the package`)
      }
      return { type: 'link', stat }
    }
  }
}

module.exports = async function (dir, pattern, options) {
  const metadata = {}
  const crawled = await glob(path.join(dir, (pattern != null) ? pattern : ''), options)
  const results = await Promise.all(crawled.map(async filename => {
    filename = path.normalize(filename)
    return [filename, await determineFileType(dir, filename, options)]
  }))
  const filenames = results.map(([filename, type]) => {
    if (type) {
      metadata[filename] = type
    }
    return filename
  })
  return [filenames, metadata]
}
module.exports.determineFileType = determineFileType
