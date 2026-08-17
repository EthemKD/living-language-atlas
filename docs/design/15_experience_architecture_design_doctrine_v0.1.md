# Experience Architecture & Design Doctrine v0.1

**Status:** Working system, not a final brand or curriculum commitment
**Date:** 2026-08-17
**Primary UI language:** English
**Reference learning track:** Russian A1, used to test the system rather than define the whole product
**Platforms:** iOS and Android, with shared product logic and platform-native interaction shells

## 1. Decision in one sentence

The product will feel familiar because navigation, typography, permissions, sheets, accessibility and feedback behave like the user’s phone; it will feel distinctive because learning happens inside a **Living Mission Atlas** where places, skills, real-life missions, evidence and return paths form one continuous world.

This replaces the previous “dashboard plus one Russian task” direction. The reference inventory now contains **802 product surfaces, 261 screens, 175 shared components and 130 content objects**. It is mapped in `language_app_master_architecture_v0.1.xlsx`.

## 2. Product promise

> Know what to do next, understand why it matters, use it in a believable situation, and see exactly what you can now do that you could not do before.

The experience must uphold six contracts:

1. **Meaningful next action:** opening the app reveals one strong next step, not a pile of unrelated cards.
2. **Visible learning structure:** users can inspect the route, skill prerequisites and why an activity exists.
3. **Evidence before celebration:** points and streaks may acknowledge effort; only demonstrated performance changes skill evidence.
4. **Bounded AI:** Studio tools operate on selected course material, the user’s error or an explicit skill bundle. There is no context-free “ask anything” box at launch.
5. **Transfer and return:** the product tests a skill in a changed context and again after time has passed.
6. **Safety before social growth:** discovery, identity, messaging, voice/video and rewards unlock only after their separate safety and liquidity gates pass.

## 3. What competitor interfaces actually teach us

This is a pattern audit, not a request to clone visual assets or trade dress.

| Product | Dominant mental model | What users immediately understand | Pattern to retain | Pattern to transform or reject |
|---|---|---|---|---|
| Duolingo | Linear path and daily game | “Continue here” | One obvious next node; rapid exercise feedback; visible journey | Do not let streaks, leagues and currencies masquerade as language ability; avoid a crowded status bar |
| Busuu | Structured course and study plan | “This is a credible syllabus” | Calm module hierarchy, lesson length, explicit goals, planned review | Unify course, community and review so they do not feel like separate products |
| Speak | Speaking studio | “I will talk now” | One dominant speaking action, low visual friction, fast rehearsal loop | AI must serve a reviewed curriculum and evidence model rather than become the curriculum |
| Memrise | Learn / Immerse / Communicate modes | “Learn it, hear it, then use it” | Authentic media and clear mode intent | Avoid three isolated content silos; every mode must update one shared skill state |
| LingoDeer | Guided course with explicit grammar | “Someone designed this language course” | Trustworthy grammar notes, language-specific explanations, reading and speaking practice | Keep depth without turning the phone into a textbook page |
| HelloTalk | Social feed and language exchange chat | “Find people and talk” | In-context corrections, translation and pronunciation tools | No feed-first launch; interaction needs purpose, boundaries and proactive safety controls |
| Tandem | Partner discovery and messaging | “Find a matching partner” | Language/goal matching and structured profiles | Avoid dating-app incentives, unbounded DMs and moderation that begins only after harm |
| Preply / italki | Tutor marketplace and classroom | “Choose, book and meet an expert” | Transparent profiles, availability and lesson expectations | Keep marketplace economics outside the core learning loop until trust, payments and quality systems are ready |

