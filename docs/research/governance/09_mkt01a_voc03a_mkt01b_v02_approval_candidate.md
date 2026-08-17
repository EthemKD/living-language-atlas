# MKT-01A + VOC-03A + MKT-01B v0.2 — Approval Candidate

**Protocol ID:** `MKT-01A-VOC-03A-MKT-01B-G0A-v0.2`
**Envelope ID:** `MKT-VOC-G0A-STAGED-ENVELOPE-v0.2`
**Tarih:** 2026-08-11
**Lane:** `G0A — SOLO-FOUNDER PUBLIC DISCOVERY`
**Durum:** `APPROVAL_CANDIDATE / NOT_APPROVED_TO_COLLECT / NO_EFFECT / NO_COLLECTION`
**Normatif üst belge:** `ROS-DESIGN-v1.3-CANDIDATE-COMPILED`; SHA-256 `08D3EB89B21959636373687647FCBDA1FF581CECFC2FE7C5523F0D71150D68BE`; o belge de `NOT_APPROVED`
**Bütçe tavanı:** `0`
**Çıktı tavanı:** `PRELIMINARY_PUBLIC_DISCOVERY / NON_REPRESENTATIVE / NOT_DXX_READY`

> Bu belge çalıştırılmamış bir protocol candidate'ıdır. Aşağıdaki engine, URL ve query'ler araştırma bulgusu değil, Founder review'una sunulan operasyonel seçimlerdir. Engine/parametre davranışı dâhil hiçbir dış olgu bu turda doğrulanmamıştır. Web araması, source opening, kullanıcı yorumu görüntüleme veya collection yapılmamıştır.

`Founder Hypothesis Memo v0.1` bu protocol'de source/evidence değildir; yalnız pre-registered question, counter-hypothesis ve falsifier üretmiş olabilir. Hiçbir memo fikri search sonucuna veya requirement'a dönüşmüş sayılmaz.

## 1. Amaç, sorular ve yasak çıktılar

### 1.1 Amaç

Public/read-only kaynaklardan:

1. provisional category/alternative seed frame üretmek;
2. küçük, kimliksiz public USER_REPORT sinyal kesitiyle category/user-language soruları açmak;
3. iki stage'i tek integrated preliminary market synthesis içinde birleştirmek.

### 1.2 Araştırma soruları

- `MKTQ01` — Resmî public kaynaklar Founder seed'lerini hangi delivery mechanism'lerle tanımlıyor?
- `MKTQ02` — Dondurulmuş query evreninde başka hangi product/service/non-app alternative adayları görülüyor?
- `MKTQ03` — Public kullanıcılar seçim, bırakma, switching, need, praise, friction, missing capability, billing, trust, perceived learning ve unused feature dilini nasıl ifade ediyor?
- `MKTQ04` — Bu kullanıcı dili provisional category frame'i nerede destekliyor, bölüyor veya yeni soru açıyor?
- `MKTQ05` — Hangi çelişkiler, gaps ve high-risk issue'lar sonraki public araştırmaya veya G0B'ye aktarılmalı?

### 1.3 Yasak çıktılar

Bu protocol şunları üretemez:

- pazar büyüklüğü, market share, TAM/SAM/SOM veya category leader;
- review prevalence, memnuniyet oranı, “çoğu kullanıcı” veya nüfus temsili;
- gerçek öğrenme etkililiği, nedensellik veya psychometric validity;
- safety/moderation yeterliliği, fraud doğrulaması, hukuk/platform compliance;
- target segment, D03, launch country, fiyat, abonelik, product requirement veya roadmap;
- teknoloji/stack/vendor seçimi, mockup, spike, build, beta, pilot veya launch;
- `READY_FOR`, Dxx veya decision-grade evidence.

## 2. Tek approval envelope ve stage DAG

```text
MKT-01A CATEGORY/ALTERNATIVE SEED FRAME
→ VOC-03A PUBLIC USER-SIGNAL SCAN
→ MKT-01B INTEGRATED MARKET SYNTHESIS
```

- `MKT-01A` yalnız `PROVISIONAL_SEED_FRAME / STAGE_FROZEN` üretir.
- `VOC-03A` yalnız `MINIMIZED_SIGNAL_DATASET / STAGE_FROZEN` üretir.
- Yalnız `MKT-01B` terminal `PRELIMINARY_PUBLIC_DISCOVERY / PD*` adayıdır.
- VOC'tan A'ya hard veya refresh oku yoktur.
- Stage'ler için ayrı collection approval yoktur.

Tek authority record şeması:

```text
FOUNDER_APPROVED_TO_COLLECT(
  envelope_id=MKT-VOC-G0A-STAGED-ENVELOPE-v0.2,
  protocol_id=MKT-01A-VOC-03A-MKT-01B-G0A-v0.2,
  approved_protocol_baseline_hash_for_lineage,
  scope_hash,
  source_class_hash,
  risk_class=R0_R1_PUBLIC_READ_ONLY,
  budget_cap=0,
  exposure_caps_hash,
  authority_identity_hash,
  approved_at_utc,
  authority_expires_at_utc=approved_at_utc+336h,
  approved_by=Founder
)
```

**Bu record mevcut değildir.** Placeholder approval değildir.

Authority identity; exact `scope_hash + source_class_hash + risk_class + budget_cap + exposure_caps_hash` birleşimidir. `approved_protocol_baseline_hash_for_lineage` Founder'ın gördüğü başlangıç metnini pinler fakat altıncı reapproval trigger yaratmaz. Her action ayrıca exact `active_protocol_hash` ve baseline'a uzanan CR chain'i taşır. Bu beş authority alanını değiştirmeyen amendment ancak yeni protocol version + ayrı AI operational QA + `AUTHORITY_FIELDS_UNCHANGED=true` attestation freeze edildikten sonra yürütülebilir; eşitlik kanıtlanamazsa action yok ve yeni Founder approval gerekir. Veriyi gördükten sonraki amendment ayrıca `EXPLORATORY_AMENDMENT` olur.

Kanonik profil `AUTH-JCS-SHA256-v0.2`:

1. Bütün authority manifests JSON object'tir. String values önce Unicode NFC olur; object key'leri aşağıdaki ASCII adlardır; `null` yasaktır; omitted key ile boş array farklıdır. Set-semantics array'ler Unicode code-point ascending, sequence-semantics array'ler aşağıda yazılan frozen sıradadır.
2. Byte projection RFC 8785 JCS; encoding UTF-8 without BOM. Hash SHA-256; çıktı uppercase 64-hex.
3. `scope_hash=SHA256(JCS(scope_manifest))`; `source_class_hash=SHA256(JCS(source_class_manifest))`; `exposure_caps_hash=SHA256(JCS(exposure_caps_manifest))`.
4. `authority_identity_hash=SHA256(JCS({"schema_id":"AUTHORITY-IDENTITY-v0.2","scope_hash":...,"source_class_hash":...,"risk_class":"R0_R1_PUBLIC_READ_ONLY","budget_cap":0,"exposure_caps_hash":...}))`.
5. `AUTHORITY_FIELDS_UNCHANGED=true` yalnız eski/yeni üç manifest canonical byte'ları, `risk_class`, `budget_cap` ve recomputed `authority_identity_hash` birebir eşitse üretilebilir.

`scope_manifest` exact required keys/values; içindeki bütün arrays sequence-semantics'tir ve aşağıdaki sırayı aynen korur:

```json
{
  "schema_id": "AUTHORITY-SCOPE-v0.2",
  "stage_ids": ["MKT-01A", "VOC-03A", "MKT-01B"],
  "research_question_ids": ["MKTQ01", "MKTQ02", "MKTQ03", "MKTQ04", "MKTQ05"],
  "query_universe_id": "MKT-VOC-QUERY-UNIVERSE-v0.2.0",
  "selection_ruleset_id": "MKT-VOC-SELECTION-RULESET-v0.2.4",
  "seed_names": ["Tandem", "HelloTalk", "Lingbe", "Hilokal", "italki", "Preply", "Cambly", "Busuu", "Duolingo", "Speak", "ELSA"],
  "mechanism_scope_ids": ["HUMAN_TUTOR_MARKETPLACE", "LIVE_CLASS_OR_CONVERSATION", "STRUCTURED_SELF_STUDY", "AI_CONVERSATION", "PRONUNCIATION_FEEDBACK", "PEER_LANGUAGE_EXCHANGE", "NON_APP_SELF_STUDY_OR_HUMAN_HELP"],
  "locale_scope_ids": ["GLOBAL_ENGLISH_NO_CC", "US_STOREFRONT_CC_US", "TR_SUPPLEMENTAL_CC_TR"],
  "intended_use": "PRELIMINARY_PUBLIC_DISCOVERY",
  "decision_ceiling": "NOT_DXX_READY"
}
```

`source_class_manifest` sequence-semantics `access_method_ids`, `allowed` ve `prohibited` arrays'ini tam bu sırada taşır:

```json
{
  "schema_id": "AUTHORITY-SOURCE-CLASS-v0.2",
  "access_method_ids": ["BING_PUBLIC_WEB_UI_LOGIN_FREE", "DIRECT_PUBLIC_URL_LOGIN_FREE"],
  "interaction_mode": "MANUAL_FINITE_READ_ONLY",
  "allowed": ["PUBLIC_OFFICIAL_PRODUCT_HELP_PRICING_POLICY", "PUBLIC_APPLE_US_LISTING_AND_REVIEW", "PUBLIC_GOOGLE_US_LISTING_AND_REVIEW", "PUBLIC_TR_STOREFRONT_CONTEXT", "PUBLIC_FORUM_OR_COMMUNITY_THREAD", "PUBLIC_ACADEMIC_OR_INSTITUTIONAL", "PUBLIC_QUALIFIED_THIRD_PARTY"],
  "prohibited": ["LOGIN_OR_ACCOUNT", "PURCHASE_OR_SUBSCRIPTION", "OUTREACH_OR_INTERACTION", "SCRAPING_CRAWLING_API_RSS_BULK", "HIGH_VOLUME_AUTOMATION", "PII_OR_IDENTIFIER_RETENTION", "VOICE_VIDEO_OR_PARTICIPANT_DATA"]
}
```

