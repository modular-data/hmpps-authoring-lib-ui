# @modular-data/gds-components

React components and style entry points based on [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend).

This package is a workspace library for shared GOV.UK Design System React components. Component usage and variants are documented in Storybook.

## Usage

Import React components from the package entry point: `@modular-data/gds-components`.

Import the full style entry point once in the consuming app:

```scss
@use '@modular-data/gds-components/styles/index.scss' as *;
```

Use focused style helpers from package subpaths when a component stylesheet only needs shared mixins or variables:

```scss
@use '@modular-data/gds-components/styles/base.scss';
```
