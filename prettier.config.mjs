export default {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^~/(.*)$',
    '^@/(.*)$',
    '^app/(.*)$',
    '^src/(.*)$',
    '^[../]',
    '^./',
  ],
  importOrderParserPlugins: ['jsx', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: true,
  overrides: [
    {
      files: ['*.yaml', '*.yml'],
      options: {
        parser: 'yaml',
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['*.md'],
      options: {
        parser: 'markdown',
        printWidth: 100,
        proseWrap: 'always',
      },
    },
  ],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-packagejson',
    'prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
