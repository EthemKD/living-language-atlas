# Living Language Atlas — WP-01 Normative Errata v1.1

**Tarih:** 2 Eylül 2026  
**Durum:** Normative; WP-02R ve sonraki paketlerde uygulanır  
**Üst belge:** `living_language_atlas_german_mvp_scope_and_evidence_spec_v1.md`  
**Neden:** İlk WP-02 candidate çıktısının denetimi; seviye, modalite, support ve evidence-award sınırlarını netleştirdi  
**Kod durumu:** Henüz implementation yok; bu nedenle kararlar migration gerektirmeden uygulanabilir

Bu errata yalnız aşağıda açıkça değiştirdiği maddelerde üst belgenin önüne geçer. Diğer WP-00/WP-01 kararları korunur. `MUST` ve `MUST NOT` ifadeleri normatiftir.

---

## 1. Stable skill ID, CEFR seviyesini taşımaz

CEFR alignment pilot/reviewer sonucunda değişebilir; stable skill identity değişmemelidir. Bu nedenle yeni canonical ID'ler:

```text
GER-SVC-REQUEST-ONE-01
GER-SVC-REPAIR-01
```

Önceki planlama ID'leri implementation başlamadan deprecated edilmiştir:

```text
GER-PREA1-SVC-REQUEST-ONE -> GER-SVC-REQUEST-ONE-01
GER-PREA1-SVC-REPAIR    -> GER-SVC-REPAIR-01
```

Henüz persisted learner data bulunmadığı için alias/migration gerekmez. WP-02R yalnız yeni ID'leri kullanmalıdır.

## 2. N1 ve N2 seviye iddiaları ayrılır

### N1 — Request one visible/pre-taught item

```text
internal_band: BEGINNER_0
cefr_alignment: PRE_A1
cefr_alignment_status: PROVISIONAL_REFERENCE
```

Alignment yalnız görünür/önceden öğretilmiş ürün, basit ifade ve gerektiğinde işaret/bağlam desteği sınırında geçerlidir. Genel Pre-A1 tamamlama iddiası değildir.

### N2 — Communication repair

```text
internal_band: BEGINNER_0
curriculum_band: EARLY_A1_BRIDGE
cefr_alignment: null
cefr_alignment_status: PENDING_HUMAN_REVIEW
```

CEFR Asking for Clarification ölçeğinde Pre-A1 descriptor yoktur. A1, anlamadığını basitçe belirtmeyi; A2, çok basit tekrar istemeyi içerir. Goethe A1 öğretim/test envanteri repair kalıplarını içerebilir; bu, N2 için resmî Pre-A1 descriptor oluşturmaz.

Ürün N2'yi erken öğretebilir fakat `Pre-A1 certified`, `A1 achieved` veya genel konuşma yeterliği iddiası MUST NOT üretmelidir.

## 3. Can-do iddiası evidence lane'e özgüdür

Her activity açık bir lane taşır:

```text
read_recognition
listen_recognition
typed_production
spoken_production
```

MVP-0 N2 can-do metni:

> Can select or type a short German repair formula in a written service-interaction simulation.

MVP-0 typed N2 başarısı:

- `typed_production` evidence üretebilir,
- `listen_recognition` veya `spoken_production` evidence MUST NOT üretir,
- “you repaired fast spoken German” veya “your spoken repair reflex held” gibi copy MUST NOT kullanır,
- “you used a repair formula in a new typed situation” gibi yalnız kanıtlanan şeyi söylemelidir.

Gerçek acoustic/spoken N2 iddiası daha sonra şu tam döngüyü gerektirir:

```text
natural audio breakdown
  -> learner-initiated repair
  -> cooperative repeat/rephrase
  -> learner continues the transaction correctly
```

## 4. H0–H4 sınıfları ve answer reveal

```text
H0: yalnız doğal scenario; ek yönlendirme yok
H1: situation veya semantic goal; German target form yok
H2: retrieval cue veya target-bearing lexical reminder
H3: construction scaffold / word bank / partial frame
H4: model cevap tam ya da parçalı olarak açığa çıkarılmış
```

Normative kurallar:

