# G0 Governance Candidate ve Sentetik Dry-Run

**Artifact ID:** `G0-CANDIDATE-001`
**Tarih:** 2026-08-11
**Durum:** `G0-CANDIDATE / NO-GO FOR RESEARCH COLLECTION`
**Dry-run hükmü:** `VALIDATED PASS — SYNTHETIC SCOPE ONLY`
**Parent:** `ROS-DESIGN-v1.2`
**Parent dosya:** `01_arastirma_isletim_sistemi.md`
**Parent SHA-256:** `6433B02B131F84A5DD204DB5ECB4D66EA300AFD70BD0781CC58DBE74824FA56B`

> Bu artifact araştırma bulgusu, ürün kararı veya MKT-01 başlangıcı değildir. Yalnız onaylı Research Operating System'in çalıştırılabilirliğini sentetik veriyle sınar.

## 1. Onay ve kapsam kaydı

| Kayıt | Değer |
|---|---|
| `APPROVAL-ROS-v1.2` | `SRC-FOUNDER-APPROVAL-001`: Founder/user onay mesajı, 2026-08-11; exact kısa kaynak snapshot'ı aşağıda |
| Onayın kapsadığı | ROS haritası, state machine, dependency contracts, policy defaults, risk/readiness ve G0 dry-run yetkisi |
| Onayın kapsamadığı | Ürün özelliği, teknoloji, fiyat, segment, vendor, harcama, outreach, hesap açma, scraping, gerçek veri toplama |
| Bütçe | `BUDGET-AUTH-G0-001 = 0` |
| Dış eylem | `NONE` |
| Veri | Yalnız sentetik `INTERNAL`; PII/çocuk/haricî kaynak/vendor upload yok |
| ToS/telif | Haricî sistem veya içerik kullanılmadı |

### 1.1 Onay source snapshot'ı

| Source ID | Exact payload | Alınma tarihi | Platform kimliği | Güven / sınır |
|---|---|---|---|---|
| `SRC-FOUNDER-APPROVAL-001` | `ROS-DESIGN-v1.2’yi onaylıyorum` | 2026-08-11 | Platform turn/message ID bu arayüzde sunulmadı | `HIGH` exact local capture; yalnız ROS onay olayını kanıtlar |

Turn kimliği olmadığı için bu kayıt haricî immutable mesaj arşivi olduğunu iddia etmez; artifact içi lineage anchor'ıdır.

## 2. Policy-default kabul kaydı

Kullanıcının v1.2 onayıyla aşağıdaki exact sürümler G0 dry-run kapsamı için `APPROVED` olarak kaydedildi:

- `POLICY_DEFAULT-MAP-01`
- `POLICY_DEFAULT-QA-01`
- `POLICY_DEFAULT-FRESH-01`
- `POLICY_DEFAULT-VOC-01`
- `POLICY_DEFAULT-IRR-01`
- `POLICY_DEFAULT-DECISION-01`
- `POLICY_DEFAULT-RISK-01`
- `POLICY_DEFAULT-CONTRACT-01`

Bu kabul, değerlerin ampirik gerçek olduğu anlamına gelmez; v1.2'nin normatif araştırma politikası olarak yürürlükte oldukları anlamına gelir.

## 3. RACI aday kaydı

| Rol | Mevcut aday | Durum / sınır |
|---|---|---|
| Founder / Decision Owner adayı / Budget Owner adayı | Kullanıcı | Gerçek insan kimliği biliniyor; roller açıkça kabul edilmedi. Harcama yetkisi varsayılmaz; mevcut tavan yalnız `0` |
| Research Governance Owner / Program Lead | Codex ana ajanı | Operasyonel kimlik; gerçek insan sign-off değildir |
| Package Lead | Codex ana ajanı | Operasyonel kimlik; kendi QA/red-team onayını veremez |
| Methods/QA Reviewer | `ros_requirement_audit` alt ajanı | İşlevsel bağımsız review; gerçek insan sign-off değildir |
| Data / Privacy & Ethics Reviewer | `ros_operability_audit` alt ajanı | İşlevsel review; gerçek insan sign-off değildir |
| Independent Red-Team Reviewer | Ayrı alt ajan incelemesi | Package Lead'den ayrı; gerçek insan sign-off değildir |
| Domain Experts | Atanmadı | G0'da gerekmiyor; ilgili R2/R3 protokolünden önce zorunlu |

