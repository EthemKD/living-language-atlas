# Living Language Atlas — German-first MVP Scope & Evidence Specification v1

> **Normative update (2 Eylül 2026):** WP-02R ve sonraki çalışmalarda `living_language_atlas_wp01_normative_errata_v1_1.md` bu belgenin seviye, skill ID, modality, support, evidence-award, E4, content-familiarity, transcript ve provenance maddelerinin önüne geçer.

**Durum:** WP-00 ve WP-01 v1 planlama sözleşmesi; `[PILOT]` ve `[REVIEW]` kararları bilinçli olarak açık  
**Tarih:** 1 Eylül 2026  
**Arayüz dili:** English  
**İlk öğrenme dili:** German  
**İlk dil varyantı:** Standard German — Germany (`de-DE`)  
**İlk kullanıcı:** English UI kullanabilen, 18+, Complete Beginner  
**Referans aralığı:** CEFR Pre-A1 → early-A1 mikro becerileri  

> Bu belge ilk Almanca içeriğin kendisi değildir. Ürün kapsamını, skill sınırlarını ve evidence kurallarını tanımlar. Learner-visible Almanca cümleler, kabul edilen varyantlar ve sesler WP-02'de yetkin German language/pedagogy reviewer tarafından onaylanmadan yayınlanamaz.

---

## 0. Karar kaydı

### DEC-001 — İlk öğrenme dili German

Russian ilk aktif plandan çıkarılmıştır. German ilk curriculum, content, audio, reviewer ve evaluation dilidir. Russian gelecekte ayrı bir language pack olarak değerlendirilebilir; German curriculum'ın çevrilmiş kopyası olamaz.

### DEC-002 — İlk varyant `de-DE`

İlk içerik nötr Standard German ve Almanya'daki yetişkin hizmet etkileşimi bağlamına dayanır.

- Austria ve Switzerland kullanımları “yanlış” sayılmaz; ilk içerik kapsamı dışında, açık variant kaydı olarak tutulur.
- İlk görevli register'ı kibar yetişkin hizmet etkileşimidir ve varsayılan olarak `Sie` kullanır.
- Lehçe, argo, bölgesel ürün adı ve hızlı doğal konuşma ilk rotada yoktur.

Bu, içerik üretimine başlayabilmek için yapılan çalışma varsayımıdır. Kullanıcı daha sonra başka bir hedef bölge seçerse ayrı ADR ile değiştirilebilir.

### DEC-003 — Veri modelinde `A0` yok

CEFR'nin resmî başlangıç etiketi `Pre-A1`'dir. Uygulama pazarlama/onboarding dilinde “Complete Beginner” diyebilir; veri modeli ve reviewer kayıtları `Pre-A1` kullanır. Bu rota kullanıcının “A1 olduğu” veya A1 sınavına hazır olduğu iddiasını üretmez.

### DEC-004 — İlk rota service counter interaction

İlk rota:

> **At the Counter — Order, Understand, Recover**

Bu seçim CEFR'nin Pre-A1/A1 goods-and-services tanımlarıyla ve Goethe-Institut'un A1 yetişkin hedeflerinde basit rica, alışveriş, yiyecek-içecek, sayı/fiyat ve iletişim onarımı işlevleriyle uyumludur.

---

# WP-00 — German-first MVP Scope

## 1. Ürün amacı

İlk MVP şu hipotezi test eder:

> Complete Beginner bir kullanıcı, tek bir hizmet etkileşiminde ne istediğini ifade etmeyi ve anlamadığında konuşmayı onarmayı; destekli alıştırmadan değişen bağlama, oradan gecikmeli geri dönüşe taşıyabilir mi ve uygulama bu ilerlemeyi abartmadan gösterebilir mi?

MVP'nin başarısı ekran sayısı veya tamamlanan ders değildir. Kullanıcı:

1. neden bu işi çalıştığını anlar,
2. yardım varken yapar,
3. yüzey ayrıntıları değişince tekrar yapar,
4. zaman geçince geri çağırır,
5. nerede hâlâ desteğe ihtiyacı olduğunu görür.

## 2. İlk rota yapısı

```text
World: Need
  District: Food & Service
    Route: At the Counter — Order, Understand, Recover
      N1: Ask for one thing
      N2: When you do not understand
      N3: One small choice
      N4: Price and payment
      N5: Counter Mission — changed context
      N6: Return Check — delayed context
```

### N1 — Ask for one thing

- Tek, görünür veya önceden öğretilmiş ürün.
- Kibar ve anlaşılır istek.
- Serbest menü sohbeti yok.
- Ürün unavailable, alerji, özelleştirme veya şikâyet yok.

### N2 — When you do not understand

