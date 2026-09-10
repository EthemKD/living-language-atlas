# Living Language Atlas — Atomic Master Roadmap v1

**Tarih:** 2026-09-06  
**Kapsam:** German-first (`de-DE`) üründen kapalı alphaya, Studio/voice/People/economy ve çok-dilli ölçeğe kadar bütün ürün yolu  
**Atom sayısı:** **270**  
**Aktif ilerleme cephesi:** **LLA-A055 — Notion atom tracker'ını roadmap/commit linkleriyle kur**  
**Bu dosyanın atomu:** **LLA-A011 — ACCEPTED, Q96/100**

Makinece okunabilir anlık işaretçi: `outputs/living_language_atlas_atomic_status_v1.json`.

Bu roadmap bir tahmin takvimi değil, bağımlılık ve kabul sicilidir. Bir atom tamamlanmadan, ona bağımlı atom “başlamış” sayılmaz. Eski `WP-*` adları tarihsel belgelerde korunur; bundan sonra günlük koordinasyonda çakışmasız `LLA-Axxx` kimlikleri kullanılır.

## 1. Değişmeyen ürün yönü

- İlk öğrenme dili German, ilk varyant `de-DE`; uygulama arayüzü başlangıçta English.
- İlk kullanıcı 18+ tam başlangıç seviyesindeki yetişkindir.
- İlk rota hizmet tezgâhı etkileşimidir: bir şey isteme, anlamadığında onarma, küçük seçim, fiyat/ödeme, birleşik görev ve gecikmeli dönüş.
- Ürün “ders bitirdin” değil, güvenilir kanıtla “bunu yapabiliyorsun” iddiasında bulunur.
- E0–E4 kanıt basamakları, modalite ayrımı, answer-reveal contamination, changed-context ve delayed-return kuralları bağlayıcıdır.
- Öğrenme kanıtı, alışkanlık ve ekonomi ayrı defterlerdir. İnsan/AI geri bildirimi tek başına mastery değildir.
- İçerik `PROPRIETARY_ALL_RIGHTS_RESERVED` olur. Dış kaynaklar yalnız doğrulanmış lisans/provenance ile asset olabilir; aksi halde referans olarak kalır.
- N1/N2 aday paketinin mekanik çekirdeği vardır; learner-visible yayın German language + DaF/DaZ pedagogy insan incelemesine bağlıdır.
- Mobil/offline-first, modüler monolith, PostgreSQL sunucu gerçeği ve SQLite cihaz çalışma gerçeği korunur.
- İlk sepet adaydır: Expo/React Native, kendi tasarım sistemi + seçilmiş gluestack parçaları, NativeWind koşullu, Lucide, Noto Sans, SVG-first, Fastify/Zod/Drizzle, Neon, Better Auth, R2, Koyeb, provider-adapter arkasında Groq, Expo Speech/Audio, SQLite/FileSystem/SecureStore, Sentry, Maestro/Playwright. Sürüm/kota/lisans iddiaları benimsenmeden önce ilgili araştırma atomunda yeniden doğrulanır.

## 2. Rol ve yetki sözlüğü

| Kod | Rol | Yetki sınırı |
|---|---|---|
| `BRAIN` | Primary ChatGPT | Ürün aklı, atom kapsamı, mimari karar, worker brief, bağımsız kabul, roadmap/current-state güncellemesi |
| `NOTION` | Tarihsel/opsiyonel dış araştırma yüzeyi | Aktif yürütme zincirinde yer almaz. v3 plan resetinden sonra ancak OWNER + BRAIN açıkça çağırırsa, karar yetkisi olmadan dar araştırma yapabilir. |
| `SPARK` | Gemini Spark scout | Mekanik envanter, checklist, log/ID/hash normalizasyonu ve küçük karşılaştırma; karar, kod yazımı veya kabul yetkisi yok |
| `WORKER` | Antigravity worker sohbeti | Yalnız açıkça verilen tek atomu uygular, test eder, raporlar; kendi işini kabul etmez ve sonraki atoma geçmez |
| `SECOND-BRAIN` | Ayrı Antigravity strateji sohbeti | Normalde standby. `komple handoff` ile geçici BRAIN yetkisi alır; worker sohbetinden kesin olarak ayrıdır |
| `OWNER` | Proje sahibi | Nihai yetki; hesaplar, hukuki tercih, fiziksel cihaz, insan reviewer/seslendirmen, merge/publish gibi dış eylemler |

Bir hücrede `X → Y` araştırma/uygulamayı X'in, kabulü Y'nin yapacağını gösterir. `SECOND-BRAIN`, komple handoff sırasında tüm `BRAIN` görevlerini geçici olarak üstlenir; `WORKER` görevlerini üstlenmez.

## 3. Atom standardı

Bir atom:

- tek bir karar, artifact veya test edilebilir davranış üretir;
- normalde tek worker turunda kapanabilecek kadar küçüktür;
- girdileri, izin verilen dosyaları, yapılmayacakları, testleri ve durma koşulunu taşır;
- implementation ise test/kanıt olmadan; research ise birincil kaynak/tarih/çelişki incelemesi olmadan tamamlanmış sayılmaz;
- yeni dependency, mimari yön veya kapsam genişlemesi içeriyorsa ayrı karar atomuna ayrılır.

