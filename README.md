# hmpps-authoring-lib-ui

[![repo standards badge](https://img.shields.io/endpoint?labelColor=231f20&color=005ea5&style=flat&label=MoJ%20Compliant&url=https%3A%2F%2Foperations-engineering-reports-prod.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fendpoint%2Fhmpps-authoring-lib-ui&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAHJElEQVRYhe2YeYyW1RWHnzuMCzCIglBQlhSV2gICKlHiUhVBEAsxGqmVxCUUIV1i61YxadEoal1SWttUaKJNWrQUsRRc6tLGNlCXWGyoUkCJ4uCCSCOiwlTm6R/nfPjyMeDY8lfjSSZz3/fee87vnnPu75z3g8/kM2mfqMPVH6mf35t6G/ZgcJ/836Gdug4FjgO67UFn70+FDmjcw9xZaiegWX29lLLmE3QV4Glg8x7WbFfHlFIebS/ANj2oDgX+CXwA9AMubmPNvuqX1SnqKGAT0BFoVE9UL1RH7nSCUjYAL6rntBdg2Q3AgcAo4HDgXeBAoC+wrZQyWS3AWcDSUsomtSswEtgXaAGWlVI2q32BI0spj9XpPww4EVic88vaC7iq5Hz1BvVf6v3qe+rb6ji1p3pWrmtQG9VD1Jn5br+Knmm70T9MfUh9JaPQZu7uLsR9gEsJb3QF9gOagO7AuUTom1LpCcAkoCcwQj0VmJregzaipA4GphNe7w/MBearB7QLYCmlGdiWSm4CfsplP+ww4AVic85MDxHt1plA71LKRvX4BDaAKFlTgLeALtliDUqPrSV6SQCBlypgFlbmIIrCDcAl6nPAawmYhlLKFuB6IrkXAadUNj6TXlhDcCNEB/Jn4FcE0f4UWEl0NyWNvZxGTs89z6ZnatIIrCdqcCtRJmcCPwCeSN3N1Iu6T4VaFhm9n+riypouBnepLsk9p6p35fzwvDSX5eVQvaDOzjnqzTl+1KC53+XzLINHd65O6lD1DnWbepPBhQ3q2jQyW+2oDkkAtdt5udpb7W+Q/OFGA7ol1zxu1tc8zNHqXercfDfQIOZm9fR815markup+valid)](https://operations-engineering-reports-prod.cloud-platform.service.justice.gov.uk/public-report/hmpps-authoring-lib-ui)
[![npm version](https://img.shields.io/npm/v/@modular-data/hmpps-authoring-lib-ui)](https://www.npmjs.com/package/@modular-data/hmpps-authoring-lib-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Embeddable UI module that simplifies Data Product Definitions (DPD) creation in HMPPS Digital Prison Reporting.**
>
> Aligned with GOV.UK Design System and MOJ Frontend.

---

## 📑 Table of Contents

- [Quick Start](#-quick-start)
- [Requirements](#-requirements)
- [API Reference](#-api-reference)
- [Types](#-types)
- [Publishing](#-publishing)
- [Development](#-development)

---

## 🚀 Quick Start

```bash
npm install @modular-data/hmpps-authoring-lib-ui
```

Integrate in **5 steps**:

### 1️⃣ Create Data Access Layer

```typescript
import { createDataAccess } from '@modular-data/hmpps-authoring-lib-ui'

const authoringDataAccess = createDataAccess({
  coreApiConfig: config.apis.authoring,
  authConfig: config.apis.hmppsAuth,
  supabaseConfig: config.apis.authoringSupabase,
  tokenStore, // TokenStore from @ministryofjustice/hmpps-auth-clients
})
```

### 2️⃣ Create Services Layer

```typescript
import { createServices } from '@modular-data/hmpps-authoring-lib-ui'

const authoringServices = createServices(authoringDataAccess)
```

### 3️⃣ Configure Nunjucks

```typescript
import {
  getViewsPath,
  configureNunjucksGlobals,
  configureNunjucksFilters,
} from '@modular-data/hmpps-authoring-lib-ui'

const nunjucksEnvironment = nunjucks.configure([
  // ...your other view paths
  getViewsPath(), // Add Authoring views
])

configureNunjucksGlobals(nunjucksEnvironment)
configureNunjucksFilters(nunjucksEnvironment)
```

### 4️⃣ Serve Static Assets

```typescript
import { getAssetsPath } from '@modular-data/hmpps-authoring-lib-ui'

router.use('/assets', express.static(getAssetsPath()))
```

### 5️⃣ Mount the Router

```typescript
import { createRouter } from '@modular-data/hmpps-authoring-lib-ui'

const authoringRouter = createRouter(authoringServices, nunjucksEnvironment)

router.use('/authoring', authoringRouter)
```

### Verify Integration

Start your application and visit the authoring home page (e.g. `http://localhost:3000/authoring`).

**Success!** 🎉 You should see the authoring home page with correct styles and assets.

---

## 📋 Requirements

> ⚠️
> The following services must be running and accessible:

| Service | Purpose |
|---------|---------|
| **HMPPS Auth** | Identity provider (or compatible mock) for authentication and authorization |
| **Authoring Core API** | Core business logic and resource management |
| **Supabase** | Data sources and datasets *(prototype)* |

---

## 📚 API Reference

### createDataAccess

```typescript
function createDataAccess(config: DataAccessConfig): DataAccess
```

Creates API clients for the data layer.

| Parameter | Type | Description |
|-----------|------|-------------|
| `config` | [`DataAccessConfig`](#dataaccessconfig) | Configuration for APIs and authentication |

**Returns:** [`DataAccess`](#dataaccess)

---

### createServices

```typescript
function createServices(dataAccess: DataAccess): Services
```

Creates business logic services from the data access layer.

| Parameter | Type | Description |
|-----------|------|-------------|
| `dataAccess` | [`DataAccess`](#dataaccess) | Data access object from `createDataAccess()` |

**Returns:** [`Services`](#services)

---

### createRouter

```typescript
function createRouter(
  services: Services,
  nunjucksEnvironment: NunjucksEnvironment
): Router
```

Creates an Express router with all authoring routes.

| Parameter | Type | Description |
|-----------|------|-------------|
| `services` | [`Services`](#services) | Services from `createServices()` |
| `nunjucksEnvironment` | `NunjucksEnvironment` | Nunjucks environment instance |

**Returns:** `Router` – Express router containing all authoring routes.

---

### getViewsPath

```typescript
function getViewsPath(): string
```

Returns absolute path to the package's Nunjucks views. Include in your `nunjucks.configure()` paths array.

---

### getAssetsPath

```typescript
function getAssetsPath(): string
```

Returns absolute path to the package's static assets (images, scripts, styles). Use with `express.static()`:

```typescript
router.use('/assets', express.static(getAssetsPath()))
```

---

### configureNunjucksGlobals

```typescript
function configureNunjucksGlobals(nunjucksEnvironment: NunjucksEnvironment): void
```

Adds global variables to Nunjucks environment.

| Parameter | Type | Description |
|-----------|------|-------------|
| `nunjucksEnvironment` | `NunjucksEnvironment` | Nunjucks environment instance |

<details>
<summary><strong>Globals added</strong></summary>

| Global | Description |
|--------|-------------|
| `classNames` | Conditional CSS classes utility |
| `ENUMS` | Shared enum definitions used in views |
| `CONSTANTS` | Label and color mappings used in views |
| `NO_DATA_PLACEHOLDER` | Placeholder for empty data |

</details>

---

### configureNunjucksFilters

```typescript
function configureNunjucksFilters(nunjucksEnvironment: NunjucksEnvironment): void
```

Adds custom filters to Nunjucks environment.

| Parameter | Type | Description |
|-----------|------|-------------|
| `nunjucksEnvironment` | `NunjucksEnvironment` | Nunjucks environment instance |

<details>
<summary><strong>Filters added</strong></summary>

| Filter | Description |
|--------|-------------|
| MOJ Frontend filters | Standard MOJ filters |
| `initialiseName` | Format names with initials |
| `authoringAssetMap` | Map asset URLs to hashed versions |
| `merge` | Deep merge objects |
| `toCheckboxItems` | Convert data to checkbox items |
| `fallbackTableEmptyCells` | Handle empty table cells |
| `formatPercents` | Format percentage values |

</details>

---

## 🔷 Types

### DataAccessConfig

Configuration object for `createDataAccess`.

<details>
<summary><strong>Properties</strong></summary>

| Property | Type | Description |
|----------|------|-------------|
| `coreApiConfig` | `ApiConfig` | Core API connection details (from `@ministryofjustice/hmpps-rest-client`) |
| `authConfig` | `AuthConfig` | HMPPS Auth connection details (from `@ministryofjustice/hmpps-auth-clients`) |
| `tokenStore` | `TokenStore` | Token storage implementation (from `@ministryofjustice/hmpps-auth-clients`) |
| `supabaseConfig` | [`SupabaseClientConfig`](#supabaseclientconfig) | Supabase connection details |

</details>

---

### SupabaseClientConfig

Configuration for Supabase client.

<details>
<summary><strong>Properties</strong></summary>

| Property | Type | Description |
|----------|------|-------------|
| `url` | `string` | Supabase project URL |
| `anonKey` | `string` | Supabase anonymous key |

</details>

---

### DataAccess

Object containing all API clients.

<details>
<summary><strong>Properties</strong></summary>

| Property | Description |
|----------|-------------|
| `hmppsAuthClient` | Authentication |
| `domainApiClient` | Domain operations |
| `assetApiClient` | Asset operations |
| `outputApiClient` | Output operations |
| `policyApiClient` | Policy operations |
| `tagApiClient` | Tag operations |
| `dataSourceApiClient` | Data source operations *(Supabase)* |
| `datasetApiClient` | Dataset operations *(Supabase)* |
| `dataProductApiClient` | Data product operations |

</details>

---

### Services

Object containing all business logic services.

<details>
<summary><strong>Properties</strong></summary>

| Property | Description |
|----------|-------------|
| `domainService` | Domain business logic |
| `assetService` | Asset business logic |
| `outputService` | Output business logic |
| `policyService` | Policy business logic |
| `tagService` | Tag business logic |
| `dataSourceService` | Data source business logic |
| `datasetService` | Dataset business logic |
| `dataProductService` | Data product business logic |

</details>





---

## 📦 Publishing

Published to npm via the ["Publish package" GitHub action](https://github.com/modular-data/hmpps-authoring-lib-ui/actions/workflows/publish.yml).

> ⚠️
> `package.json` uses `9999.9999.9999` as a placeholder version.
> This is replaced with the actual semantic version during the publish workflow.

---

## 🛠️ Development

<details>
<summary><strong>Click to expand development instructions</strong></summary>

### Running the Standalone App

#### Running Locally

The package includes a standalone Express app for local development.

1. **Start dependencies**
   Run backend services (Redis, HMPPS Auth) using Docker:
   ```bash
   docker compose up --scale=app=0 -d
   ```

2. **Configure environment**
   Create a `.env` file and populate it with **real values** (credentials, API URLs):
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**
   ```bash
   npm run setup
   ```

4. **Start the application**
   ```bash
   npm run start:dev
   ```

---

### Helpful NPM Scripts

| Script | Purpose |
|--------|---------|
| `npm run setup` | Installs dependencies and runs script allowance checks |
| `npm run start:dev` | Starts the standalone app in development mode with hot-reloading |
| `npm run build` | Compiles frontend assets (CSS/JS) using ESBuild |
| `npm run build:types` | Generates TypeScript declaration files (`.d.ts`) |
| `npm run package` | Prepares package for publishing (runs build and type generation) |
| `npm run lint:check` | Runs ESLint to identify code quality issues |
| `npm run lint:fix` | Automatically fixes ESLint errors where possible |
| `npm run format:check` | Checks if code matches Prettier formatting rules |
| `npm run format:fix` | Reformats all code using Prettier |
| `npm run typecheck` | Validates TypeScript types across the project |
| `npm run clean` | Removes `dist` and `test_results` directories |

---

</details>

---

## 📄 Changelog

See [CHANGELOG.md](./CHANGELOG.md)

---

## 📜 License

[MIT](./LICENSE)
