# Anti-slop screen review

Use this before merging any visual change. A screen fails if reviewers cannot answer these from the rendered build.

## Product signal

- What one job does the screen complete?
- Which data is real, local prototype data or unavailable? Is that distinction visible?
- Which research decision or learner need explains every major section?
- Is the primary action tied to a curriculum object and evidence target?

## Visual system

- Is the hierarchy legible with color removed?
- Is there one alignment system and one dominant action?
- Are related items closer to each other than to unrelated items?
- Are native navigation, controls, system colors and automatic insets preserved?
- Are content surfaces opaque, with no decorative gradient, glass-card stack, glow or ornamental metric tile?
- Did every repeated color, spacing, radius and type value come from `src/theme/index.ts`?

## Language-learning integrity

- Does the activity identify district, bundle, mission and evidence target?
- Does feedback distinguish exact deterministic checking from open-ended evaluation?
- Are hint/reveal use and changed variables kept in the trace?
- Does completion avoid claiming ability without the required evidence?
- Is expert-review status retained for language and assessment content?

## Interaction and access

- Are touch targets at least 44 points?
- Do pressed, disabled, selected, loading and error states exist where relevant?
- Can the flow be completed with screen reader and dynamic text?
- Does reduced motion leave the state change understandable?
- Are empty, offline, error and unavailable states honest rather than filled with fake data?

## Merge rule

Attach iOS and Android screenshots or recordings to the pull request. List any failed item with a named follow-up issue;
do not approve on “looks polished” alone.
