//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../..');

// Inferred Nx targets run `next` from the app directory. `withNx` creates the
// project graph and expects to resolve workspace paths from the workspace root.
if (process.env.NX_TASK_TARGET_TARGET && process.cwd() !== workspaceRoot) {
  process.chdir(workspaceRoot);
}

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  sassOptions: {
    // TODO: Remove once govuk-frontend stops emitting Sass deprecation warnings from dependency imports.
    quietDeps: true,
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
