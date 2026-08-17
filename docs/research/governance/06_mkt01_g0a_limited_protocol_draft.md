# MKT-01-G0A Limited Public Discovery Protocol v0.1

**Artifact ID:** `MKT-01-G0A-LPD-v0.1`
**Tarih:** 2026-08-11
**Durum:** `SCOPING_DRAFT / NOT_APPROVED_TO_COLLECT / NO_COLLECTION`
**Lane:** `G0A — SOLO-FOUNDER PUBLIC DISCOVERY`
**Parent candidate:** `ROS-DESIGN-v1.3-CANDIDATE-DIFF-001`
**Mevcut gate:** `G0A NOT APPROVED`
**Bütçe tavanı:** `0`
**Package Lead adayı:** Codex
**Founder rolü:** Scope, Budget ve Decision Owner — candidate; bu protokol ayrıca onaylanmadı
**QA:** Ayrı context `AI_OPERATIONAL_QA`; `reviewer_kind=AI`, `is_human=false`, `independent_human_review=false`
**Red-team:** Ayrı context `AI_OPERATIONAL_RED_TEAM`; `reviewer_kind=AI`, `is_human=false`, `independent_human_review=false`
**Kanonik package path:** `MKT-01.PUBLIC-DESK`
**MKT-01.PUBLIC-DESK azami çalışma zarfı önerisi:** Aktivasyondan sonra 12 araştırma saati veya 7 takvim günü; hangisi önce dolarsa
**Çıkış tavanı:** `PRELIMINARY / PUBLIC-DISCOVERY / NON-REPRESENTATIVE`
**Onaylanabilirlik:** `v0.1` yalnız scoping draft'tır; collection için onaylanamaz. Eksik arama motoru/locale/query/rank/dedup alanları dondurulunca yeni `v0.2 APPROVAL_CANDIDATE` üretilir.

> Bu dosya yalnız protokol taslağıdır. Hiçbir web sayfası açılmadı, sorgu çalıştırılmadı, yorum okunmadı ve rakip bulgusu üretilmedi. `ROS v1.3 APPROVED → G0A APPROVED → frozen MKT protocol v0.2 FOUNDER_APPROVED_TO_COLLECT` sırası tamamlanmadan MKT collection yasaktır. VOC-03A için ayrıca kendi frozen protokolü ve ayrı approval event'i gerekir.

Bu protokoldeki sample/cap/eşik sayıları ampirik gerçek değildir. `POLICY-MKT01-G0A-v0.1`, kaynak `Founder G0A directive + Codex protocol design`, tarih 2026-08-11, statü `PROPOSED` değerleridir.

## 1. Amaç ve karar sınırı

Amaç, dil öğrenme/öğretme kategorisinin ve uygulama dışı ikamelerin kaynaklı fakat preliminary aday evrenini üretmektir.

İzinli intended use:

- kategori ve alternatif adayları üretmek;
- sonraki `USR-02.PUBLIC-DESK`, `CMP-04.PUBLIC-SURFACE` ve `VOC-03A.PUBLIC-SCAN` protokollerini scope etmek;
- karşı hipotez, bilinmeyen ve G0B escalation soruları üretmek.

İzin verilmeyen intended use:

- `READY_FOR(D01)` veya başka Dxx readiness;
- TAM/SAM/SOM, pazar payı, talep/prevalence veya gelir/kullanıcı tahmini;
- “en iyi rakip”, ürün sıralaması veya feature-gap sonucu;
- öğrenme etkililiği, retention, nedensellik veya kullanıcı nüfusu iddiası;
- hedef segment, ülke, fiyat, roadmap, teknoloji, ürün özelliği, beta veya launch kararı;
- Founder Hypothesis Memo hipotezlerinin altı evidence sınıfından biriyle kapatılması.

## 2. Araştırma soruları

1. Halka açık kaynaklarda hangi dil öğrenme/öğretme delivery mekanizmaları açıkça görülüyor?
2. Tutor marketplace, canlı ders/konuşma, yapılandırılmış kurs, AI konuşma, pronunciation, peer exchange ve uygulama dışı alternatifler nerede ayrılıyor veya örtüşüyor?
3. Şirketler kendilerini hangi kategori, mekanizma ve kullanıcı işi diliyle konumluyor?
4. Türkiye storefront'unda public iOS/Android presence ve ücretsiz/ücretli giriş claim'leri nasıl görünüyor?
5. Uygulama dışı hangi ikameler public institutional/third-party kaynaklarda yer alıyor?
6. Ayrı VOC-03A mikro örneğinde kullanıcıların selection, switching ve substitute dilinde hangi aday terimler görülüyor?
7. Hangi karşı örnekler tekil ve dışlayıcı bir kategori taksonomisini yanlışlıyor?
8. Hangi bilinmeyenler sonraki public package'a; hangileri G0B gerçek-insan uzman kapısına yönlendirilmeli?

