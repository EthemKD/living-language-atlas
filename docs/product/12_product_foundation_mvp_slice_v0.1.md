# Dil Öğrenme Uygulaması — Ürün Temeli ve İlk MVP Kesiti

**Sürüm:** 0.1
**Tarih:** 17 Ağustos 2026
**Durum:** Araştırmaya dayalı ürün yönü; build/launch kararı değildir
**Arayüz dili:** English
**İlk pedagojik benchmark:** English-speaking, Russian A0–A1 learner
**Platform hedefi:** iOS ve Android; teknoloji seçimi henüz yapılmadı

## 1. Bu dosyanın yaptığı karar

Bu dosya, önceki pazar/VOC araştırması ile 17 Ağustos 2026 tarihindeki güncel resmî ürün taramasını tek bir ilk ürün kesitine dönüştürür. Amaç “her rakibin bütün özelliklerini eklemek” değil; ilk kullanıcı için gerçekten yapılabilir, ölçülebilir ve güvenli bir öğrenme döngüsü seçmektir.

Bu sürümde aşağıdaki dört karar alınmıştır:

1. İlk ürün, **genel AI sohbeti veya sosyal ağ** olmayacak.
2. İlk kullanıcı işi, “dersi tamamlamak” değil, **ilk basit gerçek hayat etkileşimini yönetebilmek** olacak.
3. İlk dikey kesit, English UI ile **Russian A0 → ilk tanışma / kafe etkileşimi** olacak. Bu, ticari ilk dil veya nihai hedef pazar kararı değildir; içerik, ses, yazı sistemi ve konuşma kalite standardını sınamak için seçilmiş benchmarktır.
4. İnsanla serbest eşleşme, video, coin karşılığı öğretme, abonelik, story/podcast üretim yüzeyi ve seviye/lig ekonomisi **MVP dışındadır**.

## 2. Kanıt zinciri ve sınır

Bu kararlar üç ayrı kanıt türüne dayanır:

| Kanıt | Ne söylüyor | Ne söylemiyor |
|---|---|---|
| Önceki public VOC paketi | Kurs tamamlama ile spontane üretim arasında algılanan boşluk; düşük baskılı konuşma provasının değeri; insan eşleşmesinin safety/likidite sorunu | Pazar büyüklüğü, ödeme isteği veya öğrenme etkisinin kesin kanıtı |
| Güncel resmî rakip sayfaları | Rakiplerin hangi özellikleri gerçekten sunduğunu ve Rusça kapsamını | Özelliğin bütün kullanıcılarda işe yaradığını |
| CEFR A1 descriptorları | İlk görev için makul iletişimsel “can-do” sınırı | Uygulamanın tek başına CEFR sertifikası verebileceğini |

Public kaynaklar login gerektirmeyen, read-only incelemeyle kullanıldı. Bu nedenle sonuçlar **feature evidence** ve tasarım hipotezidir; ücretli akış, kişisel uygulama içi deneyim, öğrenci görüşmesi veya öğrenme sonucu kanıtı değildir.

## 3. Rakip taramasından çıkan net hüküm

### 3.1 Pazarda zaten bulunanlar