- Kullanıcı anlamadığını belirtir.
- Tekrar veya daha yavaş konuşma ister.
- Görevli işbirliği yapar ve girdiyi yalnız bir kez sadeleştirir/tekrarlar.
- Repair başlatmak başarısızlık değil, hedef beceridir.

### N3 — One small choice

- Yalnız bir ikili ayrım: örneğin iki bilinen seçenek, boyut veya miktar.
- Birden fazla özelleştirme yok.
- Yeni kelime yığını veya serbest soru-cevap yok.

### N4 — Price and payment

- Tek toplam tutar.
- Tek basit ödeme seçeneği veya kullanıcıya sunulan iki seçenek.
- Para üstü hesabı, pazarlık ve ödeme sorunu yok.

### N5 — Counter Mission

- Bakery, café veya station kiosk ailesinden yeni bir mekân.
- En az iki bağlam boyutu değişir; bunlardan en az biri ürün, mekân, interlocutor, dialogue position veya prompt surface gibi anlamlı bir retrieval değişkenidir.
- Yalnız avatar, arka plan rengi, seçenek sırası veya görsel düzen değişikliği transfer sayılmaz.
- Dilsel zorluk aynı kalır; transfer yeni gramer sınavına dönüşmez.
- En az bir repair olayı bulunur fakat önceden “şimdi repair kullan” denmez.

### N6 — Return Check

- Varsayılan scheduler hedefi 24–72 saat; v0 minimum qualifying delay son answer-revealing exposure'dan sonra 20 saattir `[PILOT]`.
- Daha geç dönüş otomatik olarak geçersiz sayılmaz; gerçek gecikme bandı kaydedilir.
- Yeni mekân–ürün–prompt bileşimi.
- Hazır cevap veya target-language word bank yok.
- Listening görevinde CEFR A1'in işbirlikçi konuşmacı varsayımına uygun tek replay/repetition hakkı olabilir; bu destek evidence kaydında görünür.

## 3. İlk skill bundle

### GER-PREA1-SVC-REQUEST-ONE

**Can-do:** Kullanıcı, bilinen veya görünür tek bir yiyecek/içecek ürününü yetişkin hizmet bağlamına uygun basit bir nezaket ifadesiyle anlaşılır biçimde isteyebilir.

**Sınır:**

- tek ürün,
- fiyat sormak veya özelleştirmek bu skill'in parçası değil,
- kusursuz article/case tek başına başarı şartı değil,
- iletişim niyeti ve ürün referansı anlaşılır olmalı,
- en az bir uygun politeness marker bulunmalı.

### GER-PREA1-SVC-RESOLVE-CHOICE

**Can-do:** Kullanıcı, yavaş ve açık sunulan tek bir basit seçenek ayrımını anlayıp seçimini bildirebilir.

**Sınır:**

- yalnız iki bilinen seçenek veya bir boyut/miktar ayrımı,
- birden çok modifier yok,
- yeni vocabulary inference beklenmez,
- listening ve response evidence ayrı tutulur.

### GER-PREA1-SVC-PRICE-PAY

**Can-do:** Kullanıcı, yavaş ve açık verilen tek toplam tutarı anlayıp basit ödeme adımını tamamlayabilir.

**Sınır:**

- para üstü hesabı yok,
- fiyat tartışması yok,
- tek toplam,
- görsel kasa desteği ilk aşamada mümkündür ve support olarak kaydedilir.

### GER-PREA1-SVC-REPAIR

**Can-do:** Kullanıcı, anlamadığını fark edip bunu belirtebilir; tekrar veya daha yavaş konuşma isteğini kendisi başlatabilir ve işbirlikçi tekrardan sonra işlemi sürdürebilir.

**Sınır:**

- tek communication breakdown,
- görevli hemen işbirliği yapar,
- uzun açıklama veya kelime tanımı isteme yok,
- repair prompt'u target answer göstermeden bağlamı kurabilir,
- kullanıcıya “şimdi repair phrase kullan” denirse bağımsız evidence oluşmaz.

### Register, teşekkür ve kapanış

Teşekkür/kapanış ayrı bir MVP skill değildir. `register_outcome` rubriğinin parçasıdır. Kullanıcının niyeti başarıyla tamamlanmış olsa da bariz `du/Sie` uyumsuzluğu veya nezaket eksikliği ayrı repair etiketi oluşturabilir.

## 4. İki teslim seviyesi

### MVP-0 — Software vertical slice

Amaç ürün mimarisini düşük içerik maliyetiyle doğrulamaktır.

- N1 + N2,
- REQUEST-ONE + REPAIR,
- reading/typed interaction,
- deterministic evaluator,
- Atlas → mission → evidence debrief → offline/resume → return,
- typed E3/E4 mümkündür,
- listening ve speaking evidence yoktur.

UI şu tür dürüst bir ifade kullanmalıdır:

> “You used this in a new typed situation.”

“You can say this” veya speaking evidence gösterilmez.

