import { cp, mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);

const MANAGED_ASSET_ENTRIES = [{ name: 'images', recursive: true }] as const;

export const resolveAssetsDir = (): string => {
  const mojFrontendPackagePath = require.resolve(
    '@ministryofjustice/frontend/package.json',
  );

  return join(dirname(mojFrontendPackagePath), 'moj/assets');
};

export const copyAssetsTo = async (destination: string): Promise<void> => {
  const sourceRoot = resolveAssetsDir();

  await mkdir(destination, { recursive: true });

  await Promise.all(
    MANAGED_ASSET_ENTRIES.map(async ({ name, recursive }) => {
      const sourcePath = join(sourceRoot, name);
      const destinationPath = join(destination, name);

      await cp(sourcePath, destinationPath, { recursive, force: true });
    }),
  );
};