| Alan | Güncel örnek | Ürünümüze etkisi |
|---|---|---|
| Oyunlaştırılmış günlük ders + yazı sistemi | Duolingo, Rusça/Ukraynaca için yazı sistemini ayrı öğretme yaklaşımını açıkça anlatıyor. [Kaynak](https://blog.duolingo.com/learning-other-writing-systems/) | “Alfabe + streak + kısa alıştırma” özgün değildir. Kiril öğrenimi ayrı bir yeterlik kapısı olmalı. |
| Yapılandırılmış dört-beceri kurs ve community correction | Busuu, Rusça A1–B2 kursu, 3–5 dakikalık konu dersleri, dört beceri ve native community düzeltmesi sunduğunu söylüyor. [Kurs kapsamı](https://help.busuu.com/hc/en-gb/articles/16519527128849-How-many-languages-can-I-learn), [ürün modeli](https://help.busuu.com/hc/en-us/articles/15936615354641-What-is-Busuu) | “CEFR + kısa ders + correction” tek başına fark yaratmaz. Bizim ilerleme göstergemiz course completion yerine değişken görevde kanıt göstermeli. |
| Açık gramer ve native ses | LingoDeer, Rusça için English-speaker odaklı A1–B1 kapsam, gramer rehberleri ve native-speaker audio vadediyor. [Kaynak](https://www.lingodeer.com/language/russian) | “AI her şeyi açıklar” diyerek açıklamayı yok etmek yanlış olur. Kısa, doğru ve bağlama bağlı açıklama ilk içerikte bulunmalı. |
| Native video + AI konuşma + gerçek hayat rolü | Memrise’ın Rusça sayfası native video, AI tutor/MemBot ve senaryo konuşmaları sunuyor. [Kaynak](https://www.memrise.com/en/learn-russian) | Rol oyunu tek başına farklılaştırıcı değildir. Her rol oyunu belirli bir skill, varyasyon ve geri kazanım testine bağlı olmalı. |
| AI-first konuşma akışı | Speak, konuşma yapısını iyi bir referans olsa da English speaker için Rusça ya da Almanca kurs sunmuyor; güncel hedef dil listesinde bu ikisi yok. [Kaynak](https://help.speak.com/en/articles/8880569-what-languages-can-i-learn-with-speak) | Konuşma deneyimi kopyalanacak “özellik” değil, kalite standardı çıkarılacak referanstır. Hedef dil kapsamı ürün kalitesinin parçasıdır. |
| İnsan eşleşmesi, derecelendirme ve moderation | HelloTalk; eşleşme, rating, doğrulanmış profil, block/report ve 24/7 moderation iddialarıyla birlikte text/voice/video yüzeyleri sunuyor. [Kaynak](https://www.hellotalk.com/en/features/language-exchange) Tandem’in kuralları flört, spam ve scam’i açık risk olarak sayıyor. [Kaynak](https://tandem.net/pages/how-to-report-someone) | “İnsanlarla konuşturmak” yalnızca chat özelliği değildir. Safety, evidence, moderation, match intent ve kullanıcı kontrolü ayrı bir ürün sistemi gerektirir. MVP’ye alınmaz. |
| Tutor pazar yeri | Preply’nin çekirdeği insan tutor ve 28 günlük yenilenen ders aboneliğidir; Duolingo-benzeri self-study ürün değildir. [Kaynak](https://help.preply.com/en/articles/4966680-how-does-my-preply-subscription-work) | İnsan öğretmen pazaryeri, ilk ürünün kapsamı değildir. Bu uygulama ilk anda Preply alternatifi olmaya çalışmayacak. |

### 3.2 Farklılaşma adayı

Özgünlük, aşağıdakilerin aynı ekranda bulunması değildir: AI chat, quiz, roleplay, story, streak, coins, social feed.

**Aday farklılaşma:**

> Her içerik ve pratik modu, aynı küçük gerçek hayat becerisinin kanıtına bağlanır: *öğren → düşük riskli prova → değişken gerçek hayat görevi → hatayı kaynakla onar → 24 saat sonra yeniden üret.*

Bu çalışma adıyla **Skill-bound Guided Practice Loop**tur. Kullanıcıya “bugün 50 XP aldın” yerine “yeni bir kafe bağlamında sipariş verebildin; `Повторите, пожалуйста` onarım ifadesini henüz bağımsız kullanmadın” gibi açıklanabilir durum verir.

Bu **doğrulanmış pazar talebi değil**, test edilmesi gereken ürün hipotezidir. Rakiplerin çoğu parçaları sunuyor; bu düzeyde şeffaf bir skill→evidence→next action zincirini sunup sunmadıkları ayrı, hands-on bir sonraki inceleme konusudur.

## 4. İlk kullanıcı işi

**Prototip persona (varsayım):** English UI kullanan, Rusçaya sıfırdan başlayan yetişkin; “alfabeyi tanımak istiyorum ama gerçek bir ilk etkileşimde donmak istemiyorum” diyor.

**İlk job-to-be-done:**

> “Rusça metni tamamen yabancı görmeden okuyabilmek; kendimi çok basit biçimde tanıtabilmek; bir kafede nazikçe sipariş verebilmek; anlamadığımda konuşmayı onarabilmek.”

Bu iş, CEFR A1’in kişisel ayrıntılar ve somut ihtiyaçlar için basit ifadeler kullanma, basit soru sorma/yanıtlama ve karşı taraf yavaş/destekleyici olduğunda etkileşim kurma tanımıyla uyumludur. [CEFR global scale](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale), [A1 spoken-use descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use)

Bu işin tamamlanması **“A1 oldun”**, “akıcı oldun” veya “aksan doğru” anlamına gelmez.

## 5. MVP: `First Encounter` mission set

### 5.1 Kapsam

İlk ürün kesiti tek bir 20–30 dakikalık mission seti ve 24 saat sonra kısa bir geri çağırma kontrolünden oluşur. Dört modül vardır:

| Modül | Kullanıcının yapabildiği iş | Kanıt türü | Bilinçli sınır |
|---|---|---|---|
| RUS-00 — Read the sign | Kiril harf/ses ilişkisini ayırır, özellikle Latin benzeri ama farklı sesli harf tuzaklarını fark eder; kısa yeni kelimeleri okur | Seçilmiş harf-ses ve yeni-kelime denemeleri | İlk günde bütün yazı sistemi üzerinde “ustalık” iddiası yok |
| RUS-01 — First contact | Selam verir; adını, nereli olduğunu söyler; ad/orijin sorar ve cevaplar | Prompt değişince üretilen kısa cevap | Tam çekim paradigması öğretilmez |
| RUS-02 — Café transaction | Menü ister, bir içecek/yiyecek sipariş eder, fiyatı sorar | Değişken ürün/fiyat ile mission completion | Serbest restoran diyaloğu simüle edilmez |
| RUS-03 — Repair | “Tekrar eder misiniz?”, “Daha yavaş lütfen”, “Anlamıyorum” ile etkileşimi onarır | Beklenmeyen bir hız/yanlış-anlama eventinde uygun onarım | Başarısızlık ceza değil, desteklenen beceridir |

İlk çekirdek ifade seti, yüksek frekanslı kalıplar olarak sunulur: `Здравствуйте`, `Меня зовут …`, `Как вас зовут?`, `Откуда вы?`, `Я из Турции`, `Мне, пожалуйста, кофе`, `Можно меню, пожалуйста?`, `Сколько стоит?`, `Повторите, пожалуйста`, `Медленнее, пожалуйста`, `Я не понимаю`, `Спасибо`, `До свидания`.

Her vurgu işareti, çeviri, ses kaydı ve gramer açıklaması yayın öncesinde yetkin Rusça içerik incelemesinden geçmelidir. `меня зовут`, `из + yer` ve `мне, пожалуйста` ilk aşamada yararlı kalıplar olarak öğretilir; uygulama bunları “bütün case sistemini öğrendin” diye sunmaz. `ты/вы` farkı da görünür biçimde açıklanır.

### 5.2 Her modülün zorunlu öğrenme döngüsü

1. **Notice:** Kısa native/validasyonlu ses ve metinle hedefi fark et.
2. **Understand:** Bir cümlelik, bağlamlı açıklamayı gör; uzun genel dilbilgisi duvarı yok.
3. **Retrieve:** Kelimeyi sadece tanıma değil, destekli üretimle çağır.
4. **Vary:** İsim, şehir, ürün veya fiyat değişince aynı işlevi yeniden yap.
5. **Rehearse:** Bounded AI roleplay içinde hedef işlevi uygula.
6. **Repair:** Sistem beklenmedik anlaşılmama/tekrar event’i verince onarım ifadesini kullan.
7. **Return:** 24 saat sonra farklı bir bağlamda kısa retrieval check yap.

Bu akış, AI’ın “dostça uzun sohbet” üretmesi için değil, öğrenilen becerinin bağlam değişince sürüp sürmediğini görmek için tasarlanır.

## 6. AI’ın rolü: yardımcı, öğretmen taklidi değil

### Yapacakları

- Kısıtlı hedef dil/kelime/niyet kartına göre varyasyonlu prova üretmek.
- Önceden tanımlanmış mission state’ini tutmak: kullanıcı ne istiyor, karşı taraf ne cevap verdi, hangi onarım gerekti?
- Geri bildirimde sırasıyla şunu göstermek: kullanıcının niyeti, görülen hata/eksik, kabul edilebilir düzeltme, neden, bir yeni varyasyon.
- Belirsiz olduğunda kesin puan yerine **“unscored — try again or type it”** demek.

### Yapmayacakları

- Her serbest sohbeti ders veya seviye değerlendirmesi diye sunmak.
- Tek bir speech-recognition sonucu ile otomatik ilerleme ya da “aksan yanlış” hükmü vermek.
- Kaynak/reviewer bilgisi olmayan gramer düzeltmesini kesin doğru diye sunmak.
- “Native-like”, “fluent” veya CEFR level claim üretmek.
- Aynı hedefe bağlanmayan podcast, hikâye, özet, quiz veya oyunları sınırsız üretmek.

Bu yaklaşım, education’da human oversight ve açıklanabilirliğin korunması gerektiğini vurgulayan UNESCO ilkeleriyle uyumludur. [UNESCO GenAI guidance](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research), [UNESCO AI ethics](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)

### Speech/voice kuralı

İlk sürümde sesli input yalnız aşağıdaki koşullarda değerlendirmeye adaydır:

- hedef ifade, kabul edilebilir varyantlar ve sesli örnek insan tarafından tanımlanmışsa;
- tanıma güveni, ortam gürültüsü ve kullanıcının tekrar ihtiyacı görünür biçimde ele alınıyorsa;
- sistem yanlış-pozitif/yanlış-negatif üzerinde izleniyorsa.

Bu koşullar sağlanana kadar sesli etkinlik kullanıcıya **prova** sağlar; beceri durumunu tek başına güncellemez.

## 7. Progress tasarımı: üç şeyi birbirine çevirmemek

| Katman | Ne gösterir | Ne göstermez |
|---|---|---|
| Skill evidence | Belirli can-do’yu değişken bağlamda yapabilme | Dilin tamamındaki seviye ya da akıcılık |
| Learning habit | Geri dönüş, tekrar, planlanan görevi tamamlama | Gerçek konuşma yeterliği |
| Economy / social status | İleride olası sosyal katkı veya ödül | Öğretme kalitesi, güvenilirlik veya beceri |

İlk sürümde yalnız ilk iki katman vardır. Önerilen skill durumları:

- **Unknown:** henüz kanıt yok.
- **Emerging:** destekle yapabiliyor.
- **Functional:** yeni bir varyasyonda kendi başına yapabildi.
- **Stable:** iki bağlamda yapabildi ve gecikmeli retrieval check’i geçti.
- **Needs repair:** belirli hata/unutma nedeniyle hedefli tekrar gerekli.

Bir doğru cevap kullanıcıyı “mastered” yapmaz. XP, streak, leaderboards, dil seviye puanı ve coin bu skill durumunu değiştiremez.

## 8. Safety ve ekonomi: bilinçli olarak ertelenen alan

Kullanıcının “insanlara yardım ederek para/coin kazanma” fikrinin pazarda yakın örnekleri vardır; dolayısıyla bunu ilk gün farklılaştırıcı kabul etmek yanlış olur. Asıl risk, ödülün spam, sahte oturum, collusion, düşük kaliteli düzeltme veya baskıcı etkileşim üretmesidir.

İlk MVP’de:

- Kullanıcı profili, DM, feed, canlı oda, 1:1 insan eşleşmesi, video, gifting, coin, ödeme ve cash-out **yoktur**.
- Uygulama içi user-generated content depolanmaz.
- İlk sürüm için yetişkin odaklı pilot varsayımı tutulur; minörler veya canlı sosyal özellikler için ayrı age/safety/privacy/legal araştırması yapılmadan erişim açılmaz.

İleride insan pratiği düşünülürse, aşağıdaki kapılar tamamlanmadan feature açılmaz:

1. Misyon temelli, zaman sınırlı ve karşılıklı dil süresi olan oturum tasarımı.
2. Yaş, kimlik ve özellikle minör koruması için hukuki/etik inceleme.
3. Block/report, kanıt bağlamı, hızlı çıkış, itiraz/karar açıklaması ve human moderation operasyonu.
4. Dil çifti başına likidite ve no-show testi.
5. Ödül/fraud analizi ve emek/ödeme hukuku değerlendirmesi.

Bu, sosyal özelliğin “kötü” olduğu anlamına gelmez; ilk küçük ürünü güvenli ve teslim edilebilir tutar.

## 9. İlk ekran akışı (ürün değil, kabul kriteri)

1. **Onboarding:** English UI; hedef dil Russian; neden (travel / family / curiosity / work) seçimi. Bu seçim ilk mission copy’sini uyarlayabilir, müfredatı keyfi biçimde üretmez.
2. **Mission card:** “First encounter — introduce yourself and order a coffee.” Kullanıcı neyi yapacağını ve neyin kanıt sayılacağını görür.
3. **Script gate:** Kiril micro-lessons; Latin transliteration yavaşça azalır, kalıcı koltuk değneği olmaz.
4. **Guided drill:** kısa açıklama + retrieval + değişken kartlar.
5. **Bounded rehearsal:** metin veya voice; AI role target’ın dışına taşarsa kullanıcıya tekrar hedefi gösterir.
6. **Mission:** Kafe senaryosu + küçük repair olayı.
7. **Evidence card:** “yapabildin / henüz destek gerek / sonraki net adım.”
8. **Return prompt:** 24 saat sonra farklı bağlamda 60–90 saniyelik check.

Kullanıcı isterse her aşamada yazılı ipucu, yavaş ses, tekrar ve “neden böyle?” açıklamasını açabilmelidir. Bu erişilebilirlik ve utanma azaltma için zorunludur; premium upsell aracı değildir.

## 10. Başarı ve kalite ölçüleri

Bu aşamada sayı hedefi uydurulmaz. İlk prototipte izlenecek olaylar:

| Ölçü | Neyi öğreniriz | Yanlış yorumlanmaması gereken şey |
|---|---|---|
| Mission start → completion | Akış anlaşılır mı, gereksiz sürtünme var mı? | Öğrenme etkisi |
| Varyasyonlu mission sonucu | Kullanıcı sabit ezberden çıkabiliyor mu? | Genel CEFR seviyesi |
| 24h return & delayed retrieval | İlk öğrenmenin kalıcılık sinyali | Uzun dönem retention |
| Unscored / retry oranı | AI/speech değerlendirmesi güvenilir mi? | Kullanıcının başarısızlığı |
| Hint kullanımı ve repair recovery | Açıklama/onarım tasarımı işe yarıyor mu? | “Bağımlılık” |
| “What changed?” kısa kullanıcı açıklaması | Kullanıcı kendi hatasını anlayabiliyor mu? | Öğretmen sertifikası |

Her içerik bir **Content Evidence Card** taşımalıdır: target skill, seviye sınırı, kaynak, content author, language reviewer, audio source, kabul edilen varyantlar, bilinen belirsizlikler ve son doğrulama tarihi.

## 11. Kırmızı çizgiler: AI slop ve sahte ilerleme karşıtı

1. Üretilecek her içerik bir target skill’e bağlanmalı; format bolluğu kişiselleştirme değildir.
2. Scripted akış serbest konuşma diye pazarlanmaz.
3. AI kararsızsa puan vermez; kullanıcıyı haksız başarısız göstermez.
4. Düzeltme açıklamasız, kaynaksız veya “tek doğru” tonu ile sunulmaz.
5. Kullanıcı girdisi, XP, streak veya coin CEFR kanıtına çevrilmez.
6. Her hedef dilde içerik/audio/feedback kalitesi ayrı doğrulanır; düşük destekli dil ikinci sınıf olmaz.
7. İnsan geri bildirimi, AI ve uzman feedback’i aynı güven etiketiyle gösterilmez.
8. Uygulama gerçek insanlarla konuşma vaadi vermeden önce safety/match operasyonunu kanıtlar.

## 12. Bu kararın falsifier’ları

Bu ürün yönü, aşağıdakilerden biri görülürse durdurulmalı veya değiştirilmelidir:

- Kullanıcılar mission-based akışı daha anlaşılır veya daha faydalı bulmuyor, bunun yerine genel chat tercih ediyor.
- Varyasyonlu görevler, sabit alıştırmalardan anlamlı biçimde ayrışmıyor.
- 24 saatlik geri dönüşte beceri sinyali kalmıyor ve hangi müdahalenin düzelttiği belirsiz kalıyor.
- AI/speech belirsizlik oranı, güvenilir feedback deneyimi veremeyecek kadar yüksek.
- Script gate motivasyonu kırıyor ve bunu telafi eden okunabilirlik/transfer değeri oluşmuyor.
- Kullanıcılar insan pratiğine geçmek istemiyor veya güvenlik tasarımı yeterli başvuru/katılım üretmiyor.

## 13. Sıradaki uygulanabilir paketler

Bu dosya roadmap değildir; fakat büyük uygulama hedefini kontrollü parçaya bölen ilk iş sırasını kilitler.

| Paket | Somut çıktı | Önkoşul | Şimdiki durum |
|---|---|---|---|
| P1 — Russian A1 content blueprint | RUS-00..03 için skill graph, target phrases, accepted variants, content evidence card şablonu, reviewer checklist | Bu temel | Başlatılabilir |
| P2 — UX prototype specification | İlk 8 ekranın state, copy, empty/error/uncertainty durumları; iOS/Android parity acceptance criteria | P1 | P1 sonrası |
| P3 — AI evaluation harness | 50–100 kontrollü learner inputu ile feedback/speech karar matrisi; yanlış kabul/yanlış düzeltme kaydı | P1 + validasyonlu dil içeriği | P1 sonrası |
| P4 — Technical feasibility | Cross-platform seçenekleri, offline/content/audio, privacy/data map, AI maliyet tavanı ve failure modes | P2 + P3 | Bilinçli olarak ertelendi |
| P5 — Human practice feasibility | Safety research, moderation runbook, liquidity test, age/privacy/legal gates | P1–P4 ve ayrı yetki | MVP dışı |

## 14. Net olmayan şeyler

- Bu ürünün kullanıcılar tarafından istenip istenmeyeceği.
- İlk ücretli teklifin ne olacağı veya ücretsiz sürümün sınırı.
- Russian’ın ticari ilk dil olup olmayacağı; German ne zaman açılacağı.
- Gerçek konuşma/öğrenme etkisinin alternatiflere göre daha iyi olup olmayacağı.
- İnsan pratiğinin güvenli, ekonomik ve yeterli likiditede olup olmayacağı.
- Mobil teknoloji yığını, backend, model sağlayıcısı, ödeme veya veri mimarisi.

Bu belirsizlikleri gizlememek, hem “AI slop” hem de sahte ürün kesinliği riskini azaltır.

## 15. Önceki çalışmalarla ilişki

- `10_mkt_lite_pilot_report.md`: kategori haritası, ilk rakip sinyalleri ve Guided Practice Loop fırsat hipotezi.
- `11_voc_deep_dive_report.md`: 78 manuel kodlanmış public kullanıcı sinyali; course/AI ve sosyal pain point’ler; anti-slop kuralları.
- Bu dosya: söz konusu hipotezi tek mission seti, kabul kriterleri, deferrals ve falsifier’lara dönüştürür.

Bu üç dosya birlikte okunmalıdır. Buradaki hiçbir ürün yönü, kullanıcı araştırması, uzman pedagojik inceleme, güvenlik/hukuk araştırması ve teknik feasibility’nin yerine geçmez.