**Görev ayrılığı testi işlevsel olarak geçti; gerçek kişilerle RACI koşulu geçmedi.** Bu nedenle aşağıdaki dry-run PASS olsa bile nihai G0 verilemez.

## 4. SYN-00 sentetik protokol

**Paket:** `SYN-00`
**Amaç:** ROS'un geçiş, claim, change, risk ve readiness kontrollerini gerçek araştırma yapmadan sınamak.
**Risk:** Ana dal `R0`; sonuçsuz/risk dalları yalnız kontrol testi.
**Bütçe:** 0
**Dış eylem:** Yok

### Sorular

1. `DISCOVERY_REQUIRED`: Dondurulmuş iki sentetik kaydın en az birinde exact `ALPHA` token'ı var mı?
2. `DISCOVERY_REQUIRED`: Bu fixture gerçek ürün veya kullanıcılar hakkında bir iddia destekliyor mu?
3. State machine, veri-sonrası değişiklik, `INCONCLUSIVE` ve `STOPPED_RISK` yolları uygunsuz readiness'i engelliyor mu?

### Minimum evidence ve stop rule

- İki fixture kaydı da okunur; ek kayıt toplanmaz.
- Q1 exact string match ile; Q2 scope/lineage kontrolüyle değerlendirilir.
- İki kayıt sonrasında durulur.
- Her PII ekleme girişimi anında `STOPPED_RISK` tetikler.

## 5. Dondurulmuş sentetik fixture

| Artifact | Payload | SHA-256 |
|---|---|---|
| `SYN-REV-001` | `SYN-REV-001\|Card A\|ALPHA` | `DE79D2FD9EA5AC7244DE7C3D7D90D88101CF44F35F85F68A030B9DFB38FF32AB` |
| `SYN-REV-002` | `SYN-REV-002\|Card B\|BETA` | `1B568F0B9565BDA8E1DE8DF2A6407F41B6A8C0DB40EF7BB7832DBFBE1C7ADED2` |
| `SYN-MANIFEST-001` | İki satır, yukarıdaki sırayla, LF separator | `A965140B5532B8F4C588720898B5F82024B10C94D11398501F7BA92D6900D620` |

## 6. Transition ve negatif-yol functional rehearsal'ı

| Sıra | Eylem / beklenen kontrol | Sonuç |
|---|---|---|
| 1 | `NOT_STARTED → COLLECTING` atlama denemesi | `PASS`: reddedildi |
| 2 | `NOT_STARTED → SCOPING`; soru, kapsam, R0, stop rule, budget=0 | `PASS` |
| 3 | `SCOPING → PROTOCOL_REVIEW`; QA + Data/Ethics kontrolü | `PASS` işlevsel review |
| 4 | `APPROVED_TO_COLLECT`; yalnız sentetik fixture, dış eylem yok | `PASS` dry-run scope |
| 5 | `COLLECTING → DATA_FROZEN`; manifest/hash | `PASS` |
| 6 | `CODING`; N≤50 nedeniyle %100 çift kontrol | `PASS`: 2/2 exact agreement |
| 7 | `SYNTHESIS`; claim/lineage/falsifier yazımı | `PASS` |
| 8 | Package Lead'in kendi QA'sını verme denemesi | `PASS`: reddedildi |
| 9 | `QUALITY_REVIEW`; kaynak–claim yeniden kurma | `PASS` işlevsel review |
| 10 | `RED_TEAM_REVIEW`; gerçek dünyaya genelleme saldırısı | `PASS`: scope overreach yakalandı |
| 11 | Sentetik Q1 için `READY_FOR(D-SYN-01, DISCOVERY_READY, SYN-only, v0.2, 2026-08-11T23:59:59+03:00)` | `PASS`, yalnız sentetik kapsam |
| 12 | Aynı sonucu ürün kararına genelleme | `PASS`: `NO-GO` |
| 13 | Veri dondurulduktan sonra exact match'i case-insensitive yapma | `PASS`: `CR-SYN-002 / EXPLORATORY_AMENDMENT`; geriye dönük readiness yok |
| 14 | “Bu iki kayıt tüm gelecekteki kayıtları temsil eder mi?” | `PASS`: `INCONCLUSIVE`; readiness yok |
| 15 | R2 sonuçsuzluğu risk kabulüyle aşma denemesi | `PASS`: reddedildi |
| 16 | Fixture'a sentetik de olsa kişi e-postası ekleme denemesi | `PASS`: `STOPPED_RISK`; ekleme yapılmadı |
| 17 | Package Lead'in tek başına risk durumunu yeniden açması | `PASS`: reddedildi; Governance + Data/Ethics gerekir |

