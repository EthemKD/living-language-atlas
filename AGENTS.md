# Working agreement

## Current authority

The current product direction is German-first (`de-DE`) for English-reading adult beginners. Repository-connected agents must read `outputs/living_language_atlas_current_state.md`, `outputs/living_language_atlas_atomic_status_v1.json`, and `outputs/living_language_atlas_atomic_master_roadmap_v1.md` before proposing work. The existing Russian Expo experience is retained as legacy/reference implementation evidence; it is not the current first learner track and must not override the German-first roadmap.

## Product invariants

1. Habit, skill evidence and economy are separate state domains. Never derive one from another.
2. Every learning activity resolves to a versioned district, skill bundle, mission and evidence target.
3. Studio begins with an attached source and declared operation. Do not add a blank generic chat surface.
4. AI output must be labeled, source-grounded and evaluated. Never fabricate a connected model or live response.
5. People, tutoring and reward-for-teaching features stay gated behind identity, moderation, reporting, age-safety,
   payments and liquidity work. Do not add fake community activity to make a screen look full.
6. German candidate content remains blocked until qualified German-language and DaF/DaZ reviewers sign the exact version; audio also requires recorded rights evidence.
7. Never claim CEFR, psychometric or assessment validity from candidate or reference tracks.
8. Russian content remains legacy/reference-only and `expert_review_required`; do not silently reconnect it as the first learner track.

## Interface invariants

1. Use the system navigation stack and Native Tabs. iOS liquid glass belongs to system navigation/control chrome only.
2. Content surfaces are opaque. Do not add decorative gradients, glass cards, floating-card grids or glow effects.
3. One hierarchy, one alignment system and one dominant action per screen.
4. Repeated values come from `src/theme/index.ts`; no hardcoded color, typography, radius or spacing literals outside it.
5. Use native controls, semantic colors, 44-point minimum targets, dynamic type-safe text and automatic content insets.
6. A view becomes shared only when it has a stable name and a smaller API than its implementation.
7. Run the anti-slop checklist on every changed screen and record intentional exceptions in the PR.

## Engineering invariants

1. Routes live only in `src/app`; reusable UI in `src/components`; complex bodies in `src/screens`.
2. Use kebab-case files, strict TypeScript and `@/` aliases.
3. Do not import directly from `@react-navigation/*`; use Expo Router APIs.
4. Keep curriculum JSON separate from rendering and deterministic session logic separate from both.
5. Add or update a contract test whenever IDs, counts, evidence progression or review gates change.
6. Run `npm run check` before opening a pull request.
7. Keep each pull request reviewable and scoped to one feature or migration.