### MVP-1 — Learning alpha

- N1–N6,
- dört skill,
- reviewer-approved canonical audio,
- listening recognition,
- typed production,
- local record/replay bulunabilir,
- pronunciation scoring yok,
- speaking evidence yalnız güvenilir human/rubric veya ayrıca doğrulanmış evaluator geldiğinde açılır.

## 5. Görünen ürün yüzeyleri

- **Atlas:** yalnız ilk district/route ve tek next action.
- **Practice:** due return, latest error ve repair.
- **You:** modality-specific can-do/evidence ve sync durumu.

Studio, People ve Library ayrı tab olarak görünmez.

## 6. Golden path

1. English onboarding.
2. Learning language otomatik German; region `de-DE`.
3. Goal ve daily time.
4. Guest start.
5. Atlas'ta ilk route ve “why now”.
6. N1/N2 deterministic mission.
7. Recognition → supported production → independent changed-context attempt.
8. Evidence debrief: intent, support, modality ve açık repair.
9. Uygulama kapanması veya bağlantı kesilmesi.
10. Safe resume ve idempotent outbox sync.
11. Hedef 24–72 saat bandında due return; minimum qualifying delay 20 saat.
12. New prompt; success veya repair sonucu.
13. You ekranında typed/listening/speaking boyutları birbirine karıştırılmadan gösterilir.

## 7. Non-goals

- A1 course completion veya sertifika iddiası,
- serbest restaurant conversation,
- complaint, unavailable product negotiation veya allergy explanation,
- çoklu modifier/customization,
- para üstü matematiği,
- hızlı doğal konuşma, dialect veya slang,
- Austria/Switzerland variant teaching,
- serbest AI chat,
- pronunciation score,
- social, coin, premium veya marketplace,
- tam content admin UI.

## 8. German-first içerik doktrini

- Latin script varsayılandır; transliteration katmanı yoktur.
- `ä`, `ö`, `ü`, `ß` ve noun capitalization görünürdür.
- ASCII keyboard fallback (`ae/oe/ue/ss`) erişilebilirlik/klavye desteği olarak ele alınabilir; German orthography evidence üretmez.
- Grammar table, iletişim işinden bağımsız gösterilmez.
- Article/gender/case hatası niyeti bozmuyorsa bütün communicative attempt'i otomatik başarısız yapmaz; ayrı form repair'i doğurur.
- Word order, finite verb placement ve register yalnız hedef skill için gerekli olduğu ölçüde değerlendirilir.
- `Sie` ilk hizmet bağlamının varsayılanıdır; `du` evrensel olarak yanlış değil, bu senaryoda register mismatch olabilir.
- Germany, Austria ve Switzerland standard varyantları source/variant metadata ile ayrılır.
- Canonical audio cihaz TTS'si değildir; human-reviewed veya açıkça onaylanmış kaynaktan gelir.
- Goethe/CEFR materyalleri araştırma ve benchmark kaynağıdır; learner content/audio olarak kopyalanmaz.

## 9. MVP kabul kapıları

### Product/content

- Dört skill'in can-do ve sınırları reviewer tarafından anlaşılır bulunur.
- İlk learner-visible content package language + pedagogy review alır.
- Her activity hangi modality ve evidence level'i üretebildiğini açıkça taşır.
- Kullanıcı E0/E1'i “I can do this” sanmaz.
- Typed evidence speaking evidence'e dönüşmez.

### Technical

- App interruption ve offline durumda attempt kaybolmaz.
- Duplicate sync duplicate evidence üretmez.
- Pending ile server-accepted evidence ayrılır.
- Content/evaluator version attempt üzerinde saklanır.
- AI, voice provider veya analytics kapalıyken deterministic learning loop çalışır.

### Validation

- WP-01 evidence fixture'larının tamamı beklenen sonucu verir.
- Normal golden path ve en az şu edge case'ler test edilir: offline, duplicate submit, stale content, evaluator uncertainty, return failure ve ASCII keyboard fallback.
- Closed alpha öncesi target learner'larla evidence dilinin anlaşılabilirliği test edilir; eşik sonuçları pilot verisi olmadan “bilimsel olarak kanıtlandı” diye sunulmaz.

## 10. İlk ölçüm sözlüğü

- onboarding → first meaningful action,
- mission start/completion,
- E1 → E2,
- E2 → modality-specific E3,
- E3 → E4 return,
- repair initiated without explicit answer prompt,
- retry/replay use,
- `unscored` rate,
- pending sync age/failure,
- user comprehension of evidence label,
- content report rate.

North-star daha sonra “haftalık en az bir accepted E3/E4 event üreten aktif learner oranı” olarak korunur; MVP'de typed ve speaking event'ler ayrı raporlanır.

---

# WP-01 — Domain & Evidence Contract

