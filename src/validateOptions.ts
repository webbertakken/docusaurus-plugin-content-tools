import { Joi } from '@docusaurus/utils-validation'
import type { ValidationSchema, OptionValidationContext, PluginOptions } from '@docusaurus/types'

const defaults = {
  enabled: true,
  verbose: false,
  toolsFolder: '@site/src/components/pages/Tools',
  toolPageComponent: '@theme/ToolPage',
  toolOverviewPageComponent: '@theme/ToolOverviewPage',
}

export const Schema = Joi.object({
  enabled: Joi.string()
    .equal(true, false)
    .default(defaults.enabled)
    .label('Whether the plugin is enabled or not.'),
  verbose: Joi.string()
    .equal(true, false)
    .default(defaults.verbose)
    .label('Verbose output during build phase'),
  toolsFolder: Joi.string()
    .default(defaults.toolsFolder)
    .label('The mapping from the tools title to its react component'),
  toolPageComponent: Joi.string()
    .default(defaults.toolPageComponent)
    .label('The component for the page of the tool'),
  toolOverviewPageComponent: Joi.string()
    .default(defaults.toolOverviewPageComponent)
    .label('The component for the page that lists the tools'),
})

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<ValidationSchema<PluginOptions>, PluginOptions>) {
  return validate(Schema, options)
}
