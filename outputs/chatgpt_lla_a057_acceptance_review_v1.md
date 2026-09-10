# Living Language Atlas — LLA-A057 BRAIN Acceptance Review v1

**Decision:** `ACCEPTED`
**Quality:** `95/100`
**Atom:** `LLA-A057/270`
**Accepted:** 2026-09-10

## Scope

Version compatibility and New Architecture policy only. No package installation, upgrade, source-code change, native build, or device claim is included.

## Evidence reviewed

- Repository baseline: `main@38484be3189dbdd98c09a9417901bcbbfb30f9fa`.
- `package.json` and lockfile: Expo SDK 57 family, React Native `0.86.0`, React `19.2.3`, React Native Web `0.21.0`, Expo Router 57 family.
- GitHub workflows: Node 24; post-merge `checks` and `export` succeeded on `main@71e1807ed66c70ed24de1b0facb23c013f3dec26`.
- BRAIN report: `outputs/living_language_atlas_a057_brain_version_matrix_v1.md`.
- Second Brain bounded return: verified the matrix, found no primary-source contradiction, and identified only package-range drift, peer-dependency friction, missing explicit Node engines, and future development-build requirements.

## Accepted decision

`PIN_NOW`: retain Expo SDK 57 / React Native 0.86 / React 19.2.3. Do not independently upgrade React Native to 0.87 or use an Expo pre-release. Expo SDK 55+ New Architecture is mandatory. Expo Go is not release-grade evidence; development builds become mandatory when native libraries/configuration are introduced.

## Follow-up constraints

1. Treat `npm ci` plus the committed lockfile as the current reproducibility boundary.
2. Resolve explicit Node engine policy and React 19 peer-dependency handling in later dedicated ADR/research atoms.
3. A058 must inspect gluestack/NativeWind/Lucide/Noto against this exact matrix before any installation.
4. A060 must be the first bounded native/UI compatibility spike; it may not silently upgrade the SDK family.

## Sources

- https://docs.expo.dev/versions/latest/
- https://docs.expo.dev/guides/new-architecture/
- https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/
- https://docs.expo.dev/faq/
- https://docs.expo.dev/develop/development-builds/faq/
- https://reactnative.dev/docs/0.85/releases
- https://reactnative.dev/blog/2026/08/11/react-native-0.87
