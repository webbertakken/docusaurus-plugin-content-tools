import { LoadContext, PluginOptions, Plugin } from '@docusaurus/types'
import type { Tools } from './types'
import { toolsMenu } from './utils/menu'
import { getToolsMapping } from './utils/getToolsMapping'

type Content = {
  tools: Tools
}

interface Options extends PluginOptions {
  enabled: boolean
  verbose: boolean
  toolsFolder: string
  toolOverviewPageComponent: string
  toolPageComponent: string
}

export default async function tools(context: LoadContext, options: Options): Promise<Plugin> {
  const { enabled, verbose, toolsFolder, toolOverviewPageComponent, toolPageComponent } = options

  // Disabled
  if (!enabled) return { name: 'docusaurus-plugin-content-tools' }

  const mapping = await getToolsMapping(context, toolsFolder, verbose)
  // @ts-ignore

  return {
    name: 'docusaurus-plugin-content-tools',

    getThemePath() {
      return '../lib/theme'
    },

    getTypeScriptThemePath() {
      return '../src/theme'
    },

    async loadContent(): Promise<Content> {
      if (verbose) console.log('--- Tools ---')

      if (verbose) console.log(`Importing tools mapping.`)
      const tools = toolsMenu(mapping)

      if (verbose) console.log(`Loading ${tools.length || 0} tools.`)
      return { tools }
    },

    async contentLoaded({ content, actions }) {
      const { tools } = content as { tools: Tools }

      // Overview page
      const toolsData = await actions.createData(
        `tools-index.json`,
        JSON.stringify(tools.map(({ component, ...rest }) => rest)),
      )

      actions.addRoute({
        path: `/tools`,
        exact: true,
        component: toolOverviewPageComponent,
        modules: { tools: toolsData },
      })

      // Tool pages
      for (const toolMeta of tools) {
        const { name, slug, component } = toolMeta

        const toolData = await actions.createData(
          `tool-${slug}.json`,
          JSON.stringify({ name, slug }),
        )

        actions.addRoute({
          path: `/tools/${slug}`,
          exact: true,
          component,
          modules: { tool: toolData },
        })
      }
    },
  }
}

export { validateOptions } from './validateOptions'
