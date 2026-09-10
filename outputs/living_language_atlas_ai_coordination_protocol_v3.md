# Living Language Atlas — AI Coordination Protocol v3

**Supersedes:** v2 for all future execution. Historical v2 records remain evidence.
**Authority order:** OWNER → BRAIN → source/test evidence → SECOND-BRAIN review → WORKER return → SPARK mechanical output.

## Roles

- **OWNER:** final authority; only owner performs human gates, accounts, signatures, recordings, payments, merge, publish, and device access not otherwise available.
- **BRAIN:** active strategist and sole normal acceptance authority. Owns critical research and decisions.
- **SECOND-BRAIN:** standby continuity brain and explicit adversarial reviewer. It does nothing until BRAIN/OWNER gives a bounded review brief or a complete-handoff trigger.
- **WORKER:** single-atom implementation and test executor. It does not make decisions or self-accept.
- **SPARK:** read-only mechanical assistant. It never makes architecture, language, legal, safety, or acceptance decisions.
- **NOTION:** inactive by default. It may be explicitly consulted as non-authoritative external research only.

## Future owner-cell override

For every planned/deferred roadmap row that includes `NOTION`, replace its future execution meaning with: **BRAIN owns the research/decision**. BRAIN may ask SPARK for mechanical preparation or SECOND-BRAIN for an adversarial review. Do not change past accepted row ownership.

## Atom lifecycle

1. BRAIN verifies `origin/main`, atomic status, current state, relevant source, and dependencies.
2. BRAIN activates one atom and publishes a dispatch block.
3. BRAIN performs critical research or sends a bounded brief to the named support role.
4. WORKER may implement only after a BRAIN decision/brief defines scope and acceptance tests.
5. BRAIN independently inspects diffs and runs proportionate validation.
6. BRAIN records `ACCEPTED` or `CHANGES_REQUIRED`; no successor begins without OWNER `devam` or equivalent.

## Dispatch requirements

Every project-progress message uses:

```text
[LLA-Axxx/270 | Phase NN | STATUS | Qxx/100 | OWNER]
Outcome: one sentence.
Gate: evidence needed before the next transition.
```

It must state `STANDBY — send nothing` for every AI without a task.

## Second-brain review contract

When asked to review, SECOND-BRAIN receives the decision question, exact commit/files, source table, assumptions, and acceptance criteria. It returns only: verified facts, contradictions, risks, missing evidence, and a recommendation. It does not edit, research beyond the bounded question, dispatch WORKER, or alter the roadmap.

## Worker contract

A WORKER brief must include atom, exact base SHA, objective, allowed/forbidden paths, prerequisites, tasks, tests, stop condition, and return format. The worker must preserve frozen candidate assets and never broaden scope.

## Spark contract

A SPARK brief must define exact inputs and a deterministic output format. Valid outputs include a path/hash manifest, ID/count comparison, diff scope table, or test-log normalization. Spark conclusions are never sufficient acceptance evidence.

## Handoff

`komple handoff`, `tam handoff`, or `second brain'e devret` grants temporary acting-BRAIN authority to SECOND-BRAIN. `geri handoff` requires the v3 master prompt’s complete return report, after which SECOND-BRAIN returns to standby. `token az`, `limit azalıyor`, `hak bitiyor`, or `acil sync` pauses new scope and requires a durable sync record first.