## 11. Domain ayrımı

### Atlas structure

`World → District → Route → Node`

Node bir `launchable_unit` referansı taşır; skill değildir.

### Skill graph

`Skill ↔ SkillPrerequisite`

Skill sürümlü, dil/varyant/register bilgili bir can-do'dur.

### Delivery

`LessonVersion veya MissionVersion → ordered ActivityReference[]`

Activity birden çok skill çalıştırabilir; her skill için ayrı evidence capability bildirir.

### Runtime

`LearningSession → SessionStep → Attempt → AttemptEvaluation`

### Evidence

`AttemptEvaluation → EvidenceEvent → LearnerSkillProjection → ReviewSchedule`

Attempt skill state'i doğrudan değiştirmez. Evaluation policy event üretir; projection event'lerden yeniden hesaplanır.

## 12. Minimum skill schema

```text
skill_id
instruction_language_tag: en
target_language_tag: de
canonical_variety: de-DE
orthography_profile
regional_scope
reference_level: PRE_A1 | EARLY_A1
can_do_en
intent_code
context_family
register_requirement
prerequisite_skill_ids[]
modalities[]
accepted_performance_policy_id
error_policy_id
return_policy_id
content_version
rubric_version
review_status
```

## 13. Minimum evidence event

```text
evidence_event_id
attempt_id
learner_id
skill_id
modality: reading | listening | typed_interaction | speaking
stimulus_modality: text | audio | mixed
response_modality: selection | construction | typed | spoken
interaction_channel: text_simulation | voice_simulation | real_world_self_report
evidence_level: E0 | E1 | E2 | E3 | E4
evaluation_outcome: accepted_clean | accepted_minor | failed_critical | unscored
intent_outcome: achieved | partial | not_achieved | uncertain
form_outcome: acceptable | minor_issue | blocking_issue | uncertain
register_outcome: appropriate | mismatch | not_applicable | uncertain
support_profile
context_id
context_family
surface_variant_ids[]
delay_seconds_from_prior_qualifying_event
delay_seconds_from_last_answer_revealing_exposure
error_codes[]
evaluator_type
evaluator_confidence_bucket
status: pending | accepted | unscored | rejected | superseded
content_version
rubric_version
created_at
```

## 14. Support profile

Tek bir `hint_count` yeterli değildir. Destek hedef skill'e göre sınıflandırılır: menüde `Tee` yazması request frame için doğal bağlam, `Tee` lexical recall için answer cue olabilir.

| Kod | Destek | Örnek | Üretebileceği azami evidence |
|---|---|---|---|
| `H0` | Yardımsız | Yalnız doğal scenario akışı | E3/E4 |
| `H1` | Bağlam/iletişim amacı | Scene, role veya English meaning prompt; German target form yok | E3/E4 |
| `H2` | Retrieval cue | İlk harf, kelime sayısı, lexical veya grammar cue | E2 |
| `H3` | Construction scaffold | Word bank, sentence frame, token ordering | E2 |
| `H4` | Model/cevap gösterimi | Tam ifadeyi görüp kopyalama, shadowing, feedback sonrası aynısını tekrar | E0/practice |

Attempt metadata'sı en az şunları taşır:

- `max_support_level`,
- `hint_types[]`,
- `answer_revealed_before_submission`,
- `feedback_seen_before_retry`,
- `target_form_exposure_at`,
- `audio_replay_count`,
- `slowed_audio`,
- `explicit_repair_instruction`.

Recognition seçenekleri production support sayılmaz; E1'in kendi chance-aware bundle kuralına tabidir. `H1` yalnız target-language cevabı taşımadığı sürece bağımsız evidence'e izin verir. `H2`, `H3`, `H4` veya explicit repair instruction E3/E4 üretimini engeller.

## 15. Modality ilkesi

Evidence projection anahtarı en az `learner + skill + modality` olmalıdır.

- Text seçmek listening evidence değildir.
- Typed response speaking evidence değildir.
- STT transcript'in hedefe benzemesi pronunciation evidence değildir.
- Açıklama okumak production evidence değildir.
- Aynı skill reading'de Holding, speaking'de Not tried olabilir.

## 16. Evidence event ve projection ayrımı

Her qualifying attempt bir event oluşturabilir; kullanıcı durumunun yükselmesi ek bundle kurallarına bağlıdır.

### E0 — Exposure

Event koşulu:

- Kullanıcı reviewed örneği görmüş veya dinlemiştir.

Projection etkisi:

- yalnız exposure history,
- `Recognizing` veya “can do” durumu oluşturmaz.

Tam cevabı kopyalamak da tek başına E2 değildir; cevap üretimi değil exposure/copy activity sayılır.

### E1 — Recognition

Provisional event koşulu:

- hedef anlam/işlev doğru ayırt edilir,
- answer-revealing feedback response'tan önce gösterilmez,
- modality açıkça kaydedilir.

