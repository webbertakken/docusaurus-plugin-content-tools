import { describe, expect, it } from 'vitest'

import { toolsMenu } from './menu'

describe('toolsMenu', () => {
  it('returns an empty array for an empty mapping', () => {
    expect(toolsMenu({})).toEqual([])
  })

  it('preserves the component reference for each tool', () => {
    // The plugin only stores component paths as strings; cast to satisfy
    // the ToolsMapping value type without needing the docusaurus runtime.
    const componentPath = '@theme/MyComponent' as unknown as ToolsMappingValue
    const result = toolsMenu({ Foo: componentPath })
    expect(result).toEqual([{ name: 'Foo', slug: 'foo', component: componentPath }])
  })

  it('slugifies the name into a URL-safe slug', () => {
    const c = '@theme/X' as unknown as ToolsMappingValue
    const [entry] = toolsMenu({ 'My Cool Tool': c })
    expect(entry.slug).toBe('my-cool-tool')
  })

  it('sorts entries alphabetically by name', () => {
    const c = '@theme/X' as unknown as ToolsMappingValue
    const result = toolsMenu({ Beta: c, alpha: c, Gamma: c })
    expect(result.map((e) => e.name)).toEqual(['alpha', 'Beta', 'Gamma'])
  })
})

// Placeholder type alias so the test file doesn't depend on the docusaurus
// types (which require the runtime). The actual `ToolsMapping` value type
// is whatever the plugin author registers as a route component reference.
type ToolsMappingValue = string
