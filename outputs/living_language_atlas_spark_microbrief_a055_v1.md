# LLA-A055 — Gemini Spark mechanical verification brief

**Mode:** `READ_ONLY_MECHANICAL_CHECK`  
**Do not create or edit Notion, GitHub, code, roadmap, or task status. Do not research or make acceptance decisions.**

## Inputs

- `outputs/living_language_atlas_atomic_master_roadmap_v1.md`
- `outputs/living_language_atlas_atomic_status_v1.json`
- `outputs/living_language_atlas_a055_notion_atom_import_v1.csv`
- `outputs/living_language_atlas_a055_github_delivery_seed_v1.csv`

## Perform only these checks

1. Count CSV atom rows and confirm it is 270.
2. Calculate CSV status tally and compare it exactly to the status JSON.
3. Confirm `LLA-A055=ACTIVE` and `LLA-A056=PLANNED` in both sources.
4. Compare each CSV Atom ID, phase, work item, owner route and status against the roadmap table; list any mismatch.
5. Count delivery seed rows; verify every SHA is 40 hexadecimal characters and every URL begins with the repository URL.

## Return exactly this JSON (no prose)

```json
{
  "verdict": "MECHANICAL_PASS | MECHANICAL_MISMATCH | BLOCKED",
  "atom_rows": 0,
  "status_tally": {},
  "a055_status": "",
  "a056_status": "",
  "delivery_rows": 0,
  "mismatches": [],
  "invalid_sha_or_url_rows": [],
  "files_read": []
}
```

