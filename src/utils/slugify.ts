import { replaceAll } from './replaceAll'

export const slugify = (name: string): string => {
  return encodeURIComponent(replaceAll(name.toLowerCase(), /[\s_]+/, '-'))
}