`exposure_caps_manifest` exact object:

```json
{
  "schema_id": "AUTHORITY-EXPOSURE-CAPS-v0.2",
  "total_active_minutes": 1440,
  "authority_window_hours": 336,
  "mkt01a_active_minutes": 720,
  "voc03a_active_minutes": 480,
  "mkt01b_active_minutes": 240,
  "search_result_page_events": 96,
  "candidate_opens_per_query": 3,
  "candidate_opens_total": 288,
  "direct_tr_page_events": 11,
  "mkt01a_retained_non_ugc": 84,
  "mkt01b_named_retained": 5,
  "store_review_parents": 22,
  "forum_parents": 14,
  "forum_candidate_opens": 42,
  "store_review_units_inspected": 110,
  "forum_candidate_opening_units_inspected": 42,
  "forum_selected_parent_additional_reply_units_inspected": 56,
  "ugc_units_inspected": 208,
  "user_reports_retained": 72,
  "transient_qa_sessions": 72,
  "qa_attempts": 144,
  "direct_recheck_events": 66,
  "total_page_events": 497,
  "raw_ugc_retained": 0,
  "pii_locator_retained": 0,
  "spend_minor_units": 0
}
```

Bu candidate'taki üç exact JSON block için `AUTH-JCS-SHA256-v0.2` recomputation check sonucu:

```text
scope_hash=E19459A19C3C2CFCBAD213FCE7AAFD24A45BDD8C6C53CF3C48A1AF4CE4DFAB4D
source_class_hash=6ADD3563002C48CA4CE8E6D4E2062FFE8EEF26070E8F0A7CF6F8B2B5450602C9
exposure_caps_hash=A8B294CA1AC077262646A2FEB84AC918096B1E1342B8CF4A1CAFDF5AA9DB0E48
authority_identity_hash=849C0984C21EDBB0FEF93B44A0D8012DCB692962AB3749A8A40547DDF8A34830
```

`query_universe_id`, §6–§8 exact engine/request/query/locale/order/rank evreninin; `selection_ruleset_id`, §9–§10 exact entity/source identity, dedup ve sample-selection semantics'inin immutable version kimliğidir. Bu bağlı kurallardaki semantic değişiklik ilgili ID'yi bump eder, `scope_hash`i değiştirir ve yeni Founder approval ister. Typo/format veya aynı frozen kuralın mekanik uygulanması ID bump değildir.

Bu değerler `CANDIDATE_RECOMPUTATION_CHECK`tir; Founder approval event'i değildir. Üç manifestten tek byte değişirse dört değer yeniden hesaplanır ve eski check superseded olur.

`approved_protocol_baseline_hash_for_lineage` ve `active_protocol_hash` için kanonik profil `PROTOCOL-FILE-BYTES-SHA256-v0.2`dir:

1. Approval target protocol dosyası UTF-8 without BOM, yalnız LF line ending ve EOF'ta tam bir LF ile freeze edilir.
2. Hash input'u bu dosyanın **bütün exact byte'larıdır**; Unicode normalization, whitespace trim, section/field projection, placeholder substitution veya excluded field yoktur.
3. `approved_protocol_baseline_hash_for_lineage=SHA256(exact_frozen_protocol_file_bytes)` ilk Founder-approved protocol version'ını; `active_protocol_hash` action anındaki exact approved/amended protocol version'ını pinler. Çıktılar uppercase 64-hex'tir.
4. Hash değerleri hash'lenen protocol dosyasına gömülmez; C1'in ayrı approval/action ledger record'unda tutulur. C1 protocol section'ı exact byte-length-delimited payload'ı byte-for-byte saklar; wrapper payload hash'ine girmez.

Bu kural generic §15 logical-record checksum'undan ayrıdır; protocol baseline için hangi projection'ın kullanılacağına dair alternatif yoktur ve self-reference oluşmaz.

Yeni Founder collection approval'ı yalnız `scope`, izinli `source class`, `risk`, `budget` veya `exposure cap` semantik değiştiğinde gerekir. Query/rank/dedup/selection semantics değişikliği `query_universe_id` ve/veya `selection_ruleset_id` bump ederek semantic scope change üretir. Search engine/access method değişikliği source-access scope değişikliğidir. Yazım/format düzeltmesi, frozen kurala göre URL identity hesaplama veya collection yaratmayan açıklama yalnız change log + provenance check ister.

## 3. Roller ve disclosure

| İş | Accountable | Responsible | Operational check |
|---|---|---|---|
| Scope, budget, approval, stop/direction | Founder | Founder | Ayrı AI context advisory |
| Protocol, collection, ledger, synthesis | Founder | Codex Package Lead | Ayrı AI QA/red-team |
| Transient USER_REPORT QA | Founder | Ayrı AI context | Her retained signal, %100 |
| Integrated QA | Founder | Ayrı AI context | Human review değildir |
| Integrated red-team | Founder | Başka ayrı AI context | Independent-human review değildir |

Her AI review kaydı:

```text
reviewer_kind=AI
is_human=false
human_review_performed=false
independent_human_review=false
```

## 4. İzinli ve yasak eylemler

| İzinli — yalnız exact approval sonrası | Yasak |
|---|---|
| Login-free public search UI'da exact frozen query | Login/account/trial/install |
| Public official web/help/pricing/policy/store listing | Satın alma, abonelik, checkout, refund testi |
| Küçük public store-review/forum kesitini read-only görmek | Outreach, yorum/reply/vote, support contact |
| Kimliksiz kısa derived paraphrase | Username/profile/comment ID/permalink/raw quote/screenshot/thread dump retention |
| Manuel, finite page/rank selection | Scraping, crawling, API, RSS/export, bulk download, high-volume automation |
| Public direct URL freshness recheck | Access-control/paywall/CAPTCHA/rate-limit workaround |

Mutually-exclusive access/data sonucu:

- Public page'de tesadüfen görünür identifier, çıkarılmıyor/not edilmiyor/retained paraphrase'e girmiyorsa `INCIDENTAL_IDENTIFIER_NOT_RETAINED`; run devam edebilir.
- Tek UGC unit PII, minör veya hassas ayrıntıya bağımlıysa `EXCLUDED_SENSITIVE_OR_IDENTITY_DEPENDENT`; içerik/paraphrase tutulmaz, yalnız identity-free exclusion counter. Bu tek başına whole-run stop değildir.
- Login/consent wall, paywall, CAPTCHA veya rate-limit görülürse `ACCESS_BLOCKED_SLOT`; login/workaround yoktur. Mandatory breadth/floor bu yüzden geçmezse run `INCONCLUSIVE` olur.
- Login/account/trial oluşturma, access-control/CAPTCHA/rate-limit workaround denemesi, harcama veya başka yasak eylemin fiilen yapılması; ya da PII/identifier/raw content'in artifact'a yazılması/re-identification oluşturulması `STOPPED_RISK` + tombstone/privacy triage'dır.
- Minör/hassas/safety olayında substantive değerlendirme, risk kabulü, incident response veya hukuki görev hükmü gerekiyorsa ayrıntı retain edilmeden `PAUSED(reason=G0B_TRIAGE)` olur.

## 5. Dondurulmuş toplam exposure zarfı

Tavan quota/hedef değildir; daha az veri normaldir. Time cap önce dolarsa kalan slotlar boş kalır.

| Cap | Exact maksimum |
|---|---:|
| Toplam aktif araştırma süresi | 24 saat |
| Toplam takvim penceresi | `approved_at_utc` anından itibaren 336 saat |
| MKT-01A aktif süre | 12 saat |
| VOC-03A aktif süre | 8 saat |
| MKT-01B aktif süre | 4 saat |
| Search-result page event | 96 |
| Query başına search-derived candidate source open | 3 |
| Search-derived candidate source page-open toplamı | 288 |
| Direct TR storefront context page-open | 11 |
| MKT-01A retained non-UGC source | 84 |
| MKT-01B yeni named-alternative retained source | 5 |
| US public store-review parent page | 22 |
| Selected forum/community parent thread | 14 |
| Forum candidate source page-open; `candidate_opens_total` içinde subset | 42 |
| Store-review UGC unit inspected | 110 |
| Forum candidate opening-topic UGC unit inspected | 42 |
| Selected forum parent additional top-level reply inspected | 56 |
| İncelenecek public UGC unit toplam | 208 |
| Retained minimized USER_REPORT | 72 |
| Transient per-signal AI QA session | 72 |
| QA check attempt | 144; session başına initial + azami bir revision recheck |
| Terminal synthesis direct-URL recheck attempt/page-event; distinct queue item başına 1, retry yok | 66 |
| Toplam public page-open event | 497 |
| Public UGC exact quote/raw text/screenshot | 0 |
| PII/profile/comment locator | 0 |
| Spend | 0 |

`page_event`, Package Lead'in başlattığı bir top-level navigation ile public document render edilmesidir. Aynı navigation'ın automatic redirect chain'i tek event; redirect/error/ineligible sonuç da tüketilmiş event'tir. Initial document render'ının subresource request'leri ayrı event sayılmaz; user/agent tetiklemeli fetch, expand veya lazy-load ise §5 gereği yasaktır. Search result, candidate source, direct locale check, UGC parent/revisit ve direct recheck ayrı event type'dır. Inline visible unit okumak ayrı page event değildir. Bir physical open iki logical role'ü karşılıyorsa ilgili iki sub-ledger'a yazılır ama `TOTAL_PUBLIC_PAGE_EVENT` sayacında bir kez sayılır.

`497`, subcap'lerin non-deduplicated toplamından türetilmiş konservatif `TOTAL_PUBLIC_PAGE_EVENT_CAP`tır: `96 search-result + 288 search-derived candidate + 11 direct TR + 36 UGC parent + 66 direct recheck`. Etkin physical cap 497'yi aşamaz. Aynı URL'nin farklı zamanda yeniden açılması yeni event'tir.

