# Living Language Atlas — Per-Atom AI Dispatch Guide v1

Every atom update from BRAIN must tell OWNER what to relay. If an AI has no job, explicitly say `STANDBY — send nothing`.

## Standard dispatch block

```text
ATOM: LLA-Axxx/270
BASE: branch + full commit SHA, or local file + SHA-256 before Git integration

BRAIN: current analysis/acceptance task; no relay unless complete handoff.
NOTION: SEND <brief + exact files/links> | MODE <RESEARCH_ONLY/READ_ONLY_REVIEW> | otherwise STANDBY.
SPARK: SEND <micro-brief + exact files> | MODE READ_ONLY_SCOUT | otherwise STANDBY.
WORKER: SEND <single-atom worker brief + allowed inputs> | otherwise STANDBY.
SECOND-BRAIN: SEND only sync/status changes or complete-handoff packet | otherwise STANDBY.
OWNER: exact human/account/device/merge action, or NONE.

RETURN TO BRAIN: exact report/diff/commit/test artifacts expected.
STOP: nobody begins the next atom.
```

## File routing rules

### BRAIN

BRAIN works from actual workspace/repository files, atomic roadmap, atomic status, current state, latest acceptance and relevant source/tests. OWNER does not need to relay files back to the same primary chat unless an external AI produced them.

### NOTION

Send only:

1. an atom-specific research/review brief;
2. repository URL and exact base commit;
3. only the product/spec/source files required for that question;
4. official-source and checked-date requirements;
5. expected compact return format.

Do not send the SECOND-BRAIN master prompt. Do not let Notion infer writing/merge permission from repository access.

### Gemini Spark (`SPARK`)

Role: **read-only mechanical scout and compression assistant**.

Initial role file: `outputs/living_language_atlas_gemini_spark_role_prompt_v1.md`.

Good work:

- file/ID/count/link inventory;
- checklist and schema-field completeness;
- test-log normalization without changing meaning;
- candidate duplicate/hash manifest formatting;
- extracting disputed lines and producing a compact evidence table;
- comparing a worker return against explicit acceptance bullets.

Forbidden work:

- product strategy or roadmap decisions;
- German language/DaF correctness approval;
- legal/license conclusions;
- architecture or security acceptance;
- modifying source, opening/merging PRs or directing WORKER;
- marking atoms accepted.

Send Spark the exact micro-brief and smallest possible input set. BRAIN independently checks every conclusion.

### Antigravity WORKER

Send only:

1. one atom-specific worker brief written by BRAIN;
2. exact base branch/SHA;
3. allowed source/input paths;
4. forbidden files/scope;
5. test commands and stop condition;
6. required return report format.

Do not send the SECOND-BRAIN prompt. Do not send the whole historical `work/` tree unless a named file is evidence for the atom.

### SECOND-BRAIN

Keep available:

- `living_language_atlas_second_brain_master_prompt_v2.md`
- atomic roadmap and status JSON;
- AI coordination protocol v2;
- current state;
- this repository sync notice.

Routine atom chatter need not be pasted while it is standby if it can read the updated host/repo files later. On `komple handoff`, send the newly generated full handoff packet as well. SECOND-BRAIN and WORKER must remain separate chats.

## Gemini Spark atom assignments

Spark is a support role on the following planned atoms: A052, A055, A058, A061, A088, A148, A171, A180, A205, A212 and A257. BRAIN may add Spark to another atom only by updating the dispatch block; absence means standby.

## Repository transition

Before A053, use local paths + SHA-256 and remote base `73764fa...`. After A053, all writing tasks use branch + commit SHA. After A056 acceptance, a claim without a repository commit/diff is not implemented work.