## 3. Provisional scope — ürün/pazar kararı değildir

| Alan | Protocol proposal | Sınır |
|---|---|---|
| Storefront | Türkiye (`TR`) | Hedef pazar seçimi değildir |
| Platform | Public Apple App Store ve Google Play web listing'leri | Install/app içi akış yok |
| Dil | Türkçe ve İngilizce public kaynak | Başka dile genelleme yok |
| Global web | Ülke belirtilmiyorsa `GLOBAL/UNSPECIFIED` | TR claim'i sayılmaz |
| UGC ülke | Açıkça görünmüyorsa `UNKNOWN` | Dilden ülke/milliyet çıkarılmaz |
| Observation window | Ayrı collection onayından sonraki en fazla 7 gün | Tarihler actual collection'da kaydedilir |
| Public review freshness | Son 12 ay tercih; slot yoksa en fazla 24 aya genişlet ve `LEGACY` etiketi | Güncel davranış genellenemez |

### 3.1 Founder-nominated search seed'leri

Tandem, HelloTalk, Lingbe, Hilokal, italki, Preply, Cambly, Busuu, Duolingo, Speak ve ELSA.

Statüleri yalnız `FOUNDER_NOMINATED_SEARCH_SEED`dir. Rakip, kategori lideri, uygun alternatif veya ürün gereksinimi oldukları kanıtlanmış değildir. Independent category expansion ve non-app counter-search zorunludur.

### 3.2 Provisional mechanism strata

1. `HUMAN_TUTOR_MARKETPLACE`
2. `LIVE_LANGUAGE_CLASS_OR_CONVERSATION`
3. `STRUCTURED_SELF_STUDY_COURSE`
4. `AI_CONVERSATION`
5. `PRONUNCIATION_FEEDBACK`
6. `PEER_LANGUAGE_EXCHANGE`
7. `SELF_STUDY_OR_HUMAN_HELP_NON_APP`
8. `HYBRID`
9. `OTHER_OPEN_CODE`
10. `UNKNOWN`

Bu liste codebook seed'idir; sonuç değildir. Bir entity tek kategoriye zorlanmaz.

## 4. İki aşamalı sahiplik ve yürütme sırası

### Aşama A — `MKT-01.PUBLIC-DESK` public non-UGC frame

Yalnız resmî, academic/institutional ve yöntem/source chain'i görülebilen trusted third-party kaynaklarla `CATEGORY-FRAME-PD-v0.1` ve `ALTERNATIVE-UNIVERSE-PD-v0.1` dondurulur. `MKT-01.PUBLIC-DESK` kendi data freeze, QA, red-team ve completion memo'sundan sonra bağımsız terminal `PD*` üretebilir; VOC-03A bunun completion önkoşulu değildir.

### Aşama B — ayrı `VOC-03A.PUBLIC-SCAN`

Yalnız terminal/pinned `MKT-01.PUBLIC-DESK CATEGORY-FRAME-PD/PD*` artifact'ından sonra ayrı `VOC-03A.PUBLIC-SCAN` state/manifest'i ve ayrı frozen/Founder-approved protokol açılabilir:

- ham kullanıcı sesi sahibi VOC-03A'dır;
- MKT aynı UGC'yi kopyalamaz, yalnız `VOC Signal ID` referansı tüketir;
- amaç yalnız kategori vocabulary, named alternative ve selection/switching context'tir;
- satisfaction, feature validity, sentiment, complaint rate veya prevalence analizi yasaktır;
- sonuç MKT'de yeni category/alternative sorusu için `REFRESH_TRIGGER` olabilir.

VOC-03A sonucu `MKT-01.PUBLIC-DESK` v0.1 completion'ını geriye dönük koşullandırmaz. Yalnız `REFRESH_TRIGGER` açar; kabul edilirse yeni bir CR ile MKT v0.2+ branch'i yeniden açılır, eski terminal artifact immutable kalır.

### 4.1 VOC-03A Annex protocol metadata — ayrı ve henüz onaylanamaz

| Alan | Değer |
|---|---|
| Artifact ID | `VOC-03A-PUBLIC-SCAN-LPD-v0.1` |
| Durum | `SCOPING_DRAFT / NOT_APPROVED_TO_COLLECT / NO_COLLECTION` |
| Hard upstream | Terminal/pinned `MKT-01.PUBLIC-DESK CATEGORY-FRAME-PD/PD*` |
| Founder approval | MKT approval'ından ayrı exact `FOUNDER_APPROVED_TO_COLLECT` gerekir |
| State/manifest | MKT'den ayrı |
| Source registry | MKT'den ayrı |
| Signal/claim ledger | MKT'den ayrı; MKT yalnız `VOC Signal ID` tüketir |
| Selection log | Ayrı |
| QA | Ayrı `AI_OPERATIONAL_QA`; `reviewer_kind=AI`, `is_human=false`, `independent_human_review=false` |
| Red-team | Ayrı `AI_OPERATIONAL_RED_TEAM`; `reviewer_kind=AI`, `is_human=false`, `independent_human_review=false` |
| Completion memo | Ayrı |
| Çalışma zarfı önerisi | Aktivasyondan sonra en fazla 8 araştırma saati veya 5 takvim günü |
| Çıkış | `PRELIMINARY / PUBLIC-DISCOVERY / NON-REPRESENTATIVE`; yalnız refresh/question signal |

