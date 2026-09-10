# LLA-A057 — BRAIN Expo / React Native / New Architecture Version Matrix v1

**Decision proposal:** `PIN_NOW`
**Reviewed:** 2026-09-10
**Repository:** `main@38484be3189dbdd98c09a9417901bcbbfb30f9fa`

## Baseline

`package.json` declares Expo `~57.0.8`, React Native `0.86.0`, React `19.2.3`, React Native Web `~0.21.0`, and Expo Router `~57.0.8`. The lockfile resolves the Expo/Router patch family to `57.0.13`. GitHub workflows use Node 24. `app.json` uses Expo Router, typed routes and the React Compiler experiment; it does not opt out of New Architecture. No `eas.json` is present.

## Findings

- Expo’s official SDK matrix maps SDK 57 to React Native 0.86, React 19.2.3, React Native Web 0.21.0, and Node minimum 22.13.x. The repository’s principal tuple matches.
- Expo targets one React Native version per SDK; React Native 0.87 must not be substituted independently into SDK 57.
- Expo SDK 55+ runs exclusively on New Architecture; it cannot be disabled. Future native dependencies must be tested against that architecture.
- Expo Go is a limited playground. Custom native code/configuration and release-grade device evidence require a project development build.

## Decision

Keep the SDK 57 family and lockfile unchanged before UI dependency selection. Do not upgrade to RN 0.87 or a pre-release Expo SDK. This is a compatibility pin, not a release-readiness claim.

## Follow-up

The tilde ranges versus lockfile patch versions require a later tooling/ADR decision. A later atom must also decide the explicit Node engines policy and React 19 peer-dependency handling. A060 must use the development-build path once native libraries/configuration are involved.

## Sources

- [Expo SDK reference](https://docs.expo.dev/versions/latest/)
- [Expo New Architecture guide](https://docs.expo.dev/guides/new-architecture/)
- [Expo upgrade guide](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)
- [Expo FAQ](https://docs.expo.dev/faq/)
- [Expo development-build FAQ](https://docs.expo.dev/develop/development-builds/faq/)
- [React Native releases](https://reactnative.dev/docs/0.85/releases)
- [React Native 0.87 announcement](https://reactnative.dev/blog/2026/08/11/react-native-0.87)