Buradaki `PASS`, yalnız beklenen kontrol davranışının sentetik provada görüldüğünü belirtir; gerçek reviewer sign-off'ı veya G0 koşul 8 onayı değildir.

### 6.1 Kanonik sentetik transition audit log'u

**Protocol:** `PROTO-SYN-001-v0.2`
**Clock:** Aşağıdaki 2000-01-01 zamanları gerçek duvar saati değil, deterministik sentetik replay clock'udur.
**Actor namespace:** `SYN-ACTOR-*` rolleri gerçek kişi veya AI ajan kimliği değil, görev ayrılığı kontrollerini sınayan fixture aktörleridir.

| Event | case / branch / base | from | to / sonuç | actor | timestamp | reason | artifact_version | required_approvals | open_findings |
|---|---|---|---|---|---|---|---|---|---|
| `EV-SYN-001` | `CASE-GATE / NEG-SKIP / ROOT` | `NOT_STARTED` | `COLLECTING` reddi | `SYN-ACTOR-PL` | 2000-01-01T00:00:00Z | Atlanan kapıyı negatif test et | `PROTO-SYN-001-v0.2` | Governance | `NONE`; rejection expected |
| `EV-SYN-002` | `CASE-MAIN / MAIN / ROOT` | `NOT_STARTED` | `SCOPING` | `SYN-ACTOR-PL` | 2000-01-01T00:00:01Z | Soru, scope, stop rule ve budget=0 kaydı | `PROTO-SYN-001-v0.2` | Package Lead | `NONE` |
| `EV-SYN-003` | `CASE-MAIN / MAIN / EV-SYN-002` | `SCOPING` | `PROTOCOL_REVIEW` | `SYN-ACTOR-QA` | 2000-01-01T00:00:02Z | Yöntem/risk fixture review | `PROTO-SYN-001-v0.2` | Methods/QA + Data/Ethics | `NONE` simulated |
| `EV-SYN-004` | `CASE-MAIN / MAIN / EV-SYN-003` | `PROTOCOL_REVIEW` | `APPROVED_TO_COLLECT` | `SYN-ACTOR-GOV` | 2000-01-01T00:00:03Z | Yalnız iki sentetik kayıt; dış eylem yok | `PROTO-SYN-001-v0.2` | Governance | `NONE` simulated |
| `EV-SYN-005` | `CASE-MAIN / MAIN / EV-SYN-004` | `APPROVED_TO_COLLECT` | `COLLECTING` | `SYN-ACTOR-PL` | 2000-01-01T00:00:04Z | Frozen fixture'ı yükle | `PROTO-SYN-001-v0.2` | Package Lead | `NONE` |
| `EV-SYN-006` | `CASE-MAIN / MAIN / EV-SYN-005` | `COLLECTING` | `DATA_FROZEN` | `SYN-ACTOR-DATA` | 2000-01-01T00:00:05Z | İki kayıt stop floor'u karşıladı | `SYN-MANIFEST-001-v0.2` | Data Steward | `NONE` |
| `EV-SYN-007` | `CASE-MAIN / MAIN / EV-SYN-006` | `DATA_FROZEN` | `CODING` | `SYN-ACTOR-PL` | 2000-01-01T00:00:06Z | Exact token analizi | `CODE-SYN-001-v0.2` | Package Lead | `NONE` |
| `EV-SYN-008` | `CASE-MAIN / MAIN / EV-SYN-007` | `CODING` | `SYNTHESIS` | `SYN-ACTOR-PL` | 2000-01-01T00:00:07Z | Claim ve sınır kaydı | `CLM-SYN-v0.2` | Package Lead | `CLM-SYN-002/003 düşük kanıt` |
| `EV-SYN-009` | `CASE-SELF-QA / NEG-SELF-QA / EV-SYN-008` | `SYNTHESIS` | self-QA reddi | `SYN-ACTOR-PL` | 2000-01-01T00:00:08Z | Görev ayrılığı negatif testi | `CLM-SYN-v0.2` | Ayrı QA | `NONE`; rejection expected |
| `EV-SYN-010` | `CASE-MAIN / MAIN / EV-SYN-008` | `SYNTHESIS` | `QUALITY_REVIEW` | `SYN-ACTOR-QA` | 2000-01-01T00:00:09Z | Manifest–analysis–claim reconstruction | `QA-SYN-001-v0.2` | Methods/QA | `CLM-SYN-002 overreach` |
| `EV-SYN-011` | `CASE-MAIN / MAIN / EV-SYN-010` | `QUALITY_REVIEW` | `RED_TEAM_REVIEW` | `SYN-ACTOR-RT` | 2000-01-01T00:00:10Z | Gerçek dünyaya genelleme saldırısı | `RT-SYN-001-v0.2` | Independent Red-Team | `CLM-SYN-002 MAJOR` |
| `EV-SYN-012` | `CASE-MAIN / MAIN / EV-SYN-011` | `RED_TEAM_REVIEW` | `READY_FOR(D-SYN-01, DISCOVERY_READY, SYN-only, v0.2, 2026-08-11T23:59:59+03:00)` | `SYN-ACTOR-QA` + `SYN-ACTOR-DEC` | 2000-01-01T00:00:11Z | Yalnız exact-token sentetik sorusu yeterli | `DEC-SYN-001-v0.2` | QA + Decision Owner | `CLM-SYN-002/003 kapsam dışı` |
| `EV-SYN-013` | `CASE-OVERREACH / NEG-REAL-WORLD / EV-SYN-012` | `READY_FOR` | Ürün kararına genelleme reddi | `SYN-ACTOR-DEC` | 2000-01-01T00:00:12Z | Kapsam dışı readiness talebi | `DEC-SYN-001-v0.2` | QA + Decision Owner | `NONE`; rejection expected |
| `EV-SYN-014` | `CASE-AMEND / POST-DATA / EV-SYN-006` | `DATA_FROZEN` | `DATA_FROZEN`; `EXPLORATORY_AMENDMENT` branch açıldı | `SYN-ACTOR-QA` | 2000-01-01T00:00:13Z | Case-insensitive analiz önerisi | `CR-SYN-002-v0.1` | QA + Governance | Geriye dönük readiness yasak |
| `EV-SYN-015` | `CASE-INCONCLUSIVE / NEG-FLOOR / EV-SYN-008` | `SYNTHESIS` | `INCONCLUSIVE` | `SYN-ACTOR-QA` | 2000-01-01T00:00:14Z | Temsil iddiası için evidence floor yok | `CLM-SYN-003-v0.2` | QA | Yeni protokol olmadan açılamaz |
| `EV-SYN-016` | `CASE-RISK / NEG-PII / EV-SYN-005` | `COLLECTING` | `STOPPED_RISK` | `SYN-ACTOR-DATA` | 2000-01-01T00:00:15Z | PII ekleme negatif testi | `INC-SYN-001-v0.1` | Her aktör stop tetikleyebilir | PII eklenmedi |
| `EV-SYN-017` | `CASE-RISK / NEG-REOPEN / EV-SYN-016` | `STOPPED_RISK` | Tek taraflı reopen reddi | `SYN-ACTOR-PL` | 2000-01-01T00:00:16Z | Yetkisiz reopen negatif testi | `INC-SYN-001-v0.1` | Governance + Data/Ethics | `NONE`; rejection expected |

