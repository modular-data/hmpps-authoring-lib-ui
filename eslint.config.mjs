import createHmppsConfig from '@ministryofjustice/eslint-config-hmpps'

const extraIgnorePaths = ['.history']

const extraPathsAllowingDevDependencies = ['.allowed-scripts.mjs']

const eslintConfig = createHmppsConfig({
  extraIgnorePaths,
  extraPathsAllowingDevDependencies,
})

eslintConfig.push({
  name: 'common-rules',
  files: ['**/*.{js,ts,mjs}'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-duplicate-imports': 'error',
    'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: ['return', 'if', 'switch'] }],
    curly: ['error', 'all'],
  },
})

eslintConfig.push({
  name: 'typescript-rules',
  files: ['**/*.{ts}'],
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
  },
})

eslintConfig.push({
  name: 'frontend-es2022',
  files: ['assets/**/*.js', 'assets/**/*.mjs'],
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

export default eslintConfig
