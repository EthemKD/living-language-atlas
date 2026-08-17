# Living Language Atlas

An Expo SDK 57 reference build for a mobile language-learning product that separates habit, skill evidence and economy.
The interface is English-first; Russian is the first content track.

This repository is a working product slice, not a generated landing page. It contains native iOS/Android navigation,
a 12-district mission atlas, an interactive real-life mission, evidence-led practice, a source-bound Studio and an
inspectable learner record.

## What works now

- Native `Atlas`, `Practice`, `Studio` and `You` tabs on iOS and Android
- A complete 12-district Russian foundation reference track: 48 skill bundles and 36 mission summaries
- Interactive `D03-M01 · Find the platform` flow with observe, choose, interpret, produce and transfer beats
- Deterministic practice checks for three current/due skill bundles
- Source-bound Studio planning that does not pretend an AI model is connected
- Separate habit, evidence and practice-credit displays
- Automated content-contract tests and a design-system drift audit

Content is explicitly a reference draft. Russian-language accuracy and assessment claims remain expert-review gated;
the app does not claim CEFR or TORFL certification.

## Run it

Requirements: Node 24+, npm and Expo Go.

```bash
npm install
npx expo start
```

Try Expo Go first. A custom native build is not required by the current slice.

Quality checks:

```bash
npm run check:content
npm test
npm run typecheck
npm run lint
```

## Product shape

| Area | Job | Explicit non-goal |
|---|---|---|
| Atlas | Turn a curriculum into a visible route of real-life missions | A reskinned linear lesson tree |
| Practice | Schedule work from evidence gaps and decay | Let streaks or XP imply ability |
| Studio | Transform an attached source into an explanation, drill or bounded role-play | A blank generic chatbot |
| You | Keep habit, evidence and credits legible and separate | One opaque “language score” |

## Repository map

```text
src/app/          Expo Router route files only
src/screens/      Screen bodies
src/components/   Reused interface components
src/theme/        The single token and semantic-color entry point
src/content/      Versioned reference curriculum and demo mission contracts
src/domain/       Deterministic learning/session state
scripts/          Content and design checks
tests/            Node contract tests
docs/             Research, product decisions and design doctrine
```

Read [the research index](docs/research/README.md) for decision traceability and
[the anti-slop review](docs/design/anti-slop-checklist.md) before changing the interface.

## Contribution rules

- One product concern per pull request.
- Never put reusable UI, data or utilities in `src/app`.
- Never invent learner activity, community liquidity, AI output or language-review status.
- A new learning claim needs an observation contract, promotion boundary and traceability fields.
- A new visual primitive needs repeated evidence; otherwise compose existing native controls.

See [AGENTS.md](AGENTS.md) and the pull-request template for the enforceable checklist.