Her `case/branch` kendi `base` snapshot'ından deterministik olarak replay edilir; satırlar tek bir lineer package geçmişiymiş gibi zincirlenmez.

### 6.2 Sentetik change-request artifact'ı

| Zorunlu alan | `CR-SYN-002-v0.1` kaydı |
|---|---|
| Initiator | `SYN-ACTOR-QA` |
| Oluşma zamanı | 2000-01-01T00:00:13Z, sentetik replay clock |
| Pre/post-data | `POST-DATA`; base snapshot `EV-SYN-006 / SYN-MANIFEST-001-v0.2` |
| Değişen alan | `analysis.match_mode` |
| Eski değer / sürüm | `case_sensitive_exact / CODE-SYN-001-v0.2` |
| Yeni değer / sürüm | `case_insensitive_exact / CODE-SYN-001-v0.3-exploratory` |
| Sınıf | `EXPLORATORY_AMENDMENT`; ana baseline değişmez |
| Gerekçe | Case-insensitive alternatif analizin sonuç duyarlılığını sınamak |
| Etkilenen artifact/claim/package/decision | `CODE-SYN-001`; yeni `CLM-SYN-004-EXPLORATORY`; `SYN-00`; `D-SYN-01` mevcut readiness'i **etkileyemez** |
| Kanıt etkisi | Raw fixture ve manifest değişmez; yalnız fork edilmiş derived analysis oluşur |
| Risk / bias | Data-after-seeing ve researcher-degrees-of-freedom; sonuç seçme riski |
| Approver / tarih | `SYN-ACTOR-QA + SYN-ACTOR-GOV`, 2000-01-01T00:00:13Z, yalnız sentetik branch |
| Migration | Eski baseline/readiness korunur; yeni analiz ayrı ID alır, geriye dönük replace yok |
| Re-review | `CODE-SYN-001-v0.3-exploratory` için yeni QA + Red-Team zorunlu; tamamlanana kadar `NOT_READY` |
| Rollback | Exploratory branch tombstone edilir; `CODE-SYN-001-v0.2` ve manifest değişmeden kalır |
| Sonuç | Change-control davranışı test edildi; bu artifact gerçek araştırmada değişiklik yetkisi vermez |