Durumlar: `ACCEPTED`, `ACCEPTED_CANDIDATE`, `PLANNED`, `ACTIVE`, `WORKER_RETURNED`, `IN_REVIEW`, `CHANGES_REQUIRED`, `BLOCKED_OWNER`, `DEFERRED`, `CANCELLED`.

Kalite puanı (`Q/100`): gereksinim uyumu 25, doğruluk/güvenlik 25, doğrulama kanıtı 25, kapsam disiplini 15, dayanıklı dokümantasyon/handoff 10. İnsan kapısı gereken bir learner-visible artifact insan onayı olmadan 80'i aşamaz. `Q—` henüz ölçülmedi demektir.

Her proje mesajı şu kısa başlıkla başlamalı veya bitmelidir:

```text
[LLA-A050/270 | Phase 03 | STATUS | Qxx/100 | OWNER]
Outcome: Bu mesajda değişen gerçek.
Gate: Atomun kapanması için kalan tek somut şart.
```

## 4. Atomik roadmap

### Phase 00 — Yönetim, AI rolleri ve devamlılık

| Atom | İş | Sahip | Durum | Q |
|---|---|---|---|---:|
| LLA-A001 | Owner, BRAIN, NOTION, WORKER ve SECOND-BRAIN yetkilerini dondur | BRAIN | ACCEPTED | 96 |
| LLA-A002 | Ekli belge/raporların talimat değil kanıt olduğu hiyerarşiyi dondur | BRAIN | ACCEPTED | 96 |
| LLA-A003 | Kod, karar, durum ve secret source-of-truth kurallarını tanımla | BRAIN | ACCEPTED | 94 |
| LLA-A004 | Atom durum makinesini tanımla | BRAIN | ACCEPTED | 96 |
| LLA-A005 | Q/100 kalite rubriğini tanımla | BRAIN | ACCEPTED | 95 |
| LLA-A006 | Her mesaj için atom ilerleme başlığını dondur | BRAIN | ACCEPTED | 98 |
| LLA-A007 | Notion read-only research/review çalışma modunu dondur | BRAIN | ACCEPTED | 94 |
| LLA-A008 | Antigravity tek-atom brief/return/stop sözleşmesini dondur | BRAIN | ACCEPTED | 96 |
| LLA-A009 | SECOND-BRAIN standby, activation ve görev ayrımını dondur | BRAIN | ACCEPTED | 96 |
| LLA-A010 | Acil sync, komple handoff ve geri handoff protokolünü dondur | BRAIN | ACCEPTED | 96 |
| LLA-A011 | Bütün ürün için atomik master roadmap ve sahiplik kaydı oluştur | BRAIN | ACCEPTED | 96 |

### Phase 01 — Dondurulmuş ürün yönü

| Atom | İş | Sahip | Durum | Q |
|---|---|---|---|---:|
| LLA-A012 | German-first ve `de-DE` ilk varyant kararını dondur | BRAIN + OWNER | ACCEPTED | 98 |
| LLA-A013 | 18+ complete-beginner persona ve tek JTBD'yi dondur | BRAIN | ACCEPTED | 94 |
| LLA-A014 | Atlas, Practice, Studio, You ve sonra People yüzey sınırlarını dondur | BRAIN | ACCEPTED | 92 |
| LLA-A015 | MVP-0 software slice ile MVP-1 learning alpha ayrımını dondur | BRAIN | ACCEPTED | 94 |
| LLA-A016 | MVP dışı özellik/no-empty-tab listesini dondur | BRAIN | ACCEPTED | 94 |
| LLA-A017 | North-star ve ilk funnel/learning metric sözlüğünü dondur | BRAIN | ACCEPTED | 90 |
| LLA-A018 | Guest, privacy, raw voice ve retention ilkelerini dondur | BRAIN + OWNER | ACCEPTED | 90 |
| LLA-A019 | Free-tier tükenme ve deterministic fallback ilkesini dondur | BRAIN | ACCEPTED | 94 |
| LLA-A020 | Calm-adult/editorial Living Atlas tasarım yönünü dondur | BRAIN | ACCEPTED | 89 |
| LLA-A021 | Proprietary content ve dış asset provenance politikasını dondur | BRAIN + OWNER | ACCEPTED | 98 |
| LLA-A022 | Evidence, habit ve economy ledger ayrımını dondur | BRAIN | ACCEPTED | 96 |
| LLA-A023 | Core learning'i paywall/coin'den koruyan monetization ilkesini dondur | BRAIN + OWNER | ACCEPTED | 92 |
| LLA-A024 | DRAFT→review→APPROVED→PUBLISHED yaşam döngüsünü dondur | BRAIN | ACCEPTED | 92 |
| LLA-A025 | Ürün kapsamı ve non-goal kabul kaydını kapat | BRAIN | ACCEPTED | 94 |

### Phase 02 — Öğrenme sözleşmesi ve German N1/N2 aday içeriği