`Recognizing` projection için provisional, chance-aware bundle:

- dört seçenekli item'larda üç farklı item'ın üçü de doğru (`3/3`), veya
- ikili ayrım item'larında beş farklı item'ın beşi de doğru (`5/5`),
- en az 2 farklı surface realization,
- common-error distractor içeren en az 1 item,
- doğru cevap pozisyonları değişken,
- feedback sonrası aynı item tekrarı bundle'a sayılmaz.

Bu eşik pilotla kalibre edilecektir; mastery iddiası değildir.

### E2 — Supported production

Event koşulu:

- kullanıcı target meaning'i bir response olarak üretir,
- lexical/structural support bulunabilir,
- intent en az `partial`, evaluator `uncertain` değildir,
- kullanılan bütün support kaydedilir.

`With support` projection için provisional bundle:

- en az 2 farklı production item/prompt,
- ikisinde de intent `achieved`,
- blocking issue yok,
- aynı ezberlenmiş string'in yalnız kozmetik tekrarı değil.

Tam model answer'ı kopyalamak E2 sayılmaz.

### E3 — Changed-context independent use

Qualifying event koşulu:

- target-bearing support yok,
- yalnız situational/meaning cue olabilir,
- intent `achieved`,
- blocking issue yok,
- evaluator confidence kabul eşiğinin üzerinde,
- önceki practice bağlamından en az 2 surface dimension değişmiştir,
- yeni bağlam yeni grammar/vocabulary ceiling eklemez.

V0 projection davranışı:

- bir qualifying E3 event, aynı skill/modality şeridinin `highest_evidence_stage = E3` olmasına yeter; UI bunun tek gözlem olduğunu “Used once in a new situation” gibi açıkça ifade eder `[PILOT]`,
- ikinci farklı qualifying E3, aynı stage'i güçlendirir; `qualifying_event_count` ve surface çeşitliliği ayrıca tutulur,
- route-level veya genel Almanca yeterliği, tek mikro-skill E3'ünden türetilmez.

Bir article/case veya capitalization hatası anlamı bozmuyorsa communicative E3'ü otomatik engellemez; ilgili form repair event'i ayrıca oluşturulur. Register skill'in açık kriteriyse register mismatch E3'ü engelleyebilir.

Changed-context vector:

```text
venue
communicative_goal
product_or_information_slot
interlocutor
dialogue_position
prompt_surface
stimulus_modality
distractor_set
```

En az iki boyut değişmeli; bunlardan en az biri ürün, mekân, interlocutor, dialogue position veya prompt surface gibi anlamlı bir retrieval değişkeni olmalıdır. Yalnız görsel tema, avatar adı veya cevap sırası değişikliği yeterli değildir. Yeni context hedeflenmeyen article/case ya da grammar zorluğuyla ölçümü kirletmemelidir.

### E4 — Delayed return

Qualifying event koşulu:

- aynı skill ve modality için önceden accepted E3 vardır,
- son answer-revealing exposure üzerinden en az 20 saat geçmiştir `[PILOT]`,
- scheduler'ın hedef bandı 24–72 saattir; daha geç dönüşte gerçek delay bandı kaydedilir,
- yeni surface prompt kullanılır,
- target-bearing support yoktur,
- ilk response feedback görülmeden verilmiştir,
- content/rubric versions uyumludur,
- intent achieved, blocking issue yok ve evaluator confidence yeterlidir.

`Holding` projection için v0:

- bir qualifying E4 event yeterlidir,
- güvenilirlik pilot sonucuna göre iki ayrı return'e çıkarılabilir.

Listening'de kullanıcı anlamadığını belirtip sistemin sunduğu tek cooperative replay sonrasında doğru işlemi yaparsa iki event tutulur:

1. `repair_initiated` strategy evidence,
2. hedef listening attempt'in replay support bilgili sonucu.

E3'ten sonra aynı skill'in tam cevabı veya answer-revealing hint'i gösterilirse clean delay saati bu son exposure'dan itibaren yeniden başlar. Scheduler, due E4'ü aynı skill'in answer-revealing practice'inden önce sunmalıdır. Önceki E3 yokken başarılı gecikmeli bağımsız yanıt E3 üretebilir; aynı attempt E4'e sıçramaz.

### Erken return

20 saatten önceki başarılı attempt practice olarak değerlidir fakat E4 değildir. E2/E3 event'i olabilir; delay requirement bypass edilmez.

### Başarısız return

- Eski E3 silinmez.
- `highest_evidence_stage` geriye yazılmaz.
- `attention_state = needs_repair` olur.
- hata türüne göre repair item planlanır.
- kullanıcıya “never knew this” denmez; “This did not hold today” benzeri dürüst dil kullanılır.

