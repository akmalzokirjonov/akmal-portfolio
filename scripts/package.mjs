import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, '_site');
// Explicit public-file allowlist: documentation, local reports, git files, and
// environment files can never enter the Pages artifact through this script.
const publicFiles = [
  'index.html', 'styles.css', 'app.js', '.nojekyll',
  'assets/favicon.svg',
  'assets/fonts/jetbrains-mono.ttf', 'assets/fonts/jetbrains-mono-license.txt',
  'assets/fonts/ibm-plex-mono.ttf', 'assets/fonts/ibm-plex-mono-license.txt',
];
if (existsSync(output)) throw new Error('The _site directory already exists. Use a fresh checkout for packaging.');
for (const relative of publicFiles) {
  const destination = join(output, relative);
  mkdirSync(dirname(destination), { recursive: true });
  cpSync(join(root, relative), destination);
}
const html = readFileSync(join(root, 'index.html'), 'utf8');
for (const [, target] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
  if (/^https:\/\//.test(target)) continue;
  if (!existsSync(join(output, target))) throw new Error(`Missing local asset: ${target}`);
}
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const updated = execFileSync('git', ['show', '-s', '--format=%cs', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{40}$/.test(commit) || !/^\d{4}-\d{2}-\d{2}$/.test(updated)) throw new Error('Invalid build metadata');
writeFileSync(join(output, 'build-info.json'), JSON.stringify({ commit, updated }) + '\n');
console.log(`Packaged ${publicFiles.length + 1} public files for ${commit.slice(0, 7)}.`);
