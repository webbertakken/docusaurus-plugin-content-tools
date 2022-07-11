import { LoadContext } from '@docusaurus/types'
import { ToolsMapping } from '../types'
import fs from 'fs'
import fsp from 'fs/promises'

const isPath = (path: string) => {
  return fs.existsSync(path)
}

const isDir = async (path: string) => {
  if (!isPath(path)) return false

  const stat = await fsp.stat(path)

  return stat.isDirectory()
}

const readFolder = async (path: string) => {
  if (!(await isDir(path))) throw new Error(`Path "${path}" does not reference a directory.`)

  return fsp.readdir(path)
}

export const getToolsMapping = async (
  context: LoadContext,
  toolsFolder: string,
  verbose: boolean,
): Promise<ToolsMapping> => {
  const path = `${context.siteDir}/${toolsFolder.replace(/^@site/, '')}`

  if (verbose) console.log(`Reading tools from "${path}".`)
  const tools = await readFolder(path)

  const mapping: ToolsMapping = {}
  for (const tool of tools) {
    const absolutePath = `${path}/${tool}`
    const webpackPath = `${toolsFolder}/${tool}`

    const isDirectory = await isDir(absolutePath)
    if (!isDirectory) continue

    mapping[tool] = webpackPath
  }

  if (verbose) console.log(`Found`, mapping)
  return mapping
}
