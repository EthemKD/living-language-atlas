# Living Language Atlas — Per-Atom AI Dispatch Guide v2

Use this v3-aligned block for every future atom:

```text
ATOM: LLA-Axxx/270
BASE: `origin/main@<full SHA>`

BRAIN: <critical decision/research/acceptance task>.
SECOND-BRAIN: <bounded adversarial review> | otherwise STANDBY — send nothing.
WORKER: <single implementation brief> | otherwise STANDBY — send nothing.
SPARK: <mechanical comparison task + exact inputs> | otherwise STANDBY — send nothing.
NOTION: STANDBY — send nothing unless OWNER + BRAIN explicitly authorize a non-decisive research task.
OWNER: <only human/account/device/merge action> | otherwise NONE.

RETURN: <required report, commit, hashes, tests, or decision record>.
STOP: no successor atom starts without BRAIN acceptance and OWNER continuation.
```

## Routing rules

- BRAIN receives no relay: it uses actual repository source and official primary sources for critical research.
- SECOND-BRAIN receives a compact decision packet, never a vague “review everything” request.
- WORKER receives an implementation brief only after a BRAIN decision is frozen for that atom.
- SPARK receives the smallest input that allows a deterministic count/hash/diff/checklist output.
- Never use a worker report, Spark output, or external-chat statement as acceptance without BRAIN verification.
