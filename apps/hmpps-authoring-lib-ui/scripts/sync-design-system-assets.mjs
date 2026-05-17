import { rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { copyAssetsTo as copyGdsAssetsTo } from '@modular-data/gds-components/utils/assets';
import { copyAssetsTo as copyMojAssetsTo } from '@modular-data/moj-components/utils/assets';

const destination = fileURLToPath(new URL('../public/assets', import.meta.url));

await rm(destination, { recursive: true, force: true });
await copyGdsAssetsTo(destination);
await copyMojAssetsTo(destination);
