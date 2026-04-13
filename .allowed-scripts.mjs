import { configureAllowedScripts } from '@ministryofjustice/hmpps-npm-script-allowlist';

export default configureAllowedScripts({
  allowlist: {
    'node_modules/@parcel/watcher@2.5.4': 'FORBID',
    'node_modules/@swc/core@1.5.29': 'ALLOW',
    'node_modules/core-js-pure@3.48.0': 'FORBID',
    'node_modules/dtrace-provider@0.8.8': 'FORBID',
    'node_modules/esbuild@0.27.2': 'ALLOW',
    'node_modules/less@4.5.1': 'FORBID',
    'node_modules/nx@22.3.3': 'FORBID',
    'node_modules/sharp@0.34.5': 'ALLOW',
    'node_modules/unrs-resolver@1.11.1': 'FORBID',
  },
});
