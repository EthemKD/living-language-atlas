# Russian A1 content blueprint — First Encounter

**Version:** 0.1
**Status:** build gate; not learner-publication approval
**Interface:** English
**Reference track:** Russian A0 → A1 entry
**Scope:** `RUS-00` through `RUS-03`, `RUS-M01`, `RUS-M02`

## Why this exists

The research decision is not “add more Russian exercises.” It is to make one small real-life function traceable from
support to transfer and delayed return. This blueprint is the implementation contract for that decision. It is deliberately
shorter than a research report and it does not approve any Russian learner-facing string, audio item or assessment claim.

The current content remains `reference_draft_language_review_required` until an accountable Russian-language reviewer signs
the exact content version. The blueprint therefore records both the intended evidence path and the gaps that must stay visible.

## Evidence path

| Evidence step | What the learner does | Allowed interpretation | Current reference status |
|---|---|---|---|
| `E0 · notice` | Recognises a script signal, phrase function or meaning | Recognition with support | Present in `RUS-00`–`RUS-03` |
| `E1 · supported production` | Reconstructs a bounded phrase from visible support | Supported rehearsal of one function | Present for fixed build tasks |
| `E2 · changed variable` | Reuses the function when a name, drink, price or event changes | Transfer signal for this mission only | Present in `RUS-M01`; not a general ability claim |
| `E3 · repair` | Keeps the exchange moving after a missed or fast reply | Repair rehearsal | Present in `RUS-03` and `RUS-M01` |
| `E4 · delayed return` | Retrieves the function after the scheduled interval | Delayed retrieval trace | Present in `RUS-M02`; not proof of durable retention |

No single row may be rendered as a CEFR level, fluency score, accent judgement or permanent mastery claim.

## Skill graph and content boundary

| Node | Target function | Required route | Evidence target | Known gap before promotion |
|---|---|---|---|---|
| `rus.a0.read.mission-signs` | Distinguish selected Cyrillic signals and read one mission word | `RUS-00` | `E0`, then a small supported `E1` | Current tasks are recognition-heavy; a reviewed novel-word production check is still needed |
| `rus.a0.first-contact` | Formal greeting and name exchange | `RUS-01` → `RUS-M01` | `E0`/`E1`, then changed-context `E2` | The reference build uses a fixed example name; variable-name acceptance must be authored and reviewed |
| `rus.a0.cafe-request` | Ask for a menu and make one polite drink request | `RUS-02` → `RUS-M01` → `RUS-M02` | `E0`/`E1`, changed drink `E2`, delayed `E4` | Accepted drink variants and the exact scope of the request frame must be reviewer-declared |
| `rus.a0.repair-interaction` | Ask for repetition, slower speech or state non-understanding | `RUS-03` → `RUS-M01`/`RUS-M02` | `E1`/`E3`, then delayed `E4` | The event-to-response map and acceptable alternatives need an explicit review record |

The route is intentionally small. Adding stories, podcasts, infinite quizzes, AI chat, coins or social sessions does not
close any of these gaps and is out of this package.

## Phrase/content evidence card

Every learner-visible item must have these fields before it can leave the reference gate:

```text
content_id
content_version
target_skill_id
function
source_line
translation
accepted_variants[]
register_or_context
evidence_levels[]
source_registry_ids[]
author
language_reviewer
reviewed_on
audio_source
known_uncertainties[]
publication_status
```

The reference build now carries one blocked card per task, joined against the canonical source line and translation. The
cards deliberately keep `accepted_variants` empty and reviewer/audio fields null. Until those fields are reviewed, deterministic
checking is only a prototype trace and must not be described as open-ended language evaluation.

## Reviewer checklist

The reviewer signs the exact `content_version`, not a topic or a screen:

- Cyrillic spelling, punctuation and word boundaries are correct.
- English meaning matches the intended function in this context.
- Formality/register (`вы`/formal interaction here) is appropriate and clearly labelled.
- The phrase is not presented as a complete grammar paradigm or proficiency evidence.
- Accepted alternatives are explicit; “one canonical answer” is not implied where alternatives are valid.
- Reading aid/transliteration is a support layer and does not silently become pronunciation scoring.
- Audio, if later added, points to a traceable source and matches the signed string.
- The changed-context and repair event still test the same function rather than a new hidden skill.
- The reviewer records uncertainties instead of forcing a false single answer.

Missing reviewer, audio provenance or accepted-variant record keeps the item blocked. Generated text cannot silently enter
the canonical track.

## Build order

1. Keep the existing First Encounter route and its review gate intact.
2. Add the per-item evidence-card/variant ledger without adding new learner-visible Russian.
3. Run a focused Russian A1 benchmark against Duolingo, Busuu and a beginner tutor/curriculum approach on script,
   recognition → production, grammar explanation, listening variety, transfer and correction provenance.
4. Have the exact ledger reviewed by a qualified Russian/RFL reviewer.
5. Only then promote one narrow content change and its contract test.
6. Evaluate bounded AI or voice against the signed ledger; uncertain output remains unscored.

## Promotion and stop rules

Promote only when the content contract, reviewer sign-off and route tests all pass. Stop and keep the reference label if:

- a string has no accountable reviewer or source-bound context;
- the task claims more than its evidence level supports;
- a fixed answer is used where reviewed alternatives are valid;
- a speech/AI result would be treated as certain without an evaluation set;
- the new activity does not strengthen the same skill-bound loop.

This blueprint is the bridge from the VOC/product research to the next code change. It is not evidence that the product
already teaches Russian effectively.