İkinci AI context, ilk context'in hâlen açık transient source view'ını yeni navigation veya persistent copy olmadan kontrol eder; yeni page event yaratmaz. Bu teknik olarak mümkün değilse signal `EXCLUDED_QA_VIEW_UNAVAILABLE` olur; source yeniden açılarak cap delinmez. Store/forum içeriğinde `See all`, `More`, expand, lazy-load veya benzeri bir kontrol **aktive edilmez**; yalnız parent event'inde ilk render'da zaten görünür top-level units incelenir. Böylece ayrıca expansion network-event bütçesi yoktur. Her continuous batch en çok 20 public page event'ten sonra action-log checkpoint ister. Global page-event/total-active/window cap'i bütün envelope public action'ını; stage alt-tavanı yalnız ilgili stage public action'ını §5'teki exact sonuçla durdurur. Cap artırımı yeni frozen envelope + exact Founder approval ister.

Authority saati approval anında deterministiktir: `approved_at_utc` RFC 3339 UTC timestamp'i; `authority_expires_at_utc = approved_at_utc + 336 saat`. İlk page event'in ne zaman gerçekleştiği pencereyi kaydırmaz; bütün authorized action timestamp'leri yarı-açık `[approved_at_utc, authority_expires_at_utc)` aralığında olmalıdır. Active süre; `ACTIVE_TIMER_START|ACTIVE_TIMER_RESUME` ile `ACTIVE_TIMER_PAUSE|ACTIVE_TIMER_STAGE_STOP` log'ları arasındaki dakikaların toplamı, her interval yukarı tam dakikaya yuvarlanarak ölçülür. Bunlar lifecycle `PAUSED` state'i değildir. Stage alt-tavanları 12/8/4 saattir; kullanılmayan süre sonraki stage'e aktarılamaz.

Yalnız 336 saatlik wall-clock window veya 1440 dakikalık total-active envelope cap'i dolarsa global `AUTHORITY_EXPIRED` olur ve sonraki hiçbir stage public action açamaz. Tek stage'in alt-tavanı dolarsa `STAGE_ACTIVE_CAP_REACHED(stage_id)` loglanır: o stage'de yeni public action durur; mevcut derived/log kayıtlarıyla internal close/freeze/completion kontrolü yapılabilir. Stage completion ve downstream gate geçerse global authority/window hâlâ aktifken sıradaki stage kendi kullanılmamış alt-tavanıyla başlayabilir; completion geçmezse run `INCONCLUSIVE` ve downstream kapalıdır. Historical records her iki durumda kalır.

## 6. Exact search ortamı

### 6.1 Engine ve request

Tek engine operational choice:

```text
Bing public web search UI
```

Global-English public-web request template — country parameter intentionally omitted:

```text
https://www.bing.com/search?q={UTF8_PERCENT_ENCODED_QUERY}&count=10&setlang=en-US&adlt=moderate
```

US-storefront discovery request template:

```text
https://www.bing.com/search?q={UTF8_PERCENT_ENCODED_QUERY}&count=10&setlang=en-US&cc=US&adlt=moderate
```

Turkish/TR request template:

```text
https://www.bing.com/search?q={UTF8_PERCENT_ENCODED_QUERY}&count=10&setlang=tr-TR&cc=TR&adlt=moderate
```

`UTF8_PERCENT_ENCODED_QUERY` algoritması: query string Unicode `NFC` normalize edilir; UTF-8 byte dizisi RFC 3986 percent-encoding ile encode edilir; space `%20`, literal double quote `%22` olur; `+` kullanılmaz. Template'teki braces yer değiştirme sonrası kalamaz. Query metninin case, diacritic, quote ve token sırası değiştirilmez.

Template routing exacttır: seed official/pricing/help, English mechanism, independent-context, English forum ve MKT-01B named-alternative query'leri `GLOBAL_ENGLISH_NO_CC`; Apple US ve Google Play US query'leri `US_STOREFRONT_CC_US`; Turkish mechanism/forum query'leri `TR_SUPPLEMENTAL_CC_TR` kullanır. Bu parametrelerin gerçek coğrafyayı, global coverage'ı veya personalizationsız sonucu garanti ettiği iddia edilmez. Her event `request_template_id`, `requested_locale`, `observed_interface_language`, `observed_result_locale`, redirect, timestamp ve mismatch taşır.

### 6.2 Search-result tanımı

- Search account'a giriş yapılmaz; mevcut signed-in context kullanılamaz.
- Yalnız main-results column'daki clickable external organic results sıralanır.
- Sponsored/ad, knowledge panel, AI answer, snippet, carousel, video/news module ve sitelink ayrı organic result değildir.
- `raw_organic_rank=1..10`; pagination yoktur.
- Snippet yalnız `SOURCE_LEAD`; claim desteği değildir.
- `preopen_candidate`: visible organic result title/domain'i exact query konusuyla ilgili görünen ve yalnız result-page metadata'sından açıkça sponsored, duplicate, disallowed platform, affiliate/listicle veya wrong-language olduğu anlaşılmayan result'tur.
- Pre-open exclusion click/open sayacına girmez; exclusion reason + raw organic rank loglanır. Bir result'a click/navigation attempt edildiği anda, redirect/error/ineligible çıksa bile üç-open cap'ine bir yazılır.
- Preopen candidate'lar rank sırasıyla açılır; query başına en çok üç search-derived candidate source open.
- Gerekli eligible sayısı üç open içinde bulunmazsa slot `NOT_FOUND_WITHIN_RANK_AND_OPEN_CAP`; backfill/fallback query yoktur.
- CAPTCHA/login/consent/rate-limit varsa workaround veya fallback engine yok; event `SEARCH_ENGINE_UNAVAILABLE_WITHIN_SCOPE`.
- Result ordering yalnız accessed-at observation'dır; daha sonra reproduce edilebildiği iddia edilmez.

Mechanism-query `eligible_entity`: doğrudan dil öğrenme/öğretme/pratik hizmeti veya product sunan official provider/product page ya da verified official store listing; named `PRODUCT | SERVICE | NON_APP_SUBSTITUTE_PROVIDER`; public ve query mechanism'iyle doğrudan ilgili. Marketplace seller/profile, tek öğretmen profili, coupon/referral, forum thread, listicle, aggregator ve generic yöntemsiz içerik eligible entity değildir.

Forum-query `eligible_public_thread`: login gerektirmeyen, user-authored discussion parent; opening topic doğrudan ilgili language-learning mechanism/product experience, choice/quit/switching/need/friction/praise/missing capability bağlamı taşır; stratum diliyle eşleşir; en az bir görünür top-level unit vardır; şirket promosyonu, affiliate/referral/coupon, classified satış, support ticket mirror, profile page, minör/PII içeren title/URL veya duplicate değildir. Tarih görünmüyorsa `published_at=UNKNOWN`; tahmin edilmez.

## 7. Exact execution order

### 7.1 MKT-01A

Seed sırası:

1. Tandem
2. HelloTalk
3. Lingbe
4. Hilokal
5. italki
6. Preply
7. Cambly
8. Busuu
9. Duolingo
10. Speak
11. ELSA

Erken-seed ve late-stratum bias'ını sınırlamak için execution **pass-based round-robin**dır; her pass seed/query sırasını aynen korur.

**Mandatory primary breadth pass — önce ve tam sırayla:**

1. bütün seed'ler için global-English official-domain query;
2. bütün seed'ler için Apple App Store US query;
3. bütün seed'ler için Google Play US query;
4. yedi English mechanism query;
5. sekiz independent-context query.

Bu 48 query'nin her biri attempt edilmeden hiçbir A checkpoint'i downstream gate olamaz. Partial tarihsel kesit `state=MKT01A_STAGE_FROZEN; completion_quality=WITH_GAPS` olarak saklanabilir fakat `CTR-PD-STAGED-002`yi karşılamaz. Time/authority/page cap daha önce dolarsa exact sonuç `INCONCLUSIVE; VOC_NOT_STARTED`dır.

**Secondary/context pass — mandatory breadth tamamlandıktan sonra:**

6. bütün resolved seed'ler için public pricing query; yalnız ilgili pricing slotu boşsa hemen tek help fallback;
7. bütün eligible seed'ler için tek bounded Türkiye storefront direct check;
8. yedi Turkish supplemental mechanism query.

Sonra:

9. source/claim ledger freeze;
10. provisional frame AI operational QA;
11. `MKT01A_STAGE_FROZEN` + `completion_quality=COMPLETE|WITH_GAPS`; yalnız `COMPLETE` downstream gate olabilir.

### 7.2 VOC-03A

12. Available US store listing parent'ları seed sırasında, her seed için Apple sonra Google Play ele alınır; her parent açıldığı anda §10.4 atomik inspect→select→QA→delete→freeze/exclude transaction'ı tamamlanıp parent kapanmadan sonraki platform/seed'e geçilmez.
13. Yedi English forum query sırayla yürütülür; query'nin rank/open sınırında seçilen eligible parent aynı candidate-open event'inde §10.4 atomik transaction'ı tamamlar ve kapanır; ancak sonra sıradaki query başlar.
14. Yedi Turkish supplemental forum query aynı parent-bazlı atomik kuralla sırayla yürütülür.
15. Bütün tamamlanmış parent transaction'larının minimized records/exclusions ledger'ı freeze edilir; açık parent veya bekleyen toplu QA kuyruğu kalamaz.
16. Minimized dataset/codebook freeze.
17. `VOC03A_MINIMIZED_SIGNAL_STAGE_FROZEN`.

### 7.3 MKT-01B

18. State `MKT01B_NAMED_ALTERNATIVE_COLLECTING` olur; `signal_sequence` sırasındaki ilk beş eligible yeni named product/service alternative verification query yalnız bu state'te yürütülür ve bütün retained/missing sonuçları freeze edilmeden candidate-set aşamasına geçilmez.
19. Pre-recheck draft finding table ve onun bütün `CURRENT_STATE` Claim ID'lerinin birleşimi freeze; `MKT01B_CANDIDATE_CLAIM_SET_FROZEN`.
20. Frozen candidate set'ten §14.1 deterministic unique direct-URL queue freeze; `MKT01B_RECHECK_QUEUE_FROZEN`.
21. Yalnız frozen queue'daki direct-URL recheck→consumption transactions.
22. Integrated synthesis; frozen set dışında yeni current-state claim eklenmez.
23. %100 integrated-finding AI operational QA.
24. Ayrı AI operational red-team.
25. Yalnız bütün completion criteria geçerse terminal `PRELIMINARY_PUBLIC_DISCOVERY / PD*`.

