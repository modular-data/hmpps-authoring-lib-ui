# hmpps-authoring-lib-ui

[![repo standards badge](https://img.shields.io/endpoint?labelColor=231f20&color=005ea5&style=flat&label=MoJ%20Compliant&url=https%3A%2F%2Foperations-engineering-reports-prod.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fendpoint%2Fhmpps-authoring-lib-ui&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAHJElEQVRYhe2YeYyW1RWHnzuMCzCIglBQlhSV2gICKlHiUhVBEAsxGqmVxCUUIV1i61YxadEoal1SWttUaKJNWrQUsRRc6tLGNlCXWGyoUkCJ4uCCSCOiwlTm6R/nfPjyMeDY8lfjSSZz3/fee87vnnPu75z3g8/kM2mfqMPVH6mf35t6G/ZgcJ/836Gdug4FjgO67UFn70+FDmjcw9xZaiegWX29lLLmE3QV4Glg8x7WbFfHlFIebS/ANj2oDgX+CXwA9AMubmPNvuqX1SnqKGAT0BFoVE9UL1RH7nSCUjYAL6rntBdg2Q3AgcAo4HDgXeBAoC+wrZQyWS3AWcDSUsomtSswEtgXaAGWlVI2q32BI0spj9XpPww4EVic88vaC7iq5Hz1BvVf6v3qe+rb6ji1p3pWrmtQG9VD1Jn5br+Knmm70T9MfUh9JaPQZu7uLsR9gEsJb3QF9gOagO7AuUTom1LpCcAkoCcwQj0VmJregzaipA4GphNe7w/MBearB7QLYCmlGdiWSm4CfsplP+ww4AVic85MDxHt1plA71LKRvX4BDaAKFlTgLeALtliDUqPrSV6SQCBlypgFlbmIIrCDcAl6nPAawmYhlLKFuB6IrkXAadUNj6TXlhDcCNEB/Jn4FcE0f4UWEl0NyWNvZxGTs89z6ZnatIIrCdqcCtRJmcCPwCeSN3N1Iu6T4VaFhm9n+riypouBnepLsk9p6p35fzwvDSX5eVQvaDOzjnqzTl+1KC53+XzLINHd65O6lD1DnWbepPBhQ3q2jQyW+2oDkkAtdt5udpb7W+Q/OFGA7ol1zxu1tc8zNHqXercfDfQIOZm9fR815markup+valid)](https://operations-engineering-reports-prod.cloud-platform.service.justice.gov.uk/public-report/hmpps-authoring-lib-ui)
[![npm version](https://img.shields.io/npm/v/@modular-data/hmpps-authoring-lib-ui)](https://www.npmjs.com/package/@modular-data/hmpps-authoring-lib-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Embeddable Express router and Nunjucks views for authoring Data Products and Datasets in HMPPS Digital Prison Reporting (DPR).**
>
> Aligned with GOV.UK Design System and MOJ Frontend.

---

## 📑 Table of Contents

- [Quick Start](#-quick-start)
- [Requirements](#-requirements)
- [API Reference](#-api-reference)
- [TypeScript Support](#-typescript-support)
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

const njkEnv = nunjucks.configure([
  getViewsPath(), // Add authoring views
  // ...your other view paths
])

configureNunjucksGlobals(njkEnv)
configureNunjucksFilters(njkEnv)
```

### 4️⃣ Serve Static Assets

```typescript
import { getAssetsPath } from '@modular-data/hmpps-authoring-lib-ui'

router.use('/assets', express.static(getAssetsPath()))
```

### 5️⃣ Mount the Router

```typescript
import { createRouter } from '@modular-data/hmpps-authoring-lib-ui'

const authoringRouter = createRouter(authoringServices, njkEnv)
router.use('/authoring', authoringRouter)
```

---

## 📋 Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | `^22` |
| npm | `>=10 <12` |

### Backend Dependencies

> [!IMPORTANT]
> The following services must be running and accessible:

| Service | Purpose |
|---------|---------|
| **HMPPS Auth** | Authentication and authorization |
| **Authoring Core API** | Data products, domains, assets, outputs, policies, tags |
| **Supabase** | Data sources and datasets *(prototype)* |

---

## 📚 API Reference

### `createDataAccess(config)`

Creates API clients for the data layer.

<details>
<summary><strong>⚙️ Config: DataAccessConfig</strong></summary>

```typescript
interface DataAccessConfig {
  // Core API connection
  coreApiConfig: {
    url: string
    timeout: {
      response: number
      deadline: number
    }
  }

  // HMPPS Auth connection
  authConfig: {
    url: string
    systemClientId: string
    systemClientSecret: string
  }

  // Token storage (from @ministryofjustice/hmpps-auth-clients)
  tokenStore: TokenStore

  // Supabase connection
  supabaseConfig: {
    url: string
    anonKey: string
  }
}
```

</details>

<details>
<summary><strong>📦 Returns: DataAccess object</strong></summary>

| Client | Purpose |
|--------|---------|
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

### `createServices(dataAccess)`

Creates business logic services from the data access layer.

<details>
<summary><strong>📦 Returns: Services object</strong></summary>

| Service | Purpose |
|---------|---------|
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

### Nunjucks Configuration

#### `getViewsPath(): string`
Returns path to Nunjucks views. Include in your `nunjucks.configure()` paths array.

#### `configureNunjucksGlobals(env)`

<details>
<summary><strong>📦 Adds global variables</strong></summary>

| Global | Description |
|--------|-------------|
| `classNames` | Conditional CSS classes utility |
| `ENUMS` | DatasetState, AssetType, OutputType, DataProductState |
| `CONSTANTS` | Label and color mappings |
| `NO_DATA_PLACEHOLDER` | Placeholder for empty data |

</details>

#### `configureNunjucksFilters(env)`

<details>
<summary><strong>📦 Adds filters</strong></summary>

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

### `getAssetsPath(): string`

Returns path to compiled CSS/JS assets.

```typescript
router.use('/assets', express.static(getAssetsPath()))
```

---

### `createRouter(services, nunjucksEnv)`

Returns an Express router with all authoring routes:

| Feature | Routes |
|---------|--------|
| **Datasets** | List, create, view, edit |
| **Data Products** | List, create, view, edit |
| **Home** | Landing page |

---

## 🔷 TypeScript Support

Types are included and exported:

```typescript
import type {
  DataAccess,
  Services,
  DataAccessConfig,
  SupabaseClientConfig
} from '@modular-data/hmpps-authoring-lib-ui'
```

---

## 📦 Publishing

Published to npm via the ["Publish package" GitHub action](https://github.com/modular-data/hmpps-authoring-lib-ui/actions/workflows/publish.yml).

> [!NOTE]
> `package.json` uses `9999.9999.9999` as a placeholder version.
> This is replaced with the actual semantic version during the publish workflow.

---

## 🛠️ Development

<details>
<summary><strong>Click to expand development instructions</strong></summary>

### Running the Standalone App

The package includes a standalone Express app for local development.

#### With Docker Compose

```bash
docker compose pull
docker compose up
```

#### For Development (Hot Reload)

```bash
# Start dependencies only
docker compose up --scale=app=0

# Set up environment
cp .env.example .env

# Install and run
npm install
npm run start:dev
```

---

### Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run start:dev` | Dev server with hot reload |
| `npm run build` | Build assets |
| `npm run lint:check` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run test` | Unit tests |
| `npm run int-test` | Cypress integration tests (headless) |
| `npm run int-test-ui` | Cypress integration tests (UI) |

---

### Integration Tests

```bash
# Terminal 1: Start test dependencies
docker compose -f docker-compose-test.yml up

# Terminal 2: Start app in feature mode
npm run start-feature:dev

# Terminal 3: Run tests
npm run int-test-ui
```

</details>

---

## 📄 Changelog

See [CHANGELOG.md](./CHANGELOG.md)

---

## 📜 License

[MIT](./LICENSE)
