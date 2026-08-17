# Living Language Atlas

An Expo SDK 57 reference build for a mobile language-learning product that separates habit, skill evidence and economy.
The interface is English-first; Russian is the first content track.

This repository is a working product slice, not a generated landing page. Its primary path is a small, deterministic
First Encounter: read the mission script, introduce yourself, make a café request, repair a missed reply, then handle
one changed detail. It also contains evidence-led practice, a source-bound Studio and an inspectable learner record.

## What works now

- Native `Atlas`, `Practice`, `Studio` and `You` tabs on iOS and Android
- An authored `First Encounter` learning loop: four guided support stages, a changed-context café rehearsal and a later retrieval scene
- 21 deterministic, source-bound learning tasks: 17 in the initial route and four in a separate 24-hour delayed-retrieval return
- An in-app reading lens with optional transliteration; it is clearly labelled as a reference aid, not pronunciation scoring
- Durable on-device progress and a visible later-retrieval schedule, with no voice, conversation, identity or sensitive data stored
- A complete 12-district Russian foundation reference track: 48 skill bundles and 36 mission summaries, retained as a
  longer-horizon curriculum reference rather than a fake unlock tree
- A state-aware Practice tab plus Recall Lens, which uses only phrases already open in the learner's route
- A source-bound Phrase Desk rather than a fake connected AI chat surface
- An inspectable local learning record and in-app Source Notes that distinguish scope evidence from phrase approval
- Automated content-contract tests and a design-system drift audit

Content is explicitly a reference draft. The First Encounter strings, their eventual audio, and all assessment claims
remain qualified-Russian-review gated; the app does not claim CEFR or TORFL certification. Its curriculum scope is
traceable in `src/content/source-registry.json` to the Council of Europe plus Russian-language university/institute
materials. The later-retrieval design also cites primary memory research, while explicitly refusing to call 24 hours a
universal optimum. Those links constrain scope and are not presented as individual phrase approval.

## Run it

Requirements: Node 24+, npm and Expo Go for an Android/iOS device check.

```bash
npm ci
npm run web
```

For a phone check, run `npx expo start`, then scan the QR code in Expo Go. Keep the computer and phone on the same Wi-Fi;
if that network blocks discovery, run `npx expo start --tunnel` instead. A custom native build is not required by the
current slice.

To create the same static web bundle used by CI:

```bash
npm run preview:web
```

Each push to `main` also runs the **web preview** GitHub Action. Open its successful run, download the artifact, extract
it, and serve the extracted `dist` folder with any static server to inspect that exact commit.

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
