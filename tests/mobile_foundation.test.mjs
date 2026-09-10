import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

test('NativeWind v4 configuration files exist and declare correct presets and inputs', () => {
  // 1. tailwind.config.js
  const tailwindPath = path.join(projectRoot, 'tailwind.config.js');
  assert.ok(fs.existsSync(tailwindPath), 'tailwind.config.js must exist');
  const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
  assert.match(tailwindContent, /nativewind\/preset/, 'tailwind.config.js must include nativewind/preset');
  assert.match(tailwindContent, /\.\/src\/\*\*\/\*\.\{js,jsx,ts,tsx\}/, 'tailwind.config.js must target src content');

  // 2. global.css
  const globalCssPath = path.join(projectRoot, 'global.css');
  assert.ok(fs.existsSync(globalCssPath), 'global.css must exist');
  const globalCssContent = fs.readFileSync(globalCssPath, 'utf8');
  assert.match(globalCssContent, /@tailwind\s+base;/, 'global.css must have @tailwind base');
  assert.match(globalCssContent, /@tailwind\s+components;/, 'global.css must have @tailwind components');
  assert.match(globalCssContent, /@tailwind\s+utilities;/, 'global.css must have @tailwind utilities');

  // 3. metro.config.js
  const metroPath = path.join(projectRoot, 'metro.config.js');
  assert.ok(fs.existsSync(metroPath), 'metro.config.js must exist');
  const metroContent = fs.readFileSync(metroPath, 'utf8');
  assert.match(metroContent, /withNativeWind/, 'metro.config.js must use withNativeWind wrapper');
  assert.match(metroContent, /\.\/global\.css/, 'metro.config.js must reference ./global.css');

  // 4. nativewind-env.d.ts
  const envPath = path.join(projectRoot, 'nativewind-env.d.ts');
  assert.ok(fs.existsSync(envPath), 'nativewind-env.d.ts must exist');
  const envContent = fs.readFileSync(envPath, 'utf8');
  assert.match(envContent, /<reference\s+types="nativewind\/types"\s*\/>/, 'nativewind-env.d.ts must reference types');
});

test('Gluestack v2 Button component provides composable primitives with NativeWind styling', () => {
  const buttonPath = path.join(projectRoot, 'src', 'components', 'ui', 'button.tsx');
  assert.ok(fs.existsSync(buttonPath), 'src/components/ui/button.tsx must exist');
  const content = fs.readFileSync(buttonPath, 'utf8');

  // Subcomponents export check
  assert.match(content, /export const Button\b/, 'Must export Button');
  assert.match(content, /export const ButtonText\b/, 'Must export ButtonText');
  assert.match(content, /export const ButtonSpinner\b/, 'Must export ButtonSpinner');
  assert.match(content, /export const ButtonIcon\b/, 'Must export ButtonIcon');

  // NativeWind class integration check
  assert.match(content, /flex-row items-center justify-center/, 'Must use Tailwind flex/layout classes');
  assert.match(content, /bg-indigo-600/, 'Must support primary action styling');
  assert.match(content, /border-indigo-600/, 'Must support outline variant styling');
  assert.match(content, /accessibilityRole="button"/, 'Must ensure accessibility compliance');
});

