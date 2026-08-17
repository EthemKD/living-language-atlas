# CR-G0-001 v0.1 — Sınırlı R0/R1 Public-Official Desk Discovery Lane

**Artifact ID:** `CR-G0-001-v0.1`
**Tarih:** 2026-08-11
**Durum:** `PROPOSED / NOT_APPROVED / NO_EFFECT`
**Etkilenmesi önerilen sürüm:** `ROS-DESIGN-v1.2 APPROVED → ROS-DESIGN-v1.3-CANDIDATE`
**Mevcut G0:** `NO-GO`

> Bu belge bir politika değişikliği önerisidir; onay değildir. MKT-01 veya başka araştırmayı başlatmaz, web erişimi yetkisi vermez ve v1.2'nin gerçek-insan RACI kuralını şu anda değiştirmez.

## 1. Sorun ve amaç

`ROS-DESIGN-v1.2` bütün package rolleri ve G0 için gerçek kişilerle RACI ister. Mevcut durumda yalnız Founder/user gerçek insan olarak biliniyor; Methods/QA, Data/Privacy-Ethics ve Independent Red-Team için atanmış, yeterliliği/COI kaydı olan insanlar yoktur. Bu nedenle G0 haklı olarak `NO-GO`dur.

Önerilen değişiklik, yalnız düşük riskli ve kamuya açık kurumsal kaynakların masa-başı keşfinde ayrı-context AI ajanlarının operasyonel görev ayrılığı sağlamasına izin veren **sınırlı bir lane** açmayı değerlendirir. Amaç insan uzman kapılarını kaldırmak değil; daha sonra insan review'ına sunulabilecek, provenance'ı tam bir ön source registry ve preliminary observation set'i hazırlamaktır.

**Kaynak / tarih / güven:** G0 gap analizi ve bağımsız operability audit, 2026-08-11, güven `HIGH` süreç gözlemi; bu amaç bir ürün iddiası değildir.

## 2. Değişmeyen yasak ve kapılar

Bu CR onaylansa dahi aşağıdakiler değişmez:

- R2/R3 çalışma, hukuk görüşü, çocuk/minör, safeguarding, privacy/PII, security/pentest, psychometrics, insan katılımcı, sosyal etkileşim ve yüksek etkili ölçme için nitelikli gerçek-insan sign-off zorunludur.
- VOC/user review, forum, sosyal medya, community post/chat, yorum veya başka UGC toplanamaz.
- Hesap açma/giriş, trial/subscription/purchase, ödeme, paywall veya erişim kontrolünü aşma yapılamaz.
- Scraping, crawler, bulk export/download, otomatik yüksek hacimli istek veya rate-limit aşımı yapılamaz.
- Outreach, support/mystery interaction, öğretmen/kullanıcı/şirketle iletişim ve teşvik yapılamaz.
- PII, profil, cihaz kimliği, voice/video/image biyometrisi, konum, çocuk verisi veya hassas veri toplanamaz.
- Haricî AI/vendor'a kaynak seti veya veri upload edilemez; yalnız bu workspace içindeki izinli araç akışı kullanılabilir.
- Güvenlik testi, reverse engineering, uygulama trafiği interception'ı veya kapalı endpoint çağrısı yapılamaz.
- AI reviewer hukukçu, safeguarding uzmanı, psychometrician veya security expert yerine geçmez.
- Hiçbir FHM hipotezi sınıflandırılamaz, roadmap/ürün kararına dönüşemez.

Belirsiz kaynak/risk varsayılan olarak `R2`ye yükseltilir ve lane için otomatik `STOPPED_RISK` üretir.

## 3. İzin verilmesi önerilen exact scope

### 3.1 Kaynak sınıfı

Yalnız read-only, login gerektirmeyen, kamuya açık ve kişisel veri/UGC içermeyen şu kaynaklar:

1. Ürünün/şirketin resmî ana sayfası, ürün sayfası, help center, pricing, terms, privacy ve safety/policy sayfaları.
2. Apple App Store veya Google Play'deki publisher-supplied listing alanları; kullanıcı review/rating metrikleri ve kişiselleştirilmiş alanlar hariç.
3. Resmî kamu kurumu, düzenleyici, standart kuruluşu ve mahkeme/mevzuat portalı metinleri; yalnız metin gözlemi, hukuk yorumu değil.
4. Publisher veya bilimsel indeks üzerinden erişilen peer-reviewed çalışma ve sistematik derleme metadata/abstract/full text'i; lisans ve erişim sınırları korunarak.
5. Resmî şirket press/investor açıklamaları; yalnız `COMPANY_CLAIM`, bağımsız gerçek olarak değil.

