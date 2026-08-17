# W2 lesson player and offline slice

**Version:** 0.1  
**Date:** 2026-08-17  
**Status:** implemented as a reference-build slice; not a production content approval

## Decision

The existing First Encounter stages now behave like resumable lesson sessions. A completed task boundary is saved on the
device, the learner is offered an explicit resume choice after reopening the stage, and a completed stage keeps its trace.
The state is local-only; no voice, message, account or remote learning record is created.

This is the smallest useful W2 increment because it tests a real mobile failure mode: the learner leaves halfway through a
lesson and must not lose the route or be silently returned to an earlier task.

## What is implemented

- `src/domain/lesson-session.ts` stores versioned, validated session records in AsyncStorage.
- `src/screens/first-encounter-stage-screen.tsx` saves after each completed task boundary.
- Reopening an unfinished stage shows `SAFE RESUME`, the saved step and an explicit resume/restart choice.
- Completed stages are marked complete in both the learning trace and the session store.
- Storage failure is visible as `LOCAL SAVE UNAVAILABLE`; the UI does not pretend that recovery is guaranteed.
- The screen labels the lesson `OFFLINE-SAFE LESSON` only when no active local save is needed; it never implies server sync.

## Deliberate boundaries

- This does not add audio, speech recognition, AI feedback, or new Russian learner content.
- The Russian evidence cards remain `blocked_pending_russian_review`; the lesson is still a reference build.
- A task boundary is the recovery unit. An in-progress tap/typed answer is not claimed to be recoverable.
- Local persistence is not an account backup or cross-device sync.

## Exit check

1. Open an unlocked First Encounter stage.
2. Complete one task and leave the route before completing the stage.
3. Reopen the same stage.
4. Confirm the explicit resume panel shows the next step and offers a restart path.
5. Resume, finish the stage, reopen it, and confirm the completed trace remains visible.
6. Run `npm run check` before publishing the change.

The W2 gate is not fully passed until the exact lesson content has qualified Russian review and traceable media. This code
proves the recovery behavior; it does not prove language quality.
