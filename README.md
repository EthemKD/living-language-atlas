# Living Language Atlas

An Expo SDK 57 reference build for a mobile language-learning product that separates habit, skill evidence and economy.
The current product direction is English-interface, German-first (`de-DE`) for adult complete beginners. The repository also retains an older Russian-first Expo experience as legacy/reference implementation evidence; it is not the current learner-track authority.

The accepted German technical core currently runs headlessly: canonical content loading, deterministic attempt evaluation, trusted learning-event validation and an in-memory append-only projection. It is not yet wired into the Expo screens. The existing mobile First Encounter remains useful UI/runtime reference work while repository reconciliation continues through the atomic roadmap.

Before changing product behavior, read `outputs/living_language_atlas_current_state.md` and `outputs/living_language_atlas_atomic_master_roadmap_v1.md`.

## What works now

- Native `Atlas`, `Practice`, `Studio` and `You` tabs on iOS and Android
- An authored `First Encounter` learning loop: four guided support stages, a changed-context cafe rehearsal and a later retrieval scene
- 21 deterministic, source-bound learning tasks: 17 in the initial route and four in a separate 24-hour delayed-retrieval return
- An in-app reading lens with optional transliteration; it is clearly labelled as a reference aid, not pronunciation scoring
- Durable on-device progress and a visible later-retrieval schedule, with no voice, conversation, identity or sensitive data stored
- Resumable First Encounter lesson sessions: completed task boundaries are saved locally, with explicit resume/restart and visible storage failure
- A lesson preflight that states the objective, evidence boundary, review gate, unavailable audio and local recovery behavior before the first task
- A connected six-node First Encounter route that makes support, transfer and delayed return visible as one stateful path
- A legacy 12-district Russian foundation reference track: 48 skill bundles and 36 mission summaries, retained as
  implementation/reference evidence rather than the current first learner track
- An inspectable Atlas horizon for those 12 districts, with one runnable D03 reference mission and explicit outline-only
  boundaries for the remaining mission summaries
- A state-aware Practice tab plus Recall Lens, which uses only phrases already open in the learner's route
- A source-bound Phrase Desk rather than a fake connected AI chat surface, including a non-persisted exact-copy Cyrillic rehearsal for phrases already open in the route
- An inspectable local learning record: fixed task passages, retrieval-support reveals and deterministic rechecks stay distinct from a score; in-app Source Notes distinguish scope evidence from phrase approval
- An item-level evidence ledger for all 21 legacy First Encounter tasks; these remain blocked pending qualified Russian review and do not constitute approved German content
- A separately audited German candidate pack and deterministic core under `outputs/`, `src/*.js` and `tests/*.js`; learner-visible release remains blocked pending qualified German, DaF/DaZ and audio-rights review
- Automated content-contract tests and a design-system drift audit

All learner content is review-gated. The German candidate is proprietary and blocked pending qualified German-language,
DaF/DaZ and audio-rights review. The retained Russian reference strings remain separately Russian-review gated. The app
does not claim CEFR, TORFL or psychometric certification. Sources constrain scope and are not presented as phrase-level
approval.

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
npm run test:german
```

## Product shape

| Area | Job | Explicit non-goal |
|---|---|---|
| Atlas | Turn a curriculum into a visible route of real-life missions | A reskinned linear lesson tree |
| Practice | Schedule work from evidence gaps and decay | Let streaks or XP imply ability |
| Studio | Transform an attached source into an explanation, drill or bounded role-play | A blank generic chatbot |
| You | Keep habit, evidence and credits legible and separate | One opaque "language score" |

## Repository map

```text
src/app/          Expo Router route files only
src/screens/      Screen bodies
src/components/   Reused interface components
src/theme/        The single token and semantic-color entry point
src/content/      Versioned reference curriculum and demo mission contracts
src/domain/       Deterministic learning/session state and local lesson recovery
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
