import { defineConfig } from '@hey-api/openapi-ts';
import { join } from 'node:path';

const DEFAULT_OPEN_API_DOCS_URL = 'http://localhost:8082/v3/api-docs';
const outputPath = join(__dirname, 'src/generated/core-api');

const removeDtoSuffix = (name: string) => name.replace(/Dto$/, '');

export default defineConfig({
  input: process.env.OPEN_API_DOCS_URL ?? DEFAULT_OPEN_API_DOCS_URL,
  output: outputPath,
  parser: {
    transforms: {
      enums: 'root',
      schemaName: removeDtoSuffix,
      readWrite: {
        requests: '{{name}}Input',
      },
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
