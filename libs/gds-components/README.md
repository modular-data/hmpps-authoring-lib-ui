# @modular-data/gds-components

React components library based on the [GOV.UK Design System](https://design-system.service.gov.uk/).

## GDS Version

This library implements components based on **GOV.UK Frontend**.

All components in this library are implemented from the same GDS version to ensure consistency.

**GDS Source**: [govuk-frontend](https://github.com/alphagov/govuk-frontend)

## Overview

This library provides React-idiomatic implementations of GDS components. While the components follow GDS design patterns and use GDS styles, they use React best practices (e.g., `children` prop instead of `text`/`html` props).

## Components

### Button

React implementation of the [GDS Button component](https://design-system.service.gov.uk/components/button/).

**See Storybook for usage examples and all variants.**

## Installation

This library is part of the monorepo. To use it in your application:

```tsx
import { Button } from '@modular-data/gds-components';
```

## Styles

Import GDS styles in your application:

```scss
@use '@modular-data/gds-components/styles';
```

Or in your Next.js app, import in `*.tsx` files:

```tsx
import '@modular-data/gds-components/styles';
```

## Storybook

View all components and their variants in Storybook:

```bash
nx storybook @modular-data/gds-components
```

## Running unit tests

Run `nx test @modular-data/gds-components` to execute the unit tests via [Jest](https://jestjs.io).