## 5. Kaynak ve bounded sampling planı

### 5.1 MKT-01 non-UGC source strata

| Stratum | Pre-registered seçim kuralı | Azami hacim |
|---|---|---:|
| Founder-seed official sources | Her 11 seed için: 1 canonical product/value page; public pricing varsa 1 pricing page, yoksa mekanizmaya en doğrudan 1 help page; 1 Apple TR listing; 1 Google Play TR listing. Pricing/help ikisi birden alınmaz; eksik slot başka türle doldurulmaz | 44 source record |
| Category expansion | Yedi provisional mechanism stratum'ında ayrı frozen TR ve EN query'nin ilk 10 sonucu yalnız lead olarak incelenir; her dil slotunda sponsored, seed ve duplicate hariç ilk uygun entity seçilir; TR slotu EN'yi veya EN slotu TR'yi dolduramaz; entity başına en fazla iki direct public source | 14 entity / 28 source record |
| Independent context | En fazla 4 academic/institutional taxonomy, 4 yöntemi açıklanan independent category review, 4 official statistic/definition. Uygun kaynak yoksa slot boş | 12 source record |

**Non-UGC toplam tavan:** 84 source record. Tavan hedef değildir; missing slot gevşetilmiş seçimle doldurulmaz.

### 5.2 Dondurulacak query family'leri — henüz çalıştırılmadı

- `online language tutor marketplace` / `çevrimiçi dil öğretmeni platformu`
- `live language conversation classes` / `canlı dil konuşma pratiği`
- `structured language course app` / `yapılandırılmış dil kursu uygulaması`
- `AI speaking practice language app` / `AI konuşma pratiği dil uygulaması`
- `pronunciation feedback app` / `telaffuz geri bildirim uygulaması`
- `language exchange app` / `dil değişim uygulaması`
- `learn a language without an app alternatives` / `uygulama olmadan dil öğrenme alternatifleri`

Actual search engine, exact query string/quoting, TR/EN locale ve yürütme sırası, date, result rank range, duplicate/entity-resolution kuralı ve exclusions bu `v0.1`de eksiktir. Frozen v0.2 ayrıca independent-context database/query ve seçim sırasını; canonical official-domain çözümleme kuralını; pricing yoksa “mekanizmaya en doğrudan help page” seçiminin ölçütünü; aynı entity'nin TR/EN sonuçlarında duplicate sayılma kuralını exact olarak taşır. Bunlar collection öncesinde doldurulup immutable `v0.2 APPROVAL_CANDIDATE` snapshot'ı oluşturulur. Founder yalnız bu frozen v0.2+ sürümünü onaylayabilir. Search snippet source değildir; yalnız `SOURCE_LEAD`dir.

### 5.3 VOC-03A public-UGC mikro örneği

| Stratum | Selection rule | Retained maksimum |
|---|---|---:|
| Store review signal | 11 seed × 2 platform. Her public listing'de tek page-open event'inde default görünümdeki eligible kayıtlar incelenir; en fazla bir manuel “more/expand” eylemi, auto-scroll yok. İlk en fazla 10 eligible içinde en az 5 kayıt ve visible rating varsa en düşük ve en yüksek rated birer kayıt (eşitlikte ilk görünen); rating yoksa veya 5'ten az eligible varsa rank 1 ve son görünür kayıt; yalnız bir eligible varsa bir kayıt | En çok 44 minimized signal |
| Forum/community signal | 7 mechanism × ayrı TR/EN slotu. Her frozen query'nin ilk 10 sonucundaki ilk eligible public/non-sponsored/recent thread; tek page-open event'inde ilk en fazla 10 top-level birimdeki ilk iki somut alternative/selection signal. TR ve EN slotları birbirini dolduramaz | En çok 14 thread / 28 minimized signal |

**UGC toplam tavan:** 72 minimized signal. Bu maximum-variation discovery sample'ıdır; payda, prevalence veya sentiment dağılımı değildir. Eksik slot başka platform/ürünle doldurulmaz.

`Page-open event`, parent listing/thread URL'sinin manuel olarak bir kez açılması, görünen default batch'in incelenmesi ve protokol izin veriyorsa yalnız bir görünür “more/expand” kontrolünün manuel kullanılmasıdır. Recursive traversal, auto-scroll, pagination loop, API/RSS/export veya sonraki batch'e otomatik geçiş değildir.

