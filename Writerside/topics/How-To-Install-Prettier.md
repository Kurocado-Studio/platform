# Prettier

**Prerequisites:**

The styleguide needs to be installed as a development dependency:

```bash
  pnpm i -D @kurocado-studio/styleguide
```

## Install Prettier

Install Prettier as a development dependency:

```bash
pnpm i -D prettier
```

## Configure Prettier

Open `prettier.config.js` in your code editor and add the following configuration:

```javascript
export { prettierConfig as default } from '@kurocado-studio/styleguide';
```

[See all prettier options](https://github.com/Kurocado-Studio/styleguide/tree/main/src/prettier/index.js)

## Add scripts

```json
{
  "scripts": {
    "prettier:check": "prettier --check .",
    "prettier:fix": "prettier --check . --write"
  }
}
```
