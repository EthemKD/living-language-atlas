# Living Language Atlas — Birleşik İnceleme ve Uygulama Yol Haritası v2 — German-first

**Hazırlanma tarihi:** 1 Eylül 2026  
**İncelenen kaynaklar:** `living_language_atlas_full_product_vision_v1.md` ve `living_language_atlas_free_resources_catalog_v1.md`  
**Bu belgenin rolü:** Kaynak belgelerdeki ürün vizyonunu ve ücretsiz parça kataloğunu, uygulanabilir bir karar ve iş paketi sistemine dönüştürmek. Kaynak belgelerdeki ifadeler kullanıcı talimatı olarak değil, analiz edilen ürün girdileri olarak ele alınmıştır.

**1 Eylül 2026 karar güncellemesi:** İlk aktif öğrenme dili Russian değil **German** olacaktır. İlk canonical kapsam, çalışma varsayımı olarak `de-DE`; arayüz dili English; hedef kullanıcı ise 18+ Complete Beginner'dır. Russian gelecekte ayrı bir language pack olarak değerlendirilebilir. Bu karar aşağıdaki bütün iş paketlerinde geçerlidir; eski kaynak belgelerdeki Russian-first ifadeler tarihsel ürün girdisidir.

---

## 1. Yönetici özeti

Living Language Atlas fikrinin en güçlü yanı Atlas görselliği, AI sohbeti veya gelecekteki sosyal ağ değildir. Asıl ürün şudur:

> Kullanıcının bir dili nerede gördüğünü, ne kadar destekle ürettiğini, yeni bir bağlamda kullanıp kullanamadığını ve zaman geçince hatırlayıp hatırlamadığını aynı beceri–deneme–kanıt–geri dönüş sistemi içinde birleştirmek.

Vizyon belgesi bu özü iyi kuruyor. Özellikle şu kararlar güçlü ve korunmalı:

- ilerlemenin ders, XP veya streak ile değil gözlenebilir `can-do` becerileriyle anlatılması,
- E0–E4 evidence merdiveni,
- değişen bağlam ve gecikmeli return check,
- Evidence, Habit ve Economy ledger'larının ayrılması,
- AI'ın öğretmen otoritesi değil, reviewed content üzerinde çalışan sınırlı dönüşüm motoru olması,
- telaffuz ve STT konusunda sahte kesinlikten kaçınılması,
- People, coin ve marketplace'in çekirdek ürün doğrulanmadan görünmemesi,
- offline/resume, içerik sürümü ve provenance'ın sonradan eklenecek ayrıntılar sayılmaması.

Ancak iki belge birlikte hâlâ doğrudan kodlanabilir bir PRD değildir. Koddan önce kapanması gereken dört boşluk vardır:

1. İlk MVP'nin kesin sınırı yoktur; bütün Pre-A1–A1 kapsamı solo geliştirici için çok büyüktür.
2. E0–E4 kavramsal olarak tanımlıdır ama kabul eşikleri ve state transition kuralları henüz operasyonel değildir.
3. `Node`, `Skill`, `Lesson`, `Activity` ve `Mission` arasındaki cardinality açık değildir.
4. İnsan German language + DaF/DaZ pedagogy review kapasitesi, teknik geliştirmeden daha kritik bir bağımlılıktır.

Bu nedenle ilk hedef “uygulamanın tamamını kurmak” değil, tek kısa rotada ürünün ana iddiasını kanıtlayan bir **full-stack golden path** olmalıdır.

---

## 2. Dondurulması önerilen ürün çekirdeği

### 2.1 İlk kullanıcı

