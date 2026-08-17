# ADR 0001: Expo SDK 57 with Expo Router and Native Tabs

Status: accepted

## Decision

Build the first mobile client on Expo SDK 57, React Native 0.86 and Expo Router. Use `src/app` file-based routes, a Stack
inside every tab and `expo-router/unstable-native-tabs` for the iOS/Android shell. Start in Expo Go and introduce custom
native builds only when a required module proves Expo Go insufficient.

## Why

- React Native recommends a framework such as Expo for new applications.
- The same TypeScript client targets Android, iOS and a functional web fallback.
- Native Tabs preserve iOS and Material navigation behavior without recreating it in JavaScript.
- Route files stay declarative while complex screens, content and domain logic remain separately testable.

## Consequences

- Native Tabs is still marked unstable; Expo SDK upgrades require a focused navigation regression pass.
- Platform-specific files are allowed when native and web shells genuinely differ.
- Direct imports from `@react-navigation/*` are prohibited in SDK 56+ code.
- The current slice must work in Expo Go; audio capture, payments and moderation may later require evaluated additions.
