# Research traceability

The repository keeps research inputs beside the product so implementation decisions can be challenged without
turning every decision into another memo.

| Product decision | Evidence / source artifact | Code expression |
|---|---|---|
| Preply is tutoring/marketplace-adjacent, not the model for the core self-study loop | `10_mkt_lite_pilot_report.md` | People/tutoring is absent from the first slice |
| Users repeatedly object to pricing opacity, rigid subscriptions, shallow repetition and unreliable feedback | `10_mkt_lite_pilot_report.md`, `11_voc_deep_dive_report.md` | Evidence-led queue, explicit claim boundaries, no subscription wall in prototype |
| Keep Atlas, Practice, Studio and You as distinct jobs | `12_product_foundation_mvp_slice_v0.1.md` | Four native tabs and separate screen/domain state |
| Start with a truthful first encounter and one bounded mission | `13_first_encounter_build_spec_v0.1.md` | `D03-M01` interactive vertical slice |
| Use a living mission route instead of dashboard/card soup | `15_experience_architecture_design_doctrine_v0.1.md` | Spatial district route in `atlas-screen.tsx` |
| Separate encounter, recognition, supported production, transfer and delayed return | Reference content pack evidence ladder | Mission steps and `You` evidence ledger |
| Keep Russian content reviewable before adding breadth | `docs/product/16_russian_a1_content_blueprint_v0.1.md` | First Encounter stays source-bound and review-gated; the next content change needs an item-level evidence card |
| Treat competitor breadth as an explicit gap, not a reason to add disconnected features | `17_competitive_gap_snapshot_2026-08-17.md` | Atlas exposes the inspectable curriculum horizon while runnable content and review status remain distinct |

The `governance/` directory is retained as an audit archive. It does not block local read-only competitor research or
ordinary product implementation; specialist gates still apply to privacy, safety, payments, minors, psychometrics and
language-review claims.

Research can inform a hypothesis but does not certify a feature. Any claim promoted to product copy needs a direct,
current source and an owner.
