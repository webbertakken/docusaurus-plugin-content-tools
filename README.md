# Docusaurus tools plugin

> An easy way to index and route tools on your docusaurus page.

## Introduction

You can specify one of your components folders to be your tools folder. Inside that folder you can
create 1 folder per tool, that exposes a React component through its `index.ts`. Each tool will
generate each own page. Links will be indexed on the tools main page.

See it in action on [Takken.io](https://takken.io).

## Setup

### Install dependencies

Choose one:

```bash
# NPM
npm install dotenv docusaurus-plugin-content-tools

# Yarn
yarn add dotenv docusaurus-plugin-content-tools
```

### Configure

#### `docusaurus.config.js`

```js
const config = {
  // Configure plugin
  plugins: [
    [
      'docusaurus-plugin-content-tools',
      {
        enabled: true,
        verbose: true,
        toolsFolder: '@site/src/components/pages/Tools',
      },
    ],
  ],

  // Configure navbar
  themeConfig: {
    navbar: {
      items: [{ to: '/tools', label: 'Tools', position: 'left' }],
    },
  },
}
```

### Options

#### `enabled`

Whether this plugin is enabled.

_**required:** `false`_ _**default:** `true`_

#### `verbose`

Gives output about retrieving the tools during build time

_**required:** `false`_ _**default:** `false`_

#### `toolsFolder`

The folder that you mark as your tools-folder. Must begin with `@site`.

> Example: `'@site/src/components/pages/Tools'`

_**required:** `true`_ _**default:** `undefined`_

#### `toolPageComponent`

Which component to use for showing the tool page (wrapper for the tool itself).

_**required:** `false`_ _**default:** `'@theme/ToolPage'`_

#### `toolOverviewPageComponent`

Which component to use for showing the tools overview page.

_**required:** `false`_ _**default:** `'@theme/ToolOverviewPage''`_

## Contributing

Contributions are welcome!

Please read the [contributing guide](./CONTRIBUTING.md).

## License

[MIT](./LICENSE) licensed.