test('Lucide React Native and react-native-svg are installed and resolvable', async () => {
  const pkgPath = path.join(projectRoot, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

  assert.ok(pkg.dependencies['lucide-react-native'], 'lucide-react-native must be in dependencies');
  assert.equal(pkg.dependencies['react-native-svg'], '15.15.4', 'react-native-svg must be pinned to 15.15.4 for Expo SDK 57');

  // Verify resolution of both packages from node_modules
  const lucidePkgPath = path.join(projectRoot, 'node_modules', 'lucide-react-native', 'package.json');
  const svgPkgPath = path.join(projectRoot, 'node_modules', 'react-native-svg', 'package.json');

  assert.ok(fs.existsSync(lucidePkgPath), 'lucide-react-native/package.json must exist');
  assert.ok(fs.existsSync(svgPkgPath), 'react-native-svg/package.json must exist');

  const lucidePkg = JSON.parse(fs.readFileSync(lucidePkgPath, 'utf8'));
  const svgPkg = JSON.parse(fs.readFileSync(svgPkgPath, 'utf8'));

  assert.equal(svgPkg.version, '15.15.4', 'Installed react-native-svg must be 15.15.4');
  assert.equal(lucidePkg.license, 'ISC', 'lucide-react-native license must be ISC');

  // Verify static typings export required icons
  const typingsPath = path.join(path.dirname(lucidePkgPath), lucidePkg.typings || 'dist/types/lucide-react-native.d.ts');
  assert.ok(fs.existsSync(typingsPath), 'lucide typings file must exist');
  const typingsContent = fs.readFileSync(typingsPath, 'utf8');
  assert.match(typingsContent, /Compass/, 'lucide-react-native must declare Compass icon');
  assert.match(typingsContent, /BookOpen/, 'lucide-react-native must declare BookOpen icon');
  assert.match(typingsContent, /Check/, 'lucide-react-native must declare Check icon');
});

test('Noto Sans font loading and Latin/Cyrillic glyph support path is configured', () => {
  const pkgPath = path.join(projectRoot, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert.ok(pkg.dependencies['@expo-google-fonts/noto-sans'], '@expo-google-fonts/noto-sans must be in dependencies');

  // Root layout loads Noto Sans
  const layoutPath = path.join(projectRoot, 'src', 'app', '_layout.tsx');
  const layoutContent = fs.readFileSync(layoutPath, 'utf8');
  assert.match(layoutContent, /@expo-google-fonts\/noto-sans/, 'RootLayout must import from @expo-google-fonts/noto-sans');
  assert.match(layoutContent, /useFonts\(/, 'RootLayout must call useFonts');
  assert.match(layoutContent, /NotoSans_400Regular/, 'RootLayout must load NotoSans_400Regular');

  // Showcase demonstrates Latin and Cyrillic scripts
  const showcasePath = path.join(projectRoot, 'src', 'components', 'mobile-foundation-showcase.tsx');
  assert.ok(fs.existsSync(showcasePath), 'Showcase component must exist');
  const showcaseContent = fs.readFileSync(showcasePath, 'utf8');
  assert.match(showcaseContent, /Guten Tag!/, 'Must demonstrate German/Latin glyph string');
  assert.match(showcaseContent, /Живой языковой атлас/, 'Must demonstrate Cyrillic glyph string');
});

test('Third-party licensing notice covers MIT, ISC, and OFL-1.1 with dual-boundary separation', () => {
  const sourcingNoticePath = path.join(projectRoot, 'docs', 'sourcing', 'LICENSE_NOTICES.md');
  assert.ok(fs.existsSync(sourcingNoticePath), 'docs/sourcing/LICENSE_NOTICES.md must exist');
  const sourcingContent = fs.readFileSync(sourcingNoticePath, 'utf8');

  // Obligations check
  assert.match(sourcingContent, /SIL Open Font License/i, 'Must document OFL-1.1 for Noto Sans');
  assert.match(sourcingContent, /MIT License/i, 'Must document MIT for Expo, React, Lucide, NativeWind');
  assert.match(sourcingContent, /ISC/i, 'Must document ISC notices');

  // Boundary separation check
  assert.match(sourcingContent, /Dual-Boundary Architecture/i, 'Must detail dual-boundary architecture');
  assert.match(sourcingContent, /Proprietary Core/i, 'Must maintain proprietary core engine boundary');
  assert.match(sourcingContent, /Pedagogical Curriculum/i, 'Must maintain proprietary curriculum boundary');

  // Root LICENSE_NOTICES links to sourcing notices
  const rootNoticePath = path.join(projectRoot, 'LICENSE_NOTICES.md');
  const rootContent = fs.readFileSync(rootNoticePath, 'utf8');
  assert.match(rootContent, /docs\/sourcing\/LICENSE_NOTICES\.md/, 'Root notices must link to sourcing notices');
});