| Atom | İş | Sahip | Durum | Q |
|---|---|---|---|---:|
| LLA-A026 | Atlas/curriculum/runtime/evidence aggregate sınırlarını dondur | BRAIN | ACCEPTED | 95 |
| LLA-A027 | Stable skill ID ve prerequisite graph sözleşmesini dondur | BRAIN | ACCEPTED | 95 |
| LLA-A028 | H0–H4 support/scaffold profilini dondur | BRAIN | ACCEPTED | 96 |
| LLA-A029 | AttemptEvaluation ile EvidenceDecision/Event ayrımını dondur | BRAIN | ACCEPTED | 98 |
| LLA-A030 | E0–E2 exposure/recognition/supported kurallarını dondur | BRAIN | ACCEPTED | 95 |
| LLA-A031 | E3 bağımsız changed-context üretim kuralını dondur | BRAIN | ACCEPTED | 97 |
| LLA-A032 | E4 72.000s minimum ve authoritative anchor kuralını dondur | BRAIN | ACCEPTED | 98 |
| LLA-A033 | Changed-context vektörü ve semantic-dimension şartını dondur | BRAIN | ACCEPTED | 97 |
| LLA-A034 | Listening/speaking/typing evidence modalite ayrımını dondur | BRAIN | ACCEPTED | 98 |
| LLA-A035 | German error taxonomy ve severity modelini dondur | BRAIN | ACCEPTED | 94 |
| LLA-A036 | Accepted variant, confidence ve unscored politikasını dondur | BRAIN | ACCEPTED | 94 |
| LLA-A037 | Target-specific NFC/ASCII umlaut normalizasyonunu dondur | BRAIN | ACCEPTED | 95 |
| LLA-A038 | N1 request-one skill/vocabulary/register scope'unu üret | BRAIN + NOTION | ACCEPTED_CANDIDATE | 80 |
| LLA-A039 | N2 communication-repair skill/vocabulary/register scope'unu üret | BRAIN + NOTION | ACCEPTED_CANDIDATE | 80 |
| LLA-A040 | N1/N2 canonical content pack ve güçlü schema adayını üret | WORKER → BRAIN | ACCEPTED_CANDIDATE | 80 |
| LLA-A041 | N1/N2 fixture, source ve provenance bütünlüğünü mekanik doğrula | WORKER → BRAIN | ACCEPTED_CANDIDATE | 80 |
| LLA-A042 | German language + DaF/DaZ reviewer bundle'ını hazırla | WORKER → BRAIN | ACCEPTED_CANDIDATE | 79 |
| LLA-A043 | N1/N2 qualified German language review'ı kaydet | OWNER | BLOCKED_OWNER | — |
| LLA-A044 | N1/N2 DaF/DaZ pedagogy review'ı kaydet | OWNER | BLOCKED_OWNER | — |
| LLA-A045 | N1/N2 gerçek audio, alignment ve rights review'ı kaydet | OWNER | BLOCKED_OWNER | — |

### Phase 03 — Kabul edilmiş teknik çekirdek ve source of truth

| Atom | İş | Sahip | Durum | Q |
|---|---|---|---|---:|
| LLA-A046 | Byte-for-byte canonical content reader acceptance gate | WORKER → BRAIN | ACCEPTED | 97 |
| LLA-A047 | Deterministic evaluator hardening ve adversarial acceptance | WORKER → BRAIN | ACCEPTED | 96 |
| LLA-A048 | Host-authoritative learning-event/trusted-context contract | WORKER → BRAIN | ACCEPTED | 95 |
| LLA-A049 | In-memory append-only ledger ve deterministic projection | WORKER → BRAIN | ACCEPTED | 94 |
| LLA-A050 | Workspace dosya, tarihsel artifact, secret-risk ve production-source envanteri | BRAIN | ACCEPTED | 97 |
| LLA-A051 | Private GitHub repo/destination ve visibility kararı | OWNER + BRAIN | ACCEPTED | 96 |
| LLA-A052 | Remote/local reconciliation manifest, license boundary, `.gitignore` ve secret preflight | SPARK + WORKER → BRAIN | ACCEPTED | 96 |
| LLA-A053 | Clean clone branch, approved German artifact import, commit ve PR | WORKER + OWNER → BRAIN | ACCEPTED | 96 |
| LLA-A054 | Main/branch/PR/commit-SHA kabul politikasını uygula | OWNER + BRAIN | ACCEPTED | 97 |
| LLA-A055 | Notion atom tracker'ını roadmap/commit linkleriyle kur | SPARK + NOTION + OWNER → BRAIN | ACCEPTED | 95 |
| LLA-A056 | Fresh-clone testleri ve GitHub source-of-truth kabulü | BRAIN | ACCEPTED | 98 |