## 17. Projection iki eksenlidir

Tek enum geçmiş ile bugünkü ihtiyacı karıştırır. Projection:

```text
highest_evidence_stage: NONE | E1 | E2 | E3 | E4
attention_state: STABLE | DUE | NEEDS_REPAIR | UNCERTAIN
qualifying_event_count_by_stage
last_valid_success_at
last_critical_failure_at
last_answer_revealing_exposure_at
next_return_due_at
```

Örnek: Kullanıcının typed REQUEST-ONE skill'i `E3 + NEEDS_REPAIR` olabilir. Bu, daha önce transfer yaptığını fakat bugünkü return'ün kırılgan olduğunu gösterir.

## 18. İlk German error taxonomy

### İletişim sonucu

- `INTENT_MISUNDERSTOOD`
- `WRONG_REFERENT`
- `MISSING_REQUIRED_CHOICE`
- `OFF_TASK`

### Lexical/form

- `LEXICAL_GAP`
- `ARTICLE_GENDER_CASE`
- `VERB_FORM`
- `WORD_ORDER`
- `NEGATION`
- `MISSING_POLITENESS_MARKER`
- `REGISTER_DU_SIE_MISMATCH`

### Orthography/input

- `NOUN_CAPITALIZATION`
- `UMLAUT_SUBSTITUTION`
- `ESZETT_SUBSTITUTION`
- `SPELLING_MINOR`
- `KEYBOARD_CONSTRAINT`

### Listening/voice

- `LISTENING_SEGMENTATION`
- `NUMBER_OR_PRICE_CONFUSION`
- `RECALL_FAILURE`
- `ASR_UNCERTAINTY`
- `AUDIO_QUALITY`
- `PRONUNCIATION_CANDIDATE`

### Evaluation

- `ACCEPTABLE_VARIANT`
- `EVALUATOR_UNCERTAINTY`
- `CONTENT_AMBIGUITY`
- `RUBRIC_CONFLICT`

## 19. Error severity

### Blocking

- intent veya item yanlış,
- kullanıcı cevabı hedef işlemi gerçekleştirmiyor,
- gerekli choice eksik,
- formal-context skill için reviewer'ın kritik saydığı register failure.

### Minor but repairable

- anlamı bozmayan article/case,
- noun capitalization,
- punctuation,
- erişilebilir keyboard modunda ASCII umlaut yazımı,
- anlaşılır ama hedef dışı küçük form sorunu.

### Uncertain

- prompt iki yoruma açık,
- ASR güveni düşük,
- accepted variant listesi eksik,
- audio bozuk,
- evaluator'lar çatışıyor.

Uncertain attempt yanlış sayılmaz; `unscored` olur.

### Evaluation outcome ve evaluator confidence

Her attempt şu dört outcome'dan birini alır:

- `accepted_clean`,
- `accepted_minor`,
- `failed_critical`,
- `unscored`.

Evaluator confidence öğrencinin yeterliği değil, sistemin sınıflandırmasına duyduğu denetlenebilir güvendir:

- `HIGH_DETERMINISTIC`: reviewer-approved exact/normalized variant veya açık deterministic contradiction,
- `HIGH_RULED_MINOR`: reviewer-approved tolerans kuralı,
- `REVIEW_REQUIRED`: makul fakat listelenmemiş alternatif ya da register belirsizliği,
- `TECHNICAL_UNCERTAINTY`: bozuk audio, ASR uyuşmazlığı veya eksik payload,
- `UNSUPPORTED_EVALUATOR`: ilgili modality için doğrulanmış evaluator yok.

Yalnız ilk iki bucket otomatik E1–E4 üretebilir. Diğerleri `unscored` olur; failure veya repair açmaz. Modelin kendi beyan ettiği confidence kanıt değildir. İlk typed MVP'de fuzzy semantic similarity veya tek başına generative LLM judgment, E3/E4 üretmeye yetkili değildir.

## 20. German input normalization ilkesi

Normalization ham girdiyi silmez. Her attempt:

- `raw_input`,
- `normalized_input`,
- kullanılan normalization rules,
- keyboard/accessibility mode

taşır.

Öneri:

- karşılaştırmadan önce Unicode NFC normalization uygulanır,
- whitespace ve terminal punctuation güvenli normalize edilebilir,
- case-fold yalnız comparison helper'dır; noun capitalization hatası kaybolmaz,
- `ae/oe/ue` → umlaut ve `ss` → `ß` dönüşümü otomatik learner text rewrite değildir,
- ASCII fallback açık ise communicative intent kabul edilebilir fakat orthography evidence oluşmaz,
- reviewer-approved accepted variants versioned listede tutulur.

`accepted_variants` yalnız alternatif string listesi değildir. En az şu alanları taşır:

