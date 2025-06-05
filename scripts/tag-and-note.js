import { execSync } from 'node:child_process';

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node tag-and-note.js <package-name> <version>');
  process.exit(1);
}

const [packageName, version] = args;

const tag = `${packageName}@${version}`;

try {
  console.log(`🔖 Creating Git tag: ${tag}`);
  execSync(`git tag ${tag}`, { stdio: 'inherit' });

  console.log(`📝 Adding semantic-release note to: ${tag}`);
  execSync(
    `git notes --ref semantic-release add -f -m '{"channels":["null"]}' ${tag}`,
    { stdio: 'inherit' },
  );

  console.log(`🚀 Pushing tag ${tag}...`);
  execSync(`git push origin refs/tags/${tag}`, { stdio: 'inherit' });

  console.log(`💥 Forcing push of semantic-release notes...`);
  execSync(`git push --force origin refs/notes/semantic-release`, {
    stdio: 'inherit',
  });

  console.log(`✅ Done for ${tag}`);
} catch (error) {
  console.error(`❌ Error processing ${tag}:`, error.message);
  process.exit(1);
}
