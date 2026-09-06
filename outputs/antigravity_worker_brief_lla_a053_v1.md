# Living Language Atlas — Antigravity Worker Brief LLA-A053 v1

## Control

- Atom: `LLA-A053/270`
- Phase: `03`
- Mode: `IMPLEMENTATION`
- Role: `WORKER` (Antigravity Worker chat — isolated from Second Brain)
- Remote Repository: `https://github.com/EthemKD/living-language-atlas`
- Base Commit: `main@73764fa48beb57cc72bbce32b0987dcf9efb3639`
- Target Branch: `worker/LLA-A053`
- Governing Specification: `outputs/living_language_atlas_a052_reconciliation_manifest_v1.md`
- Decision Authority: None (execute strictly according to brief)

---

## Objective

In a clean clone of the private GitHub repository `EthemKD/living-language-atlas` starting from base `73764fa`, create branch `worker/LLA-A053`, apply repository ignore rules and licensing notices, import the exact audited German technical core and canonical content pack, non-destructively merge test scripts into `package.json`, verify all German test suites pass, commit, and prepare a PR to `main`.

---

## Allowed Scope & Input Files

Only the following files and paths may be added or modified in the target repository:

1. `.gitignore` — Create/update with the exact rules from A052 §6.
2. `LICENSE_NOTICES.md` — Create detailing the dual licensing boundary (Expo scaffolding MIT; original LLA engines and German learning content proprietary all rights reserved).
3. Implementation Modules:
   - `src/content_reader.js` (SHA-256: `214B9B2FCCFB691D8A53DBC2A4D380C15DD229B0995FC80D632D3A2AC5E09808`)
   - `src/evaluator_engine.js` (SHA-256: `6AE545AB193F78F4F4B80433D70D09F34CFEB073E91085703F6A407C0E6F44DB`)
   - `src/learning_event_contract.js` (SHA-256: `15516640A4E853753DEA2172D916097D5E94A09F1A653E259D169E02E0ACBC58`)
   - `src/in_memory_learning_event_ledger.js` (SHA-256: `A53B8C9A3E9EB4834F0E4FF6827C2D4F02D811A9BC125792D08B8EB6B2393165`)
4. Test Suites:
   - `tests/content_reader.test.js` (SHA-256: `24B36542E7CB711135111AC05C6AD02BB2135268B51F3BE072A9AD16544CE7D4`)
   - `tests/evaluator_engine.test.js` (SHA-256: `037259C9D3EBE8E023C094FFC38F4A0732989CE19A2361968CFD475FAE2C0997`)
   - `tests/evaluator_engine_regressions.test.js` (SHA-256: `ED70830B25EAB476071E0925BC7BEFA09F34B24E047AEAFE6FEF3C2330432B8D`)
   - `tests/learning_event_contract.test.js` (SHA-256: `276C0833E14BA858242E48D13B1F647A787794993203846B3FF3B35E26DFEECD`)
5. Canonical Pedagogical Pack & Schemas:
   - `outputs/living_language_atlas_wp02_german_content_pack_v2_1_candidate.json` (SHA-256: `4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300`)
   - `outputs/living_language_atlas_wp02_content_pack_v2_1.schema.json` (SHA-256: `E53E4F5FEEBF4FB7780BC4B8D4380EACFC5C84AF908F8B4CD7EE807F2AF8AA4B`)
   - `outputs/living_language_atlas_wp02_german_reviewer_bundle_v2_1_candidate.md` (SHA-256: `FA3B65279F79691F57C7849D257140B24C9D86C28A909E6993D2067238707DB6`)
6. `package.json` — Non-destructive merge of test scripts only.

---

## Forbidden Scope

- DO NOT modify existing remote screens, components, app routes, or configs (e.g. `src/screens/atlas-screen.tsx`). The known syntax error at line 281 must remain untouched in this atom.
- DO NOT delete or clobber remote test files (`tests/*.test.mjs`).
- DO NOT overwrite or delete root `LICENSE`.
- DO NOT import anything from `work/**`.
- DO NOT commit any `.zip` files from `outputs/`.
- DO NOT force-push or commit directly to `main`.

---

## Tasks

1. Clone `https://github.com/EthemKD/living-language-atlas` cleanly at commit `73764fa48beb57cc72bbce32b0987dcf9efb3639`.
2. Check out branch `worker/LLA-A053`.
3. Create root `.gitignore` using the exact specification in `outputs/living_language_atlas_a052_reconciliation_manifest_v1.md` §6.
4. Create root `LICENSE_NOTICES.md` documenting the dual-boundary license.
5. Copy the audited 4 `src/*.js`, 4 `tests/*.js`, and 3 `outputs/*` candidate files. Verify SHA-256 hashes of imported files match the manifest exactly.
6. Merge `package.json` scripts:
   - Retain all existing Expo scripts (`start`, `android`, `ios`, `check`, etc.).
   - Append:
     - `"test:german:reader": "node tests/content_reader.test.js"`
     - `"test:german:evaluator": "node tests/evaluator_engine.test.js"`
     - `"test:german:regressions": "node tests/evaluator_engine_regressions.test.js"`
     - `"test:german:ledger": "node tests/learning_event_contract.test.js"`
     - `"test:german": "npm run test:german:reader && npm run test:german:regressions && npm run test:german:ledger"`
7. Execute `npm run test:german:reader`, `npm run test:german:regressions`, and `npm run test:german:ledger`. Verify all pass with exit code 0.
8. Stage only allowed files, commit with title: `feat(core): import audited German evaluation and event ledger core (LLA-A053)`.
9. Push branch `worker/LLA-A053` to origin. If push credentials are owner-managed, provide exact commit SHA, git patch, and push instructions.

---

## Required Return Report Format

Submit `outputs/antigravity_wp03_a053_return_report.md` with:
- Remote base SHA and target branch name.
- Complete list of imported files with SHA-256 verifications.
- Merged `package.json` diff.
- Raw output and exit codes of test suite runs.
- Commit SHA and PR status/link.
- Confirmation of no out-of-scope modifications.
- STOP. Do not proceed to A054.