## 8. Exact query bank

### 8.1 Seed templates

`{SEED}` exact display name ile; `{CANONICAL_DOMAIN}` §9.1 kuralıyla doldurulur:

```text
"{SEED}" language learning official
site:{CANONICAL_DOMAIN} ("pricing" OR "plans" OR "subscription")
site:{CANONICAL_DOMAIN} ("help" OR "faq") subscription
site:apps.apple.com/us/app "{SEED}"
site:play.google.com/store/apps/details "{SEED}"
```

Help query yalnız pricing query'nin rank 1–10 / üç-candidate-open sınırında eligible public consumer price/plan page bulunmazsa çalışır. Pricing ve help birlikte iki source slotu üretmez.

Official-domain resolution başarısızsa pricing ve help query çalıştırılmaz; iki action slotu `SKIPPED_NO_CANONICAL_DOMAIN` olur ve query-event cap tüketmez. Official domain resolved fakat pricing boşsa help çalışır. Help de boşsa source slotu `NOT_FOUND_WITHIN_RANK_AND_OPEN_CAP`; yeni query yoktur.

### 8.2 English mechanism queries — exact sıra

```text
online language tutor marketplace
live online language conversation classes
structured language learning course app
AI speaking practice language app
pronunciation feedback language app
language exchange app
learn a language without an app alternatives
```

Her query'de ilk iki eligible, seed olmayan ve daha önce seçilmemiş entity; rank 1–10 ve üç candidate-open içinde seçilir.

### 8.3 Turkish supplemental mechanism queries — exact sıra

```text
çevrimiçi dil öğretmeni pazaryeri
canlı çevrimiçi dil konuşma dersleri
yapılandırılmış dil öğrenme kursu uygulaması
yapay zekâ konuşma pratiği dil uygulaması
telaffuz geri bildirim dil uygulaması
dil değişim uygulaması
uygulama olmadan dil öğrenme alternatifleri
```

Her query'de ilk eligible, seed olmayan ve daha önce seçilmemiş entity alınır. TR slotu English slotu doldurmaz; English slotu TR slotunu doldurmaz. Bu kaynaklar supplemental discovery'dir; target/launch-market sinyali değildir.

### 8.4 Independent-context queries — English/US

```text
"online language learning" systematic review modalities
"mobile assisted language learning" systematic review
"computer assisted language learning" taxonomy
"language learning app" academic review
"online language tutoring" institutional report
"language exchange" language learning research
"AI language learning" institutional report
"language learning alternatives" research report methodology
```

Her query'den azami bir eligible source. Kaynak academic/institutional olmalı veya görünür publisher/author/date, yöntem/source chain ve conflict-of-interest açıklaması olan güvenilir third-party olmalıdır. SEO/listicle/affiliate source eligible değildir.

### 8.5 VOC forum queries

English mechanism phrase sırasıyla:

```text
{EN_MECHANISM_PHRASE} user experience switched alternative forum
```

Turkish mechanism phrase sırasıyla:

```text
{TR_MECHANISM_PHRASE} kullanıcı deneyimi bıraktım alternatif forum
```

`EN_MECHANISM_PHRASE` ve `TR_MECHANISM_PHRASE`, §8.2 ve §8.3'teki aynı ordinal satırın **tam metnidir**; lowercasing, synonym, stemming veya çeviri yapılmaz. Böylece 1↔1, 2↔2, …, 7↔7 substitution tablosu oluşur.

Her query'de rank 1–10 / üç-candidate-open sınırındaki ilk eligible public thread seçilir. English stratum yalnız English units; Turkish supplemental stratum yalnız Turkish units tutar.

### 8.6 MKT-01B named-alternative verification

`signal_sequence` artan sıradaki ilk beş unique non-seed product/service `NAME_LEAD_KEY` query'si:

```text
"{NORMALIZED_DISPLAY_NAME}" official language learning
```

`signal_sequence`, frozen parent-slot ordinal'i ile `unit_display_rank`ın lexicographic tuple'ıdır: `(parent_execution_ordinal, unit_display_rank)`. Parent slotları, source bulunmasa bile boşluğu korunarak exact atanır: seed 1 Apple=`1`, seed 1 Google=`2`, …, seed 11 Google=`22`; EN forum query 1..7=`23..29`; TR forum query 1..7=`30..36`. Selected parent kendi slot ordinal'ini alır; `unit_display_rank` `1..5`tir. Excluded unit frozen Signal Record üretmez; retained record kendi tuple'ını immutable taşır. Aynı unit'te birden fazla product/service adı varsa explicit `from→to` switching'de `to` adı, diğer durumda source reading order'daki ilk açık named product/service `NORMALIZED_DISPLAY_NAME` olur.

Verification öncesi `NAME_LEAD_KEY=NAME:{ENTITY_NAME_KEY}` yalnız duplicate **query string** bastırır; entity equivalence veya user-report→product doğrulaması değildir. Exact aynı `NAME_LEAD_KEY` grubunda en küçük `signal_sequence` query representative olur, diğerleri `SAME_NAME_QUERY_SUPPRESSED / POSSIBLE_HOMONYM_GROUP` kalır. Exact Founder-seed name key'i yeni-alternative query slotu doldurmaz. İlk beş unique non-seed name lead `signal_sequence` ile seçilir. Verification sonrası merge yalnız §9.3 locator/evidence kurallarıyla mümkündür; aynı ad tek başına merge değildir. Random Signal ID seçim veya tie-breaker değildir.

Özel öğretmen, kitap, YouTube, sınıf kursu gibi generic substitute-type'lar query üretmez; named entity değildir.

#### 8.6.1 Named-verification result selection

Her selected `NAME_LEAD_KEY` query'sinde organic rank 1→10 sırası izlenir ve en çok üç candidate source açılır. Üç-open sınırı içinde erken “ilk uygun bulundu” stop'u yoktur; homonym kontrolü için available candidate'ların üçüne kadar olan pencere tamamlanır. Her opened source şu `named_verification_eligible_result` koşullarının tümünü taşımalıdır:

1. login-free direct official product/service page veya verified official Apple/Google store listing;
2. visible page title/header'da language-learning/teaching/practice offering;
3. visible product/brand name'in `ENTITY_NAME_KEY`i query lead ile exact eşit **veya** direct official page query adını visible current/former alias olarak açıkça bağlar;
4. aggregator, listicle, affiliate/referral/coupon, generic developer/company directory, marketplace seller/private tutor profile veya forum değildir;
5. §9.3'e göre en az bir resolved identity locator üretir: store ID ya da `HOST_ID + ENTITY_NAME_KEY`.

Her opened candidate action log'a rank ve eligibility reason ile girer; ineligible içerik claim/evidence olarak retain edilmez. Eligible candidates §9.3 `ENTITY_IDENTITY_KEY` ile gruplanır:

- sıfır distinct eligible entity → `NAMED_VERIFICATION_NOT_FOUND_WITHIN_RANK_AND_OPEN_CAP`;
- tam bir distinct eligible entity → o entity grubundaki en küçük raw organic rank'lı source tek retained verification source; aynı entity'nin diğer source'ları duplicate/action-log olur;
- iki veya daha çok distinct eligible entity → retained verification source yok; `UNRESOLVED_HOMONYM_WITHIN_BOUNDED_WINDOW`; hiçbir signal→entity link'i kurulmaz.

Her lead en çok bir retained source, beş lead toplam en çok beş retained source üretir. Retained tek source dahi USER_REPORT'taki kişinin kastettiği entity'yi kanıtlamaz; yalnız `NAME_MATCHED_PUBLIC_ENTITY_CANDIDATE` oluşturur. Üç open'dan sonra pagination, synonym, ikinci query veya backfill yoktur. Bu opened candidates global `candidate_opens_total=288` içinde sayılır.

### 8.7 Query-event aritmetiği

| Query grubu | Maksimum |
|---|---:|
| Seed official | 11 |
| Seed pricing | 11 |
| Seed help fallback | 11 |
| Apple US | 11 |
| Google Play US | 11 |
| English mechanism | 7 |
| Turkish supplemental mechanism | 7 |
| Independent context | 8 |
| VOC English forum | 7 |
| VOC Turkish supplemental forum | 7 |
| MKT-01B named alternative | 5 |
| **Toplam** | **96** |

Help fallback maksimumdur, hedef değildir. Çalışmayan fallback slotu başka query'ye çevrilmez; dolayısıyla gerçek query event sayısı 96'dan düşük olabilir.

## 9. MKT-01A selection ve dedup

### 9.1 Official domain

İlk seed query'sindeki ilk eligible official result seçilir. Eligible olması için:

- product/brand ile doğrudan ilişkili public page;
- page title/header'da exact/obvious brand ve language-learning offering;
- aynı `CANONICAL_DOMAIN` host'unda en az bir public terms/privacy/help/about brand signal'i;
- login/paywall/install/purchase gerektirmemesi;
- affiliate/listicle/aggregator olmaması.

`CANONICAL_DOMAIN` adı yalnız query placeholder'ı için tarihsel addır; PSL/registrable-domain veya cross-host canonicalization değildir. Exact `HOST_ID_v0.2`, browser-resolved final URL'nin ASCII-serialized hostname'idir; browser serialization'daki ASCII lowercase korunur fakat leading `www.`, trailing dot veya başka label **silinmez**. Port, scheme, path, query ve fragment query placeholder'ına girmez. IP literal, boş host veya geçersiz hostname official-domain slotunu dolduramaz. `www.example` ile `example`, her subdomain ve trailing-dot varyantı ayrı host ID'dir; direct redirect aynı final host'a çözerse redirect chain ayrıca loglanır. Official-domain selection sonraki store sonucunu beklemez. Store publisher/linked property reciprocal kontrolü daha sonra `STORE_RECIPROCITY=VERIFIED|UNRESOLVED|CONTRADICTED` alanını günceller. `CONTRADICTED` store source'u dışlar ve official-domain claim'ini `CONTESTED` yapar; `UNRESOLVED` bağımsız doğrulama sayılmaz.

