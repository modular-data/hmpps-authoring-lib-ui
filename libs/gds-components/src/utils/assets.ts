import { cp, mkdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// TODO: Revisit this file and all usages after first priority tasks are complete.

const require = createRequire(import.meta.url);

const MANAGED_ASSET_ENTRIES = [
  { name: 'fonts', recursive: true },
  { name: 'images', recursive: true },
  { name: 'rebrand', recursive: true },
  { name: 'manifest.json', recursive: false },
] as const;

export const resolveAssetsDir = (): string => {
  const govukFrontendPackagePath = require.resolve(
    'govuk-frontend/package.json',
  );

  return join(dirname(govukFrontendPackagePath), 'dist/govuk/assets');
};

export const copyAssetsTo = async (destination: string): Promise<void> => {
  const sourceRoot = resolveAssetsDir();

  await mkdir(destination, { recursive: true });

  await Promise.all(
    MANAGED_ASSET_ENTRIES.map(async ({ name, recursive }) => {
      const sourcePath = join(sourceRoot, name);
      const destinationPath = join(destination, name);

      await rm(destinationPath, { recursive: true, force: true });
      await cp(sourcePath, destinationPath, { recursive, force: true });
    }),
  );
};