### Phase 04 — Güncel teknoloji doğrulaması ve küçük spike'lar

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A057 | Stable Expo/React Native/New Architecture sürüm matrisi | BRAIN | ACTIVE |
| LLA-A058 | gluestack/NativeWind/Lucide/Noto lisans ve uyumluluk matrisi | SPARK + NOTION → BRAIN | PLANNED |
| LLA-A059 | UI stack/version ADR ve fallback kararı | BRAIN | PLANNED |
| LLA-A060 | İzole Expo UI compatibility spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A061 | German glyph, NFC, quote ve compound-wrap smoke | SPARK + WORKER → BRAIN | PLANNED |
| LLA-A062 | Dynamic type/screen-reader/reduced-motion smoke | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A063 | UI spike kabulü ve dependency pinleri | BRAIN | PLANNED |
| LLA-A064 | Better Auth Expo güncel docs/advisory araştırması | NOTION → BRAIN | PLANNED |
| LLA-A065 | Guest/session/link/revoke threat model ve auth contract | BRAIN | PLANNED |
| LLA-A066 | Guest + restart session spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A067 | Account link, logout/revoke ve deep-link spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A068 | Auth spike bağımsız kabulü | BRAIN | PLANNED |
| LLA-A069 | Neon/Drizzle driver, pooling ve quota araştırması | NOTION → BRAIN | PLANNED |
| LLA-A070 | Fastify + Zod minimal contract route spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A071 | Drizzle migration + pooled Neon integration spike'ı | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A072 | Server-side idempotency/concurrency spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A073 | API/database spike kabulü | BRAIN | PLANNED |
| LLA-A074 | SQLite session/outbox schema spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A075 | Offline→online send/ack/cursor spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A076 | Duplicate/conflict/crash-recovery spike'ı | WORKER → BRAIN | PLANNED |
| LLA-A077 | Koyeb ve alternatif hosting limit/latency matrix | NOTION → BRAIN | PLANNED |
| LLA-A078 | Dev deploy, health, cold-start ve load ölçümü | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A079 | Hosting ADR ve dev-only/production hükmü | BRAIN | PLANNED |
| LLA-A080 | Beş spike'ın birleşik kabul ve dependency kararı | BRAIN | PLANNED |

### Phase 05 — Repository kalitesi, persistence ve backend golden path

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A081 | Monorepo/module-boundary ADR | BRAIN | PLANNED |
| LLA-A082 | `apps/mobile`, `apps/api`, `packages/*`, `docs/*` scaffold | WORKER → BRAIN | PLANNED |
| LLA-A083 | TypeScript/lint/format strict baseline | WORKER → BRAIN | PLANNED |
| LLA-A084 | Unit/contract/integration test runner baseline | WORKER → BRAIN | PLANNED |
| LLA-A085 | Environment ve secret validation | WORKER → BRAIN | PLANNED |
| LLA-A086 | Shared schemas, OpenAPI ve typed-client generation contract | WORKER → BRAIN | PLANNED |
| LLA-A087 | GitHub CI: types/lint/unit/contract/license gates | WORKER → BRAIN | PLANNED |
| LLA-A088 | Provider quota, third-party data ve license registries | SPARK + NOTION + WORKER → BRAIN | PLANNED |
| LLA-A089 | Persistent learning-ledger threat model/schema ADR | BRAIN | PLANNED |
| LLA-A090 | PostgreSQL learning-event tables ve migration | WORKER → BRAIN | PLANNED |
| LLA-A091 | Append-only constraints, idempotency ve unique keys | WORKER → BRAIN | PLANNED |
| LLA-A092 | Persistent ledger repository adapter | WORKER → BRAIN | PLANNED |
| LLA-A093 | Projection replay/checkpoint service | WORKER → BRAIN | PLANNED |
| LLA-A094 | Transaction/concurrency/retry semantics | WORKER → BRAIN | PLANNED |
| LLA-A095 | Sync cursor, tombstone ve device operation contract | BRAIN + WORKER | PLANNED |
| LLA-A096 | Persistence adversarial + migration integration tests | WORKER → BRAIN | PLANNED |
| LLA-A097 | Curriculum/content-release read model endpoint | WORKER → BRAIN | PLANNED |
| LLA-A098 | Content manifest/download/version endpoint | WORKER → BRAIN | PLANNED |
| LLA-A099 | Guest identity ve learner-preferences endpoint | WORKER → BRAIN | PLANNED |
| LLA-A100 | Learning session start/resume/finish endpoints | WORKER → BRAIN | PLANNED |
| LLA-A101 | Attempt→evaluator→evidence transactional path | WORKER → BRAIN | PLANNED |
| LLA-A102 | Return scheduler ve `/practice/due` endpoint | WORKER → BRAIN | PLANNED |
| LLA-A103 | Learner export/delete temel veri hakkı | WORKER → BRAIN | PLANNED |
| LLA-A104 | Authorization, rate-limit ve error-envelope contract | BRAIN + WORKER | PLANNED |
| LLA-A105 | Backend full integration/rollback tests | WORKER → BRAIN | PLANNED |
| LLA-A106 | Backend golden-path acceptance | BRAIN | PLANNED |