### 9.2 Storefront

US primary:

- Store-query exception'ında search-result UI'nin navigation yapmadan exposed ettiği direct destination href yalnız store identity/sole-request üretmek için parse edilir; source/evidence değildir ve page-open tüketmez. Raw search-result href ayrıca açılmaz.
- `PREOPEN_APPLE_APP_ID`, destination href path'indeki son `/id([0-9]+)` match'inin digit grubudur. Host `apps.apple.com` değilse, `/us/` segmenti veya match yoksa result `PREOPEN_STORE_ID_UNRESOLVED` olur.
- `PREOPEN_GOOGLE_PACKAGE_ID`, host `play.google.com` olan destination href'in raw query'sindeki tam bir case-sensitive `id` parametresinin değerinin bir kez UTF-8 percent-decoded hâlidir. `id` yoksa, birden fazlaysa, boşsa veya decode başarısızsa result `PREOPEN_STORE_ID_UNRESOLVED` olur.
- Apple preopen kimliği çözüldüyse **aynı exact destination href** sole requested URL olur; bu tek navigation bir search-derived candidate-open tüketir. Redirect chain aynı page event'tir; ikinci canonical navigation yoktur.
- `GOOGLE_PACKAGE_ID_URL_VALUE`, `PREOPEN_GOOGLE_PACKAGE_ID` string'inin Unicode NFC → UTF-8 → RFC 3986 percent-encoding çıktısıdır; space `%20`, `+` kullanılmaz.
- Google preopen kimliği çözüldüyse sole requested URL `https://play.google.com/store/apps/details?id={GOOGLE_PACKAGE_ID_URL_VALUE}&hl=en&gl=US` biçiminde kurulur. Parametre order'ı tam `id`, `hl`, `gl`; başka query component veya fragment yoktur. Yalnız bu constructed URL navigate edilir ve tek search-derived candidate-open tüketir; raw result href ayrıca açılmaz. Template login-free render üretmezse slot unavailable'dır; alternatif URL kurgulanmaz.
- Tek navigation sonrasında §9.3'ten çıkarılan final `APPLE_APP_ID` veya `GOOGLE_PACKAGE_ID`, ilgili preopen ID ile exact eşleşmelidir. Eşleşmezse `STORE_ID_REDIRECT_MISMATCH / INELIGIBLE`; event tüketilmiş kalır, ikinci URL açılmaz ve source retain edilmez.
- İki US listing ayrı ayrı attempt edilir; eksik slot başka platform/locale ile doldurulmaz.

TR secondary:

- Yalnız en az bir US listing doğrulanmışsa yapılır.
- Tek US platform varsa aynı platformun TR varyantı.
- İki US platform varsa odd seed ordinal → Apple TR; even seed ordinal → Google Play TR.
- Apple selected URL'de `/us/` → `/tr/`; Google exact requested URL `https://play.google.com/store/apps/details?id={GOOGLE_PACKAGE_ID_URL_VALUE}&hl=tr&gl=TR` olur. Parametre order'ı yine `id`, `hl`, `gl`; başka query component veya fragment yoktur.
- Seçilen TR platform bulunmazsa diğerine fallback yok.
- TR check yalnız availability, public price/plan teaser ve access context; TR UGC okunmaz.
- Storefront reviewer'ın gerçek ülkesi olarak yorumlanmaz; user country `UNKNOWN`.

### 9.3 Entity dedup

`NORMALIZED_DISPLAY_NAME_v0.2` algoritması:

1. Kaynaktaki visible product/brand string'ine Unicode 15.1 `NFKC` uygula.
2. Unicode 15.1 `White_Space` baş/son karakterlerini sil; içteki her run'ı tek U+0020'ye indir.
3. Sonda bulunan U+00AE `®`, U+2122 `™` veya U+00A9 `©` karakterlerini, hemen önlerindeki tek U+0020 ile birlikte, kalmayana kadar sil.
4. İçerik boş değilse ve ilk/son code point çifti şu setten biriyse yalnız bu iki dış code point'i bir kez sil: `(U+0022,U+0022)`, `(U+0027,U+0027)`, `(U+201C,U+201D)`, `(U+2018,U+2019)`, `(U+0028,U+0029)`, `(U+005B,U+005D)`; aradaki içerik aynen kalır. Sonra adım 2'yi bir kez daha uygula.
5. Harf, aksan, yazı sistemi veya sözcük çevrilmez/translitere edilmez. Çıktı `NORMALIZED_DISPLAY_NAME`dır ve §8.6 query placeholder'ına **aynen** bağlanır.

`ENTITY_NAME_KEY`, `NORMALIZED_DISPLAY_NAME` üzerine Unicode 15.1 Default Case Folding uygulanmış değerdir. `NAME_LEAD_KEY=NAME:{ENTITY_NAME_KEY}` yalnız pre-verification query lead'idir; identity locator değildir.

Identity locators ad anahtarından ayrıdır:

```text
HOST:{CANONICAL_DOMAIN}
APPLE_ID:{APPLE_APP_ID}
GOOGLE_ID:{GOOGLE_PACKAGE_ID}
```

`APPLE_APP_ID`, Apple final URL path'indeki son `/id([0-9]+)` match'inin digit grubudur. `GOOGLE_PACKAGE_ID`, Google Play final URL query'sindeki tek case-sensitive `id` parametresinin bir kez UTF-8 percent-decoded değeridir; parametre yoksa, birden fazlaysa veya decode başarısızsa unresolved olur.

Fail-closed entity-equivalence sırası:

1. Exact aynı `APPLE_ID` veya exact aynı `GOOGLE_ID`, aynı platform listing identity'sidir; observed farklı names ayrı label observations olarak korunur ve açık direct official alias evidence yoksa `alias_equivalence=false` kalır.
2. Apple↔Google veya host↔store locator merge'i yalnız selected direct official source exact iki locator'ı birlikte bağlarsa yapılır; linked locators Unicode code-point ascending set olarak freeze edilir.
3. Yalnız host varsa `HOST + ENTITY_NAME_KEY` entity key'idir. Aynı host + farklı name ayrı entity'dir; ancak direct official source iki adı açıkça aynı product alias'ı olarak beyan ederse merge edilir.
4. Aynı `ENTITY_NAME_KEY` fakat farklı locator setleri ayrı `POSSIBLE_HOMONYM` entity'leridir; merge edilmez.
5. Locator yoksa `UNRESOLVED_ENTITY_LEAD`; retained verified entity veya expansion slotu dolduramaz.

`ENTITY_IDENTITY_KEY`, varsa sorted verified store-locator set'inin `LOCSET:` ile `|`-joined exact string'i; store locator yoksa `HOST:{CANONICAL_DOMAIN}|NAME:{ENTITY_NAME_KEY}`dir. Alias merge name equality gerektirmez; aynı verified locator set + direct official alias evidence ister. `NAME_LEAD_KEY` ile `ENTITY_IDENTITY_KEY` hiçbir ledger alanında birbirinin yerine kullanılamaz.

- Locale/store varyantları yalnız aynı exact store locator veya direct official link ile tek entity, ayrı Source ID'dir.
- Aynı parent company'sinin ayrı product markaları ayrı kalabilir.
- Entity birden çok mechanism code taşıyabilir; expansion slotunu yalnız ilk karşılandığı query doldurur.
- Duplicate rank loglanır; rank 1–10 ve üç-open sınırında sıradaki candidate'a geçilir.
- Exact Founder-seed `NAME_LEAD_KEY` query/expansion slotu doldurmaz; farklı locator'lı aynı-name homonym varsa `POSSIBLE_HOMONYM` olarak raporlanır, seed veya expansion entity'sine sessizce merge edilmez.

Provisional mechanism codebook:

- `HUMAN_TUTOR_MARKETPLACE`
- `LIVE_CLASS_OR_CONVERSATION`
- `STRUCTURED_SELF_STUDY`
- `AI_CONVERSATION`
- `PRONUNCIATION_FEEDBACK`
- `PEER_LANGUAGE_EXCHANGE`
- `NON_APP_SELF_STUDY_OR_HUMAN_HELP`
- `HYBRID`
- `OTHER_PROVISIONAL`
- `UNKNOWN`

Multi-label mümkündür; bunlar verified category truth değildir.

### 9.4 Source dedup

`SOURCE_URL_ID_v0.2`, browser'ın redirect chain tamamlandıktan sonra verdiği final `.href` ASCII serialization'ının exact string'idir. Bu identity string üzerinde `www`/host label silme, fragment silme, percent-escape case rewrite, tracking-param drop, query parse/sort, duplicate-param collapse, trailing-slash rewrite veya başka normalization **yapılmaz**. Dolayısıyla query order ve multiplicity korunur; Google Play `id`, `hl`, `gl` de görüldüğü sırada kalır; Apple country segmenti exact path'te kalır.

Requested URL, bütün redirect hops ve exact final `.href` ayrı source fields'tır. Yalnız byte-identical `SOURCE_URL_ID_v0.2` tek Source ID'dir; farklı requested URL'lerin aynı exact final `.href`e HTTP redirect olması aynı final Source ID'ye bağlanabilir ve redirect lineage'i korunur. HTML canonical beyanı, tracking-stripped benzerlik, `www`↔bare host, query reorder veya wrapper/aggregator yalnız `DECLARED_CANONICAL_RELATION|POSSIBLE_DUPLICATE_SOURCE` üretir; exact merge veya lineage-independence kanıtı değildir. Search snippet evidence değildir. Bu konservatif kural false split üretebilir; false merge'i önlemek önceliklidir.

### 9.5 MKT-01A source slots

| Stratum | Maksimum retained source |
|---|---:|
| 11 seed × official product page | 11 |
| 11 seed × pricing veya help page | 11 |
| 11 seed × Apple US | 11 |
| 11 seed × Google Play US | 11 |
| 11 seed × tek TR secondary check | 11 |
| 7 mechanism × ilk iki English entity | 14 |
| 7 mechanism × ilk bir Turkish entity | 7 |
| 8 independent-context query | 8 |
| **Toplam** | **84** |