- Tam model cevabın görünür olduğu exposure/copy activity MUST `H4` olmalıdır.
- English “ask for X” veya “signal non-understanding” anlam hedefi MUST `H1` olmalıdır; `H0` değildir.
- German vocabulary reminder, target skill'e göre sınıflandırılır. Görünür ürün adı request-frame skill'i için doğal context olabilir; aynı cue lexical recall evidence MUST NOT üretir.
- “Ask them to repeat / speak more slowly” gibi explicit strategy instruction, self-initiated repair'i ölçemez. Bu activity N2 independent-strategy E3/E4 MUST NOT üretir.
- `answer_revealing_exposure: true|false` support level'dan ayrı tutulmalıdır.
- Model card, answer reveal, feedback içindeki tam cevap ve contaminated retry, `AnswerRevealingExposureRecorded` olayı üretmelidir.

## 5. AttemptEvaluation ve EvidenceDecision ayrıdır

Akış:

```text
Attempt
  -> AttemptEvaluation
  -> EvidenceDecision
  -> EvidenceEvent
```

`AttemptEvaluation` yalnız şunları döndürür:

```text
evaluation_outcome: accepted_clean | accepted_minor | failed_critical | unscored
intent_outcome
form_outcome
register_outcome
error_codes[]
evaluator_confidence_bucket
```

`accepted_clean (Practice Only)` veya `accepted_clean (Typed E3)` gibi birleşik outcome değerleri yasaktır.

`EvidenceDecision` en az şunları değerlendirir:

```text
activity_id
skill_id
evidence_lane
evidence_capability
support_level
answer_revealing_exposure
contamination_status
changed_context_qualified
delay_qualified
version_compatibility
awarded_tier: E0 | E1 | E2 | E3 | E4 | NONE
```

Accepted bir cevap; activity capability, lane, support, context, contamination ve delay koşulları geçmeden otomatik EvidenceEvent üretmez. Activity yalnız capability bildirir; stage award yetkisi versioned evidence policy'dedir.

## 6. E1 ve E2 bundle'ları atomik ve machine-readable'dır

E1 dört seçenekli bundle:

```json
{
  "required_successes": 3,
  "total_distinct_items": 3,
  "feedback_contaminated_items_count": false,
  "item_ids": ["...-01", "...-02", "...-03"]
}
```

E2 bundle:

```json
{
  "required_successes": 2,
  "total_distinct_items": 2,
  "item_ids": ["...-01", "...-02"]
}
```

Her child item JSON'da ayrı, gerçek ID ile bulunmalıdır. `ACT-...01..03` gibi aralık pseudo-ID'leri yasaktır.

## 7. E4 eligibility machine-readable'dır

Her E4 activity en az şu policy'yi taşır:

```json
{
  "prior_tier": "E3",
  "prior_same_skill": true,
  "prior_same_lane": true,
  "minimum_clean_delay_seconds": 72000,
  "scheduler_target_seconds": [86400, 259200],
  "clock_anchor": "MAX(PRIOR_E3_AT,LAST_ANSWER_REVEAL_AT)",
  "answer_reveal_resets_clock": true,
  "allowed_support_levels": ["H0", "H1"],
  "changed_context_required": true,
  "rubric_compatibility_required": true,
  "content_familiarity_required": true
}
```

- 20 saat minimum ve 24–72 saat scheduler bandı `[PILOT]` kalır.
- 72 saatten geç dönüş otomatik olarak geçersiz değildir; gerçek delay bandı kaydedilir.
- Cross-modal prior E3, başka lane'de E4 üretmez.
- Answer reveal saati sıfırlar.
- Delay, changed-context dimension değildir.

## 8. Changed-context vector intent'i değiştirmez

Intent code aynı skill içinde stabil kalır. Alanlar ayrı tutulur:

```text
intent_code
venue
referent_or_information_slot
interlocutor
dialogue_position
prompt_surface
stimulus_modality
distractor_set
```

E3/E4 için delay hariç en az iki boyut değişmelidir; bunlardan en az biri semantic/retrieval-relevant olmalıdır. Yalnız avatar, arka plan, cevap sırası veya delay değişimi yeterli değildir.

