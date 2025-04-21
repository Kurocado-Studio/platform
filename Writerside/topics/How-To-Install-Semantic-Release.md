# Semantic Release

**Prerequisites:**

The styleguide needs to be installed as a development dependency:

```bash
  pnpm i -D @kurocado-studio/styleguide
```

## Install Semantic Release

Next, install ESLint as a development dependency:

```bash
pnpm install --save-dev semantic-release@23.1.1
```

## Configure Semantic Release

- Create a `.releaserc.js` file

**For apps that won't be published on NPM but for which you want to use semantic release.**

```javascript
export { semanticReleaseAppConfig as default } from '@kurocado-studio/styleguide';
```

**For packages that will be published on NPM.**

```javascript
export { semanticReleaseNpmConfig as default } from '@kurocado-studio/styleguide';
```

## Add scripts

```json
{
  "scripts": {
    "semantic-release": "semantic-release"
  }
}
```