Missing slot boş kalır. Yeni synonym query, alternatif platform, pagination veya cap dışı rank ile doldurulmaz.

## 10. VOC-03A exact sample

### 10.1 US store-review parents

Her available US listing için:

1. `See all`, `More`, expand, lazy-load veya başka disclosure kontrolü aktive edilmez.
2. Sort/filter değiştirilmez; auto-scroll/pagination/expansion yok.
3. Parent'ın ilk render'ında zaten görünür default sıradaki ilk beş top-level review unit incelenir; beşten azsa yalnız görünenler.
4. English olmayan unit; developer response; deleted/empty; yalnız rating; identity-dependent; PII/minör/hassas ayrıntı; promo/affiliate ve açık duplicate dışlanır.
5. İlk eligible unit `S1`.
6. `S2`, inspected window'da S1'den sonraki ilk eligible unit'tir; family/code henüz selection input'u değildir ve sonradan QA değişikliği seçim sırasını değiştirmez.
7. Bir eligible varsa bir; sıfırsa slot boş. QA sonucu `EXCLUDE` olan signal için aynı parent'tan backfill/reselection yoktur.

Maksimum: `22 parent × 5 inspected = 110 unit`; `22 × 2 = 44 retained signal`.

### 10.2 Forum/community parents

Her 14 forum query için:

1. Rank/open kuralındaki en çok üç candidate sırayla açılır. Her açılan candidate'ın user-authored opening topic'i yalnız eligibility belirlemek için okunur ve sonuçtan bağımsız olarak **bir UGC inspected unit** tüketir.
2. Ineligible candidate kapanır; raw/title/paraphrase/Signal Record tutulmaz. Yalnız `FORUM_CANDIDATE_REJECTED` + identity-free reason code + rank/source-action counter yazılır. PII/minör/hassas ayrıntıya bağımlıysa generic exclusion code dışında içerik yoktur.
3. İlk eligible candidate selected parent olur. Onun opening post'u daha önce sayılmış `unit_rank=1`dir; ikinci kez inspected sayılmaz. Yalnız ilk dört top-level reply `unit_rank=2..5` olarak ek incelenebilir.
4. Selected parent, aynı candidate-open event'i kapanmadan §10.4 transaction'ını tamamlar. Nested reply, profile page, deleted unit, login isteyen content ve ikinci page yok.
5. Expand/`More`/lazy-load kontrolü aktive edilmez; ilk render'da görünmeyen reply incelenmez.
6. Store ile aynı rank-only S1/S2 ve no-backfill rule yalnız selected parent'ın `unit_rank=1..5` window'una uygulanır; rejected candidate hiçbir signal slotu doldurmaz.

Worst-case forum exposure: `14 query × (3 candidate opening topic + selected parent için 4 additional reply) = 98 inspected unit`; `14 × 2 = 28 retained signal`. Candidate openings, global `288 candidate source page-open` cap'inin subset'idir ve 497 page-event toplamına yeniden eklenmez.

Toplam worst-case UGC exposure: `110 store + 42 forum candidate opening + 56 selected-parent additional reply = 208 inspected`; en çok `72 retained`. Bu bounded purposive rank-based sample'dır; theme count/rate/saturation veya population inference yasaktır.

### 10.3 UGC dedup

- Raw-text hash alınmaz.
- Aynı page-open session'da görsel olarak açık duplicate/repost görülürse ilk raw display rank eligible kalır, sonraki excluded.
- Cross-platform aynı kullanıcı/metin eşleştirmesi yapılmaz.
- Kullanıcı kimliği üzerinden dedup yasaktır.
- Frozen record username, handle, avatar, profile URL, account/comment ID, comment permalink veya raw text içermez.
- Parent URL retention öncesi URL path/query'de handle veya gereksiz kişisel veri kontrol edilir. Güvenli page-level parent URL üretilemiyorsa source/signal dışlanır; thread title veya user-authored title ayrı alanda tutulmaz.

### 10.4 Parent-bazlı atomik transaction

Collection ve QA ayrı toplu fazlar değildir. Her parent şu atomik sırayı tamamlamadan sonraki parent açılmaz:

```text
OPEN_PARENT
→ INSPECT_MAX_5
→ SELECT_S1_S2
→ FOR_EACH_SELECTED_IN_UNIT_RANK_ORDER:
     ASSIGN_SIGNAL_SEQUENCE_FROM_PARENT_AND_UNIT
     TRANSIENT_PARAPHRASE
     INITIAL_SECOND_CONTEXT_QA
     IF_REVISE: MAX_ONE_REVISION_AND_RECHECK
     DELETE_TRANSIENT_NOTE
     FREEZE_OR_EXCLUDE
→ CLOSE_PARENT
```

Bir signal tek `QA_SESSION` kullanır; bu session en çok bir initial check + bir revision recheck içerir. İki check aynı source-visible session ve aynı page event içindedir. İkinci `REVISE`, unresolved discrepancy, source visibility kaybı veya view-sharing failure → `EXCLUDE`. Böylece maksimum `72 QA session / 144 check attempt` deterministiktir.

## 11. USER_REPORT codebook

Her retained unit bir `Signal Record`; bir primary ve en çok iki secondary family taşır.

| Family | İzinli explicit self-report |
|---|---|
| `F01_CHOICE_OR_QUIT_REASON` | Ürünü/alternatifi seçme veya bırakma/iptal/devam etmeme nedeni |
| `F02_ALTERNATIVE_OR_SWITCHING` | Açık named/type alternative ve varsa from→to switching |
| `F03_SELF_DESCRIBED_NEED_JTBD` | Kişinin açık işi, amacı veya kullanım bağlamı |
| `F04_PRAISE_OR_DELIGHT` | Spesifik olumlu deneyim veya beklenmedik değer |
| `F05_FRICTION_OR_COMPLAINT` | Spesifik engel, hata, rahatsızlık veya başarısız deneyim |
| `F06_FEATURE_REQUEST_OR_MISSING_CAPABILITY` | İstenen veya eksik görülen capability |
| `F07_PRICE_SUBSCRIPTION_OR_BILLING_REPORT` | Price, renewal, cancellation, refund veya billing deneyimi beyanı |
| `F08_TRUST_OR_MODERATION_CONCERN` | Scam, harassment, inappropriate behavior, verification veya moderation endişesi; ayrıntısız |
| `F09_PERCEIVED_LEARNING_BENEFIT_OR_FAILURE` | Kişinin algıladığı öğrenme/fayda veya öğrenmeme/yetersizlik |
| `F10_UNUSED_OR_ABANDONED_FEATURE` | Özelliği kullanmama veya kullanmayı bırakma beyanı |

Qualifying assertion'lar source reading order'da numaralanır. `primary_family`, ilk açık qualifying assertion'ın family'sidir; aynı assertion birden çok family gerektirirse `F01→…→F10` ordinal'i tie-breaker'dır. `secondary_families_max_2`, bütün sonraki açık family candidate'larının `(assertion_reading_order, F01→F10 ordinal)` sırasından primary ve duplicate family'ler çıkarıldıktan sonraki ilk iki distinct family'dir; üçüncü ve sonrası retain edilmez. QA bu exact ordering'i doğrular; family revision aynı algoritmayla tüm primary/secondary alanlarını yeniden hesaplar, selection rank'ini değiştirmez. Researcher motivation tahmin etmez; named alternative açık değilse çıkarmaz. Open code retain edilmez; yeni family semantic codebook change'dir.

Yön alanları: F01 için `choice_quit_direction=CHOICE|QUIT`; F02 için `switch_direction=FROM_TO_EXPLICIT|ALTERNATIVE_MENTION_ONLY`; F09 için `perceived_learning_direction=BENEFIT|FAILURE`; F10 için `usage_direction=UNUSED|ABANDONED`. Kaynakta açık değilse `UNKNOWN`. Beklenmedik fakat in-scope bir unit on family'ye map edilemiyorsa content/paraphrase retain edilmez; selection log'da yalnız `UNMAPPED_IN_SCOPE_SEEN=true` + parent Source ID tutulur ve gelecekteki codebook CR sorusu açılır. Ambiguous unit `UNCLEAR_NO_CODE / EXCLUDED`dır.

Her signal:

```text
signal_id=random_non_identity_derived
signal_sequence=(parent_execution_ordinal,unit_display_rank)
owner_package=VOC-03A
claim_type=USER_REPORT
confidence=LOW
source_id
parent_public_url
platform
requested_storefront_or_query_locale
observed_language
accessed_at
published_at_if_visible
unit_display_rank
primary_family
secondary_families_max_2
direction_fields_if_explicit
identity_free_paraphrase_source_language
named_alternative_if_explicit
switch_direction_if_explicit
feature_or_service_scope_if_explicit
selection_rule_id
transient_QA_status
G0B_escalation_flag
```

`USER_REPORT` product fact değildir. F09 gerçek efficacy; F07 transaction/legal fact; F08 safety/moderation sufficiency değildir. Tek signal yalnız question/hypothesis üretir.

## 12. Transient source-visible QA

Her retained signal için exact sıra:

1. Package Lead public unit'i parent page'de görür; ekranda tesadüfen görünen identifier çıkarılmaz veya not edilmez.
2. PII/minör/hassas ayrıntı/identity-dependence ve parent-URL safety exclusion check'i.
3. §8.6'daki deterministic `signal_sequence` ve ayrı random non-identity Signal ID.
4. Raw content kopyalamadan kısa identity-free paraphrase ve code candidate transient working record.
5. Aynı source görünürken ikinci AI context:
   - semantic fidelity;
   - primary/secondary family;
   - explicit named alternative/switch direction;
   - platform/locale/rank;
   - PII/re-identification minimizasyonu;
   - USER_REPORT posture ve overclaim sınırı.
6. QA yalnız `PASS / REVISE / EXCLUDE` + identity-free discrepancy code üretir.
7. `REVISE` visible session'da en fazla bir kez düzeltilip yeniden QA edilir; ikinci revision ihtiyacı veya çözümsüzlük `EXCLUDE`.
8. QA tamamlanınca transient working note silinir.
9. Yalnız minimized derived Signal Record freeze edilir.

Zaman kuralı:

```text
qa_completed_at ≤ transient_note_deleted_at < derived_frozen_at
```

QA metadata:

```text
review_kind=AI_OPERATIONAL_TRANSIENT_SIGNAL_QA
reviewer_kind=AI
is_human=false
human_review_performed=false
independent_human_review=false
source_visible_during_QA=true
later_source_reconstruction_claimed=false
```

Source QA tamamlanmadan kaybolursa `EXCLUDED_QA_NOT_COMPLETED`; freeze yok. QA artifact'ı raw/identifier tekrar etmez. Screenshot/page dump yok. “Transient”, araştırma artifact'ında retain etmeme anlamındadır; AI provider log-retention'ı hakkında non-retention iddiası değildir.

## 13. MKT-01B integration

MKT-01B yalnız exact frozen MKT-01A ve VOC-03A kesitlerini tüketir.

- USER_REPORT company claim'i doğrulamaz.
- Company claim USER_REPORT'u geçersiz kılmaz.
- Çelişen posture'lar ayrı Claim/Signal ID ile korunur.
- Tek USER_REPORT market/category truth değildir.
- Raw UGC kopyalanmaz; yalnız Signal ID referansı.
- Theme count, percentage, rank, “çoğu kullanıcı” veya strength-by-frequency yoktur.

User-language promotion tavanı:

| Statü | Minimum public signal tabanı | İzinli kullanım |
|---|---|---|
| `SINGLETON_USER_LANGUAGE_QUESTION` | Bir USER_REPORT | Yalnız soru/karşı hipotez |
| `MULTI_PARENT_USER_LANGUAGE_CANDIDATE` | En az iki lineage-independent parent source | Hâlâ non-representative candidate; prevalence yok |
| `SUPPORTED_PUBLIC_CATEGORY_CANDIDATE` | En az bir direct non-UGC source + ikinci lineage-independent source + frozen evrende karşı-örnek kontrolü | Yalnız preliminary category candidate; D01 değil |

Karşı-örnek kontrolü yeni ad hoc query açmaz; exact frozen mechanism/independent query logs içindeki contrary/alternative records kullanılır. Hiçbiri yoksa `COUNTEREXAMPLE_NOT_FOUND_WITHIN_BOUNDED_SCOPE`; doğrulama sayılmaz.

VOC'taki named product/service alternatives `signal_sequence` sırasıyla §8.6 `NAME_LEAD_KEY` query gruplarına ayrılır; bu yalnız duplicate query bastırmadır, entity merge değildir. İlk beş unique non-seed lead bounded verification alır; sonuçlar ancak §9.3 `ENTITY_IDENTITY_KEY` kurallarıyla entity olur. Doğrulanamayan veya homonym nedeniyle signal→entity bağı kurulamayan kayıt `VOC_NAMED_UNVERIFIED_ENTITY` / `UNRESOLVED_HOMONYM` unknown olur. Generic substitutes yalnız type olarak kalır.

MKT-01B next-research options üretebilir; `FOUNDER_EXPLORATORY_DIRECTION` otomatik oluşturamaz. Founder sonradan ayrı governance event'i seçebilir.

## 14. Claim freshness

Artifact'lar immutable historical record'dur; blanket package expiry yoktur.

| Claim class | Freshness |
|---|---|
| Price/subscription/storefront availability | 30 gün |
| Current feature/help/product-policy claim | 90 gün |
| Category/alternative taxonomy | 180 gün |
| Academic/institutional claim | 365 gün veya superseded |
| Terminal tüketimdeki critical dynamic claim | Tüketimden hemen önceki son dış-source action olarak direct URL recheck; sabit takvim safe-harbor yok |

Bir claim birden çok sınıfa girerse en kısa horizon. Source update/correction/retraction veya product/store change takvimi beklemeden stale/superseded yapar.

```text
preservation_mode=IMMUTABLE_HISTORICAL_RECORD
artifact_lifecycle=ACTIVE|SUPERSEDED|RETIRED
claim_freshness=CURRENT|STALE|SUPERSEDED|REVERIFY_BEFORE_USE
freshness_class
last_verified_at
fresh_until
verification_method
critical_dynamic
superseded_by
```

Terminal synthesis yalnız rechecked dynamic claims'i current-state diliyle kullanır. Recheck cap'ini aşan veya başarısız claim current-state bulgusundan çıkarılır ve `NOT_CURRENTLY_VERIFIED` unknown olur; cap yükseltilmez. USER_REPORT historical as-of record'dur ve current product condition'a dönüştürülemez.

### 14.1 Direct-recheck queue ve overflow

`66` cap'i her `OPEN_DIRECT_SOURCE` recheck **attempt/page-event** sayısıdır; claim sayısı değildir. Frozen queue distinct exact `SOURCE_URL_ID_v0.2` değerlerinden oluşur ve her queue item bu run'da en fazla bir kez attempt edilir; retry/reopen yoktur. Search kullanılmaz. Bir başarılı URL event'i, aynı rendered source/version kapsamındaki bütün linked Claim ID'leri güncelleyebilir; her claim `recheck_event_id` taşır.

Recheck başlamadan şu checkpoint zorunludur:

1. Yalnız frozen A, VOC ve named-alternative verification kayıtlarından, yeni source access olmadan, pre-recheck draft finding rows oluşturulur.
2. Her row `usage_intent=CURRENT_STATE|HISTORICAL_CONTEXT|QUESTION_ONLY` ve bütün supporting Claim/Signal ID'leri taşır.
3. `CURRENT_STATE_CANDIDATE_CLAIM_SET`, bütün `CURRENT_STATE` row'larındaki non-UGC Claim ID'lerin kümesidir; `logical_record_checksum_sha256` ile `MKT01B_CANDIDATE_CLAIM_SET_FROZEN` olur.
4. Her Claim ID ilk C2 insertion'ında immutable `claim_sequence=(source_action_sequence,claim_local_sequence)` alır. `source_action_sequence`, C1 exact execution/action order'ındaki monoton integer; `claim_local_sequence`, aynı source event'inde ledger'a yazılan claim sırasındaki monoton integer'dır. Random ID veya timestamp tie-breaker değildir.
5. Freeze'den sonra candidate sete current-state claim eklenemez veya 66 cap'ine uydurmak için claim çıkarılamaz. Yeni candidate yalnız next-research/CR kaydıdır; bu run'ın terminal current-state synthesis'ine giremez.

Queue yalnız bu frozen candidate set'ten sıralanır:

1. `critical_dynamic=true` önce;
2. freshness horizon artan sıra: 30 → 90 → 180 → 365;
3. `claim_sequence` lexicographic ascending.

URL dedup, exact `SOURCE_URL_ID_v0.2` eşitliğiyle yapılır ve bu sıralamadaki ilk claim'in pozisyonunu devralır. Queue'nun ordered distinct exact direct-URL IDs, linked Claim ID'leri, sıra anahtarları, `max_attempts_per_item=1` ve cap-overflow sonucu `logical_record_checksum_sha256` ile **recheck başlamadan** freeze edilir; ancak bundan sonra `MKT01B_RECHECK_QUEUE_FROZEN` oluşur. Candidate-set state queue'yu içermez; queue state candidate-set `logical_record_checksum_sha256` değerini parent olarak pinler.

Yalnız frozen queue execute edilir. Her queue item en fazla bir recheck event'i tüketir ve atomiktir: `OPEN_DIRECT_SOURCE → VERIFY_LINKED_CLAIMS → WRITE_RECHECK_LEDGER → WRITE_LINKED_CURRENT_STATE_CONSUMPTION_ROWS → CLOSE_SOURCE`. Arada başka source navigation, `ACTIVE_TIMER_PAUSE|ACTIVE_TIMER_RESUME`, lifecycle `PAUSED` geçişi, authority kesintisi veya observed-source değişimi olursa attempt başarısızdır; consumption row yazılmaz, retry/reopen yapılmaz ve linked claims `REVERIFY_BEFORE_USE` kalır. Critical linked claim varsa sonuç `INCONCLUSIVE`; non-critical linked claim current-state synthesis'ten çıkarılıp unknown olur. Başarılı consumption rows freeze edildikten sonra §13 integrated synthesis yalnız onları birleştirir. Böylece “24 saat” veya başka takvim safe-harbor'u yoktur.

Frozen sıradaki ilk 66 queue item'ı attempt bütçesine girer; 66'ncı attempt'ten sonraki queue item'larına event verilmez. Bunlara bağlı non-critical claims `NOT_CURRENTLY_VERIFIED / EXCLUDED_FROM_CURRENT_STATE_SYNTHESIS` olur. Herhangi bir terminal-critical claim ilk 66 item'a sığmıyorsa veya tek allowed attempt başarısızsa sonuç `INCONCLUSIVE`; terminal `PD*` yoktur. Recheck source'u değişmişse eski claim historical kalır, yeni claim/supersession link'i açılır.

## 15. Physical consolidation ve logical lineage

Execution olursa en çok beş authoritative container:

1. `MKT-VOC-01_PROTOCOL_APPROVAL_ACTION_SELECTION_MANIFEST_v0.2`
2. `MKT-VOC-02_SOURCE_REGISTRY_EVIDENCE_CLAIM_LEDGER_v0.2`
3. `MKT-VOC-03_CATEGORY_ALTERNATIVE_COMPETITOR_PUBLIC_SURFACE_MATRIX_v0.2`
4. `MKT-VOC-04_DEIDENTIFIED_PUBLIC_USER_SIGNAL_DATASET_CODEBOOK_v0.2`
5. `MKT-VOC-05_INTEGRATED_FINDINGS_CONTRADICTIONS_UNKNOWNS_QA_REDTEAM_G0B_NEXT_RESEARCH_MEMO_v0.2`

Bu `09_...APPROVAL_CANDIDATE` dosyası execution output'u veya altıncı main container değildir. Approval olursa approved exact content, yeni immutable run version'ındaki C1'in protocol section'ına materialize edilir; C1 tek execution-authoritative kopyadır. Bu candidate yalnız lineage/audit predecessor olarak `NON_AUTHORITATIVE_CANDIDATE` kalır.

