# Living Language Atlas — LLA-A050 Workspace Source-of-Truth Inventory v1

**Date:** 2026-09-06  
**Atom:** `LLA-A050/270`  
**Verdict:** `ACCEPTED`  
**Quality:** `Q97/100`  
**Scope:** Read-only classification and validation. No source code, content pack, test, repository or remote was created, moved or deleted.

## 1. Workspace truth

- Workspace: `C:\Users\kadie\Documents\Codex\2026-09-01\bu`
- Git check: **not a Git repository** (`git rev-parse --is-inside-work-tree` exit 1).
- Total inventoried files: **229**.
- Top-level entries: `outputs/`, `src/`, `tests/`, `work/`, `package.json`.
- No `.gitignore`, README, LICENSE file, lockfile, runtime version file or environment file currently exists.
- `package.json` is private, version `0.3.1`, has zero declared dependencies and uses `UNLICENSED`.

## 2. Directory classification

| Path | Files | Bytes | Classification | Git baseline recommendation |
|---|---:|---:|---|---|
| `src/` | 4 | 82,956 | Accepted current implementation source | Track |
| `tests/` | 4 | 193,279 | Accepted current validation source | Track |
| `outputs/` | 81 | 2,235,348 | Canonical docs/content plus historical audit and transfer artifacts | Track selected text/JSON; treat ZIPs as derived archives |
| `work/` | 139 | 3,370,676 | Historical build scratch, incoming bundles and audit copies | Do not treat as production; exclude from baseline by default, preserve locally/archive |
| `package.json` | 1 | 612 | Current zero-dependency test command manifest | Track |

`work/` contains useful forensic evidence, but importing it into application source would reintroduce rejected/prototype code. It must remain explicitly non-production.

## 3. Accepted current code surface

| File | SHA-256 | Role |
|---|---|---|
| `src/content_reader.js` | `214B9B2FCCFB691D8A53DBC2A4D380C15DD229B0995FC80D632D3A2AC5E09808` | Canonical pack reader |
| `src/evaluator_engine.js` | `6AE545AB193F78F4F4B80433D70D09F34CFEB073E91085703F6A407C0E6F44DB` | Accepted deterministic evaluator |
| `src/learning_event_contract.js` | `15516640A4E853753DEA2172D916097D5E94A09F1A653E259D169E02E0ACBC58` | Learning-event validation contract |
| `src/in_memory_learning_event_ledger.js` | `A53B8C9A3E9EB4834F0E4FF6827C2D4F02D811A9BC125792D08B8EB6B2393165` | In-memory append-only ledger/projection adapter |

Associated accepted tests are:

- `tests/content_reader.test.js`
- `tests/evaluator_engine.test.js`
- `tests/evaluator_engine_regressions.test.js`
- `tests/learning_event_contract.test.js`

No Expo app, backend server, database migration, persistent store, auth adapter, R2 client, live AI provider or production audio module exists in the accepted root source tree.

## 4. Canonical content identity

The sole canonical candidate is:

`outputs/living_language_atlas_wp02_german_content_pack_v2_1_candidate.json`

SHA-256:

`4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300`

Four files under `work/` use the same filename but have different hashes:

- Notion preflight copy: `198182FF...54CEEF`
- WP-03.1 incoming copy: `C70680E2...6BB610`
- WP-03 v2 incoming copy: `9E8A53E0...239D3`
- WP-03 v3 incoming copy: `B9E49E81...842207`

These are historical/incoming variants and must never win by filename, recency or directory traversal. Consumers must use the exact canonical path and accepted hash.

## 5. `outputs/` policy

### Track as current authority

- atomic roadmap, status and coordination protocol v2;
- current-state and latest ChatGPT acceptance review;
- product vision, German MVP/evidence spec and WP-01 normative errata;
- canonical content candidate, schema, reviewer candidate bundle and validation/adjudication records;
- current active/accepted atom reports.

### Track or archive as history, never interpret as current instruction

- prior worker briefs/checkpoints/return reports;
- Gemini/Notion handoff documents;
- superseded roadmap/protocol/second-brain v1 files;
- rejected/corrected audit reports.

### Derived transfer archives

Four ZIP files exist under `outputs/` (527,471 bytes total). They are useful transfer evidence but duplicate text/source and are not canonical code. A052 should exclude `outputs/*.zip` from the initial Git baseline unless the OWNER explicitly wants binary history in Git or chooses an external archive/LFS policy. No ZIP was deleted.

## 6. Secret-risk scan

- Suspicious credential filenames (`.env*`, private key/certificate/keystore, credential/secret files, SQLite DB): **none found**.
- High-confidence content patterns (private-key headers, GitHub personal tokens, common `sk-*` keys, credential-bearing PostgreSQL URLs): **none found**.
- Current root source/tests have no runtime environment-variable references for Groq, database, Better Auth or R2.

This is a repository preflight, not proof that future commits are secret-safe. A052 must add ignore rules and a repeatable pre-commit/CI secret check before any remote push.

## 7. Independent current tests

| Command | Exit | Result |
|---|---:|---|
| `npm.cmd run test:wp03.1` | 0 | 7 reader acceptance checks passed |
| `npm.cmd run test:regressions` | 0 | Accepted evaluator regression/adversarial suite passed |
| `npm.cmd run test:wp03.3a` | 0 | 28 event-contract/ledger checks passed |
| `npm.cmd run test:wp03.2` | 1 | Honest legacy comparator: 1 match / 26 mismatches |

The legacy comparator result is documented integration debt because frozen fixtures lack authoritative runtime history. It must not be converted into a fake green test or included in a default CI success chain until a separate compatibility decision atom resolves its purpose.

## 8. Baseline inclusion proposal for A052/A053

### Include

- `package.json`
- `src/**`
- `tests/**`
- selected authoritative `outputs/*.md` and `outputs/*.json`

### Exclude by default

- `work/**`
- `outputs/*.zip`
- future `.env*`, dependency folders, coverage, build, Expo and OS/editor artifacts

### Decide before baseline commit

- whether all historical text reports stay in the main repo or move to `docs/archive/`;
- whether private repository history should include proprietary candidate content immediately;
- repository owner/name/remote and visibility;
- Node/package-manager/runtime pinning, handled by later atoms rather than invented here.

## 9. Exit decision

A050 is accepted. The production/historical boundary, canonical content identity, secret preflight, current tests and missing repository controls are explicit. The next atom is `LLA-A051`: OWNER chooses the private GitHub repository destination and confirms that proprietary candidate content may be included in that private repository. No Git initialization or push is authorized by this report.