Üçüncü taraf haber, affiliate/listicle, ticari market-intelligence, data broker, korsan kopya, anonim doküman ve kaynak zinciri belirsiz materyal bu lane'de yasaktır.

### 3.2 İzinli eylemler

- Arama motoruyla source discovery; resmî sayfayı açma ve read-only inceleme.
- URL, publisher, sayfa başlığı, publication/update/access tarihi, locale/storefront ve source class kaydı.
- Telif sınırları içinde kısa alıntı veya paraphrase; claim–source anchor'ı.
- Dinamik bilginin yalnız görüldüğü anda ve exact ülke/platform/kapsamla observation olarak kaydı.
- Kaynak çelişkisi, eksiklik ve freshness riskinin kaydı.
- Ayrı AI context'lerinde source reconstruction, yöntem QA ve red-team.

### 3.3 Exposure cap

Her paket protokolü daha düşük sınır koyabilir; bu lane'in mutlak tavanı:

- `budget = 0`;
- en fazla 30 entity ve 100 benzersiz URL;
- entity başına en fazla 8 resmî sayfa;
- yalnız kullanıcının açıkça onayladığı ülke/storefront/dil kapsamı;
- 30 takvim günü expiry;
- dosya indirme toplamı 0; yalnız araç tarafından gösterilen sayfa metni/metadata ve gerekli kısa evidence snapshot'ı.

Tavana ulaşmak readiness değildir; protocol stop rule çalışır ve lane `PAUSED` olur.

## 4. Rol ve görev ayrılığı önerisi

Yalnız `R01-PUBLIC-OFFICIAL-DESK` scope'unda:

| Rol | İzinli kimlik | Ayrılık ve sınır |
|---|---|---|
| Founder / Scope & Budget Owner | Kullanıcı, açık rol kabulüyle | Scope, bütçe=0 ve CR onayı; kanıt kalitesini tek başına yükseltemez |
| Program / Package Lead | Codex root operational identity | Protocol, collection ve synthesis draft; kendi QA/red-team'ini onaylayamaz |
| Research Governance Owner | Package Lead/QA/Data/Red-Team'den ayrı AI governance agent/context | Bu limited lane'de `APPROVED_TO_COLLECT` için accountable; protocol, cap ve açık finding'leri kontrol eder; `READY_FOR` yetkisi yoktur |
| Methods/QA | Ayrı alt ajan/context | Kaynak–claim zincirini sıfırdan yeniden kurar; Package Lead olamaz |
| Data/Provenance Steward | Ayrı alt ajan/context veya QA'dan ayrı kayıt | Manifest, source class, tarih ve PII/UGC sınırı; collection lead olamaz |
| Independent Red-Team | Package Lead ve QA'dan ayrı alt ajan/context | Confirmation bias, karşı örnek, freshness ve scope overreach saldırısı |
| Domain Expert | AI ile doldurulamaz | Lane R2/R3'e yükselirse zorunlu ve çalışma durur |
| Decision Owner | Founder adayı | Bu lane hiçbir Dxx readiness üretmediği için karar veremez; yalnız devam/durdurma yetkisi |

Her AI operational identity için canonical task name, görev, input artifact sürümü, output ID, timestamp ve açık finding kaydedilir. Aynı context'in rol etiketi değiştirerek kendi işini onaylaması görev ayrılığı sayılmaz.

## 5. İzin verilen state ve çıktı

Lane mevcut state machine'i şu üst sınırla kullanır:

`NOT_STARTED → SCOPING → PROTOCOL_REVIEW → APPROVED_TO_COLLECT → COLLECTING → DATA_FROZEN → CODING → SYNTHESIS → QUALITY_REVIEW → RED_TEAM_REVIEW → PAUSED(HUMAN_QA_REQUIRED)`

- Bu lane **`READY_FOR(Dxx, ...)` üretemez**.
- Çıkış yalnız `PRELIMINARY / AI-REVIEWED / HUMAN-QA-PENDING` olabilir.
- Observation, resmî şirket iddiası ve inference ayrı tutulur.
- Hard dependency consumer'ı bu çıktıyı `QR*`, validated artifact veya decision input olarak tüketemez.
- Daha sonra nitelikli insan reviewer atanırsa aynı frozen manifest üzerinde reproduction yapılır; ancak açık finding'ler kapatılır ve normal ROS gate'leri geçerse promotion değerlendirilebilir. Otomatik terfi yoktur.

## 6. Exact semantik diff önerisi

Onay verilirse v1.2 dosyası sessizce değiştirilmez. Önce `ROS-DESIGN-v1.3-CANDIDATE` kopyası üretilir ve aşağıdaki değişiklikler açık diff olarak uygulanır:

