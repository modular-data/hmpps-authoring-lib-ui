import { defineConfig } from '@hey-api/openapi-ts';
import { join } from 'node:path';
import { createSchemaContractWorkarounds } from './openapi-ts.contract-workarounds';

const DEFAULT_OPEN_API_DOCS_URL = 'http://localhost:8082/v3/api-docs';
const outputPath = join(__dirname, 'src/generated/core-api');
const PRESERVE_ORIGINAL_SCHEMA_NAMES = new Set(['ErrorResponse']);

const transformSchemaName = (name: string) => {
  if (PRESERVE_ORIGINAL_SCHEMA_NAMES.has(name)) {
    return name;
  }

  return name
    .replace(/Dto$/, '')
    .replace(/Request$/, 'Input')
    .replace(/Response$/, '');
};

export default defineConfig({
  input: process.env.OPEN_API_DOCS_URL ?? DEFAULT_OPEN_API_DOCS_URL,
  output: outputPath,
  parser: {
    patch: {
      schemas: createSchemaContractWorkarounds(transformSchemaName),
    },
    transforms: {
      enums: 'root',
      schemaName: transformSchemaName,
    },
  },
  plugins: [
    {
      name: '@hey-api/typescript',
      enums: 'javascript',
    },
    {
      name: 'zod',
      types: {
        infer: true,
      },
    },
  ],
});