- English UI kullanabilen,
- Almancaya sıfırdan başlayan veya temeli çok zayıf (`Pre-A1`; UI'da “Complete Beginner”),
- 18+,
- günde yaklaşık 10–30 dakika çalışabilen,
- streak yerine gerçek okuma/üretim becerisi isteyen yetişkin.

### 2.2 İlk değer önerisi

Kullanıcı her açılışta yüzlerce seçenek değil, neden seçildiği açıklanan tek bir güçlü sonraki hareket görür. Çalışma sonunda yalnız “doğru/yanlış” değil, şu ayrım görünür:

- bunu gördün/dinledin,
- bunu tanıdın,
- bunu destekle ürettin,
- bunu değişen bağlamda bağımsız kullandın,
- bunu zaman geçtikten sonra tekrar kullanabildin,
- burada hâlâ belirli bir repair ihtiyacı var.

### 2.3 İlk golden path

Önerilen ilk dikey dilim:

1. Guest onboarding.
2. Tek kısa German route ve tek somut iletişim hedefi.
3. Deterministic mission.
4. Recognition ve supported production.
5. Typed independent production.
6. Yüzey ayrıntısı değişmiş ikinci bağlam.
7. Evidence debrief ve belirli hata/repair sonucu.
8. Uygulama kapanır veya bağlantı kesilir; session güvenle devam eder.
9. Attempt outbox idempotent biçimde sunucuya senkronlanır.
10. Yaklaşık 24 saat sonra farklı prompt ile return check.
11. You ekranında can-do/evidence durumu dürüstçe görünür.

İlk kesitte sesli üretim zorunlu değildir. Dinleme ve record/replay küçük bir takip paketi olabilir; pronunciation scoring olamaz.

### 2.4 İlk görünür ana yüzeyler

- **Atlas:** ilk rota, node açıklaması ve next action.
- **Practice:** due return ve mistake repair.
- **You:** can-do/evidence özeti ve sync durumu.

Studio gerçek, grounded bir operasyon hazır olana kadar görünmez. People ve Library ayrı tab değildir. Boş sekme, sahte AI ve gelecek özelliği teaser'ı yoktur.

### 2.5 İlk sürümün dışında

- bütün Pre-A1–A1 curriculum,
- serbest AI chat,
- AI ile otomatik mastery,
- pronunciation yüzdesi veya “native-like” skoru,
- generative scenario,
- podcast üretimi,
- People, DM, matching veya WebRTC,
- coin, mağaza, marketplace ve tutor commerce,
- Skia, MapLibre, Rive veya büyük animasyon sistemi,
- tam CMS veya kapsamlı admin paneli,
- PostHog session replay.

---

## 3. Domain modelinde yapılması gereken düzeltme

Kaynak belgedeki lineer zincir, uygulamada fazla katı olacaktır. Aşağıdaki beş ayrı model daha temizdir:

### 3.1 Atlas yapısı

`World → District → Route → Node`

Bir `Node`, bir öğrenme konusu değildir; kullanıcıyı bir launchable unit'e götüren harita yüzeyidir. Bu unit bir lesson, mission, story, practice set veya return check olabilir.

### 3.2 Beceri grafiği

`Skill ↔ SkillPrerequisite`

Skill gözlenebilir bir can-do'dur. Lesson ve mission'lardan bağımsız sürümlenebilmelidir.

### 3.3 İçerik/delivery modeli

`LessonVersion veya MissionVersion → ordered Activity references`

- Bir activity birden çok skill'i çalıştırabilir.
- Bir skill birden çok lesson/activity içinde kullanılabilir.
- Her activity'nin hangi evidence türlerini üretebileceği açıkça tanımlanır.

### 3.4 Runtime modeli

`LearningSession → SessionStep → Attempt → AttemptEvaluation`

Attempt yalnız ham kullanıcı davranışını kaydeder. Doğrudan skill state yazmaz.

### 3.5 Kanıt ve review modeli

`AttemptEvaluation → EvidenceEvent → LearnerSkillProjection → ReviewSchedule`

- Evidence event append-only olmalıdır.
- Skill projection evidence olaylarından yeniden hesaplanabilmelidir.
- Local `pending` ile server `accepted/unscored/rejected` ayrılmalıdır.
- Content ve evaluator version değiştiğinde geçmiş sessizce yeniden yazılmamalıdır.

Bu model WP-01 tamamlanmadan veritabanı tablolarına dönüştürülmemelidir.

---

## 4. Evidence sözleşmesinde cevaplanacak sorular

E0–E4 isimleri yeterli değildir. İlk skill seti için aşağıdaki kurallar test fixture'larıyla dondurulmalıdır:

- E1 için kaç doğru tanıma gerekir; şans etkisi nasıl ele alınır?
- E2'de hangi hint türleri hâlâ “supported production” sayılır?
- E3 için “changed context” tam olarak hangi yüzey ayrıntılarının değişmesini gerektirir?
- E3'te typed ve speaking kanıtları ayrı mı tutulur?
- E4'ün minimum gecikmesi ve farklı prompt şartı nedir?
- Bir başarısız return, eski E3'ü siler mi yoksa `Needs repair` olayı mı ekler?
- Birden çok attempt nasıl birleştirilir?
- `acceptable alternative`, spelling tolerance ve register hatası nasıl değerlendirilir?
- Evaluator emin değilse sonuç neden `unscored` olur?
- Client geçici olarak ne gösterebilir; hangi state yalnız server tarafından kabul edilir?
- İçerik/evaluator sürümü değişirse eski evidence nasıl açıklanır?

Bu kararlar pedagog/reviewer ile birlikte verilmeli; AI tarafından tek başına icat edilmemelidir.

---

## 5. Başlangıç teknoloji sepeti kararı

### 5.1 Ana karar tablosu

| Alan | Karar | Koşul / düzeltme |
|---|---|---|
| Expo + React Native + Expo Router | **Koru** | Kod başlarken tek bir desteklenen stable Expo SDK sürümü pinlenecek; minimum iOS/Android hedefi ürün kararı olarak önce dondurulacak. |
| Kendi design system + gluestack parçaları | **Koşullu koru** | Yalnız davranış/erişilebilir primitive alınacak; görsel kimlik ve token source of truth bize ait olacak. `@latest` kullanılmayacak. |
| NativeWind | **Koşullu koru** | NativeWind v5 resmî dokümanda pre-release. İlk aday stable NativeWind v4'tür; Expo/gluestack compatibility spike geçmezse plain RN styles + token helpers fallback olur. İkinci bir styling framework eklenmez. |
| Lucide | **Koru** | ISC notice korunacak; tek ikon ailesi. |
| Noto Sans | **Koru** | Latin Extended ve German karakterleri (`ä ö ü Ä Ö Ü ß ẞ`) doğrulanacak; kullanılan tam dosyanın OFL kaydı tutulacak. Kiril paketi ancak Russian track açılırsa eklenebilir. |
| unDraw | **Sınırla** | Yalnız onboarding/empty state desteği. Atlas'ın ana kimliği kendi SVG sistemimizden gelir. |
| React Native SVG | **Koru** | İlk Atlas, route ve evidence çizimleri. Gerekirse Reanimated ile ölçülü hareket. |
| React Native Skia | **Ertele** | SVG ile ölçülmüş performans veya görsel ifade problemi çıkarsa ekle. |
| Fastify + Zod + Drizzle | **Koru** | Modüler monolith için iyi denge; OpenAPI/contract ve migration testleri şart. |
| Neon Free | **Koru** | İlişkisel veri için. Audio/blob yok; retention ve quota alarmı gerekir. |
| Better Auth | **Spike sonrası koru** | Güncel Expo entegrasyonu var; anonymous/guest, SecureStore session, restart, deep link ve account-linking uçtan uca kanıtlanmalı. Yamalı sürüm pinlenmeli ve security advisory takibi kurulmalı. |
| Cloudflare R2 | **Koru** | Canonical media ile private user attempts ayrı prefix/bucket ve retention politikası kullanmalı; mümkünse presigned direct upload. `r2.dev` production delivery omurgası yapılmamalı. |
| Koyeb Free | **Yalnız dev/teknik alpha** | Resmî olarak production için önerilmiyor, idle iken scale-to-zero ve free worker yok. Kapalı beta öncesi ücretli hosting bütçe kapısı veya farklı runtime gerekir. |
| Groq | **Koru, adapter arkasında** | Model/rate limit sabit varsayılmaz; backend-only key, quota guard ve deterministic fallback zorunlu. |
| Expo Speech | **Koru, destek amaçlı** | Accessibility/draft/fallback. Canonical German pronunciation kaynağı değildir. |
| Expo SQLite + FileSystem + SecureStore | **Koru** | SQLite session/outbox; FileSystem media; SecureStore yalnız küçük auth secrets. |
| Maestro + Playwright | **Koru ama tamamla** | Maestro mobile golden path; Playwright yalnız web/admin. Bunlara Vitest ve React Native Testing Library eklenmeli. |
| Sentry | **Beta öncesi ekle** | Answer text, audio URL, token ve PII redaction test edilmeden açma. |
| PostHog | **Daha sonra** | Consent, event dictionary ve redaction kurulduğunda. Learning evidence üçüncü taraf product analytics'e gönderilmez. |
| Tatoeba | **Candidate corpus** | Sentence/translation author ve exact license kaydı; insan reviewer şart. Audio lisansı ayrı. |
| Common Voice | **Yalnız evaluation/research** | Canonical learner pronunciation kütüphanesi değildir. Dataset sürümü/datasheet ve güncel Data Consumer License kaydı tutulur; açık izin olmadan klipler R2'ye aynalanıp uygulamada dağıtılmaz. |
| Wikimedia Commons | **Asset bazında** | Her dosya için creator, source page, license, attribution ve derivative/share-alike kontrolü. |

### 5.2 Güncel doğrulamada çıkan önemli ayrıntılar

- 1 Eylül 2026 itibarıyla güncel stable Expo SDK 57, React Native 0.86 ve Node 22.13.x tabanındadır; Android 7+ ve iOS 16.4+ ister. Eski iPhone kapsamı önemliyse SDK hedefi koddan önce ürün kararı olmalıdır. SDK 55+ New Architecture zorunludur; native dependency matrisi `expo-doctor` ile doğrulanmalıdır.
- gluestack'in güncel v5 hattı alpha; NativeWind v5 dokümanı üretim için uygun olmadığını açıkça söylüyor. gluestack CLI ayrıca Windows için manual installation öneriyor. Bu nedenle bağımlılık seçimi tek ekranlık compatibility spike ve pinlenmiş sürümle yapılmalı.
- Better Auth'ın resmî Expo entegrasyonu `@better-auth/expo`, `expo-secure-store`, app scheme/trusted origins ve native cookie akışını belgeliyor; seçim makul ama entegrasyon testi yine gereklidir. 2026'da yayımlanan bir advisory, `deviceAuthorization` kullanan 1.6.0–1.6.10 sürümlerini etkiledi ve 1.6.11'de düzeltildi; bu projede kullanılmasa bile auth bağımlılığı güncel yamalı sürüme pinlenmeli.
- Koyeb Free web instance 512 MB RAM/0.1 vCPU'dur, bir saat trafiksizlikte sıfıra iner, 1–5 saniyelik cold start yaşayabilir, worker service olarak kullanılamaz ve resmî belgede hobby/testing içindir. Neon da beş dakika boşlukta uyuyabildiği için ilk istekte birleşik gecikme test edilmelidir.
- Neon Free'ın mevcut per-project sınırları 100 CU-hour, 0.5 GB storage ve 5 GB network transfer düzeyindedir; transfer sınırı aşılırsa compute ay sonuna kadar askıya alınabilir.
- Cloudflare R2 Standard için 10 GB-month, 1M Class A ve 10M Class B ücretsiz aylık kullanım ve internet egress olmaması doğrulanmıştır. Private user media kısa ömürlü presigned URL ile taşınmalı; public canonical audio için production custom domain/CDN davranışı tasarlanmalıdır.
- Groq limitleri model ve organization düzeyinde değişir; `429`, rate-limit header ve retry/fallback davranışı adapter sözleşmesinin parçası olmalıdır.
- Expo EAS Free halen düşük öncelikli 15 Android + 15 iOS build ve 1K MAU update sınırı sunuyor.
- Common Voice kayıtlarının dataset lisansı CC0 görünse de Mayıs 2026 Mozilla Data Collective şartları, off-platform hosting/mirroring/redistribution hakkını ilgili Data Consumer License'a bağlar. Bu nedenle Common Voice eval kaynağıdır; yazılı ve dataset-özel açık izin olmadan learner-facing klip deposu değildir.

### 5.3 “Daha iyi alternatif” sonucu

Çekirdek açık kaynak seçimlerinde değişiklik aramak şu anda düşük getirili: Fastify, Zod, Drizzle, Lucide, Noto ve SVG doğru adaylar.

Gerçek araştırma getirisi dört alandadır:

1. stable Expo–gluestack–NativeWind sürüm matrisi,
2. Better Auth guest/account-linking mobil güvenilirliği,
3. ücretsiz Node hosting'in production sınırı ve ilk ücretli eşik,
4. German STT/TTS kalitesi, DACH varyant kapsamı ve canonical audio provenance.

Supabase ancak öncelik “Node backend'i gerçekten öğrenmek”ten “en hızlı entegre prototip”e dönerse B planıdır. Neon/Fastify ve Supabase backend aynı anda kurulmaz.

---

## 6. Ayrıntılı iş kırılımı

Her `WP` bağımsız bir planlama veya external-worker handoff birimidir. Kodlama turlarında varsayılan sınır bir WP'nin tek alt kartıdır.

### WP-00 — MVP karar dondurma — kod yok

**Durum:** Tamamlandı — German-first kapsam, `living_language_atlas_german_mvp_scope_and_evidence_spec_v1.md` içinde donduruldu.

Alt kartlar:

- WP-00.1 İlk kullanıcı ve tek JTBD.
- WP-00.2 İlk route'un iletişim hedefi ve sınırı.
- WP-00.3 Görünen tab'ler ve no-go listesi.
- WP-00.4 Alpha başarı ölçüleri.
- WP-00.5 Guest, privacy, raw voice ve retention ilkeleri.
- WP-00.6 Free-tier exhaustion/fallback ilkesi.

Çıktılar:

- `MVP-SCOPE.md`
- `NON-GOALS.md`
- `SUCCESS-METRICS.md`

Çıkış kapısı: Yeni bir özellik önerisinin MVP içinde mi dışında mı olduğu tartışmasız cevaplanabiliyor.

### WP-01 — Domain ve evidence sözleşmesi — kod yok

**Durum:** v1 tamamlandı; `living_language_atlas_wp01_normative_errata_v1_1.md` ile düzeltilen alanlarda v1.1 hükümleri geçerlidir. Operasyonel eşikler reviewer/pilot etiketleriyle aynı German-first sözleşmede tanımlandı.

Alt kartlar:

- WP-01.1 Atlas/curriculum/runtime/evidence aggregate ilişkileri.
- WP-01.2 Skill schema ve prerequisite graph.
- WP-01.3 Activity evidence capability matrisi.
- WP-01.4 E0–E4 state transition kuralları.
- WP-01.5 Error taxonomy ve accepted variants.
- WP-01.6 Evaluator confidence ve `unscored` politikası.
- WP-01.7 Return scheduler kuralı.
- WP-01.8 En az 10 normal/edge-case test fixture.

Çıktılar:

- `DOMAIN-MODEL.md`
- `EVIDENCE-POLICY.md`
- `EVIDENCE-FIXTURES.json`

Çıkış kapısı: Aynı fixture iki farklı geliştirici/evaluator tarafından aynı beklenen state'e götürüyor.

### WP-02 — İlk German content vertical slice

**Durum:** İlk Gemini v1 adayı reddedildi. WP-02R v2 adayı önemli ilerleme sağladı; ancak bağımsız denetimde artifact parity, schema gücü, self-initiated N2 evidence, fixture yürütmesi, reviewer coverage ve provenance kapılarını geçemedi. Durumu `CORRECTION_INCOMPLETE` olarak kaydedildi. Dar kapsamlı WP-02R2 / v2.1 integrity-repair turu aktiftir. Transport recovery ile gelen Artifact 1 eksiksiz parse edildi; ancak bağımsız preflight sekiz canonical kusur buldu. Sonraki Gemini yanıtı bu kusurları yerinde düzeltmek yerine SSOT'yi yeniden tasarlayarak 110 canonical ID'nin 71'ini kaldırdı ve `REJECTED_NON_REGRESSION_FAILURE` olarak kaydedildi. Kullanıcı Gemini worker akışını sonlandırdı. WP-02R2 artık Claude/GPT arasında değiştirilebilen Notion worker tarafından, `notion_worker_handoff_wp02r2_takeover_v1.md` ve exact sağlam Artifact 1 tabanı üzerinden yürütülür. Artifact 2'ye veya WP-03'e geçiş hâlâ bağımsız doğrulamaya bağlıdır.

Alt kartlar:

- WP-02.1 Üç ila beş küçük can-do skill seçimi.
- WP-02.2 Prerequisite, vocabulary ceiling ve register sınırı.
- WP-02.3 İngilizce anlam/açıklama ve German learner content taslağı.
- WP-02.4 `de-DE` canonical scope; DACH regional metadata; accepted variants ve error patterns.
- WP-02.5 Recognition, supported production, changed-context ve return aktiviteleri.
- WP-02.6 Audio script; ilk yazılım slice'ında gerçek audio zorunlu değil.
- WP-02.7 Source/asset registry.
- WP-02.8 German language + DaF/DaZ pedagogy reviewer bundle.
- WP-02.9 Revision, approval ve release kaydı.

Çıkış kapısı: İlk content package insan reviewer tarafından sürüm bazında onaylanmış veya learner-visible kullanım için açıkça bloke edilmiştir.

### WP-03 — Beş küçük teknik spike

#### WP-03A — UI uyumluluğu

- stable Expo SDK,
- pinlenmiş gluestack + NativeWind adayı,
- Noto Latin Extended; `ä ö ü ß ẞ`, German quotes ve uzun compound wrapping,
- Unicode NFC, noun capitalization ve explicit ASCII keyboard fallback smoke,
- Button, Input, Dialog/Sheet,
- dynamic type, screen reader, reduced motion,
- Android/iOS ve gerekiyorsa web smoke.

Başarısızlık fallback'i: plain React Native styles + custom semantic tokens.

#### WP-03B — Auth

- anonymous guest,
- app restart sonrası session,
- SecureStore,
- email account oluşturma,
- guest data linking,
- logout/revoke,
- production deep-link scheme.

#### WP-03C — API/database

- Fastify route,
- Zod request/response contract,
- Drizzle migration,
- Neon pooled connection,
- idempotency key,
- integration/migration test.

#### WP-03D — Offline sync

- SQLite active session,
- attempt outbox,
- ağ kesme/geri açma,
- duplicate send,
- server acceptance,
- pending/accepted UI durumu.

#### WP-03E — Hosting

- Koyeb deploy,
- cold start,
- memory/latency,
- health check,
- scale-to-zero davranışı,
- worker gerektiren işlerin açıkça bloke edilmesi.

Çıkış kapısı: Her teknoloji kararı bir ADR ve ölçülmüş spike sonucu taşır; “popüler olduğu için” bağımlılık eklenmez.

### WP-04 — Repository ve kalite temeli

Önerilen başlangıç sınırları:

```text
apps/
  mobile/
  api/
packages/
  contracts/
  domain/
  content-schema/
  design-tokens/
  evaluation/
  config/
docs/
  decisions/
  sourcing/
  product/
```

Admin app gerçek reviewer UI ihtiyacı oluşana kadar yaratılmayabilir.

Alt kartlar:

- package manager/workspace kararı,
- TypeScript, lint, format, unit test,
- environment/secret validation,
- contract generation/OpenAPI,
- CI kapıları,
- license notices ve provider quota kayıtları.

### WP-05 — Backend golden-path modülleri

Uygulama sırası:

1. Curriculum/content release read model.
2. Content package manifest/download.
3. Guest identity ve learner preferences.
4. Bootstrap/Atlas next action.
5. Learning session start/resume/finish.
6. Idempotent attempt recording.
7. Deterministic evaluation.
8. Evidence event ve skill projection.
9. Review scheduling ve `/practice/due`.
10. Export/delete temel veri hakkı.

Her alt kart için unit + contract + database integration testi gerekir.

### WP-06 — Mobile platform temeli

Alt kartlar:

- app shell, navigation ve deep links,
- English localization yapısı,
- design tokens ve Noto typography,
- accessibility primitives,
- generated/typed API client,
- auth/session adapter,
- SQLite repository ve migrations,
- sync outbox/cursor,
- FileSystem media lifecycle,
- safe resume/error boundary,
- offline/stale/pending durum bileşenleri.

### WP-07 — Learner golden path UI

Alt kartlar:

1. Onboarding ve guest start.
2. Atlas first route.
3. Node detail ve “why now”.
4. Lesson/Mission player shell.
5. `meaning_match` renderer.
6. `sentence_builder` renderer.
7. `typed_response` renderer.
8. `changed_context_turn` renderer.
9. Hint/fallback ve interruption/resume.
10. Evidence debrief.
11. Practice due/return.
12. You can-do/evidence timeline.

Çıkış kapısı: Bir kullanıcı bağlantı kesilmesi ve uygulama kapanması dahil bütün ilk loop'u veri kaybetmeden tamamlayabiliyor.

### WP-08 — Minimum content operations

Tam CMS yerine önce:

- content schema validator,
- source/asset register,
- reviewer decision kaydı,
- publication release,
- withdrawal,
- version diff,
- reviewer bundle export,
- content/audio alignment check.

İkinci reviewer veya düzenli içerik hacmi oluştuğunda dar admin UI; daha sonra gerekirse Payload/Strapi değerlendirilir.

### WP-09 — Alpha kalite ve release kapısı

- domain/evidence unit tests,
- API contract ve migration tests,
- React Native Testing Library interaction/accessibility tests,
- Maestro onboarding → return golden path,
- offline/sync chaos cases,
- accepted-variant/content regression,
- Sentry redaction,
- structured logs ve trace ID,
- backup + gerçek restore provası,
- feature flags ve provider kill switch,
- quota exhaustion/fallback testi.

Bu paket kapanmadan “kapalı alpha hazır” denmez.

### WP-10 — Grounded Studio

İlk ve tek operasyon:

`Explain from current lesson → structured validation → provenance → Save to Practice`

Alt kartlar:

- `ModelProvider` adapter,
- allowed source/skill scope,
- prompt/output schema,
- content boundary ve safety,
- token/time/cost ledger,
- deterministic fallback,
- golden eval corpus,
- report/appeal,
- Save to Practice ve ertesi gün non-AI return.

Quiz ve bounded roleplay ancak ilk operasyon ölçülebilir biçimde güvenilir olduktan sonra eklenir.

### WP-11 — Voice ve Scenario

Sıra:

1. Reviewed canonical audio playback.
2. Local record/replay ve shadowing.
3. Typed fallback; aynı evidence türünü vermediği açıkça gösterilir.
4. STT provider benchmark harness.
5. Transcript confidence ve user correction.
6. Task-success evaluation; pronunciation skoru yok.
7. Authored deterministic scenario.
8. Constrained surface variation.
9. Pronunciation/phoneme araştırması ayrı validation projesi.

### WP-12 — People — ayrı ürün kapısı

Önce politika ve operasyon:

- 18+ age policy,
- identity/risk signals,
- block/mute/leave/report,
- moderation queue ve appeal,
- PII/scam/dating/harassment politikası,
- evidence retention/minimization,
- no-show ve teknik arıza telafisi,
- gerekli dil çifti likiditesi.

Sonra invite-only structured text/voice session. Video daha sonra.

### WP-13 — Economy ve commerce

Sıra:

1. Premium entitlement ve açık kota davranışı.
2. Free katmanın gerçek learning loop'u koruduğunun testi.
3. Coin değer hipotezi.
4. Kapalı economy pilotu ve anti-fraud.
5. Tutor/media marketplace yalnız gerçek talep varsa.

Evidence hiçbir ödeme veya coin olayıyla güncellenmez.

---

## 7. Bağımlılık sırası

```text
WP-00
  ↓
WP-01 + WP-02
  ↓
WP-03A–E
  ↓
WP-04
  ↓
WP-05 + WP-06 + WP-08
  ↓
WP-07
  ↓
WP-09
  ↓
Closed alpha
  ↓
WP-10
  ↓
WP-11
  ↓
WP-12
  ↓
WP-13
```

WP-05 ve WP-06 paralel ilerleyebilir; contracts ve evidence policy önceden dondurulmuş olmalıdır. WP-02 bitmeden learner-visible German content “tamamlandı” sayılamaz.

---

## 8. Küçük çalışma paketi protokolü

Token ve limit tasarrufu için varsayılan çalışma davranışı:

1. Kullanıcı açıkça kod istemeden kod yazılmaz.
2. Kod istendiğinde önce yalnız seçilen WP alt kartının objective, inputs, files, acceptance ve validation sınırı yazılır.
3. Bir turda varsayılan olarak tek alt kart uygulanır.
4. Alt kart test edilir ve kısa durum özetiyle durulur.
5. Bir sonraki kart önerilir ama kullanıcı `devam` demeden başlanmaz.
6. Büyük refactor, yeni dependency veya mimari değişiklik ayrı karar kartıdır.
7. Küçük güncel bilgi doğrulamaları birincil/resmî kaynaklarla yapılır.
8. Büyük araştırmalar ayrı Notion worker handoff paketi olur.

Her alt kart şu kapanış kaydını üretir:

```text
COMPLETED:
FILES:
VALIDATION:
DECISIONS:
UNRESOLVED:
NEXT CARD:
```

---

## 9. Notion worker handoff çalışma kuralı

Kullanıcı `handoff` dediğinde veya Notion worker'a iş aktarılacağında:

1. Mevcut iş tek bir doğrulanabilir worker paketine küçültülür.
2. Kullanıcının verdiği 14 bölümlü worker-brief yapısı korunur; worker Claude veya GPT olabilir.
3. Köşeli parantezli alanlar gerçek objective, state, input path, görev, constraint ve validation ile doldurulur.
4. Worker'a tamamlanmış işler tekrar yaptırılmaz; model değişse bile Notion'daki durable dosya/page state esas alınır.
5. Handoff araştırma ise resmî/primary source, tarih ve çelişki incelemesi açıkça yazılır.
6. Handoff kodlama ise gerçek dosya yolları, test komutları, no-go alanları ve kullanıcı öğrenme sınırı yazılır.
7. Sonuçta yalnız tavsiye değil, kullanılabilir ve doğrulanmış artifact istenir.

Notion worker'a devretmeye uygun büyük işler:

- stable Expo/gluestack/NativeWind compatibility matrix ve proof-of-concept,
- Better Auth Expo guest/account-linking spike,
- German STT/TTS çoklu cihaz, learner accent ve `de-DE/de-AT/de-CH` benchmark'ı,
- açık German corpus/audio lisans ve provenance envanteri,
- hosting latency/cost/failure matrix,
- sosyal safety/legal ön araştırması,
- geniş test fixture veya içerik veri dönüşümü.

Kurucunun doğrudan anlaması gereken, tamamen devredilmemesi önerilen işler:

- skill/can-do tanımı,
- E0–E4 evidence policy,
- privacy/retention kararları,
- MVP/non-goals,
- gerçek reviewer onayı,
- ürün metriği ve kullanıcıya verilen yeterlilik iddiası.

---

## 10. Araştırma kuyruğu

### Koddan önce gerekli küçük doğrulamalar

- seçilecek stable Expo SDK ve New Architecture gereksinimi,
- gluestack stable sürümü + NativeWind v4 kombinasyonu,
- Windows manual install adımları,
- Better Auth anonymous/account linking şeması,
- Drizzle Neon driver/pooling kararı,
- Koyeb health/cold-start/deploy sınırları.

### Golden path sonrası büyük araştırmalar

- German human-reviewed Pre-A1 içerik ve German + DaF/DaZ reviewer operasyonu,
- canonical German audio üretim/izin ve DACH varyant modeli,
- Groq/Azure/diğer STT üzerinde gerçek sample benchmark,
- pronunciation için forced-alignment/phoneme yaklaşımı,
- R2 direct upload, lifecycle ve raw-voice deletion doğrulaması,
- People açılmadan safety/legal/liquidity çalışması.

---

## 11. Resmî kaynak notları

- gluestack install/CLI: https://gluestack.io/ui/docs/home/getting-started/installation ve https://gluestack.io/ui/docs/home/getting-started/cli
- NativeWind v4/v5: https://www.nativewind.dev/docs/getting-started/installation ve https://www.nativewind.dev/v5/getting-started/installation
- Better Auth Expo: https://better-auth.com/docs/integrations/expo
- Better Auth security advisory: https://github.com/better-auth/better-auth/security/advisories/GHSA-cq3f-vc6p-68fh
- Expo latest SDK matrix: https://docs.expo.dev/versions/latest/
- Neon pricing/network transfer: https://neon.com/pricing ve https://neon.com/docs/introduction/network-transfer
- Cloudflare R2: https://developers.cloudflare.com/r2/pricing/
- Koyeb pricing/instances: https://www.koyeb.com/docs/faqs/pricing ve https://www.koyeb.com/docs/reference/instances
- Groq rate limits: https://console.groq.com/docs/rate-limits
- Expo pricing: https://expo.dev/pricing
- Tatoeba: https://tatoeba.org/en/terms_of_use ve https://tatoeba.org/en/downloads
- Common Voice/MDC: https://commonvoice.mozilla.org/terms, https://commonvoice.mozilla.org/data ve https://mozilladatacollective.com/terms/consumers
- Wikimedia reuse: https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/en
- unDraw license: https://undraw.co/license

Fiyat, kota, sürüm ve plan bilgileri implementasyon öncesi yeniden tarih damgasıyla doğrulanmalıdır.

---

## 12. Önerilen tek sonraki hareket

WP-00 ve WP-01 German-first olarak tamamlandı; düzeltilen alanlarda `living_language_atlas_wp01_normative_errata_v1_1.md` bağlayıcıdır. WP-02R v2 adayı `living_language_atlas_wp02r_independent_audit_v1.md` denetiminde `CORRECTION_INCOMPLETE` sonucu aldı. Henüz repo iskeleti veya UI kodu yazmamak. Bir sonraki çalışma paketi:

> **WP-02R2 / v2.1 integrity repair:** Claude/GPT arasında değiştirilebilen Notion worker'a `notion_worker_handoff_wp02r2_takeover_v1.md`, hash'i doğrulanmış preserved base ve otorite sırasındaki audit/spec dosyalarını vererek mevcut yararlı German çekirdeğini korumak; support/evidence semantics, schema, fixture expected-vs-actual yapısı, tam artifact parity, reviewer coverage, provenance ve not-recorded-audio durumlarını düzeltmek. Çıktı geri geldiğinde yerel JSON/schema negatif testleri, ID/referans/semantic diff ve WP-01 fixture denetimi yeniden çalıştırılacaktır.

WP-02R2 bağımsız mekanik/doğrulama kapısını ve ardından insan reviewer kapısını geçmeden learner-visible German content veya canonical audio “tamamlandı” sayılamaz. WP-03'e geçiş kararı bu iki kapıdan sonra verilecektir. İlk kod işi ancak kullanıcı açıkça istediğinde WP-03'teki küçük ve geri alınabilir compatibility spike'larından biri olmalıdır.