### Phase 06 — Mobile platform temeli

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A107 | Accepted Expo app scaffold | WORKER → BRAIN | PLANNED |
| LLA-A108 | App shell, navigation ve deep links | WORKER → BRAIN | PLANNED |
| LLA-A109 | English UI localization/future locale structure | WORKER → BRAIN | PLANNED |
| LLA-A110 | Semantic design tokens | BRAIN + WORKER | PLANNED |
| LLA-A111 | Noto typography, Lucide icon registry ve licenses | WORKER → BRAIN | PLANNED |
| LLA-A112 | Seçilmiş gluestack/custom primitives | WORKER → BRAIN | PLANNED |
| LLA-A113 | Focus, target size, contrast ve accessibility primitives | WORKER → BRAIN | PLANNED |
| LLA-A114 | Generated/typed API client | WORKER → BRAIN | PLANNED |
| LLA-A115 | Guest/auth session adapter | WORKER → BRAIN | PLANNED |
| LLA-A116 | Expo SQLite schema ve migrations | WORKER → BRAIN | PLANNED |
| LLA-A117 | Versioned content cache repository | WORKER → BRAIN | PLANNED |
| LLA-A118 | Local learning-event store/outbox | WORKER → BRAIN | PLANNED |
| LLA-A119 | Sync cursor/retry/backoff/reconciliation | WORKER → BRAIN | PLANNED |
| LLA-A120 | SecureStore token/key lifecycle | WORKER → BRAIN | PLANNED |
| LLA-A121 | FileSystem audio/cache lifecycle | WORKER → BRAIN | PLANNED |
| LLA-A122 | Offline/stale/pending/conflict state components | WORKER → BRAIN | PLANNED |
| LLA-A123 | Crash-safe resume ve error boundary | WORKER → BRAIN | PLANNED |
| LLA-A124 | Feature flags ve provider kill switches | WORKER → BRAIN | PLANNED |
| LLA-A125 | Component/integration + Android/iOS device smoke | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A126 | Mobile platform acceptance | BRAIN | PLANNED |

### Phase 07 — Learner golden-path UI

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A127 | Onboarding ve guest start | WORKER → BRAIN | PLANNED |
| LLA-A128 | Atlas screen shell | BRAIN + WORKER | PLANNED |
| LLA-A129 | SVG-first node/route geometry | WORKER → BRAIN | PLANNED |
| LLA-A130 | Node evidence state ve accessible visual semantics | WORKER → BRAIN | PLANNED |
| LLA-A131 | İlk route selection/start | WORKER → BRAIN | PLANNED |
| LLA-A132 | Node detail ve “why now” | WORKER → BRAIN | PLANNED |
| LLA-A133 | Lesson/Mission player state machine | BRAIN + WORKER | PLANNED |
| LLA-A134 | `meaning_match` renderer | WORKER → BRAIN | PLANNED |
| LLA-A135 | `sentence_builder` renderer | WORKER → BRAIN | PLANNED |
| LLA-A136 | `typed_response` renderer | WORKER → BRAIN | PLANNED |
| LLA-A137 | `changed_context_turn` renderer | WORKER → BRAIN | PLANNED |
| LLA-A138 | Hint, reveal, anti-leak ve contamination UX | WORKER → BRAIN | PLANNED |
| LLA-A139 | Canonical audio/TTS fallback player states | WORKER → BRAIN | PLANNED |
| LLA-A140 | Evidence debrief | WORKER → BRAIN | PLANNED |
| LLA-A141 | Practice-due/delayed-return flow | WORKER → BRAIN | PLANNED |
| LLA-A142 | You can-do ve evidence timeline | WORKER → BRAIN | PLANNED |
| LLA-A143 | Interruption/offline/resume behavior | WORKER → BRAIN | PLANNED |
| LLA-A144 | Dynamic type/screen reader/reduced-motion pass | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A145 | Maestro onboarding→return E2E | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A146 | Learner golden-path acceptance | BRAIN | PLANNED |

### Phase 08 — Content operations ve tam ilk rota

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A147 | Production content-schema validator/CLI | WORKER → BRAIN | PLANNED |
| LLA-A148 | Asset/source/license register | SPARK + WORKER + NOTION → BRAIN | PLANNED |
| LLA-A149 | Reviewer identity/decision record | BRAIN + WORKER | PLANNED |
| LLA-A150 | Publish/revise/withdraw lifecycle | WORKER → BRAIN | PLANNED |
| LLA-A151 | Content version semantic diff | WORKER → BRAIN | PLANNED |
| LLA-A152 | Reviewer bundle export | WORKER → BRAIN | PLANNED |
| LLA-A153 | Content↔audio alignment checker | WORKER → BRAIN | PLANNED |
| LLA-A154 | CLI yeterliliği/admin UI go-no-go kararı | BRAIN | PLANNED |
| LLA-A155 | N3 choice language/reference research | NOTION → BRAIN | PLANNED |
| LLA-A156 | N3 skill/rubric/content design | BRAIN | PLANNED |
| LLA-A157 | N3 package/fixtures/reviewer bundle | WORKER → BRAIN | PLANNED |
| LLA-A158 | N3 German + pedagogy human approval | OWNER | BLOCKED_OWNER |
| LLA-A159 | N4 price/payment language/reference research ve scope | NOTION → BRAIN | PLANNED |
| LLA-A160 | N4 package/fixtures/reviewer bundle | WORKER → BRAIN | PLANNED |
| LLA-A161 | N4 German + pedagogy human approval | OWNER | BLOCKED_OWNER |
| LLA-A162 | N5 cumulative mission rubric/scenario design | BRAIN | PLANNED |
| LLA-A163 | N5 content, fixtures ve runtime integration | WORKER → BRAIN | PLANNED |
| LLA-A164 | N5 human approval ve pilot check | OWNER + BRAIN | BLOCKED_OWNER |
| LLA-A165 | N6 delayed-return content/schedule integration | BRAIN + WORKER | PLANNED |
| LLA-A166 | `de-DE` N1–N6 route release candidate | WORKER → BRAIN | PLANNED |

