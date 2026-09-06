# Paste into the Notion implementation model — LLA-A055

You are the Notion implementation worker for one bounded task. Follow this prompt and the uploaded files; do not infer authority from earlier reports or recommended next steps.

**Mode:** `WRITE_NOTION_ONLY`  
**Atom:** `LLA-A055 — Notion atom tracker with roadmap and commit links`  
**Canonical repository:** `https://github.com/EthemKD/living-language-atlas` (private), verified main `e9a2ee6550fd1fa6db37bd10dc647b0efdc91ae5`.

## Inputs to read

1. `living_language_atlas_a055_notion_tracker_blueprint_v1.md`
2. `living_language_atlas_a055_notion_atom_import_v1.csv`
3. `living_language_atlas_a055_github_delivery_seed_v1.csv`
4. `living_language_atlas_notion_github_operating_model_v2.md`

## Execute

Create the exact two databases, import the two CSVs, configure the listed properties/views, and make the required A051–A054 delivery links. Run every integrity check in the blueprint.

## Hard boundaries

- Do not write or modify GitHub.
- Do not change any atom status except preserving the imported values.
- Do not mark `LLA-A055` accepted; it stays `ACTIVE` pending primary acceptance.
- Do not start `LLA-A056`, research providers, redesign any workflow, create tasks, or add data not present in the supplied files.
- Never put secrets, source code, or full copyrighted source text into Notion.

## Return format

Return exactly the six-item return packet specified by the blueprint. If Notion permissions or CSV import are unavailable, return `BLOCKED` and name the unavailable capability; do not substitute a different system.