## 7. Claim ledger testi

| Claim ID | İfade | Tür / risk | Source + lineage | Analiz / reproduction | Falsifier | Decision link | Güven / hüküm | Valid-until / refresh |
|---|---|---|---|---|---|---|---|---|
| `CLM-SYN-001` | İki dondurulmuş fixture kaydından biri exact `ALPHA` içeriyor | `OBSERVATION / CRITICAL / R0` | `SYN-REV-001/002 → SYN-MANIFEST-001-v0.2`, 2026-08-11 | UTF-8 byte hash + case-sensitive exact match; `REPRO-SYN-001` ikinci aynı-yöntem kontrolü | Frozen iki kaydın hiçbirinde exact token bulunmaması | `D-SYN-01`, yalnız `SYN-only` | `HIGH / OBSERVED + QA-VERIFIED`; bağımsız kanıtla corroboration iddiası yok | 2026-08-11T23:59:59+03:00; fixture/hash değişirse reopen |
| `CLM-SYN-002` | Fixture, gerçek kullanıcıların bir tercihini gösterir | `ASSUMPTION / EXPLORATORY` | Kanıt artifact'ı yok; researcher-generated test iddiası, 2026-08-11 | Gerçek kullanıcı/popülasyon verisi yok | Herhangi bir geçerli gerçek kullanıcı örneklemiyle uyumsuzluk veya kapsam lineage yokluğu | Hiçbir gerçek Dxx'e bağlanamaz | `LOW / REJECTED_FOR_READINESS`; `RT-SYN-001 MAJOR` | N/A; ancak yeni onaylı protokolle yeni claim olabilir |
| `CLM-SYN-003` | İki kayıt gelecekteki bütün kayıtları temsil eder | `HYPOTHESIS / R2 test branch` | Kanıt yok, 2026-08-11 | Temsil/örneklem frame'i yok | Temsil edilemeyen tek geçerli karşı örnek veya frame yokluğu | Hiçbir Dxx'e bağlanamaz | `LOW / INCONCLUSIVE` | N/A; yeni CR/protokol gerekir |

### 7.1 Reproduction kaydı

