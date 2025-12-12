const { copy: copyPlugin } = require('esbuild-plugin-copy')
const { typecheckPlugin } = require('@jgoz/esbuild-plugin-typecheck')
const esbuild = require('esbuild')

/**
 * Build typescript application into CommonJS
 * @type {BuildStep}
 */
const buildApp = buildConfig => {
  const { entryPoints, outDir, outbase, copy } = buildConfig.app

  return esbuild.build({
    outbase,
    outdir: outDir,
    entryPoints,
    bundle: false,
    sourcemap: true,
    platform: 'node',
    format: 'cjs',
    plugins: [
      typecheckPlugin(),
      copyPlugin({
        resolveFrom: 'cwd',
        assets: copy,
      }),
    ],
  })
}

/**
 * @param {BuildConfig} buildConfig
 * @returns {Promise}
 */
module.exports = buildConfig => {
  process.stderr.write('\u{1b}[1m\u{2728} Building app...\u{1b}[0m\n')

  return buildApp(buildConfig)
}