```text
surface_form
normalization_profile
modality
language_variant
regional_scope
register
context_constraints
task_success_allowed
form_evidence_allowed
content_version
rubric_version
reviewer_decision_id
```

## 21. Activity → evidence capability matrisi

| Activity | REQUEST | CHOICE | PRICE/PAY | REPAIR | En yüksek olası evidence |
|---|---:|---:|---:|---:|---|
| Reviewed example/card | ✓ | ✓ | ✓ | ✓ | E0 |
| Meaning/function choice | ✓ | ✓ | ✓ | ✓ | E1, reading |
| Audio intent/number choice | — | ✓ | ✓ | ✓ | E1, listening |
| Word/slot builder | ✓ | ✓ | — | ✓ | E2, typed |
| Scaffolded typed response | ✓ | ✓ | ✓ | ✓ | E2, typed |
| Independent typed scenario turn | ✓ | ✓ | ✓ | ✓ | E3/E4, typed; context/delay şartıyla |
| Local record/replay | ✓ | ✓ | ✓ | ✓ | Practice/E0; tek başına scored speaking evidence değil |
| STT-assisted voice attempt | ✓ | ✓ | ✓ | ✓ | Unscored veya task-intent signal; validated policy olmadan speaking E3 değil |

## 22. Evidence fixture set v0

German örnek ifadeleri learner-visible canonical content değildir; reviewer doğrulaması bekleyen test taslaklarıdır.

### F01 — Explanation only

- Kullanıcı request pattern açıklamasını okur.
- Beklenen: E0 only; production stage değişmez.

### F02 — Recognition bundle passes

- Üç farklı dört-seçenekli function item'ının üçü de doğru; iki surface form var; answer hint yok.
- Beklenen: ilgili reading modality `highest = E1`.

### F03 — Recognition bundle fails

- Üç dört-seçenekli item'dan ikisi doğru.
- Beklenen: attempt history kalır; projection E1'e çıkmaz; guessing cezalandırılmaz.

### F04 — Full model copy

- Tam model cevap ekranda; kullanıcı aynısını yazar.
- Beklenen: E0/copy practice; E2 yok.

### F05 — Supported request

- Word bank ile tek ürün isteği kurulur; intent achieved.
- Beklenen: E2 event; support profile lexical + structural.

### F06 — Independent café → bakery transfer

- Target-language hint yok; mekân ve ürün değişmiş; anlaşılır ve kibar istek.
- Beklenen: qualifying E3 typed event.

### F07 — Article/case issue, intent clear

- İstenen ürün açık; article/case hatası anlamı bozmuyor.
- Beklenen: intent achieved, form minor, `ARTICLE_GENDER_CASE`; communicative E3 engellenmez, form repair planlanır.

### F08 — Wrong product

- Dil biçimsel olarak iyi fakat prompttaki üründen farklı ürün istenir.
- Beklenen: `WRONG_REFERENT`, intent not achieved, E3 yok.

### F09 — Register mismatch

- Kullanıcı formal service promptunda açıkça informal `du` formu kullanır.
- Beklenen: task intent anlaşılabilir; `REGISTER_DU_SIE_MISMATCH`. Register request skill'in açık kriteriyse bu skill için full E3 yok; reviewer policy ile kalibre edilir.

### F10 — ASCII keyboard fallback

- Kullanıcı German keyboard olmadan `ae/oe/ue` biçimi kullanır; accessibility fallback açık.
- Beklenen: communicative intent kabul edilebilir, `KEYBOARD_CONSTRAINT`; orthography evidence yok.

### F11 — Explicit repair instruction

- UI “Ask them to repeat” der ve target repair tokens verir.
- Beklenen: en fazla E2 repair; E3 yok.

### F12 — Self-initiated repair

- Kullanıcı hızlı/kaçırılmış input sonrası target answer gösterilmeden kendisi repeat/slow request başlatır.
- Beklenen: qualifying REPAIR E3; sonraki task outcome ayrı event.

### F13 — ASR uncertainty

- Voice transcript birden çok olası target veriyor; confidence düşük.
- Beklenen: `unscored`, `ASR_UNCERTAINTY`; yanlış veya doğru diye zorlanmaz.

### F14 — Typed is not speaking

- Kullanıcı changed-context typed request'i başarıyla tamamlar.
- Beklenen: typed E3; speaking projection değişmez.

### F15 — Return too early

- E3'ten 30 dakika sonra bağımsız tekrar başarılı.
- Beklenen: practice/E3 history; E4 yok.

### F16 — Delayed return succeeds

- Son answer-revealing exposure'dan 26 saat sonra yeni mekân ve ürün; target-bearing hint yok; intent achieved.
- Beklenen: E4 accepted; `highest = E4`, `attention = STABLE`.

### F17 — Delayed return fails