Evidence anchors: [Duolingo’s path/review model](https://blog.duolingo.com/pt/como-revisar-licoes-no-duolingo/), [Busuu product structure](https://help.busuu.com/hc/en-us/articles/15936615354641-What-is-Busuu), [Speak’s current product presentation](https://www.speak.com/us/try), [Memrise Russian experience](https://www.memrise.com/en/learn-russian), [LingoDeer Russian course](https://www.lingodeer.com/language/russian), [HelloTalk language-exchange features](https://www.hellotalk.com/en/features/language-exchange), [Tandem safety/reporting surface](https://tandem.net/pages/how-to-report-someone), [Preply subscription model](https://preply.com/en/subscription), and [italki](https://www.italki.com/).

### Synthesis

The familiar category grammar is useful: a path, course structure, speaking studio, authentic input, explicit grammar, contextual correction and eventually human practice. The differentiator is not a new isolated feature. It is the **single state model** connecting all of them:

`atlas node → lesson → rehearsal → real-life mission → evidence → scheduled return → next route`

Stories, quizzes, games, AI activities and human practice become different renderers of the same skill bundle. They do not create separate progress systems.

## 4. Platform doctrine

### iOS

Apple’s current guidance makes the content/navigation distinction especially important. The content plane carries the brand and the learning world; Liquid Glass is reserved for adaptive navigation and controls. We do not place glass cards on glass backgrounds, mix material variants casually or tint every control. Tab bars remain persistent at the app’s top level, sheets behave predictably, permission prompts appear only when the feature is about to be used, and accessibility settings are inherited rather than imitated.

Sources: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines), [tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars), [materials](https://developer.apple.com/design/human-interface-guidelines/materials), and [Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/).

### Android

Android shares the same information architecture but uses Material 3 Expressive components, system back behavior, platform navigation, native sheets and Android motion conventions. Expressive motion gives important actions a responsive spring; it does not justify constant bouncing or iOS imitation.

Sources: [Material 3 Expressive](https://m3.material.io/blog/building-with-m3-expressive), [Material motion](https://m3.material.io/styles/motion/overview/how-it-works), and [transitions](https://m3.material.io/styles/motion/transitions/applying-transitions).

### Shared behavior, adaptive shell

| Shared across platforms | Native/adaptive per platform |
|---|---|
| Skill graph, mission rules and evidence model | Tab/navigation bar material and placement |
| Course and content schemas | Back gesture and navigation transitions |
| Core icon meanings | SF Symbols or Material Symbols where appropriate |
| Semantic color roles | Typography metrics and dynamic type scaling |
| Motion intent | Spring curves, haptics and system accessibility behavior |
| Error, offline and recovery logic | Permission prompts, share sheets, media pickers and settings links |

## 5. Top-level information architecture

### Launch navigation

| Tab | Job | It must not become |
|---|---|---|
| **Atlas** | See the learning world, current route, next mission and meaningful branches | A decorative level map or endless lesson path |
| **Practice** | Retrieve weak/ready skills through review, voice, writing and short games | A miscellaneous exercise drawer |
| **Studio** | Transform selected material or a known difficulty into explanation, audio, dialogue, quiz or rehearsal | A generic chatbot or infinite-content machine |
| **You** | See evidence, goals, history, settings, accessibility, downloads and account controls | A vanity profile driven by XP |

`People` is not shown as an empty or disabled launch tab. It enters the navigation only after identity, age policy, matching, blocking/reporting, moderation, voice/video, safeguarding and liquidity gates pass. Tutors and commerce arrive later still.

### The Living Mission Atlas

The Atlas has four zoom levels:

1. **World:** language goal and broad environments such as Arrive, Move, Meet, Need and Belong.
2. **District:** a coherent skill bundle and its real-life purpose.
3. **Route:** prerequisite-aware sequence with optional reinforcement branches.
4. **Node:** a lesson, rehearsal, mission, story or return check with explicit evidence outcome.

Spatial movement is semantic. Zooming in means committing to detail; zooming out restores context. The map is not a fantasy game board pasted behind conventional cards.

## 6. Learning-content architecture

### Canonical object chain

`Language → Track → District → Route → Skill → Lesson → Exercise → Mission → Evidence event → Return check`

Supporting objects include vocabulary senses, grammar concepts, phoneme/grapheme targets, dialogue turns, audio assets, error patterns, hints, variants, accessibility alternatives, safety classifications and source/version records.

### Lesson blueprint

Every authored lesson is assembled from reviewed blocks rather than generated as an unstructured sequence:

1. **Orient:** believable reason to learn the skill.
2. **Retrieve:** reactivate prerequisite knowledge.
3. **Notice:** expose the new pattern in comprehensible context.
4. **Make explicit:** concise grammar, vocabulary or pronunciation explanation.
5. **Control:** constrained recognition/production with diagnostic feedback.
6. **Choose:** contrast plausible alternatives and meanings.
7. **Produce:** type or speak with decreasing support.
8. **Transfer:** use the bundle in a changed real-life scenario.
9. **Debrief:** show evidence, uncertainty and the next repair action.
10. **Return:** schedule a later check with altered surface details.

### Russian reference requirements

Russian is the stress test, not filler content. The reference track requires:

- Cyrillic-first presentation; transliteration is optional scaffolding that fades.
- Stress, reduction, palatalization and sound/letter relations represented where instructionally relevant.
- Gender, case and aspect explanations attached to communicative jobs rather than dumped as tables.
- Typed alternatives whenever speech recognition is unavailable or uncertain.
- Audio replay, speed control, transcript control and downloadable variants.
- Error feedback that distinguishes meaning, form, spelling, keyboard and recognition uncertainty.
- No automatic CEFR or pronunciation claim without validated measurement.

### Equivalent activity renderers

For a given skill bundle, users may choose a story, quiz, voice rehearsal or role-play only when the options test equivalent evidence. Choice changes the presentation, not the standard.

## 7. Evidence, score and economy are three separate ledgers

| Ledger | Measures | Can be spent? | Can unlock mastery? |
|---|---|---:|---:|
| **Evidence** | Demonstrated skill under known conditions and uncertainty | No | Yes, under published rules |
| **Habit** | Sessions, consistency and return behavior | No | No; it only informs reminders and celebration |
| **Economy** | Coins earned from bounded daily actions or approved human contribution | Yes | Never |

A visible language score may summarize evidence only after psychometric and calibration work. Until then, the product shows concrete can-do statements, the observation context, recency and confidence limits.

## 8. Studio: NotebookLM-like utility without AI slop

Studio always starts with a **source boundary**:

- current lesson;
- selected Atlas skills;
- a user-highlighted explanation;
- the user’s own error history;
- an approved story/dialogue pack; or
- later, a user-provided source that passes content and privacy rules.

Then the user chooses an operation:

| Operation | Output contract |
|---|---|
| Explain this | Short explanation tied to the selected source and learner state |
| Rehearse aloud | Turn-taking with goals, fallback and uncertainty disclosure |
| Make a quiz | Reviewed item templates and explicit target skills |
| Audio recap | Short, controllable recap with transcript and provenance |
| Mini dialogue | Bounded scene with vocabulary/grammar limits and exit condition |
| Compare examples | Meaning/form contrast using approved examples |
| Repair my mistake | Diagnose a recorded error and prescribe a specific next activity |
| Make a return check | New surface context, same evidence target, scheduled later |

Every output records its source, target skill, model/content version, safety result and whether it is authored, transformed or generated. Generated content cannot silently enter the canonical curriculum.

## 9. Visual system

### Character

Calm, capable and alive—not childish, corporate or “AI neon.” The world should feel like an editorial transit atlas with human scenes, not a dashboard cemetery.

### Layers

1. **World/content layer:** opaque, tactile, brand-bearing surfaces; map contours, scenes, skill nodes and authored media.
2. **Control layer:** platform-native bars, sheets and floating actions; translucent only where the OS material requires it.
3. **System layer:** permissions, keyboards, media controls, notifications and recovery use native conventions.

### Token direction

| Role | Direction | Use |
|---|---|---|
| Canvas | Warm mineral white | Reading comfort and contrast |
| Ink | Deep blue-black | Primary text and map structure |
| Route | Clear ultramarine | Current route and primary action |
| Signal | Electric sky | Selection, audio and Studio operations |
| Evidence | Botanical green | Demonstrated evidence only |
| Attention | Warm amber | Due review and recoverable attention |
| Risk | Vermilion | Safety/destructive/error meaning only |

No rainbow skill taxonomy, decorative glass stack, excessive gradients or permanently tinted controls. Icons require text until repeated use makes their meaning unambiguous.

### Typography and density

- Use the system typeface and native dynamic scaling at launch.
- One large statement per screen, one primary action per state.
- Compact metadata is allowed only after the main job is clear.
- Long-form grammar and evidence detail use progressive disclosure, never tiny text.
- Minimum targets and contrast follow platform accessibility guidance.

## 10. Motion grammar

| Event | Motion meaning |
|---|---|
| Enter a node | Atlas zoom maintains spatial continuity into the lesson/mission |
| Complete a step | Route advances once; no repeated confetti economy |
| Earn evidence | A small trace remains on the relevant skill and route |
| Need repair | The route reveals a nearby repair branch instead of shaking/red punishment |
| Open Studio | Selected source visually persists into the tool so context is never ambiguous |
| Return to Atlas | Camera restores the exact district and node position |
| Reduced Motion | Zoom/spring becomes short crossfade with identical information state |

Motion is interruptible, reversible and input-linked. Haptics mark commitment, success, warning or boundary; they are not ambient decoration.

## 11. State quality bar

Every learner-facing surface must specify at least:

- first use, normal, loading, empty, completed and locked states;
- offline, slow network, stale cache, partial download and sync-conflict behavior;
- microphone denied, speech unavailable, low-confidence recognition and typed fallback;
- dynamic type, screen reader, reduced motion, high contrast and captions/transcripts;
- session interruption, backgrounding, timeout and safe resume;
- content version mismatch, withdrawn content and incident recovery;
- underage or restricted-state alternatives where relevant.

There is no “happy path only” screen definition.

## 12. Build waves and gates

| Wave | Scope | Exit gate |
|---|---|---|
| W0 | Accounts, consent, core taxonomy, design tokens, content/evidence primitives | Reliable entry and recoverable state |
| W1 | Onboarding, goals, course selection, Atlas shell and next-action logic | A new user reaches a meaningful action without confusion |
| W2 | Course, skill graph, lesson player, audio/text exercises and offline lesson | A reviewed lesson completes offline and resumes safely |
| W3 | Mission engine, transfer, evidence, review queue and 24-hour return | One skill survives a changed context and delayed check |
| W4 | Voice capture, replay, recognition uncertainty and fallback | The voice system never silently lies about confidence |
| W5 | Source-grounded Studio operations, provenance and evals | Every output is skill-bound, inspectable and recoverable |
| W6 | Evidence profile, accessibility, notifications, lifecycle and settings | Platform-quality daily-use shell |
| W7 | Downloads, conflicts, migrations and weak-network hardening | No lost progress under adverse network conditions |
| W8 | Authored stories, games and media renderers | Media updates shared evidence and does not create content bloat |
| W9 | Identity, age policy, matching, moderation and discovery foundation | No open social interaction yet; safeguards are operable |
| W10 | Structured human practice and contribution | Safety, quality and liquidity gates pass |
| W11 | Rewards and economy | No reward path creates fake mastery or unsafe labor incentives |
| W12 | Tutors, expert quality, scheduling, payments and subscriptions | Transparent expertise, pricing, refunds and trust operations |

The next prototype demonstrates W1’s interaction doctrine and peeks into later systems only as clearly labelled architecture. It does not claim those systems work.

## 13. Explicit rejections

- No generic chat box as the app’s hero.
- No XP ring presented as language ability.
- No fake tutor, fake community, fake live users or fake AI response in a prototype.
- No social feed at launch.
- No permission wall during onboarding.
- No permanent transliteration dependency for Russian.
- No random exercise that lacks a target skill, prerequisite, evidence rule and return rule.
- No feature tab created merely to signal future ambition.
- No visual imitation of a competitor’s branded characters, shapes, colors or trade dress.
- No single cross-platform shell that ignores iOS and Android conventions.

## 14. Definition of “designed”

A surface is not designed because a mockup exists. It is designed only when its user job, entry and exit, content source, state matrix, accessibility behavior, analytics/evidence semantics, offline/recovery behavior, safety classification and platform adaptation are recorded—and its implementation wave and gate are known.
