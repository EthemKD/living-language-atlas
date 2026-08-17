import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = new URL('../', import.meta.url);
const sourceRoot = new URL('src/', root);
const themePrefix = 'theme/';

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return nested.flat();
}

const rules = [
  { id: 'hardcoded-color', pattern: /#[0-9a-fA-F]{3,8}\b/g },
  { id: 'raw-font-size', pattern: /fontSize\s*:\s*\d+/g },
  { id: 'raw-spacing', pattern: /(?:padding|margin|gap)[A-Za-z]*\s*:\s*\d+/g },
  { id: 'raw-radius', pattern: /borderRadius\s*:\s*\d+/g },
  { id: 'legacy-shadow', pattern: /shadow(?:Color|Offset|Opacity|Radius)|elevation\s*:/g },
  { id: 'direct-react-navigation', pattern: /from ['"]@react-navigation\//g },
  { id: 'decorative-gradient-or-glass', pattern: /LinearGradient|expo-glass-effect|GlassView/g },
];

const files = (await walk(sourceRoot.pathname)).filter((file) => ['.ts', '.tsx'].includes(extname(file)));
const findings = [];
let sourceLines = 0;

for (const file of files) {
  const relativePath = relative(sourceRoot.pathname, file);
  const text = await readFile(file, 'utf8');
  sourceLines += text.split('\n').length;
  if (relativePath.startsWith(themePrefix)) continue;
  for (const rule of rules) {
    const matches = [...text.matchAll(rule.pattern)];
    for (const match of matches) {
      const line = text.slice(0, match.index).split('\n').length;
      findings.push({ rule: rule.id, file: `src/${relativePath}`, line, match: match[0] });
    }
  }
}

const blocking = findings.filter((finding) => finding.rule !== 'decorative-gradient-or-glass');
console.log(`Design audit: ${files.length} files, ${sourceLines} lines, ${findings.length} findings.`);
for (const finding of findings) {
  console.log(`${finding.rule}: ${finding.file}:${finding.line} (${finding.match})`);
}
if (blocking.length > 0) process.exitCode = 1;
