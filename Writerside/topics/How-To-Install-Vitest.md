# How To Install Vitest

## Prerequisites

[See Prerequisites](Guides.md)

## Step 1 — Install Vitest

```Bash
pnpm i -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react
```

## Step 2 — Configure Vitest

### Browser Configuration

At the root of your project (whether React or NestJS), create a `vitest.config.ts` file with the
following content:

```typescript
import { defineConfig } from 'vite';

const config = require.resolve('@kurocado-studio/style-guide/vitest/web');

export default defineConfig(config);
```

Create a `setup.web.ts` file to configure the testing environment before running tests:

```typescript
require.resolve('@kurocado-studio/style-guide/vitest/setup-web');
```

### Node.js Configuration

```typescript
import { defineConfig } from 'vite';

const config = require.resolve('@kurocado-studio/style-guide/vitest/node');

export default defineConfig(config);
```

Create a `setup.node.ts` file to configure the testing environment before running tests:

```typescript
require.resolve('@kurocado-studio/style-guide/vitest/setup-node');
```

## Step 3 — Add Testing Scripts

Add the following scripts to your package.json to streamline the testing process:

<note>The <a href="Lint.md">Code-Quality Workflow</a> uses the `test` command in the CI/CD
pipeline</note>

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest run --coverage",
    "test:ci": "vitest run --reporter=dot"
  }
}
```

## Step 4 — Integrate Vitest with Your Code Editor

To enhance your development workflow, integrate Vitest with your code editor to run tests and view
results seamlessly.

### Visual Studio Code

1. **Install the Vitest Extension:**
   - Open VS Code
   - Go to the Extensions view by clicking the square con in the sidebar or pressing CTRL+SHIFT+X
   - Search for “Vitest” and install the extension by antfu
2. **Configure the Extension:**
   - The extension should automatically detect your Vitest configuration
   - You can run and debug tests directly from the editor’s interface
3. **Run Tests from the Editor:**
   - Open a test file
   - Click the run icon next to the test cases to execute them individually
