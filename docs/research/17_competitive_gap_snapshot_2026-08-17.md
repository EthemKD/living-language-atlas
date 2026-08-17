# Competitive gap snapshot — 2026-08-17

**Status:** public-product scan; decision input, not market-size or learning-outcome evidence

## What the current public products already do

This scan uses official product pages only. It does not claim that a feature improves learning for every user.

| Product | Publicly stated capability | Gap it creates for this build |
|---|---|---|
| Duolingo | A free Practice Hub plus Max Roleplay and Video Call experiences for supported courses. [Practice Hub](https://blog.duolingo.com/guide-to-duolingo-practice-hub/) · [Video Call](https://blog.duolingo.com/video-call/) | We have a small source-bound queue and no voice runtime. |
| Busuu | Compact courses, audio, grammar/vocabulary review, voice-recognition exercises and Community Corrections. [Methodology](https://www.busuu.com/en/it-works/busuu-methodology) · [Corrections](https://www.busuu.com/en/how-to/corrections) | We have no native media, human correction network or adaptive review service. |
| Memrise | Native-speaker video, practice modes and AI speaking conversations are part of its current public product story. [Product](https://www.memrise.com/) · [App changes](https://www.memrise.com/blog/changes-to-the-memrise-app) | We have no licensed media library or bounded conversation runtime. |
| LingoDeer | Russian-specific grammar guidance and native-speaker audio are explicit product promises. [Russian course](https://www.lingodeer.com/language/russian) | Our Russian strings and eventual audio remain review-gated and deliberately incomplete. |

## Current gap ledger

| Capability | Our status | Honest interpretation |
|---|---|---|
| Curriculum breadth | 12 districts / 48 bundles / 36 mission outlines are inspectable; one reference mission is runnable | This is a curriculum architecture, not 36 finished lessons. |
| Source-bound learning loop | First Encounter has 21 deterministic tasks, changed-context transfer and delayed return | This is the current product strength, but it is one narrow route. |
| Adaptive review | Evidence Map and Practice choose a bounded next action from local traces | It is not yet a full spaced-repetition or mastery engine. |
| Native audio/video | Not active | No synthetic or unreviewed Russian media is presented as finished learning content. |
| AI speaking | Not active | No generic chatbot is used to hide missing evaluation or safety contracts. |
| Community/tutoring/economy | Not active | Identity, moderation, age safety, payments and liquidity gates remain open. |

## Product decision

We should not close the visible gap by adding disconnected AI chat, coins, story cards or fake social activity. The next
credible sequence is:

1. Make the curriculum horizon inspectable and routeable without pretending outline-only missions are live.
2. Promote a small number of exact Russian content cards only after two qualified review passes, accepted variants and
   traceable audio are attached.
3. Add native audio playback and slow/replay controls to those reviewed cards.
4. Expand the evidence loop to additional reviewed missions before adding open-ended AI speaking.
5. Add account, backend, moderation, community and economy only when their separate safety and operational contracts are
   ready.

This sequence leaves us behind mature competitors on feature count for now. It keeps the product’s differentiator
legible: a real-life mission is connected to a concrete can-do, an observation boundary, a remaining gap and a next
action instead of being converted into an opaque score.