## 6. Dahil etme ve dışlama

### Dahil et

- Login, ödeme, install veya iletişim olmadan public/read-only erişilebilen sayfa.
- Category, mechanism, alternative veya selection/switching sorusuyla doğrudan ilgili içerik.
- Page-level URL ve access date kaydedilebilen kaynak.
- Türkçe veya İngilizce içerik.
- Separate underlying source/producer lineage'i olan kayıt.
- Trusted third-party için görünür author/publisher/date, incelenebilir yöntem/source chain ve kayıtlı COI/affiliate durumu.

### Dışla

- Login, account, trial, app install, checkout, paywall bypass veya outreach isteyen kaynak.
- CAPTCHA/rate-limit/access-control'u aşmayı gerektiren sayfa.
- Sponsored result; yöntemi/source chain'i olmayan affiliate/SEO listesi — yalnız source lead olabilir, claim desteği olamaz.
- Search snippet'ten türetilmiş claim.
- Repost/duplicate veya aynı underlying dataset'in bağımsız kanıt gibi ikinci kullanımı.
- Kimliksiz/minimize analysis mümkün olmayan kullanıcı içeriği.
- Username, avatar, profile/deep-link, contact veya gereksiz sensitive data retention gerektiren kayıt.
- Long raw review, page/thread dump, UGC screenshot, media download veya bulk archive.
- Company response'un `USER_REPORT` diye kodlanması.

## 7. Public-UGC minimizasyonu

- Public sayfadaki incidental username/avatar transient görülebilir; extract, copy, hash veya retain edilmez.
- Internal `Signal ID` random ve kimlikten türetilmemiş olur.
- Username, handle, avatar, profile URL, account/comment ID ve comment permalink tutulmaz.
- Source alanında canonical store listing veya kimlik içermeyen parent thread URL'si tutulur.
- Varsayılan kayıt anonimleştirilmiş paraphrase'tir.
- Exact wording zorunluysa en fazla 10 kelimelik, nonsensitive, düşük re-identification riskli tek kısa quote; aksi hâlde paraphrase.
- Long raw UGC hiçbir aşamada kopyalanmaz veya depolanmaz. Yalnız gerekirse oluşturulan kısa, identity-free transient paraphrase working note `DATA_FROZEN` öncesi silinir; şemaya uygun minimized derived paraphrase/provenance kalır.
- Date, rating, platform, language ve app version yalnız görünürse tutulur; ülke görünmüyorsa `UNKNOWN`.
- Explicit minor/PII/sensitive-harm ayrıntısı quote edilmez veya tutulmaz. Kimliksiz generic `HIGH_RISK_SIGNAL_UNASSESSED` açılabilir ve G0B queue'ya yönlendirilir.
- Sensitive content/PII yanlışlıkla retain edildiyse `STOPPED_RISK`; artifact karantinaya alınır.

## 8. Evidence ledger şeması

Her retained source/signal ve her claim en az şu alanları taşır:

```text
record_id
protocol_version
lane = G0A
intended_use
source_id
claim_id
source_url
title
publisher_or_producer
producer_type
source_stratum
underlying_dataset_id
source_class
claim_type = OBSERVATION | PRODUCT_CLAIM | USER_REPORT | DERIVED_NOTE
evidence_posture = OBSERVATION | COMPANY_CLAIM | USER_REPORT | INFERENCE
observation_or_minimized_paraphrase
separate_inference
supporting_claim_ids
published_or_updated_at
accessed_at_with_timezone
country_or_storefront
platform
language
app_version_if_visible
query_and_result_rank
selection_rule
rating_if_visible
scope
inclusion_or_exclusion_reason
quality_0_10
confidence_and_rationale
contradiction_ids
alternative_explanation
falsifier
refresh_trigger_and_expiry
access_or_ToS_note
PII_minimization_check
retention_form
raw_working_note_delete_at
derived_record_expires_at
reviewer_kind = AI
is_human = false
independent_human_review = false
human_review_status = NONE_G0A
preliminary_only = true
G0B_escalation_if_any
```

D2/public-UGC satırlarında generic alanların güvenli override'ı zorunludur:

- `publisher_or_producer = platform/store/community`; hiçbir zaman kişi/handle değildir.
- `producer_type = ANONYMOUS_PUBLIC_USER`.
- `title = OMITTED_FOR_UGC` veya kişisel bilgi içermeyen parent-page başlığıdır.
- `underlying_dataset_id = parent listing/thread corpus ID`; hiçbir zaman account/comment/profile ID değildir.
- `source_url` canonical store listing veya kimliksiz parent thread URL'sidir; comment permalink değildir.

Zorunlu ayrımlar:

- doğrudan görünen durum: posture `OBSERVATION` → canonical claim type `OBSERVATION`;
- şirketin söylediği: posture `COMPANY_CLAIM` → canonical claim type `PRODUCT_CLAIM`;
- public kullanıcının söylediği: posture `USER_REPORT` → canonical claim type `USER_REPORT`;
- Codex yorumu: posture `INFERENCE` → canonical claim type `DERIVED_NOTE`, subtype=`INFERENCE`; supporting claim ID, alternative explanation ve falsifier zorunlu;
- Founder Hypothesis Memo: `QUESTION_ORIGIN`; source/evidence değildir.

UGC veya inference güveni G0A'da `LOW` üstüne çıkamaz. Tek-source company claim'i, yalnız şirketin ne söylediği konusunda en fazla `MEDIUM` olabilir; etkililik/doğruluk kanıtlamaz. Hiçbir G0A claim'i `DECISION_GRADE` olamaz.

## 9. Analiz planı

1. Company self-label ve observed delivery mechanism ayrı kodlanır.
2. Bir entity multi-label olabilir; exclusive category zorlanmaz.
3. UGC yalnız `named_alternative`, `selection_or_switching_context`, `substitute_type`, `self_described_need`, `uncertainty` alanlarında kodlanır.
4. Sentiment score, aggregate star comparison veya theme rate üretilmez.
5. `SUPPORTED_CATEGORY_CANDIDATE` için ayrı producer'lardan en az iki lineage-independent source; bunlardan en az bir direct A2 source ve kaydedilmiş counter-example search gerekir.
6. Tabanı geçmeyen aday `SINGLE_SOURCE / WEAK_CANDIDATE` kalır; silinmez.
7. Source yokluğu “ürün/özellik yoktur” şeklinde yorumlanmaz; `NOT_PUBLICLY_FOUND_IN_SCOPE` olur.
8. Company claim ile user report çelişirse ortalama alınmaz; ayrı claim'ler ve contradiction ID tutulur.
9. Safety/privacy/legal/payment/child/psychometric içerik yalnız text observation veya issue-spotting olabilir; adequacy/compliance/validity hükmü G0B'ye gider.

## 10. AI operational QA ve red-team

1. Ledger schema ve prohibited-field kontrolü kayıtların %100'üne uygulanır.
2. Her package için Package Lead'den ayrı QA AI context, source type/platforma stratified `n_QA = min(20, N)` kaydı source'dan yeniden kurar; `N < 20` ise kayıtların %100'ü incelenir.
3. URL–claim, date, country/platform, selection ve evidence-posture agreement raporlanır.
4. QA'dan ayrı red-team AI context, bütün category-boundary, new-entity inclusion ve exclusion rationales'i %100 inceler.
5. İlk consistency diagnostic'te URL/scope/posture agreement <%90 ise etkilenen alanın tamamı yeniden incelenir. Bu eşik `POLICY-MKT01-G0A-v0.1 PROPOSED`dır; ampirik kalite garantisi değildir.
6. Açık `CRITICAL` veya unresolved `MAJOR` varsa preliminary completion verilmez; `INCONCLUSIVE` veya `PAUSED(reason=G0B_TRIAGE)` kullanılır.
7. İki AI context iki bağımsız source değildir; agreement insan IRR sayılmaz.

Her QA artifact'ında exact metadata:

```text
review_kind=AI_OPERATIONAL_QA
reviewer_kind=AI
is_human=false
independent_human_review=false
human_review_performed=false
```

Her red-team artifact'ında exact metadata:

```text
review_kind=AI_OPERATIONAL_RED_TEAM
reviewer_kind=AI
is_human=false
independent_human_review=false
human_review_performed=false
```

Her iki artifact'ta exact uyarı: “AI operational review only; this is not independent human review and cannot satisfy any G0B, R2 or R3 expert/independence requirement.”

## 11. Yanlılık ve kontroller

| Yanlılık | Kontrol |
|---|---|
| Founder-seed anchoring | Seed'ler lead; yedi mechanism + non-app expansion zorunlu |
| Uygulama-merkezcilik | `SELF_STUDY_OR_HUMAN_HELP_NON_APP` ayrı stratum |
| Company marketing bias | `COMPANY_CLAIM` posture / `PRODUCT_CLAIM` type; behaviour/effectiveness inference yasak |
| Store ranking/featured bias | Default sort, inspected first-10 range ve selection position kaydı |
| Rating-extreme bias | Maximum-variation amacı açık; oran/sentiment sonucu yasak |
| Public-review self-selection | D2/LOW; prevalence yasağı |
| SEO/affiliate bias | COI kaydı; yöntem/source chain yoksa yalnız lead |
| Dil/coğrafya | Yalnız TR storefront ve TR/EN; başka ülke/dile genelleme yok |
| Availability/survivorship | Missing source `UNKNOWN/NOT_PUBLICLY_FOUND`; yokluk kanıtı değil |
| Duplicate lineage | `underlying_dataset_id`; aynı veri bağımsız corroboration değil |
| Confirmation/FHM anchoring | Counter-query ve open-code; FHM source/evidence/codebook sonucu değil |
| AI hallucination | Source açılmadan claim yok; inference ayrı; source reconstruction |

