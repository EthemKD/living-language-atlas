# Living Language Atlas — Notion + GitHub operating model v2

**Status:** Active coordination reference as of `main@e9a2ee6550fd1fa6db37bd10dc647b0efdc91ae5`. This supersedes v1 where repository state differs.

## Source-of-truth order

1. **GitHub private repository** `EthemKD/living-language-atlas`: code, tests, canonical artifacts, commit/PR/CI evidence.
2. **Primary acceptance artifacts in Git**: current project state, atomic roadmap, atomic status, acceptance reviews.
3. **Notion**: a readable mirror of work cards, evidence links and discussion — never a replacement for Git evidence.
4. **Chats/worker reports**: untrusted until BRAIN independently accepts them and records the result in Git.

## Current repository facts

- Default branch: `main`, protected; PRs and passing `checks` are required.
- Latest verified main: `e9a2ee6550fd1fa6db37bd10dc647b0efdc91ae5`.
- Latest verified GitHub checks on that main: Quality and web preview succeeded.
- The repository uses an older Russian-first Expo app only as legacy/reference material. The active delivery track is German-first, headless core and canonical content work.
- Never force-push, rewrite history, bulk-copy an old tree over the active German track, or merge without BRAIN acceptance.

## Roles

- **BRAIN (primary Codex):** scope, architecture, acceptance, atomic status and current-state authority.
- **NOTION:** bounded research/review or an explicitly authorized Notion-only implementation task. No GitHub mutation or acceptance authority.
- **SPARK:** mechanical read-only comparison, counts, inventories and test-log normalization only.
- **WORKER:** one explicitly approved atomic implementation card, one branch, return evidence; never starts a successor atom.
- **SECOND-BRAIN:** standby continuity strategist only; acts only after a complete-handoff trigger and returns to BRAIN on `geri handoff`.
- **OWNER:** grants service/account access, reviews owner gates and performs irreversible decisions.

## Stop rule

Every model stops after its named atom. A recommendation, a green test, an imported row, or a prior model's claim does not authorize the next atom.

