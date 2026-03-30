//@ts-check

const { composePlugins, withNx } = require('@nx/next');

const BASE_PATH = '/authoring'; // TODO: Extract this to a constant in a separate file.

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
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
