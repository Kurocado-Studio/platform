# ESLint

**Prerequisites:**

The styleguide needs to be installed as a development dependency:

```bash
  pnpm i -D @kurocado-studio/styleguide
```

## Install ESLint

Install ESLint as a development dependency:

```bash
# ESLint is v9 or greater
pnpm i -D eslint
```

## Configure ESLint

### Browser Configuration

Create a `eslint.config.js` file with the following content for browser-based projects:

```javascript
import { defineESLintConfig, eslintReactConfig } from '@kurocado-studio/styleguide';

export default defineESLintConfig(eslintReactConfig);
```

### Node.js Configuration

Create a `eslint.config.mjs` file with the following content for node-based projects:

```javascript
import { defineESLintConfig, eslintNodeConfig } from '@kurocado-studio/styleguide';

export default defineESLintConfig(eslintNodeConfig);
```

## Add scripts

```json
"scripts": {
    "eslint-fix": "eslint --max-warnings=0 . --fix --no-warn-ignored",
    "lint": "eslint --max-warnings=0 . --no-warn-ignored"
}
```
