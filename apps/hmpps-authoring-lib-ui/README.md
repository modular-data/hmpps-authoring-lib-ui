# HMPPS Authoring UI Library

_Ministry of Justice • Digital Prison Reporting_

[![repo standards badge](https://img.shields.io/badge/dynamic/json?color=005ea5&style=flat&label=MoJ%20Compliant&query=%24.result&url=https%3A%2F%2Foperations-engineering-reports.cloud-platform.service.justice.gov.uk%2Fapi%2Fv1%2Fcompliant_public_repositories%2Fhmpps-authoring-lib-ui)](https://operations-engineering-reports.cloud-platform.service.justice.gov.uk/public-github-repositories.html#hmpps-authoring-lib-ui)
[![npm version](https://img.shields.io/npm/v/@modular-data/hmpps-authoring-lib-ui)](https://www.npmjs.com/package/@modular-data/hmpps-authoring-lib-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Embeddable Next.js authoring module that simplifies Data Product Definition workflows in HMPPS Digital Prison Reporting.**
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

Integrate in **4 steps**:

### 1️⃣ Create Data Access Layer

```typescript
import { createDataAccess } from '@modular-data/hmpps-authoring-lib-ui'

const authoringDataAccess = createDataAccess({
  coreApiConfig: config.apis.authoringCore,
  authConfig: config.apis.hmppsAuth,
  tokenStore, // TokenStore from @ministryofjustice/hmpps-auth-clients
})
```

### 2️⃣ Create Services Layer

```typescript
import { createServices } from '@modular-data/hmpps-authoring-lib-ui'

const authoringServices = createServices(authoringDataAccess)
```

### 3️⃣ Create the Authoring App Handler

```typescript
import { createAuthoringAppHandler } from '@modular-data/hmpps-authoring-lib-ui'

const authoringAppHandler = createAuthoringAppHandler({
  services: authoringServices,
})
```

### 4️⃣ Mount the Handler

```typescript
app.use('/authoring', authoringAppHandler)
```

Before the handler runs, your host Express app must populate `res.locals.user` so the package can expose request-scoped user data inside the embedded Next.js app. The package serves its embedded Next.js application from `/authoring`, so no separate Nunjucks or static asset wiring is required.

### Verify Integration

Start your application and visit the authoring home page:

- `http://localhost:3000/authoring`

You should see the authoring UI mounted inside your host Express application with Next.js routes and assets resolving under `/authoring`.

---

## 📋 Requirements

> ⚠️
> The following dependencies and services must be available:

| Dependency              | Purpose                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| **Express `^5.1.0`**    | Host application that mounts the exported `RequestHandler` under `/authoring` |
| **Authentication layer** | Ensures `res.locals.user` is populated for request-scoped user context      |
| **HMPPS Auth**          | Identity provider used by the package auth client                            |
| **Authoring Core API**  | Upstream API used by the package runtime                                     |

---

## 📚 API Reference

### createDataAccess

```typescript
function createDataAccess(config: DataAccessConfig): DataAccess
```

Creates API clients for the data layer.

| Parameter | Type                                    | Description                               |
| --------- | --------------------------------------- | ----------------------------------------- |
| `config`  | [`DataAccessConfig`](#dataaccessconfig) | Configuration for core API and auth       |

**Returns:** [`DataAccess`](#dataaccess)

---

### createServices

```typescript
function createServices(dataAccess: DataAccess): Services
```

Creates business logic services from the data access layer.

| Parameter    | Type                        | Description                                  |
| ------------ | --------------------------- | -------------------------------------------- |
| `dataAccess` | [`DataAccess`](#dataaccess) | Data access object from `createDataAccess()` |

**Returns:** [`Services`](#services)

---

### createAuthoringAppHandler

```typescript
function createAuthoringAppHandler(
  dependencies: AuthoringAppDependencies,
): RequestHandler
```

Creates the Express request handler that serves the embedded authoring app.

| Parameter      | Type                                                    | Description                                  |
| -------------- | ------------------------------------------------------- | -------------------------------------------- |
| `dependencies` | [`AuthoringAppDependencies`](#authoringappdependencies) | Dependencies required by the authoring app   |

**Returns:** `RequestHandler` – Express middleware for the embedded authoring application.

> Mount this handler under `/authoring` to match the package `basePath` and asset prefix.

---

## 🔷 Types

### AuthoringAppDependencies

Configuration object for `createAuthoringAppHandler`.

<details>
<summary><strong>Properties</strong></summary>

| Property   | Type                    | Description                              |
| ---------- | ----------------------- | ---------------------------------------- |
| `services` | [`Services`](#services) | Service collection from `createServices` |

</details>

---

### DataAccessConfig

Configuration object for `createDataAccess`.

<details>
<summary><strong>Properties</strong></summary>

| Property        | Type         | Description                                                                  |
| --------------- | ------------ | ---------------------------------------------------------------------------- |
| `coreApiConfig` | `ApiConfig`  | Core API connection details from `@ministryofjustice/hmpps-rest-client`      |
| `authConfig`    | `AuthConfig` | HMPPS Auth connection details from `@ministryofjustice/hmpps-auth-clients`   |
| `tokenStore`    | `TokenStore` | Token store implementation from `@ministryofjustice/hmpps-auth-clients`      |

</details>

---

### DataAccess

Object containing the API clients created by `createDataAccess`.

<details>
<summary><strong>Properties</strong></summary>

| Property               | Description                         |
| ---------------------- | ----------------------------------- |
| `hmppsAuthClient`      | Authentication client               |
| `dataSourceApiClient`  | Core API client exposed by the data access layer |
| `dataProductApiClient` | Core API client exposed by the data access layer |

</details>

---

### Services

Object containing the business logic services created by `createServices`.

<details>
<summary><strong>Properties</strong></summary>

| Property             | Description                    |
| -------------------- | ------------------------------ |
| `dataSourceService`  | Service exposed by the package business layer |
| `dataProductService` | Service exposed by the package business layer |

</details>

---

## 📦 Publishing

Published to npm via the [Publish package GitHub action](https://github.com/modular-data/hmpps-authoring-lib-ui/actions/workflows/publish.yml).

> ⚠️
> `package.json` uses `9999.9999.9999` as a placeholder version.
> This is replaced with the actual semantic version during the publish workflow.

---

## 🛠️ Development

<details>
<summary><strong>Click to expand development instructions</strong></summary>

### Running Locally

Run the package from the Nx workspace root:

```bash
npm exec -- nx run @modular-data/hmpps-authoring-lib-ui:dev
```

### Helpful Nx Commands

| Command | Purpose |
| ------- | ------- |
| `npm exec -- nx run @modular-data/hmpps-authoring-lib-ui:dev` | Starts the embedded Next.js app for local development |
| `npm exec -- nx run @modular-data/hmpps-authoring-lib-ui:build` | Builds the Next.js application and synced assets |
| `npm exec -- nx run @modular-data/hmpps-authoring-lib-ui:build-runtime` | Compiles the published runtime entrypoint from `src/index.ts` |
| `npm exec -- nx run @modular-data/hmpps-authoring-lib-ui:generate-contracts` | Regenerates generated core API contracts |
| `npm exec -- nx run @modular-data/hmpps-authoring-lib-ui:package` | Prepares and validates the publishable package contents |

### OpenAPI Contracts

Generated files are written to:

- `apps/hmpps-authoring-lib-ui/src/generated/core-api`

The `generate-contracts` target loads variables from:

- `apps/hmpps-authoring-lib-ui/.env`

Environment variables:

- `OPEN_API_DOCS_URL`: OpenAPI docs URL or local file path.
  Default: `http://localhost:8082/v3/api-docs`

Generated files are committed to git. Do not manually edit generated files.

</details>

---

## 📄 Changelog

See [CHANGELOG.md](https://github.com/modular-data/hmpps-authoring-lib-ui/blob/main/CHANGELOG.md)

---

## 📜 License

[MIT](https://opensource.org/licenses/MIT)