| Container | Authoritative field owner |
|---|---|
| C1 | Protocol/envelope, approval, action/selection/time/exposure/change/stage events |
| C2 | Source, claim, **authoritative atomic** contradiction/falsifier, freshness/recheck ve lineage |
| C3 | Provisional/integrated category–alternative–competitor public-surface matrix |
| C4 | VOC-03A codebook, minimized Signal Records, exclusions ve transient-QA attestations |
| C5 | Integrated findings; C2 contradiction/falsifier ID'lerine **reference-only** view; unknowns, AI QA/red-team, G0B queue ve next-research options |

Yukarıdaki beş değer kanonik `physical_container_id` setidir; C1–C5 yalnız kısa referanstır. C2 contradiction/falsifier atomlarının tek authoritative sahibidir; C5 yalnız ID + derived projection taşır ve duplicate authority yaratmaz.

Checksum self-reference yaratmayacak exact projection:

- Physical container byte encoding'i UTF-8 without BOM ve line ending LF'dir. Her container header'ında tam bir `container_checksum_sha256=` alanı bulunur.
- `container_checksum_sha256`, frozen container'ın bütün byte'ları üzerinde SHA-256'dır; hesap/doğrulama sırasında yalnız kendi header alanının 64-hex değeri tam 64 ASCII `0` ile değiştirilir. Sonuç uppercase 64-hex olarak alana yazılır. Başka byte dışlanmaz.
- C1, C2–C5'in final checksum değerlerini normal manifest rows olarak tutar. C1'in kendi manifest row'u değeri tekrar etmez; `checksum_location=SELF_HEADER` taşır. Böylece C1 self-hash tek yerde ve doğrulanabilirdir.
- `logical_record_checksum_sha256`, record'un authoritative field-value map'inden yalnız `logical_record_checksum_sha256` alanı çıkarıldıktan sonraki RFC 8785 JCS canonical JSON byte'ları üzerinde SHA-256'dır. Strings Unicode NFC; arrays frozen order'da kalır. Sonuç uppercase 64-hex'tir.

Her logical artifact:

```text
logical_artifact_id
owner_package
physical_container_id
section_or_table_anchor
record_key
version
frozen_at
logical_record_checksum_sha256
parent_or_upstream_ids
supersedes_if_any
```

Sıfır orphan, sıfır duplicate authority. Spend, approval, action/selection, stage freeze, minimization ve completion ayrı main file değildir; C1/C4/C5 section/event'idir. Yeni run eski frozen version'ı overwrite etmez.

## 16. Stage completion

### 16.0 Pre-registered minimum evidence floors

Bu sayılar bilimsel eşik değil, Founder review'una sunulan `POLICY_DEFAULT` operasyon stop/completion değerleridir:

- **A mandatory-attempt gate:** §7.1'deki 48 primary-breadth query event'inin tamamı attempted/status-coded olmalıdır. Eksikse `INCONCLUSIVE; VOC_NOT_STARTED`; `WITH_GAPS` downstream gate değildir.
- **A→VOC evidence floor:** 11 seed'in en az 8'inde official-domain veya US-store identity resolution; yedi English mechanism stratum'un en az 4'ünde en az bir eligible entity; en az 4 independent-context source. Aksi hâlde tarihsel checkpoint `state=MKT01A_STAGE_FROZEN; completion_quality=WITH_GAPS` olabilir ama VOC açılmaz; run `INCONCLUSIVE`.
- **VOC stage floor:** Procedural freeze için signal minimumu yoktur; sıfır signal dahi gap olarak saklanabilir. Bu, terminal B floor'unu sağlamaz.
- **B terminal floor:** En az 12 retained signal; en az 6 lineage-independent parent; F01–F10'dan en az 4 family; en az bir US-store ve bir forum parent. Ayrıca A→VOC gate geçmiş olmalıdır. Eksikse `INCONCLUSIVE`, `PD*` yok.
- Hiçbir floor, count/prevalence veya category doğruluğu iddiası değildir. Cap dolduğu için floor kaçırılması scope'u genişletmez.

### 16.1 MKT-01A

`MKT01A_STAGE_FROZEN` + `completion_quality=COMPLETE` için:

- exact envelope authority aktif;
- exact query/store slots ya denenmiş ya time/cap/missing status taşıyor;
- 84 source cap aşılmamış;
- provisional frame nonempty ve §16.0 A→VOC gate metrikleri hesaplanmış;
- posture/source/selection/claim freshness ledger freeze;
- AI QA category boundary, source selection ve seed bias kontrolü;
- açık CRITICAL/MAJOR yok;
- output terminal MKT/`PD*` değil.

A→VOC floor geçmezse A tarihsel `MKT01A_STAGE_FROZEN` checkpoint'ini `completion_quality=WITH_GAPS` ile saklayabilir, fakat bu `CTR-PD-STAGED-002`yi karşılamaz; run `INCONCLUSIVE` olur ve VOC başlamaz.

### 16.2 VOC-03A

`VOC03A_MINIMIZED_SIGNAL_STAGE_FROZEN` için:

- yalnız exact frozen A frame;
- exact US store ve EN/TR forum slots;
- bütün retained signals contemporaneous QA PASS;
- transient notes deleted before freeze;
- username/profile/comment locator/raw/screenshot count 0;
- bütün signals USER_REPORT/LOW;
- prohibited inference count 0;
- açık CRITICAL/MAJOR yok.

Sıfır/az signal “problem yok” değildir. Procedural stage with gaps olabilir; MKT-01B evidence floor ayrıca değerlendirilir.

### 16.3 MKT-01B

Terminal `PRELIMINARY_PUBLIC_DISCOVERY / PD*` için:

- exact frozen A + VOC inputs pinned;
- named-alternative cap ve rules uygulanmış;
- pre-recheck draft finding rows ve `CURRENT_STATE_CANDIDATE_CLAIM_SET`, `MKT01B_CANDIDATE_CLAIM_SET_FROZEN` checkpoint'inde freeze edilmiş;
- deterministic unique-URL queue ayrı `MKT01B_RECHECK_QUEUE_FROZEN` checkpoint'inde, hiçbir recheck başlamadan freeze edilmiş ve candidate-set `logical_record_checksum_sha256` değerini pinlemiş;
- terminal dynamic claims §14.1'in immediate-recheck→consumption transaction'ıyla tüketilmiş; frozen set dışı current-state claim sayısı 0;
- integrated matrix/contradiction graph frozen;
- bütün findings source/claim/signal ID, posture, scope, confidence, falsifier ve freshness taşır;
- English/US/TR, USER_REPORT, singleton ve prevalence/causality/efficacy/safety/legal sınırları geçer;
- %100 integrated AI QA ve ayrı AI red-team;
- açık CRITICAL/MAJOR yok;
- beş-container/lineage testleri geçer;
- Dxx/roadmap/build/price/target/launch output count 0.

Minimum floor karşılanmazsa `INCONCLUSIVE`; terminal label verilmez.

## 17. Stop ve escalation

| Trigger | Sonuç |
|---|---|
| Public page'de incidental identifier görünür fakat extract/retain edilmez | `INCIDENTAL_IDENTIFIER_NOT_RETAINED`; devam |
| PII/minör/hassas ayrıntıya bağımlı tek UGC unit | `EXCLUDED_SENSITIVE_OR_IDENTITY_DEPENDENT`; content/paraphrase yok; identity-free counter; devam |
| Login/consent wall/paywall/CAPTCHA/rate-limit görülür | `ACCESS_BLOCKED_SLOT`; workaround yok; mandatory gate/floor kaçarsa `INCONCLUSIVE` |
| Budget/spend >0, login/account/trial veya access workaround fiilen denenir | `STOPPED_RISK` |
| PII/identifier/raw content artifact'a yazılır veya re-identification üretilir | Derhal `STOPPED_RISK`, tombstone/delete-before-reopen, G0B privacy triage |
| Minör/hassas human-safety konusunda substantive hüküm/incident response/hukuki görev gerekir | Substantive retain yok; generic escalation; `PAUSED(reason=G0B_TRIAGE)` |
| Scope/source/risk/budget/exposure semantic widening | Yeni frozen version + Founder approval |
| Tek stage active-time alt-tavanı doldu | `STAGE_ACTIVE_CAP_REACHED`; o stage public action stop; completion geçerse freeze/sonraki stage, geçmezse `INCONCLUSIVE` |
| 336 saatlik authority window veya 1440 dakika total-active cap doldu | Global `AUTHORITY_EXPIRED`; bütün public action stop; yeni exact approval olmadan devam yok |
| Page/source/signal cap doldu | İlgili collection stop; gaps raporlanır; cap genişletilmez |
| Source-visible signal QA tamamlanamadı | Signal exclude |
| Open CRITICAL/MAJOR AI finding | Stage/terminal block |
| Evidence floor karşılanmadı | `INCONCLUSIVE` |

## 18. Approval checklist ve current-state attestation

Founder collection approval event'inden önceki preconditions; hepsi `PASS` olmalı:

- [ ] `ROS-DESIGN-v1.3-CANDIDATE-COMPILED` exact hash onaylı
- [ ] G0A baseline approved
- [ ] Bu protocol exact hash freeze edilmiş
- [ ] Exact authority manifests, üç sub-hash, beş authority value ve `authority_identity_hash` recompute edilip kayıtlı
- [ ] Exact engine/query/locale/order/rank/dedup/selection reviewed
- [ ] Ayrı AI operational protocol QA complete
- [ ] Ayrı AI operational red-team complete
- [ ] Açık CRITICAL/MAJOR yok

Yukarıdaki preconditions geçtikten sonra Founder'ın verebileceği ayrı approval sonucu ve collection-start prerequisite'i:

- [ ] Founder exact single-envelope collection approval event'i

**Şimdiki değerler:**

```text
protocol_status=APPROVAL_CANDIDATE
G0A_status=INACTIVE_NOT_APPROVED
founder_collection_approval=ABSENT
searches_executed=0
sources_opened=0
UGC_viewed=0
records_collected=0
spend=0
Goal_resumed=false
code_or_repo_created=false
stack_or_roadmap_selected=false
```

Bu teslimattan sonra durulur ve Founder değerlendirmesi beklenir.