### Phase 09 — Canonical audio ve learner recording

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A167 | de-DE speaker/region/audio style specification | BRAIN + NOTION | PLANNED |
| LLA-A168 | Talent release template human/legal review | OWNER | BLOCKED_OWNER |
| LLA-A169 | Speaker selection ve signed releases | OWNER | BLOCKED_OWNER |
| LLA-A170 | N1/N2 human recording session | OWNER | BLOCKED_OWNER |
| LLA-A171 | Loudness/format/naming QA | SPARK + WORKER → BRAIN | PLANNED |
| LLA-A172 | R2 ingest ve immutable asset hashes | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A173 | Audio manifest/provenance kayıtları | WORKER → BRAIN | PLANNED |
| LLA-A174 | Text-audio alignment ve reviewer signoff | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A175 | Download/cache/eviction implementation | WORKER → BRAIN | PLANNED |
| LLA-A176 | Replay/speed/no-overlap playback UX | WORKER → BRAIN | PLANNED |
| LLA-A177 | Expo Speech non-canonical fallback semantics | WORKER → BRAIN | PLANNED |
| LLA-A178 | Local record/replay, consent ve raw-audio deletion | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A179 | Audio/recording end-to-end acceptance | BRAIN | PLANNED |

### Phase 10 — Kapalı alpha kalite ve release kapısı

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A180 | Product event dictionary | SPARK + BRAIN | PLANNED |
| LLA-A181 | Evidence/product/operational telemetry ayrımı | BRAIN + WORKER | PLANNED |
| LLA-A182 | Consent/privacy/retention learner UI | BRAIN + WORKER + OWNER | PLANNED |
| LLA-A183 | Sentry güncel Expo/privacy research | NOTION → BRAIN | PLANNED |
| LLA-A184 | Sentry setup ve PII/answer/audio redaction | WORKER → BRAIN | PLANNED |
| LLA-A185 | Structured logs, trace ID ve operational metrics | WORKER → BRAIN | PLANNED |
| LLA-A186 | Feature-flag/provider kill-switch operasyon testi | WORKER → BRAIN | PLANNED |
| LLA-A187 | Quota exhaustion/deterministic fallback chaos testi | WORKER → BRAIN | PLANNED |
| LLA-A188 | Offline/sync duplicate/conflict/crash chaos testi | WORKER → BRAIN | PLANNED |
| LLA-A189 | Backup + gerçek restore provası | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A190 | Dependency/secret/auth security review | NOTION + BRAIN | PLANNED |
| LLA-A191 | Export/delete doğrulaması | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A192 | 18+ kapalı-alpha katılımcı ve consent planı | OWNER + BRAIN | PLANNED |
| LLA-A193 | Pilot protocol, observation ve escalation formu | BRAIN | PLANNED |
| LLA-A194 | North-star/funnel/evidence dashboard | WORKER → BRAIN | PLANNED |
| LLA-A195 | Build, device matrix ve closed-alpha go/no-go | OWNER + BRAIN | PLANNED |

### Phase 11 — Grounded Studio

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A196 | Tek Studio operasyonunu dondur: Explain→Save to Practice | BRAIN | PLANNED |
| LLA-A197 | Güncel model/provider/privacy/cost research | NOTION → BRAIN | PLANNED |
| LLA-A198 | Swappable `ModelProvider` contract | BRAIN + WORKER | PLANNED |
| LLA-A199 | Allowed source/skill scope ve provenance | BRAIN + WORKER | PLANNED |
| LLA-A200 | Versioned prompt ve structured output schema | BRAIN + WORKER | PLANNED |
| LLA-A201 | Runtime validation/repair/reject path | WORKER → BRAIN | PLANNED |
| LLA-A202 | Content boundary, safety ve prompt-injection tests | NOTION + WORKER → BRAIN | PLANNED |
| LLA-A203 | Token/time/cost ledger ve cache | WORKER → BRAIN | PLANNED |
| LLA-A204 | Timeout/quota/offline deterministic fallback | WORKER → BRAIN | PLANNED |
| LLA-A205 | Golden eval corpus ve pass thresholds | SPARK + BRAIN + NOTION | PLANNED |
| LLA-A206 | Explain endpoint ve learner UI | WORKER → BRAIN | PLANNED |
| LLA-A207 | Save-to-Practice ve non-AI delayed return | WORKER → BRAIN | PLANNED |
| LLA-A208 | Report/appeal ve Studio acceptance | BRAIN + OWNER | PLANNED |