| ROS bölümü | Önerilen değişiklik |
|---|---|
| §3 state machine | `R01-PUBLIC-OFFICIAL-DESK` için zorunlu terminal `PAUSED(HUMAN_QA_REQUIRED)`; `READY_FOR` yasağı eklenir |
| §3.2 Roller/RACI | Yukarıdaki sınırlı AI operational identity istisnası eklenir; diğer bütün scope'larda gerçek-insan kuralı korunur |
| §4.10 Yetki/bütçe | Bu belgedeki kaynak/eylem/exposure cap, yalnız açık CR + package protocol onayıyla izinli external read-only action olarak eklenir |
| §14.1 contract registry | `CTR-001L`: yalnız `MKT-01.R01-PUBLIC-OFFICIAL-DESK`; upstream `G0-R01-LIMITED APPROVED`; max output `PAUSED(HUMAN_QA_REQUIRED)`; hiçbir downstream HARD edge'i besleyemez |
| §19 G0 | Tam G0'dan ayrı `G0-R01-LIMITED` kapısı tanımlanır; tam `G0-GOVERNANCE-BASELINE APPROVED` etiketi verilmez |
| Policy ledger | `POLICY-CR-G0-001`, approval identity/date, expiry, scope ve rollback eklenir |

Hard DAG lint/cycle/reachability kontrolü ve yeni bağımsız governance audit geçmeden v1.3 onay adayı kullanıcıya sunulamaz.

## 7. Kill trigger, escalation ve rollback

Aşağıdakilerden biri görülürse collection derhal durur:

- UGC/review/comment veya tanımlanabilir kişi verisiyle karşılaşma;
- login, ödeme, trial, cookie-consent dışında profil oluşturma veya erişim engeli;
- ToS/robots/rate-limit belirsizliği veya automated access yasağı;
- kaynak sınıfının resmî/authoritative olduğunun doğrulanamaması;
- hukuk, çocuk, safety, privacy, security veya psychometric yorum ihtiyacı;
- bütçe >0, cap aşımı, dosya download veya vendor upload ihtiyacı;
- aynı claim için çözülemeyen ciddi kaynak çelişkisi;
- AI reviewer'ların bağımsız source reconstruction yapamaması.

Sonuç `STOPPED_RISK` veya uygun durumda `PAUSED` olur. CR revoke/expire edilirse yeni collection durur; artifact'lar silinmez, `CR_EXPIRED/REVOKED — NOT USABLE FOR READINESS` tombstone'u alır. Reuse yalnız yeni onaylı protokol ve yeniden doğrulamayla mümkündür.

## 8. Downstream etki analizi

| Alan | Etki |
|---|---|
| MKT-01 | Yalnız preliminary official-source desk branch açılabilir; tam MKT artifact/readiness oluşmaz |
| VOC-03 ve kullanıcı yorumları | Tamamen kapalı |
| USR/CMP ve diğer hard consumers | Lane çıktısını hard upstream olarak tüketemez |
| FHM v0.1 | Queue inactive kalır; classification yok |
| Ürün/roadmap/stack/kod | Etki ve yetki yok |
| Harcama | 0; satın alma veya abonelik yok |
| İnsan uzman gereksinimi | Ertelenmez; yalnız preliminary desk registry sonrasına kadar çalışma sınırlandırılır |

## 9. Onay ve yürürlük koşulları

Bu CR'nin değerlendirme seçenekleri:

1. `APPROVE FOR v1.3 CANDIDATE DRAFT` — yalnız semver'li ROS revizyonu ve yeniden audit hazırlamaya izin verir; araştırmayı otomatik başlatmaz.
2. `REVISE` — istenen madde değişiklikleri kaydedilir.
3. `REJECT` — v1.2 aynen kalır; Human-RACI yolu gerekir.

Onay durumunda Founder'ın ayrıca şu rol sınırını kabul etmesi gerekir: **Scope & Budget Owner; bütçe tavanı 0; kanıt/uzmanlık kapılarını tek başına aşma yetkisi yok.**

Yürürlük sırası:

1. User `CR-G0-001-v0.1` için yalnız v1.3 candidate draft yetkisi verir.
2. `ROS-DESIGN-v1.3-CANDIDATE` exact diff, lint ve bağımsız audit ile hazırlanır.
3. User v1.3'ü ayrıca onaylar/revize eder/reddeder.
4. `G0-R01-LIMITED` için düzeltilmiş sentetik dry-run ve rol kayıtları geçer.
5. MKT-01 limited protocol ayrı review ve açık `APPROVED_TO_COLLECT` alır.
6. Ancak bundan sonra izinli public-official collection başlayabilir.

Dolayısıyla bu öneriye verilecek ilk onay dahi web araştırmasını veya MKT-01'i kendiliğinden başlatmaz.
