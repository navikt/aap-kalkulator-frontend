const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '.yarn/**',
      'next-env.d.ts',
    ],
  },
  ...compat.extends('@navikt/eslint-config-aap', 'next/core-web-vitals'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // Use the TypeScript-aware check instead of the core check.
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
];