## 9. E3/E4 hedef içeriği önceden tanıdık olmalıdır

Request-frame skill'i ölçülürken hedef item şu durumlardan birini taşır:

```text
VISIBLE_IN_NATURAL_CONTEXT
PRETAUGHT_ACCEPTED
PREVIOUSLY_RECOGNIZED
```

- Metadata ledger'da bulunmak learner exposure değildir.
- Tamamen yeni ve görünmeyen bir noun, gender/article dönüşümü, syntax veya repair formula E4'te kullanılamaz.
- Familiarity kaydı eksikse attempt `unscored_prerequisite_missing` olur; learner skill failure veya repair üretmez.
- E4, önceki E3'teki aynı exact item'ı kullanmak zorunda değildir; ancak bütün gerekli bileşenler önceden öğretilmiş ceiling içinde olmalıdır.

## 10. WP-02R aktif üretim yükü

İlk candidate package şu sınırı kullanır:

- N1 aktif öğretilen tek request frame: reviewer-pending `Einen [reviewed masculine item], bitte.`
- N1 active item set, yeni gender/case dönüşümü eklemeyen en fazla üç önceden öğretilmiş masculine ürünle sınırlıdır.
- `Ich möchte …` evaluator için accepted/passive candidate olabilir; active production hedefi değildir.
- `Ich hätte gern …` exposure-only/accepted candidate olarak kalır.
- N2 aktif öğretilen ilk repair chunk: reviewer-pending `Wie bitte?`
- `Noch einmal, bitte.`, `Etwas langsamer, bitte.` ve `Das habe ich nicht verstanden.` recognition veya accepted/passive candidate olabilir; aynı anda active-production şartı değildir.
- Grammar terminology ve tam accusative paradigm learner objective değildir.

Bu sınırlama human reviewer'ın alternatifleri değerlendirmesine engel değildir; yalnız ilk aktif öğrenme yükünü sınırlar.

## 11. Natural de-DE audio/transcript ilkesi

- Canonical transcript normal German orthography, spaces, umlauts ve punctuation kullanmalıdır.
- Hız, reduction ve pause; recording direction ve audio metadata ile belirtilmelidir.
- Sahte bitişik kelime, pseudo-dialect veya `mbl...krzzzt` gibi textual noise yasaktır.
- `Sie` olarak tanımlanan scenario içinde `du` formu kullanılamaz.
- Qualification audio cooperative Standard German speaker kullanmalıdır; ağır dialect, task-blocking noise veya anlaşılmaz mırıldanma ilk route kapsamı dışındadır.
- Cooperative repeat/rephrase, önceki utterance'ın communicative intent'ini korumalıdır.
- Tek repair turn'ünde art arda aynı işlevi taşıyan birden çok formula zorunlu tutulmamalıdır.

Candidate dialogue pattern:

```text
Clerk, natural brisk pace: Darf es sonst noch etwas sein?
Learner: Wie bitte?
Clerk, slower: Möchten Sie noch etwas?
Learner: Nein, danke.
```

Bu metin de `candidate_pending_human_review` statüsündedir.

## 12. Intent, form ve register ayrı eksenlerdir

- `Ich will …` gramatik olabilir fakat bu bağlamda fazla doğrudan olabilir: `REGISTER_TOO_DIRECT`; `DU_SIE_MISMATCH` değildir.
- `Gib mir …`: intent anlaşılabilir; `INFORMAL_IMPERATIVE` ve register mismatch olabilir.
- `Was?` ve `Hä?` non-understanding signal taşır; `OFF_TASK` değildir. Register outcome abrupt/colloquial olabilir.
- Transparent morphology hatası clean form evidence'i engelleyebilir; communicative intent'i otomatik silmez.
- `Ein Kaffee, bitte.` task-successful candidate olarak kalabilir; kesin grammatical/form sınıflaması human reviewer'a bırakılır.
- “universally polite”, “always include bitte” veya “expected and welcomed” gibi mutlak learner copy yasaktır.

## 13. ASCII fallback hedefe özgüdür

`ae/oe/ue/ss` global rewrite değildir. Yalnız reviewer-approved target-specific alternative eşlemesi kullanılabilir:

```text
raw_input korunur
normalized_input ayrı tutulur
matched_variant_id kaydedilir
orthography evidence verilmez
```

Özellikle global `ss -> ß` dönüşümü yasaktır.

## 14. Provenance ve lisans gerçeği yansıtmalıdır

Gemini tarafından oluşturulan content:

```text
authorship_type: AI_GENERATED_CANDIDATE
provider: Google Gemini
human_review_status: PENDING
project_content_license: TBD_PENDING_OWNER_DECISION
release_gate: BLOCKED
```

- Kanıtlanmamış `Living Language Atlas Pedagogical Team authored`, publisher veya internal URL beyanı yasaktır.
- Kod lisansı content lisansı değildir.
- “Publicly accessible” bir reuse lisansı değildir.
- Her dış kaynak gerçek copyright/licensing status, rights holder, direct URL, access date, narrow supported claim ve kullanım türünü taşır.
- Reference-only kaynaktan learner-visible content kopyalanamaz.

## 15. Sürüm ve geçmiş

Her EvidenceEvent en az:

```text
content_version
rubric_version
evidence_policy_version
evaluator_version
evidence_lane
```

taşır. Policy değişikliği geçmiş event'leri sessizce yeniden yazmaz.

---

## Acceptance fixtures

| ID | Girdi | Beklenen |
|---|---|---|
| `ERR-F01` | Tam model görünür, activity H0 işaretli | Validation fail; H4'e düzeltilir; E0 only |
| `ERR-F02` | English meaning prompt var, German target yok, H0 işaretli | Validation fail; H1 olmalı |
| `ERR-F03` | Word bank H3 + doğru cevap | En fazla E2 |
| `ERR-F04` | Answer reveal sonrası exact copy | Attempt accepted olabilir; evidence yalnız E0/practice |
| `ERR-F05` | Accepted string fakat activity/support/context metadata yok | EvidenceDecision `NONE` |
| `ERR-F06` | N1 H1, typed, iki geçerli context değişimi, familiar item | Typed E3 adayı |
| `ERR-F07` | N1 E3 prompt'unda target-bearing lexical reminder, item ayrıca natural scene'de görünmüyor | E3 yok; H2 veya prerequisite issue |
| `ERR-F08` | N2 text scenario + H1 English goal + typed `Wie bitte?` | Yalnız typed-production evidence; listening/spoken değişmez |
| `ERR-F09` | N2 prompt açıkça “ask them to repeat” diyor | Self-initiated repair E3/E4 yok |
| `ERR-F10` | Same skill/lane E3, 26h clean delay, H1, iki changed dimension | E4 adayı |
| `ERR-F11` | Aynı koşullar fakat 3h delay | E4 yok; en fazla E3 maintenance |
| `ERR-F12` | 26h geçti fakat 15 dakika önce answer reveal oldu | Clock reset; E4 yok |
| `ERR-F13` | Prior E3 typed, return response spoken | Spoken E4 yok; validated evaluator varsa en fazla spoken E3 |
| `ERR-F14` | Tek context değişimi + delay ikinci dimension sayılmış | Changed-context validation fail |
| `ERR-F15` | Tamamen yeni/görünmeyen noun, familiarity yok | `unscored_prerequisite_missing`; skill failure yok |
| `ERR-F16` | `Ich will …` doğru referent ile | Intent ayrı değerlendirilir; register `TOO_DIRECT`; du/Sie code yok |
| `ERR-F17` | `Hä?` non-understanding scenario'da | Intent off-task değildir; register reviewer-pending |
| `ERR-F18` | Global `ss -> ß` normalization kuralı | Validation fail |

---

## Birincil referanslar

- Council of Europe, CEFR Companion Volume 2020: https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4
- Goethe-Institut, Start Deutsch 1 objectives/test description: https://www.goethe.de/pro/relaunch/prf/sk/Pruefungsziele_Testbeschreibung_A1_SD1.pdf
- Rat für deutsche Rechtschreibung / IDS, 2024 official rules: https://grammis.ids-mannheim.de/orthos/

Bu kaynaklar alignment ve orthography referansıdır; learner-visible content reuse lisansı değildir.