### Phase 12 — Voice intelligence ve Scenario Engine

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A209 | STT benchmark question/metric/sample planı | BRAIN | PLANNED |
| LLA-A210 | Groq/Azure/alternatif STT privacy/price/capability research | NOTION → BRAIN | PLANNED |
| LLA-A211 | Consented German learner/DACH sample seti | OWNER | BLOCKED_OWNER |
| LLA-A212 | Provider-neutral benchmark harness | SPARK + WORKER → BRAIN | PLANNED |
| LLA-A213 | Device/noise/accent/DACH benchmark run | WORKER + OWNER → BRAIN | PLANNED |
| LLA-A214 | STT provider/fallback ADR | BRAIN | PLANNED |
| LLA-A215 | Transcript confidence ve user correction UX | BRAIN + WORKER | PLANNED |
| LLA-A216 | Voice task-success evaluator | WORKER → BRAIN | PLANNED |
| LLA-A217 | Forced-alignment/phoneme research | NOTION → BRAIN | PLANNED |
| LLA-A218 | Pronunciation-claim/no-fake-score policy | BRAIN + OWNER | PLANNED |
| LLA-A219 | Deterministic Scenario DSL/state contract | BRAIN | PLANNED |
| LLA-A220 | İlk authored counter scenario | BRAIN + WORKER | PLANNED |
| LLA-A221 | Constrained surface variation adapter | WORKER → BRAIN | PLANNED |
| LLA-A222 | Scenario offline/failure/eval corpus | WORKER + NOTION → BRAIN | PLANNED |
| LLA-A223 | Voice + Scenario acceptance | BRAIN | PLANNED |

### Phase 13 — People: güvenlikten sonra guided exchange

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A224 | People ayrı ürün kapısı ve go/no-go kriteri | BRAIN + OWNER | DEFERRED |
| LLA-A225 | Hedef ülke safety/legal/platform-duty research | NOTION → BRAIN + OWNER | DEFERRED |
| LLA-A226 | 18+ age/access policy | BRAIN + OWNER | DEFERRED |
| LLA-A227 | Social PII/retention/deletion policy | BRAIN + OWNER | DEFERRED |
| LLA-A228 | Scam/dating/harassment/hate safety taxonomy | NOTION + BRAIN | DEFERRED |
| LLA-A229 | Identity/risk/session signals | BRAIN + WORKER | DEFERRED |
| LLA-A230 | Block behavior | WORKER → BRAIN | DEFERRED |
| LLA-A231 | Mute/leave/session termination | WORKER → BRAIN | DEFERRED |
| LLA-A232 | Report evidence capture | WORKER → BRAIN | DEFERRED |
| LLA-A233 | Moderation queue ve operator workflow | BRAIN + WORKER | DEFERRED |
| LLA-A234 | Appeal ve audit trail | BRAIN + WORKER | DEFERRED |
| LLA-A235 | Rate limits ve abuse controls | WORKER → BRAIN | DEFERRED |
| LLA-A236 | Abuse telemetry/redaction | WORKER → BRAIN | DEFERRED |
| LLA-A237 | No-show/technical-failure compensation | BRAIN | DEFERRED |
| LLA-A238 | Human-feedback evidence permission modeli | BRAIN | DEFERRED |
| LLA-A239 | German↔target-language liquidity study | NOTION → BRAIN | DEFERRED |
| LLA-A240 | Invite-only structured text pilot | OWNER + WORKER → BRAIN | DEFERRED |
| LLA-A241 | Structured voice pilot ve People acceptance | OWNER + BRAIN | DEFERRED |

### Phase 14 — Premium, coin ve commerce

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A242 | Monetization/evidence non-interference contract | BRAIN + OWNER | DEFERRED |
| LLA-A243 | Pricing, competitor ve regional affordability research | NOTION → BRAIN + OWNER | DEFERRED |
| LLA-A244 | Premium entitlement model | BRAIN + WORKER | DEFERRED |
| LLA-A245 | Açık quota/limit/fallback UX | BRAIN + WORKER | DEFERRED |
| LLA-A246 | Free tier complete-learning-loop test | BRAIN + OWNER | DEFERRED |
| LLA-A247 | Coin value hypothesis ve success/failure metric | BRAIN + OWNER | DEFERRED |
| LLA-A248 | Ayrı economy ledger | WORKER → BRAIN | DEFERRED |
| LLA-A249 | Coin earning kuralları | BRAIN + WORKER | DEFERRED |
| LLA-A250 | Coin spending ve expiry/refund kuralları | BRAIN + WORKER | DEFERRED |
| LLA-A251 | Fraud/threat model ve adversarial tests | NOTION + WORKER → BRAIN | DEFERRED |
| LLA-A252 | Kapalı economy pilotu | OWNER + BRAIN | DEFERRED |
| LLA-A253 | Billing/subscription/refund implementation | WORKER + OWNER → BRAIN | DEFERRED |
| LLA-A254 | Tutor/media marketplace go/no-go kararı | NOTION + BRAIN + OWNER | DEFERRED |

### Phase 15 — Operasyon, ölçek ve çok dillilik

