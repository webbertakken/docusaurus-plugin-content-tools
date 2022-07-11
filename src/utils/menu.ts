import { slugify } from './slugify'
import type { Tools, ToolsMapping } from '../types'

export const toolsMenu = (tools: ToolsMapping): Tools =>
  Object.entries(tools)
    .map(([name, component]) => ({
      name,
      slug: slugify(name),
      component,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