`REPRO-SYN-001` aynı üç payload'ın UTF-8/SHA-256 değerlerini ikinci kez hesapladı ve manifestteki üç hash ile birebir eşleşti. Bu yalnız aynı observation'ın yöntemsel yeniden üretimidir; bağımsız kaynak corroboration'ı değildir. Kaynak: local read-only PowerShell calculation, 2026-08-11; güven `HIGH`, fixture scope.

## 8. Bağımsız denetim özeti

| Audit ID | Reviewer | Tarih | Kapsam | Sonuç / açık finding |
|---|---|---|---|---|
| `QA-SYN-AUDIT-001` | `/root/ros_requirement_audit` | 2026-08-11 | G0 ve requirement fidelity | `P1`: transition audit alanları, claim lineage ve reviewer artifact'ları eksikti; validated PASS geri çekildi |
| `RT-SYN-AUDIT-001` | `/root/ros_operability_audit` | 2026-08-11 | Bypass/negative path | Queue güvenli; `CR-G0-001` kısa biçimi fazla geniş ve onaylanamaz |
| `FID-SYN-AUDIT-001` | `/root/competitor_research` | 2026-08-11 | Founder intake fidelity | Beş anlam ayrıntısı ve provenance dili için düzeltme önerildi |
| `QA-SYN-REVIEW-002` | `/root/ros_requirement_audit` | 2026-08-11 | v0.2 requirement/lineage replay | `PASS`; koşul 8 QA açısından kapatılabilir |
| `RT-SYN-REVIEW-002` | `/root/ros_operability_audit` | 2026-08-11 | v0.2 branch/change replay | `FAIL/P1`; change artifact ve branch/base kimliği eksikti; yukarıda düzeltildi |
| `RT-SYN-REVIEW-003` | `/root/ros_operability_audit` | 2026-08-11 | Düzeltilmiş branch/change/RACI replay | `PASS`; P0/P1 yok, koşul 8 kapatılabilir |

`QA-SYN-REVIEW-002` ve `RT-SYN-REVIEW-003` birlikte koşul 8'i sentetik scope için kapatır. AI/alt ajan review'ları süreç testinde bağımsız context sağlar, fakat v1.2'deki gerçek-insan imzası yerine geçmez.

## 9. G0 sekiz şartı

| # | Şart | Durum |
|---|---|---|
| 1 | Harita, karar kartları ve kapsam kullanıcı onayı | `PASS` |
| 2 | Gerçek kişilerle RACI ve görev ayrılığı | `FAIL — BLOCKER` |
| 3 | State-transition, istisna ve audit log | `PASS` |
| 4 | 36 contract'lı döngüsüz hard DAG | `PASS` |
| 5 | Veri/PII/etik/ToS/bütçe/değişiklik kuralları | `PASS` |
| 6 | VOC/codebook/IRR policy defaults | `PASS` |
| 7 | Red-team ve sonuçsuzluk prosedürü | `PASS` işlevsel; insan reviewer koşulu #2'de açık |
| 8 | Sentetik dry-run | `PASS`: `QA-SYN-REVIEW-002` + `RT-SYN-REVIEW-003` |

## 10. Hüküm ve kapanış yolları

**Hüküm:** `G0-CANDIDATE OPEN`; `G0-GOVERNANCE-BASELINE APPROVED = NO-GO`.

Mevcut tek açık blokör `G0-02`: gerçek kişilerle RACI/görev ayrılığı.

Bu blokörü kapatmanın iki dürüst yolu vardır:

1. **Human-RACI yolu:** Package/Governance, QA, Data-Ethics ve bağımsız Red-Team için isimlendirilmiş insanlar ve COI/yeterlilik kayıtları atanır.
2. **Dar politika değişikliği yolu:** Kullanıcı, önce exact kapsamı/formel diff'i yazılmış `CR-G0-001` değişiklik talebini değerlendirir. Bu yol onaylanırsa yeni ROS semver'i üretilir; yalnız açıkça izin verilen R0/R1 kaynak ve state'leri için AI operasyonel reviewer'ları kullanılabilir. R2/R3, hukuk, çocuk, güvenlik, psychometrics ve gerçek kullanıcı verisi yine nitelikli insan sign-off'ı olmadan bloklanır.

Bu iki yoldan biri açıkça onaylanmadan MKT-01 `SCOPING` veya collection başlatılmaz.
