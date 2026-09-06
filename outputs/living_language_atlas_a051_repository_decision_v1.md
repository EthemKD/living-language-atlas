# Living Language Atlas — LLA-A051 Repository Decision v1

**Atom:** `LLA-A051/270`  
**Date:** 2026-09-06  
**Verdict:** `ACCEPTED`  
**Quality:** `Q96/100`

## Decision

The selected canonical GitHub destination is:

- Repository: `EthemKD/living-language-atlas`
- URL: `https://github.com/EthemKD/living-language-atlas`
- Visibility: **PRIVATE**
- Default branch: `main`
- Inspected base commit: `73764fa48beb57cc72bbce32b0987dcf9efb3639`
- Base commit message: `feat: connect First Encounter into a living route`
- Base commit date: `2026-08-17T17:02:18Z`

The repository may hold proprietary German candidate content while it remains private. Any future visibility change requires a separate rights/secret review.

## Existing remote truth

The repository is not empty. It contains an Expo SDK 57 application, English UI, a Russian-first content/reference track, local progress/session code, Atlas/Practice/Studio/You screens, CI workflows and extensive research documents.

This is useful prior work, but it predates the frozen German-first direction and the accepted WP-03.1/03.2/03.3A local core. Russian learner content remains historical/reference material until a later roadmap decision; it must not silently remain the first learner track.

## Transitional source-of-truth boundary

- Remote `main@73764fa...` is the immutable base of the existing Expo application.
- The current local workspace contains the later accepted German canonical reader, evaluator and learning-event ledger, but is **not yet connected to Git**.
- Until A053 completes, there is a deliberate two-source integration boundary. Neither side may overwrite the other by bulk copy.
- Every integration action must name the remote base SHA and the exact local artifact hashes.

## Repository risks discovered

1. `main` is not branch-protected.
2. Latest `quality` and `web preview` Actions runs failed.
3. Both failures originate from an unterminated apostrophe/string at `src/screens/atlas-screen.tsx:281` in commit `73764fa...`.
4. The remote package declares `MIT`, while the root LICENSE is the Expo/650 Industries MIT boilerplate notice. This does not clearly define ownership/licensing of the project's original code and conflicts with assuming proprietary German content is covered by that file.
5. Remote docs and `AGENTS.md` still declare Russian as the first content track.
6. Local accepted tests and remote Expo tests use different package/test structures and must be reconciled intentionally.

## Integration decision

Do not initialize Git inside the current non-repository directory and force it over remote `main`. Do not force-push, delete Russian history or bulk-copy `work/`.

Safe sequence:

1. A052 prepares the reconciliation manifest, licensing boundaries, ignore rules, secret checks and an exact single-atom worker brief.
2. A053 uses a clean clone from `main@73764fa...`, creates `worker/LLA-A053`, preserves history, imports only approved German artifacts and opens a reviewable PR.
3. A054 enables the strongest available main-branch/PR controls and records any GitHub-plan limitation.
4. A056 validates a fresh clone and only then declares GitHub the sole implementation source of truth.

No clone, commit, branch, PR, push, merge or repository setting was changed during A051.

## AI delivery bundles

Role-specific, path-preserving ZIP bundles and exact paste messages were created after the repository decision:

- `outputs/living_language_atlas_second_brain_repo_sync_bundle_v1.zip`
- `outputs/living_language_atlas_notion_repo_sync_bundle_v1.zip`
- `outputs/living_language_atlas_antigravity_worker_repo_sync_bundle_v1.zip`
- `outputs/living_language_atlas_gemini_spark_repo_sync_bundle_v1.zip`
- `outputs/living_language_atlas_ai_bundle_delivery_messages_v1.md`
- `outputs/living_language_atlas_ai_bundle_manifest_v1.json`
- `outputs/living_language_atlas_second_brain_repo_sync_bundle_v1.json` — JSON-only attachment envelope, 27 embedded files
- `outputs/living_language_atlas_antigravity_worker_repo_sync_bundle_v1.json` — JSON-only attachment envelope, 3 embedded files

All archives preserve `outputs/`, `src/` and `tests/` paths where present and were successfully extracted into isolated verification directories. These are transfer artifacts, not new implementation source.

The two JSON-only alternatives embed each source file as `{ path, sha256, size_bytes, media_type, encoding, content }`; each embedded content hash and byte count was independently revalidated after JSON parsing.

## Next atom

`LLA-A052` — remote/local reconciliation manifest, code-vs-content licensing decision packet, `.gitignore`/secret preflight and worker-ready integration boundaries.