| Atom | İş | Sahip | Durum |
|---|---|---|---|
| LLA-A255 | Analytics/evidence/ops data boundary audit | BRAIN | DEFERRED |
| LLA-A256 | PostHog/alternatif consent, quota ve privacy research | NOTION → BRAIN | DEFERRED |
| LLA-A257 | Consent-aware product analytics integration | SPARK + WORKER → BRAIN | DEFERRED |
| LLA-A258 | Learning/product/AI data retention jobs | WORKER + OWNER → BRAIN | DEFERRED |
| LLA-A259 | R2 lifecycle, raw-voice deletion ve audit jobs | WORKER + OWNER → BRAIN | DEFERRED |
| LLA-A260 | AI/STT/TTS provider failover drills | WORKER → BRAIN | DEFERRED |
| LLA-A261 | API/sync/media load and quota tests | WORKER → BRAIN | DEFERRED |
| LLA-A262 | SLO/error-budget tanımı | BRAIN | DEFERRED |
| LLA-A263 | Incident runbook ve kill-switch rehearsal | BRAIN + WORKER | DEFERRED |
| LLA-A264 | Scheduled backup/restore audit | OWNER + WORKER → BRAIN | DEFERRED |
| LLA-A265 | Reviewer hacmine göre CMS/admin go-no-go | BRAIN + NOTION | DEFERRED |
| LLA-A266 | Seçilirse dar CMS/admin implementation | WORKER → BRAIN | DEFERRED |
| LLA-A267 | Content/UI localization framework hardening | BRAIN + WORKER | DEFERRED |
| LLA-A268 | İkinci dil seçim araştırması ve demand evidence | NOTION → BRAIN + OWNER | DEFERRED |
| LLA-A269 | Opsiyonel Russian-first research refresh | NOTION → BRAIN | DEFERRED |
| LLA-A270 | İkinci language-pack spike ve scale release kararı | BRAIN + WORKER + OWNER | DEFERRED |

## 5. Kritik yol ve paralellik

```text
A050–A056 source of truth
  → A057–A080 measured spikes
  → A081–A106 repo + persistent backend
  → A107–A126 mobile foundation
  → A127–A146 golden learner loop
  → A147–A179 reviewed content + audio
  → A180–A195 closed alpha
  → A196–A223 Studio + voice/scenario
  → A224–A241 People safety gate
  → A242–A254 economy
  → A255–A270 scale/multilingual
```

- `A043–A045` insan kapıları geliştirmeyi tamamen durdurmaz; fakat N1/N2 içeriğini learner-visible/canonical yapmayı bloke eder.
- BRAIN aynı anda yalnız bir “aktif kabul cephesi” tutar. NOTION araştırması ayrı atomda paralel hazırlanabilir; sonucu BRAIN kabul etmeden karar değildir.
- WORKER aynı anda yalnız bir açık brief uygular. SECOND-BRAIN ile WORKER aynı hizmette olsa bile ayrı sohbet/rol/state kullanır.
- People/economy atomları kapalı alpha kanıtından önce aktive edilmez.

## 6. Bir atomun çalışma döngüsü

1. BRAIN atomu ve bağımlılıklarını seçer.
2. Gerekirse NOTION için `RESEARCH_ONLY` veya `READ_ONLY_REVIEW` brief'i hazırlar.
3. BRAIN bulgudan kararı/acceptance criteria'yı çıkarır.
4. WORKER için tek atomluk objective, base hash/commit, allowed files, no-go ve test brief'i hazırlanır.
5. WORKER implementation + raw test + hashes/diff + return report verir ve durur.
6. BRAIN gerçek dosyayı/diff'i inceler, testleri bağımsız çalıştırır ve `ACCEPTED` ya da `CHANGES_REQUIRED` verir.
7. Roadmap/current-state güncellenir. Kullanıcı `devam` demeden sonraki implementation atomu başlamaz.

## 7. Notion'a ayrılan iş türleri

Notion özellikle A057, A058, A064, A069, A077, A088, A155, A159, A167, A183, A190, A197, A202, A205, A210, A217, A225, A228, A239, A243, A251, A254, A256, A265, A268 ve A269 için kullanılır. Her seferinde picker'da görünen gerçek model adı, tarih, kaynaklar, token/credit sınırı ve çalıştırma modu rapora yazılır. Notion çıktısı karar değil, incelenecek girdidir.

## 8. Handoff işaretleri

- `token az`, `limit azalıyor`, `hak bitiyor`, `acil sync`: Yeni işe başlanmaz; mevcut atom durumu ve değişiklikler durable sync raporuna yazılır.
- `komple handoff`, `tam handoff`, `second brain'e devret`: BRAIN tam transfer paketi üretir. SECOND-BRAIN geçici acting brain olur.
- `geri handoff`: SECOND-BRAIN bütün görev süresini, atom bazında karar/test/diff/borçlarla raporlar ve durur; primary BRAIN kritik kabul örneklemesiyle yetkiyi geri alır.

## 9. Şimdiki gerçek

- Tamamlanan son ürün atomu: `LLA-A054`.
- Roadmap/koordinasyon atomu: `LLA-A011`, bu sürümle kabul edildi.
- İlk eksik ve en yüksek değerli atom: `LLA-A055`.
- Persistent storage, backend, auth, Expo runtime, learner UI, canlı audio ve human content approval henüz yoktur.
- Legacy canonical comparator'ın `1/27` eşleşmesi belgelenmiş integration debt'tir; fixture'larda trusted runtime history olmadığı için başarı testi gibi sunulmaz.