- Son answer-revealing exposure'dan 26 saat sonra kullanıcı yanlış ürün seçer veya request üretemez.
- Beklenen: eski E3 korunur; `attention = NEEDS_REPAIR`; E4 yok.

### F18 — Cooperative replay after repair

- Listening prompt anlaşılmaz; kullanıcı kendisi repair başlatır; tek replay sonrası doğru seçim yapar.
- Beklenen: REPAIR strategy evidence + replay-support bilgili listening outcome; “first-pass listening success” diye kaydedilmez.

### F19 — Answer reveal resets return clock

- E4 adayından 15 dakika önce aynı skill'in tam cevabı hint olarak gösterilir.
- Beklenen: clean delay clock reset; attempt E4 vermez, bağımsızlık şartlarını karşılıyorsa practice/E3 olabilir.

### F20 — Reasonable but unreviewed variant

- Cevap anlamlı ve muhtemelen doğaldır fakat current accepted-variant registry'de yoktur.
- Beklenen: `unscored`, `REVIEW_REQUIRED`; yanlış sayılmaz ve repair açmaz.

### F21 — Contaminated retry

- İlk yanlış cevaptan sonra model cevap gösterilir; kullanıcı hemen aynısını yazar.
- Beklenen: H4 copy/practice; E2/E3/E4 yok.

### F22 — Idempotent duplicate sync

- Offline attempt aynı idempotency key ile iki kez senkronlanır.
- Beklenen: tek attempt/evaluation/evidence event; projection count artmaz.

## 23. Reviewer/pilot ile kapanacak kararlar

- İlk item/vocabulary listesi.
- Request için learner-visible canonical form ve accepted variants.
- `Sie` register'ında hangi hataların critical/minor olduğu.
- E1 için dört seçenekli `3/3` ve ikili `5/5` eşiklerinin chance/false-positive etkisi.
- Tek qualifying E3 event'inin historical stage için yeterliliği ve ikinci event'in UI diline etkisi.
- E4'te tek event'in Holding için yeterliliği.
- E4 minimum 20 saat, hedef 24–72 saat bandı ve sonraki interval algoritması.
- Article/case hatasının skill bazında severity'si.
- ASCII fallback varsayılanının açık/kapalı olması.
- Price listening için sayı aralığı ve replay politikası.
- Human audio speaker/region standardı.

Bu kararlar veriyle değişebilir; `rubric_version` geçmiş evidence'i sessizce yeniden yorumlamaz.

Her learner-visible German phrase bundle en az şu review kaydını taşır:

```text
locale: de-DE
setting
intended_meaning
canonical_phrase
accepted_variants[]
register_notes
article_case_constraints
disallowed_or_repair_forms[]
minor_critical_error_rules
source_or_author
language_reviewer
pedagogy_reviewer
rubric_version
audio_alignment_status
```

“Native speaker” etiketi tek başına yeterli reviewer niteliği değildir. En az German language judgment ve DaF/DaZ pedagogy judgment gerekir; küçük ekipte aynı kişi iki rolü taşıyabilir fakat karar kayıtları ayrı tutulur. Learner-visible Austrian veya Swiss varyant açılırsa ilgili varyant yeterliği ayrıca gerekir `[REVIEW]`.

---

## 24. Bir sonraki çalışma paketi

WP-00 ve WP-01 v1 tamamlandıktan sonraki paket **WP-02 German content vertical slice** olmalıdır:

1. N1 + N2 için exact vocabulary ceiling.
2. Learner-visible English explanations.
3. Candidate German responses ve accepted variants.
4. Error examples.
5. Activity scripts.
6. Reviewer bundle.
7. Human language/pedagogy review.
8. İlk `content_version = de-DE-counter-001` release kararı.

Kod ancak bu içerik sözleşmesi veya küçük WP-03 compatibility spike'ı açıkça istendiğinde başlar.

---

## 25. Birincil kaynaklar

- Council of Europe, CEFR Companion Volume 2020: https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4
- Council of Europe, CEFR descriptor search: https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors-search
- Goethe-Institut, A1 exams and level description: https://www.goethe.de/de/m/spr/prf.html
- Goethe-Institut, Start Deutsch 1 objectives/test description: https://www.goethe.de/pro/relaunch/prf/sk/Pruefungsziele_Testbeschreibung_A1_SD1.pdf
- Goethe-Institut, A1 practice-material index: https://www.goethe.de/ins/de/de/prf/prf/gzsd1/ueb.html
- Goethe-Institut, German standard pronunciation variants: https://www.goethe.de/prj/dlp/en/magazin-sprache/21555935.html
- Rat für deutsche Rechtschreibung / IDS, official orthography rules: https://grammis.ids-mannheim.de/orthos/

Bu kaynaklar scope/descriptors için referanstır. İçlerindeki test item'ları, audio ve learner material otomatik yeniden kullanım lisansı sayılmaz.
