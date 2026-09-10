# Living Language Atlas — Plan Reset v1

**Authority:** OWNER-directed, adopted by Primary BRAIN
**Effective date:** 2026-09-10
**Scope:** execution ownership and source-of-truth discipline; not a product redesign or dependency change.

## 1. Audit snapshot

| Area | Verified current truth |
| --- | --- |
| Remote source of truth | Private GitHub `main@38484be3189dbdd98c09a9417901bcbbfb30f9fa` |
| Latest merged record | PR #6, A056 source-integrity acceptance record |
| Latest GitHub checks | `checks` and `export` succeeded on `main@38484be` |
| Canonical German candidate | SHA-256 `4F80F1FE030D05EDA87F8948E2C95571E88FD2C83BA993F11C4B2523FF6CD300` |
| Accepted technical core | Canonical reader, deterministic evaluator, host-authoritative event contract, in-memory append-only ledger/projection, source-integrity gate |
| App surface | Expo/React Native route and screen shell exists; it remains legacy/reference-led until the German-first route is assembled through later atoms |
| Not yet accepted | Persistent database/backend/auth, production mobile integration, live R2/audio, signed talent rights, human-reviewed German publication, device acceptance, release readiness |
| Roadmap status | 48 accepted, 5 accepted-candidate, 10 blocked-owner, 1 active, 159 planned, 47 deferred; total 270 |

## 2. Material risks found

1. Some v2 continuity documents describe pre-A053 repository state and are unsafe as an activation source without a current-main check.
2. A developer’s local checkout can remain on an old worker branch. Only `origin/main` or an explicitly recorded clean worktree is authoritative for acceptance.
3. Candidate content is structurally and technically protected but cannot be published before qualified German-language and DaF/DaZ review; audio requires real rights evidence.
4. No production persistence, account, cloud media, device, or release validation exists yet.
5. `npm ci` reports dependency audit advisories; this is tracked debt, not a resolved security finding.

## 3. New operating model

### BRAIN — critical-path owner

BRAIN owns the critical decisions and performs primary-source research directly when the decision affects architecture, security, privacy, licensing, content policy, learning evidence, or acceptance. BRAIN alone selects the active atom, writes implementation briefs, judges evidence, and records acceptance/rejection.

### SECOND-BRAIN — independent challenge and continuity

SECOND-BRAIN is not an implementation substitute. On an explicit BRAIN brief it performs an adversarial review of a proposed critical decision, identifies contradictions, checks source/assumption gaps, and returns a compact counter-analysis. It may become acting BRAIN only through the existing complete-handoff trigger.

### WORKER / Antigravity — bounded implementation

WORKER receives one BRAIN-authored atom at a time. It may implement, test, commit, open a PR, and report. It cannot choose architecture, change frozen content, accept itself, start a successor, or replace a human gate.

### SPARK / Gemini Spark — mechanical evidence support

SPARK receives the smallest possible input set. It may inventory paths, IDs, hashes, diffs, tables, test logs, and declared checklist fields. It may not recommend product decisions, judge German/legal/security correctness, write production code, or accept work.

### NOTION — no active chain role

Prior rows that name NOTION are not rewritten as historical facts. For all **future** execution, that reference is overridden: BRAIN performs the research or explicitly asks OWNER to invoke Notion for a narrow non-decisive task. A Notion result is evidence only, never authority.

## 4. Execution overlay for the next Phase 04 atoms

| Atom | Primary owner | Support | Gate |
| --- | --- | --- | --- |
| A057 — Expo/RN/New Architecture matrix | BRAIN | SECOND-BRAIN adversarial source check after initial finding | One evidence-backed pin/upgrade/defer decision; no code |
| A058 — UI dependency license/compatibility | BRAIN | SPARK produces mechanical license/version table; SECOND-BRAIN checks scope gaps | One adopted/rejected/defer list; no installation |
| A059 — UI stack ADR | BRAIN | SECOND-BRAIN critiques decision; SPARK verifies cited versions | ADR must precede any dependency spike |
| A060 — isolated UI compatibility spike | WORKER | SPARK diff/test-log audit; BRAIN acceptance | Exact base, only approved dependencies, PR, tests |
| A061 — German glyph and text smoke | WORKER | SPARK fixture/count audit; BRAIN acceptance | Must not replace language review |
| A062 — accessibility/device smoke | WORKER + OWNER | SPARK normalizes device evidence; BRAIN acceptance | Real device evidence required |
| A063 — UI spike acceptance/pins | BRAIN | SECOND-BRAIN adversarial review | No next stack implementation until accepted |

## 5. Universal allocation rule for remaining atoms

- A question with irreversible product, security, rights, privacy, pedagogy, architecture, purchase, or acceptance impact belongs to **BRAIN**.
- A reproducible code/test change belongs to **WORKER**, after BRAIN supplies a bounded brief.
- A count/hash/diff/log/checklist comparison belongs to **SPARK**.
- An independent challenge to a BRAIN decision, or emergency continuity, belongs to **SECOND-BRAIN**.
- A human credential, signature, account, payment, device, recording, consent, or merge belongs to **OWNER**.

## 6. Immediate safe action

LLA-A057 is active under BRAIN. Produce a primary-source version matrix, submit it to SECOND-BRAIN for a limited contradiction check, then make one BRAIN decision. Do not begin A058 before that decision is accepted.
