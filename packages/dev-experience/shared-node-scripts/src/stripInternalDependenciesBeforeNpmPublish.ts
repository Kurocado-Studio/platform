import fs from 'node:fs';
import path from 'node:path';

interface PackageJson {
  dependencies?: Record<string, string>;
  [key: string]: unknown;
}

const packageDirection = process.argv[2];

if (!packageDirection) {
  throw new Error('❌ Please provide a relative path to the package directory');
}

const packagePath = path.resolve(
  process.cwd(),
  packageDirection,
  'package.json',
);

if (!fs.existsSync(packagePath)) {
  throw new Error(`❌ package.json not found at: ${packagePath}`);
}

const rawJson = fs.readFileSync(packagePath, 'utf8');
const packageJson: PackageJson = JSON.parse(rawJson);

if (packageJson.dependencies) {
  const removed: string[] = [];

  for (const [dep, version] of Object.entries(packageJson.dependencies)) {
    if (version === 'workspace:*' || version?.startsWith('workspace:')) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete packageJson.dependencies[dep];
      removed.push(dep);
    }
  }

  if (removed.length > 0) {
    // eslint-disable-next-line unicorn/no-null
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(
      `✔ Stripped workspace dependencies from ${packageDirection}: ${removed.join(', ')}`,
    );
  } else {
    console.log(`ℹ No workspace:* dependencies found in ${packageDirection}`);
  }
} else {
  console.log(`ℹ No dependencies found in ${packageDirection}`);
}
