# HMPPS Authoring Lib UI

App-specific documentation lives here. Workspace-level Nx guidance is in the repository root [README](/Users/oleksandrkolesnikov/Documents/md/hmpps-authoring-lib-ui/README.md).

## OpenAPI contracts

### Output

Generated files are written to:

- `apps/hmpps-authoring-lib-ui/src/generated/core-api`

### Environment variables

- `OPEN_API_DOCS_URL`: OpenAPI docs URL or local file path.
  - Default: `http://localhost:8082/v3/api-docs`

The `generate-contracts` Nx target loads variables from:

- `apps/hmpps-authoring-lib-ui/.env`

### Commands

- Generate contracts:
  - `npm exec -- nx run @modular-data/hmpps-authoring-lib-ui:generate-contracts`

### Repository rule

Generated files are committed to git. Do not manually edit generated files.
