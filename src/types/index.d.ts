export interface Tool {
  name: string
  slug: string
  component: string
}

export type Tools = Tool[]

export type ToolsMapping = {
  [title: string]: string
}
