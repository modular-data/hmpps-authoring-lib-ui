import { fileURLToPath } from 'node:url';
import { copyAssetsTo } from '@modular-data/gds-components/utils/assets';

const destination = fileURLToPath(new URL('../public/assets', import.meta.url));

await copyAssetsTo(destination);
