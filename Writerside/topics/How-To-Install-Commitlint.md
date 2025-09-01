# Commitlint

**Prerequisites:**

The styleguide needs to be installed as a development dependency:

```bash
  pnpm i -D @kurocado-studio/styleguide
```

## Install Commitlint

```bash
pnpm i -D commitlint
```

## Configure Commitlint

To use our Commitlint configuration, add the following `.commitlintrc.cjs` file at the root of your
project.

```javascript
export { commitLintConfig as default } from '@kurocado-studio/styleguide';
```

**[See commitlint configuration](https://github.com/Kurocado-Studio/styleguide/blob/main/src/commitlint/index.js)**

## Add **scripts**

To simplify the linting process, add scripts to your `package.json`. Open `package.json` and add the
following under the `"scripts"` section:

```json
{
  "scripts": {
    "commitlint": "pnpm exec commitlint --edit .git/COMMIT_EDITMSG"
  }
}
```