## 12. Falsifier ve karşı-kanıt

- Entity birden çok core mechanism sunuyorsa exclusive single-category model reddedilir.
- Güncel direct source veya ikinci lineage-independent signal yoksa aday `SUPPORTED` olamaz.
- Store listing bulunamaması product availability yokluğunu kanıtlamaz.
- Web pricing/help/store çelişirse claim platform/ülke/tarihe bölünür; global claim kurulmaz.
- Non-app alternative yeni mechanism gösterirse app-only frame eksik sayılır.
- Cap'in son batch'inde yeni top-level mechanism gelmeye devam ederse `FRAME_INCOMPLETE / INCONCLUSIVE`; sample sessizce büyütülmez.
- UGC signal official positioning ile çatışırsa biri diğerini iptal etmez; `USER_REPORT ↔ COMPANY_CLAIM` contradiction olarak kalır.
- Arama sonucu veya FHM'de adı geçmeyen güçlü karşı örnek bulunursa seed universe yeterliliği düşürülür.

## 13. Stop, kill ve G0B escalation

| Tetikleyici | Zorunlu eylem |
|---|---|
| Login/account/trial/install/checkout/paywall | Kaynağı atla; workaround yok |
| CAPTCHA, rate-limit veya access-control | Domain'i oturum için durdur; identity/IP değiştirme yok |
| Purchase/outreach/support/user interaction ihtiyacı | Yasak; scope gap kaydı |
| Scraping/crawling/API/RSS/export/bulk ihtiyacı | Yasak; manuel small-sample dışına çıkılmaz |
| Budget >0 | `STOPPED_RISK(reason=BUDGET)`; ücretli alternatif yok |
| Incidental identifier | Retain etme; kimliksiz analysis mümkün değilse exclude |
| PII/sensitive data yanlışlıkla retain edildi | `STOPPED_RISK(reason=PII_OR_SENSITIVE_DATA)`, quarantine ve Founder bildirimi; G0B privacy triage, incident/tombstone kaydı ve explicit reopen approval olmadan devam yok |
| Generic harassment/fraud/child risk mention, PII yok | Detay/quote yok; `HIGH_RISK_SIGNAL_UNASSESSED` + G0B queue; diğer scope devam edebilir |
| Sensitive harm media/PII/minor identifier retention gereği | İlgili alt-kapsam `STOPPED_RISK(reason=SENSITIVE_HARM_OR_MINOR)`; G0B/CHD/MOD route |
| Legal/safety/psychometric/payment sufficiency hükmü ihtiyacı | Claim kurulmaz; `PAUSED(reason=G0B_TRIAGE)` |
| Cap/time bitti, evidence floor yok | `INCONCLUSIVE`; sample otomatik büyümez |
| Veriyi gördükten sonra selection/analysis değişikliği | `EXPLORATORY_AMENDMENT`; silent change yok |
| Herhangi bir Dxx/decision-grade, roadmap/feature/segment/prevalence sonucu kurulması | Claim reddedilir; `PAUSED(reason=G0B_TRIAGE)` ve yalnız next-question kaydı |
| FHM maddesi source/evidence gibi kullanıldı | Synthesis yeniden yapılır |

Manuel çalışma 20 sayfalık küçük batch'lerle yürütülür; bu değer concurrent request izni değildir. Scraper, crawler, recursive traversal, bulk tool veya toplu download kullanılmaz.

## 14. Minimum evidence floor ve stop rule

MKT non-UGC frame için:

- yedi mechanism stratum'ın her birinde en az bir eligible direct source bulunur **veya** `NO_ELIGIBLE_SOURCE_WITHIN_CAP` kaydı oluşur;
- supported category adayı için §9'daki iki-source/falsifier tabanı aranır;
- app dışı alternative stratum boş bırakılamaz; kanıt yoksa `INCONCLUSIVE`;
- bounded scan'in son iki ön-tanımlı dil×mechanism slotunda yeni top-level code görülmezse yalnız `NO_NEW_CODE_WITHIN_BOUNDED_SCAN` notu düşülebilir; bu saturation, stabilization, completeness veya completion kanıtı değildir;
- 84-source, 12-hour veya 7-day `MKT-01.PUBLIC-DESK` cap'lerinden ilki stop eder.

VOC-03A için 72 signal, 8-hour veya 5-day cap'lerinden ilki stop eder. 72 signal tavanı hedeften ziyade upper bound'dur. Her platform/seed slotu bulunmasa bile kriterler gevşetilmez. UGC floor category doğruluğu değil, pre-registered selection'ın uygulanmış olmasıdır.

