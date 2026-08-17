# Inspecting Living Language Atlas

## Fastest local check

From a terminal on the machine where you cloned the repository:

```bash
npm ci
npm run web
```

Expo opens the web build in a browser. It hot-reloads after local changes.

## Phone check

Install Expo Go, then run:

```bash
npx expo start
```

Scan the QR code on an Android or iPhone. Prefer the same Wi-Fi network as the computer. If LAN discovery is blocked,
use `npx expo start --tunnel`; it is slower but does not depend on local discovery.

## Exact committed web preview

Every push to `main` triggers the **web preview** GitHub Action. Once it succeeds:

1. Open **Actions** in the repository.
2. Open the latest **web preview** run.
3. Download `living-language-atlas-web-<commit SHA>` from **Artifacts**.
4. Extract it and serve the resulting `dist` directory with a static server.

This artifact is the exported web bundle for that exact commit. It is useful when a local checkout has uncommitted work.

## Quality signal

Before trusting a change, run:

```bash
npm run check
```

It executes the content contracts, design-system audit, Node tests, TypeScript check and Expo lint. The GitHub **quality**
workflow runs the same gate for every main-branch push.
