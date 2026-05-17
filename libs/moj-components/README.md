# @modular-data/moj-components

React components and style entry points based on [Ministry of Justice Frontend](https://github.com/ministryofjustice/moj-frontend).

This package is a workspace library for shared Ministry of Justice React components. Component usage and variants are documented in Storybook.

## Usage

Import React components from the package entry point: `@modular-data/moj-components`.

Import the full style entry point once in the consuming app:

```scss
@use '@modular-data/moj-components/styles/index.scss' as *;
```

The style entry point includes MoJ Frontend styles.