## 15. Çıkış artifact'ları

### `MKT-01.PUBLIC-DESK` sahibi

- `CATEGORY-FRAME-PD-v0.1`
- `ALTERNATIVE-UNIVERSE-PD-v0.1`
- `ENTITY-SOURCE-REGISTRY-PD-v0.1`
- `TR-PUBLIC-STOREFRONT-PRESENCE-PD-v0.1`
- `MKT-01-CLAIM-LEDGER-PD-v0.1`
- `MKT-01-SEARCH-SELECTION-LOG-v0.1`
- `MKT-01-G0A-PUBLIC-ACTION-LOG-v0.1`
- `MKT-01-DATA-FREEZE-MANIFEST-v0.1`
- `MKT-01-CONTRADICTION-FALSIFIER-LOG-v0.1`
- `MKT-01-GAPS-NEXT-QUESTIONS-v0.1`
- `MKT-01-G0B-ESCALATION-QUEUE-v0.1`
- `MKT-01-AI-OPERATIONAL-QA-v0.1`
- `MKT-01-AI-OPERATIONAL-REDTEAM-v0.1`
- `MKT-01-G0A-COMPLETION-MEMO-v0.1`
- `MKT-01-SPEND-RECONCILIATION-v0.1` — `budget_cap=0`, `actual_spend=0`
- `PRELIMINARY_FOR(USR-02.PUBLIC-DESK, PUBLIC_DISCOVERY, category/JTBD-question scope, v0.1, valid_until)`
- `PRELIMINARY_FOR(CMP-04.PUBLIC-SURFACE, PUBLIC_DISCOVERY, public-flow/claim scope, v0.1, valid_until)`
- `PRELIMINARY_FOR(VOC-03A.PUBLIC-SCAN, PUBLIC_DISCOVERY, category-alternative vocabulary scope, v0.1, valid_until)`

### Ayrı VOC-03A sahibi

- `VOC-03A-FROZEN-PROTOCOL-v0.2+`
- `VOC-03A-FOUNDER-APPROVAL-EVENT-v0.2+`
- `VOC-03A-SOURCE-REGISTRY-PD-v0.1`
- `VOC-03A-SIGNAL-AND-CLAIM-LEDGER-PD-v0.1`
- `VOC-03A-SEARCH-SELECTION-LOG-v0.1`
- `VOC-03A-PUBLIC-SCAN-ACTION-LOG-v0.1`
- `VOC-03A-DATA-FREEZE-MANIFEST-v0.1`
- `VOC-03A-CATEGORY-ALTERNATIVE-SIGNAL-SCAN-PD-v0.1`
- `VOC-03A-MINIMIZATION-AUDIT-v0.1`
- `VOC-03A-AI-OPERATIONAL-QA-v0.1`
- `VOC-03A-AI-OPERATIONAL-REDTEAM-v0.1`
- `VOC-03A-PUBLIC-SCAN-COMPLETION-MEMO-v0.1`
- `VOC-03A-SPEND-RECONCILIATION-v0.1` — `budget_cap=0`, `actual_spend=0`
- `VOC-03A-REFRESH-TRIGGER-LIST-v0.1`
- `PRELIMINARY_FOR(MKT-01.PUBLIC-DESK, PUBLIC_DISCOVERY, REFRESH_SIGNAL_ONLY: category/alternative vocabulary scope, v0.1, valid_until)`

Üretilmeyecekler: `JURISDICTION-CANDIDATES`, TAM/SAM/SOM, segment/JTBD sonucu, full competitor-flow inventory, full VOC corpus, D01 readiness ve FHM evidence classification.

Her package için `valid_until = min(non-null critical-source expires_at values, completion_date + 30 calendar days)`; kritik kaynakta ayrı expiry yoksa 30 günlük üst sınır uygulanır. `refresh_owner=Codex Package Lead`; consume/reopen sahibi Founder'dır. `valid_until` aşılırsa artifact silinmez, `EXPIRED` olur.

## 16. Completion criteria

### 16.1 `MKT-01.PUBLIC-DESK PRELIMINARY PUBLIC DISCOVERY COMPLETE`

`MKT-01.PUBLIC-DESK` yalnız kendi kanıtı ve kontrolleriyle terminal `PD*` olabilir:

