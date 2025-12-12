const childProcess = require('node:child_process')
const path = require('node:path')
const { glob } = require('glob')
const chokidar = require('chokidar')
const buildAssets = require('./assets.config')
const buildApp = require('./app.config')

const repoRoot = path.resolve(__dirname, '..')

const sourceRoot = path.join(repoRoot, 'server')
const sourceAssetsRoot = path.join(repoRoot, 'assets')

const distRoot = path.join(repoRoot, 'dist')
const distAssetsRoot = path.join(distRoot, 'assets')

const testFilePatterns = ['**/*.test.ts', '**/*.spec.ts']

/**
 * Simple debounce helper
 * @param {Function} fn - The function to debounce
 * @param {number} delay - The delay in ms
 * @returns {Function}
 */
function debounce(fn, delay = 200) {
  // TODO: MOJ-331 | Replace by the debounce package from dependencies
  /** @type {number} */
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

const logError = error => process.stderr.write(`${error}\n`)

/**
 * Configuration for build steps
 * @type {BuildConfig}
 */
const buildConfig = {
  isProduction: process.env.NODE_ENV === 'production',

  app: {
    outbase: sourceRoot,
    outDir: distRoot,
    entryPoints: glob.sync(path.join(sourceRoot, '**/*.ts'), {
      ignore: testFilePatterns,
    }),
    copy: [
      {
        from: path.join(sourceRoot, 'views/**/*'),
        to: path.join(distRoot, 'views'),
      },
    ],
  },

  assets: {
    outDir: distAssetsRoot,
    entryPoints: glob.sync([
      path.join(sourceAssetsRoot, 'js/**/*.entry.js'),
      path.join(sourceAssetsRoot, 'styles/**/*.entry.scss'),
    ]),
    copy: [
      {
        from: path.join(sourceAssetsRoot, 'images/**/*'),
        to: path.join(distAssetsRoot, 'images'),
      },
    ],
    clear: glob.sync(path.join(distAssetsRoot, '{css,js}')),
  },
}

const main = () => {
  // TODO: Complete refactoring of this code
  /** @type {chokidar.WatchOptions} */
  const chokidarOptions = {
    persistent: true,
    ignoreInitial: true,
  }

  const args = process.argv

  if (args.includes('--build')) {
    Promise.all([buildApp(buildConfig), buildAssets(buildConfig)]).catch(error => {
      logError(error)
      process.exit(1)
    })
  }

  /** @type {string | null} */
  let serverEnv = null

  if (args.includes('--dev-server')) {
    serverEnv = '.env'
  }

  if (args.includes('--dev-test-server')) {
    serverEnv = 'feature.env'
  }

  if (serverEnv) {
    /** @type {childProcess.ChildProcess | null} */
    let serverProcess = null
    chokidar.watch(distRoot).on(
      'all',
      debounce(() => {
        if (serverProcess) {
          serverProcess.kill()
        }
        process.stderr.write('Restarting server...\n')
        serverProcess = childProcess.spawn('node', [`--env-file=${serverEnv}`, path.join(distRoot, 'server.js')], {
          stdio: 'inherit',
        })
      }),
    )
  }

  if (args.includes('--watch')) {
    process.stderr.write('\u{1b}[1m\u{1F52D} Watching for changes...\u{1b}[0m\n')

    chokidar.watch(sourceAssetsRoot, chokidarOptions).on(
      'all',
      debounce(() => buildAssets(buildConfig).catch(logError)),
    )

    chokidar.watch(sourceRoot, { ...chokidarOptions, ignored: testFilePatterns }).on(
      'all',
      debounce(() => buildApp(buildConfig).catch(logError)),
    )
  }
}

main()
