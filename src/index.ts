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

export default async function toolsPlugin(context: LoadContext, options: Options): Promise<Plugin> {
  const { enabled, verbose, toolsFolder, toolOverviewPageComponent } = options

  // Disabled
  if (!enabled) return { name: 'docusaurus-plugin-content-tools' }

  const mapping = await getToolsMapping(context, toolsFolder, verbose)

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
      const loadedTools = toolsMenu(mapping)

      if (verbose) console.log(`Loading ${loadedTools.length || 0} tools.`)
      return { tools: loadedTools }
    },

    async contentLoaded({ content, actions }) {
      const { tools: loadedTools } = content as { tools: Tools }

      // Overview page — strip the component reference from the route
      // payload (consumers don't need the component path on the index).
      const toolsData = await actions.createData(
        `tools-index.json`,
        JSON.stringify(
          // eslint-disable-next-line no-unused-vars
          loadedTools.map(({ component, ...rest }) => rest),
        ),
      )

      actions.addRoute({
        path: `/tools`,
        exact: true,
        component: toolOverviewPageComponent,
        modules: { tools: toolsData },
      })

      // Tool pages — sequential await is intentional; the docusaurus
      // `actions.createData` writes JSON files and we want them written
      // in deterministic order to keep the route map stable.
      for (const toolMeta of loadedTools) {
        const { name, slug, component } = toolMeta

        // eslint-disable-next-line no-await-in-loop -- ordered writes
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