1. ROS v1.3, G0A baseline ve frozen MKT protocol v0.2+ ayrı ayrı Founder onayı almıştır.
2. Planlı `11 seed × 4 source-type` slotu ve yedi mechanism × TR/EN expansion slotu cap içinde denenmiştir; missing sonuçlar görünürdür.
3. MKT public-action log, source registry, selection log ve data-freeze manifest sürümlü/pinned'dir.
4. Ledger zorunlu alanları %100 doludur; `UNKNOWN` gerekçeli değerdir.
5. Bütün synthesis claim'leri canonical claim type + posture, source URL, tarih, ülke/platform scope'u, confidence, contradiction ve falsifier taşır.
6. Counter-example ve non-app alternative araması approved cap içinde tamamlanmıştır.
7. Ayrı AI operational QA ve red-team doğru `reviewer_kind=AI`, `is_human=false`, `independent_human_review=false` etiketlerini taşır.
8. Açık `CRITICAL` veya unresolved `MAJOR` finding yoktur.
9. R2/R3, herhangi bir Dxx ve named-sensitive trigger'lar G0B queue'ya ayrılmıştır.
10. Spend reconciliation `budget_cap=0`, `actual_spend=0` gösterir.
11. `valid_until`, refresh owner ve source-expiry hesabı completion memo'da kayıtlıdır.
12. Çıktılar `PRELIMINARY / PUBLIC-DISCOVERY / NON-REPRESENTATIVE` ve exact `PRELIMINARY_FOR(...)` consumer kayıtlarıdır.
13. D01 readiness, ürün/segment/ülke/fiyat/roadmap/stack/beta/launch veya FHM sınıflandırması üretilmemiştir.

VOC-03A'nın hiç başlamaması, durması veya `INCONCLUSIVE` olması `MKT-01.PUBLIC-DESK` completion'ını bozmaz. VOC-03A onun hard downstream consumer'ıdır; upstream completion koşulu değildir.

### 16.2 `VOC-03A PUBLIC-SCAN PRELIMINARY PUBLIC DISCOVERY COMPLETE`

VOC-03A ancak:

1. Terminal/pinned MKT `CATEGORY-FRAME-PD/PD*` tüketmiş;
2. kendi frozen v0.2+ protocol'ü ve ayrı `FOUNDER_APPROVED_TO_COLLECT` event'i oluşmuş;
3. kendi state, source registry, signal ledger, selection/action log ve data-freeze manifest'ini taşımış;
4. pre-registered finite sample/cap kurallarını gevşetmeden uygulamış;
5. username/profile/deep-link/comment ID/long raw UGC/PII tutmadığını minimization audit ile göstermiş;
6. ayrı AI QA ve red-team metadata'sını doğru taşımış;
7. açık `CRITICAL` veya unresolved `MAJOR` finding bırakmamış;
8. spend reconciliation `budget_cap=0`, `actual_spend=0` göstermiş;
9. `valid_until`, `refresh_owner` ve source-expiry hesabını completion memo'da kaydetmiş;
10. yalnız category/alternative/selection-language sinyali, exact `PRELIMINARY_FOR(MKT-01.PUBLIC-DESK, PUBLIC_DISCOVERY, REFRESH_SIGNAL_ONLY: category/alternative vocabulary scope, v0.1, valid_until)` ve gerekirse `REFRESH_TRIGGER` üretmiş; prevalence, sentiment, satisfaction veya Dxx readiness üretmemişse terminal olabilir.

VOC-03A'nın `REFRESH_TRIGGER`ı MKT artifact'ını sessizce değiştirip completion'ı geri yazmaz. Founder kabul ederse ayrı CR ile yeni MKT sürümü açılır.

Cap tüketilip floor karşılanmazsa doğru sonuç `INCONCLUSIVE`dur. Bu, daha fazla collection yetkisi vermez.

## 17. Approval sequence — henüz hiçbir adım geçmedi

1. Founder `ROS-DESIGN-v1.3`ü onaylar/revize eder.
2. G0A semantic-delta negative-path check tamamlanır ve G0A baseline kaydı oluşturulur.
3. Bu `v0.1 SCOPING_DRAFT` içindeki search engine, exact query/locale/order/rank/dedup alanları doldurulur; yeni immutable `MKT-01-G0A-LPD-v0.2 APPROVAL_CANDIDATE` oluşturulur.
4. Founder yalnız frozen MKT v0.2+ sürümünü ayrıca onaylayabilir; ancak onun `FOUNDER_APPROVED_TO_COLLECT` audit event'inden sonra `MKT-01.PUBLIC-DESK` başlayabilir.
5. `MKT-01.PUBLIC-DESK` kendi QA/red-team ve completion memo'suyla terminal `PD*` üretir; VOC-03A buna completion koşulu değildir.
6. VOC-03A için ayrı draft dondurulup `VOC-03A-PUBLIC-SCAN-LPD-v0.2 APPROVAL_CANDIDATE` yapılır ve Founder'dan ayrı approval event'i alınır.
7. Ancak terminal MKT PD + ayrı VOC approval sonrasında VOC-03A scan başlayabilir. Sonucu yalnız optional `REFRESH_TRIGGER`dır.

**Mevcut sonuç:** `STOP — WAITING FOR FOUNDER REVIEW`. Web/collection/analysis yoktur.
