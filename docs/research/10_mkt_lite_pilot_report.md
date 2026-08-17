# Dil Öğrenme Uygulaması — Hafif Pazar ve Kullanıcı Sinyali Pilotu

**Sürüm:** 0.1
**Tarih:** 12 Ağustos 2026
**Kapsam:** 11 founder-nominated seed ürün; public, login gerektirmeyen resmî sayfalar ile küçük ve yönsel public kullanıcı-sinyali örneklemi
**Durum:** Araştırma çıktısı; ürün kararı veya roadmap değildir

## 1. Yönetici özeti

Bu pilotin en önemli sonucu şu: İncelediğimiz 11 ürün tek bir “Preply/Duolingo rakipleri” kümesi değildir. En az dört farklı kategori vardır:

1. **Eşler arası dil değişimi ve topluluk:** Tandem, HelloTalk, Lingbe, Hilokal
2. **Ücretli insan öğretmen/pazar yeri:** italki, Preply, Cambly
3. **Yapılandırılmış kendi kendine öğrenme:** Busuu, Duolingo
4. **AI konuşma/telaffuz pratiği:** Speak, ELSA

Ürünler giderek birbirlerinin alanına giriyor. Hilokal topluluk ile AI tutorü; Busuu yapılandırılmış kurs ile AI konuşmayı ve topluluk geri bildirimini; Preply insan öğretmen ile ders dışı AI araçlarını; Duolingo oyunlaştırılmış kurs ile AI rol oyununu birleştiriyor. Dolayısıyla “Duolingo + AI konuşma + hikâyeli senaryo + topluluk + uygulama içi para” bileşenlerinin hiçbiri tek başına özgünlük sağlamıyor.

Founder’ın bazı fikirlerinin yakın örnekleri zaten var:

- **Yardım ederek para/puan kazanma:** Lingbe’de kullanıcı başkalarına yardım ederek “Lingos” kazanıyor. HelloTalk’ta “Paid Practice” açan kullanıcılar yardım karşılığında elmas kazanıp bunları nakit, VIP veya HT coin’e çevirebiliyor.
- **AI’ya soru sorma ve özel ders üretme:** Speak Tutor; gramer, kelime ve telaffuz sorularını yanıtlıyor, kelime oyunları ve kişiselleştirilmiş konuşma dersleri oluşturuyor. Hilokal da özel AI dersleri ve rol oyunları sunuyor.
- **Gerçek hayat senaryolu AI pratiği:** Speak, Busuu, Duolingo Max, ELSA ve Hilokal bunun farklı sürümlerini sunuyor.
- **Ayrı oyun/ilerleme ekonomisi:** Duolingo streak, XP, ligler ve uygulama içi satın alımlarla bu alanı güçlü biçimde işgal ediyor.

Bu bir başarısızlık işareti değil. Tam tersine, olası farklılaşmanın bir “özellik listesi” değil, kopuk parçaları pedagojik ve güvenli bir döngüye bağlayan sistem olabileceğini gösteriyor:

> **Öğren → AI ile düşük riskli prova et → gerçek hayat senaryosunda uygula → yapılandırılmış ve güvenli bir insan eşleşmesinde konuş → geri bildirim al → hangi becerinin gerçekten geliştiğini güncelle.**

Bu “Guided Practice Loop” şu anda yalnız bir **fırsat hipotezidir**. Kullanıcı talebi, öğrenme etkisi, güvenlik, maliyet ve teknik uygulanabilirlik henüz doğrulanmadı.

En güçlü tekrar eden kullanıcı sinyalleri:

- İnsan bağlantısı ve gerçek konuşma çok değerli; fakat ciddi partner bulmak, karşılıklılığı korumak, taciz/dolandırıcılığı engellemek ve moderasyonu adil göstermek zor.
- İnsan öğretmenler kişiselleştirme ve hesap verebilirlik sağlıyor; fakat öğretmen seçimi, kalite değişkenliği, no-show, platform teknolojisi ve katı faturalandırma sürtünme yaratıyor.
- Yapılandırılmış kurslar alışkanlık kurduruyor; fakat kullanıcılar oyun puanının gerçek yeterlilikle karışmasından, tekrar ve bağlamsızlıktan, zayıf açıklamalardan ve gerçek konuşma eksikliğinden yakınıyor.
- AI konuşma utanma/kaygı eşiğini düşürüyor ve bol tekrar sağlıyor; fakat hatalı ya da fazla hoşgörülü konuşma tanıma, yüzeysel geri bildirim, tekrarlılık ve ürünün “genel AI sohbetine” dönüşmesi güveni azaltıyor.
- Abonelik ve iptal şeffaflığı öğrenme özelliği kadar önem taşıyor. Kullanıcı, neyin ücretsiz olduğunu, ne zaman ücretlendirileceğini ve kullanılmayan hakkın ne olacağını ilk ekranda anlamalı.

## 2. Araştırma soruları ve yöntem

### Sorular

1. Seed ürünler hangi kullanıcı işini çözüyor ve nasıl para kazanıyor?
2. Resmî vaat ile public kullanıcı deneyimi arasında hangi tekrar eden boşluklar var?
3. Founder’ın mevcut fikirlerinden hangilerinin yakın örnekleri zaten pazarda bulunuyor?
4. Rusça ve daha sonra Almanca öğrenme bağlamında hangi ürünler gerçekten ilgili?
5. Hangi fırsat alanları bir sonraki araştırmaya taşınmaya değer?

### Kanıt ayrımı

- **O — Official observation:** Ürünün kendi sayfası, yardım merkezi veya resmî mağaza kaydı.
- **U — User signal:** Public kullanıcı yorumu. Temsil gücü sınırlıdır; ihtiyaç ve sürtünme sinyali olarak kullanılır.
- **I — Inference:** O ve U’dan çıkarılan, doğrulanması gereken yorum. Ürün kararı değildir.

### Sınırlar

- Uygulamalar kurulmadı; login, deneme üyeliği, ödeme veya canlı görüşme yapılmadı.
- Fiyatlar platforma, ülkeye, promosyona ve tarihe göre değiştiği için sahte kesinlik taşıyan tek bir sayısal fiyat karşılaştırması yapılmadı. Bunun yerine **iş modeli ve ödeme mekaniği** karşılaştırıldı.
- Trustpilot çoğu üründe satın alma/iptal sorunu yaşayanları aşırı temsil edebilir. App Store ve Google Play ise yalnız seçilmiş yorumları gösterir. Bu nedenle yıldız puanları pazar payı, kalite veya memnuniyet ölçüsü olarak kullanılmadı.
- Public yorumlarda kullanıcı adı veya kişisel tanımlayıcı saklanmadı; temalar paraphrase edildi.
- “İnsanlar bunu istiyor”, “bu özellik etkili” veya “bu ürün en iyisi” sonucu çıkarılmadı.

## 3. Kategori haritası ve 11 seed ürün

| Ürün | Birincil iş / kategori | İş modeli | Resmî ürün sinyali | Yönsel kullanıcı sinyali | Rusça / Almanca ilgisi |
|---|---|---|---|---|---|
| **Tandem** | Eşler arası dil değişimi | Freemium + Pro abonelik | Metin, sesli mesaj, sesli ve görüntülü görüşme; partner bulma; insan moderasyonu iddiası | Gerçek arkadaşlık ve pratik mümkün; fakat dating-benzeri kullanım, sahte/scam profiller, ciddi partner bulma ve şeffaf olmayan ban/destek tekrar ediyor | Çok geniş dil ağı; ikisi de toplulukta bulunabilir |
| **HelloTalk** | Dil değişimi + sosyal yayın/odalar | Freemium + VIP + coin/diamond ekonomisi | Ücretsiz çekirdek değişim; VIP’de reklamsız kullanım, sınırsız çeviri/transkripsiyon ve daha geniş eşleşme; Paid Practice ile yardım eden kullanıcı ödül kazanabiliyor | Doğal konuşma ve uluslararası arkadaşlık övülüyor; dating/taciz, scam, görünürlük-paywall, reklam ve ban şeffaflığı eleştiriliyor | Resmî mağaza metni Rusça ve Almancayı açıkça sayıyor |
| **Lingbe** | Anında eşleşen sesli dil pratiği | Ücretsiz çekirdek + Lingos ekonomisi + olası IAP | Kullanıcılar başkalarına yardım ederek Lingos kazanıyor; bunları ödül ve özelliklerde kullanıyor | Public güncel nitel yorum örneklemi çok ince; bu pilot güçlü bir kullanıcı sonucu üretmiyor | Geniş dil değişimi iddiası var; dil bazında likidite doğrulanmadı |
| **Hilokal** | Ses odaları + topluluk eğitmenleri + AI tutor | Freemium + Premium Plus + hediye/IAP | Canlı ses odaları, topluluk oturumları, AI konuşma/yazma/dinleme, özel AI dersleri ve rol oyunu | Yardımcı öğretmenler/topluluk övülüyor; raporlama akışı, ayrımcılık vakaları, ses/çökme hataları ve reklamlar eleştiriliyor | Resmî mağaza açıklamalarında Rusça ve Almanca dâhil geniş destek görülüyor; kalite derinliği doğrulanmadı |
| **italki** | 1:1 insan öğretmen pazar yeri | Ders başına ödeme + kredi/paket | Öğretmen fiyatını belirliyor; kullanıcı tek ders veya kredi/paket alabiliyor; ders hedefe göre uyarlanıyor | Geniş öğretmen seçimi, esneklik ve kişiselleştirme güçlü; arayüz/video bağlantısı ve otomatik öğretmen yaptırımları üzerine şikâyetler var | Geniş öğretmen pazarı; Rusça/Almanca envanteri bu pilotte sayılmadı |
| **Preply** | 1:1 insan tutor + süreklilik aboneliği | Her tutor için ayrı, 28 günlük otomatik yenilenen ders aboneliği | Minimum 4 ders/döngü; tek seferlik normal ders yok; tutor değiştirme/plan ayarlama mümkün; kullanılmayan ve planlanmayan dersler yenilemede sona erebilir | Tutor çeşitliliği, kişiselleştirme, destek ve ilerleme övülüyor; faturalandırma/scheduling katılığı, ders sona ermesi, navigasyon ve tutor komisyonu eleştiriliyor | Geniş pazar; iki dil için de öğretmen bulunması beklenir ancak arz/kalite ayrı ölçülmeli |
| **Cambly** | Canlı İngilizce konuşma ve tutor dersi | Ders sıklığı/süre ve plan tipine bağlı abonelik | Small Groups, Private+ ve Pro; kaydedilmiş ders/transkript, otomatik geri bildirim, kurslar, yapılandırılmış Pro dersleri | Rahat ve doğal konuşma olumlu; tutor kalitesi/vetting, no-show, platform sorunları, iade ve tutor ücretleri üzerine ciddi sinyaller var. Örneklem tutor-ağırlıklı | İngilizce odaklı; Rusça/Almanca öğrenme için doğrudan rakip değil |
| **Busuu** | Yapılandırılmış CEFR-ilişkili kendi kendine öğrenme + topluluk | Ücretsiz + Premium + Premium Plus | Kısa dersler, dört beceri, native topluluk düzeltmesi; Plus’ta AI Conversations, telaffuz geri bildirimi ve kişisel hata çalışması | Açık materyal ve didaktik yapı övülüyor; ilerleme kaydı, tekrar, uygulama hataları ve otomatik yenileme eleştiriliyor | Resmî destek sayfası Almanca A1–C1, Rusça A1–B2 kursu diyor; sertifika kapsamı daha dar olabilir |
| **Duolingo** | Oyunlaştırılmış yapılandırılmış öğrenme | Reklamlı ücretsiz + IAP + Super + Max abonelik | Ücretsiz kurs yolu; Super reklamsızlık ve pratik; Max AI video call/roleplay/açıklama | Eğlence, erişilebilirlik ve alışkanlık güçlü; tekrar, yetersiz açıklama/bağlam, gerçek konuşma açığı, bug, monetizasyon ve AI doğruluğu eleştiriliyor | Rusça ve Almanca kursları mevcut; ileri özelliklerin dil eşitliği ayrıca ölçülmeli |
| **Speak** | AI-first konuşma kursu | Süreli deneme + Premium/Premium Plus abonelik | Yapılandırılmış konuşma, rol oyunu, Smart Review, Speak Tutor, özel ders üretimi; Plus’ta daha fazla kişiselleştirme/limitsiz kullanım | “Konuşmaya zorlama”, düşük kaygılı tekrar ve Free Talk övülüyor; sınırlı hedef dil, UI/replay, faturalandırma ve speech-recognition toleransı eleştiriliyor | İngilizce konuşanlar için hedef kurslar şu an İspanyolca, Fransızca, Japonca, Korece, İtalyanca ve Basitleştirilmiş Çince; Rusça/Almanca hedef kurs yok |
| **ELSA** | İngilizce telaffuz ve AI konuşma koçu | Sınırlı ücretsiz + Pro/Premium abonelik/lifetime seçenekleri | Hecesel telaffuz geri bildirimi, kişisel yol, gerçek hayat rol oyunu ve AI tutor | Detaylı telaffuz pratiği ve özgüven artışı övülüyor; yanlış puanlama, billing/support, streak hatası ve odaklı telaffuz ürününün genel AI chate dönüşmesi eleştiriliyor | İngilizce öğrenme ürünü; Rusça/Almanca için doğrudan rakip değil |

## 4. Resmî konumlandırma ve iş modeli kanıtları

### 4.1 Eşler arası dil değişimi

**Tandem.** Resmî dil değişimi sayfası ürünü, iki kişinin karşılıklı fayda sağladığı dil pratiği olarak anlatıyor; metin, ses, sesli arama ve video seçenekleri ile topluluk moderasyonunu öne çıkarıyor. Pro, ekstra araçlar sunan abonelik katmanı. [Tandem language exchange](https://tandem.net/ru/pages/language-exchange)

**HelloTalk.** Çekirdek kullanımın ücretsiz olduğu, VIP’nin reklam kaldırma, sınırsız çeviri/transliterasyon/transkripsiyon ve daha geniş partner eşleştirmesi sunduğu resmî yardım merkezinde belirtiliyor. Daha önemlisi, Paid Practice özelliğinde yardım eden kullanıcılar elmas kazanıp bunları nakit, VIP veya coin’e çevirebiliyor. Bu, “insanlara ders vererek uygulama içi para kazanma” fikrinin yakın bir pazar örneğidir. [HelloTalk cost](https://www.hellotalk.com/en/faq/general/183), [VIP benefits](https://www.hellotalk.com/en/faq/vip-and-subscriptions/231), [Paid Practice](https://www.hellotalk.com/en/faq/partner-matching/434)

**Lingbe.** Resmî sayfa, tek dokunuşla native speaker ile gerçek zamanlı konuşma ve yardım ederek Lingos kazanma döngüsünü açıkça anlatıyor. “Yardım et → ödül kazan → özelliğe harca” mekaniği founder’ın ekonomi fikriyle doğrudan örtüşüyor. [Lingbe official](https://www.lingbe.com/)

**Hilokal.** Resmî mağaza kaydı, topluluk ses odaları ve deneyimli konuşmacıların yönettiği oturumları GPT-4o tabanlı AI tutorle birleştiriyor. Premium Plus; AI, analiz ve kişiselleştirilmiş geri bildirim gibi alanları genişletiyor. [Hilokal App Store](https://apps.apple.com/us/app/hilokal-language-exchange-app/id1537500613), [Hilokal subscription update](https://www.hilokal.com/blog/basic-subscription-update/)

### 4.2 İnsan öğretmen pazarları

**italki.** Resmî App Store kaydı, CEFR düzeyine ve ihtiyaca göre kişiselleştirilen öğretmen derslerini ve “pay as you go” modelini vurguluyor. Kullanıcı ders başına ödeme yapabilir veya kredi/paket alabilir; bu, Preply’nin zorunlu süreklilik modelinden yapısal olarak farklıdır. [italki App Store](https://apps.apple.com/us/app/italki-language-learning/id1140000003)

**Preply.** Çekirdek ürün Duolingo-benzeri kendi kendine kurs değil, ücretli 1:1 tutor ilişkisidir. Reklamdaki akıcı konuşma vaadi büyük ölçüde kişisel insan dersi konumlandırmasından gelir. Her tutor için ayrı abonelik 28 günde bir yenilenir; minimum dört ders vardır ve tek seferlik normal ders alınamaz. Planlanmamış dersler yenilemede sona erebilir. [Preply subscription model](https://help.preply.com/en/articles/4966680-how-does-my-preply-subscription-work), [How Preply works](https://preply.com/en/subscription)

**Cambly.** Ürün İngilizce konuşmaya odaklanır. Small Groups, Private+ ve Pro planları; konuşma süresi/sıklığı, bire bir erişim ve yapılandırılmış profesyonel tutor desteğine göre ayrılır. Kayıt, transkript, otomatik geri bildirim ve kendi kendine etkinlikler de paketlere eklenmiştir. [Cambly plans](https://www.cambly.com/en/subscribe), [Plan comparison](https://studentsupport.cambly.com/hc/en-us/articles/19045434656013-Choose-your-plan)

### 4.3 Yapılandırılmış kendi kendine öğrenme

**Busuu.** Kısa, odaklı derslerle okuma, yazma, dinleme ve konuşmayı kapsar; native topluluktan yazılı/sözlü düzeltme almayı çekirdeğe bağlar. Premium Plus’a AI Conversations, telaffuz geri bildirimi ve geçmiş hatalardan kişisel alıştırma eklenmiştir. [What is Busuu?](https://help.busuu.com/hc/en-us/articles/15936615354641-What-is-Busuu), [Busuu Premium plans](https://www.busuu.com/en/premium-plans), [Mistake Repair](https://help.busuu.com/hc/en-us/articles/30418575225106-What-is-Mistake-Repair-and-how-can-it-help-me-learn-a-language)

**Duolingo.** Ücretsiz ders yolu reklam ve ücretli aboneliklerle desteklenir. Super reklamsızlık, limitsiz enerji ve geniş pratik; Max ise AI video call, roleplay ve kişisel açıklamalar sunar. Duolingo’nun kendi açıklamasına göre roleplay senaryo başlangıçları insan uzmanlarca yazılıyor ve AI çıktıları izleniyor; bu, “AI slop” riskine karşı insan yönetişiminin ürün içinde görünür bir örneğidir. [Duolingo product overview](https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/), [Duolingo Max](https://blog.duolingo.com/duolingo-max/)

### 4.4 AI konuşma ve telaffuz

**Speak.** Premium ve Premium Plus; tam müfredat, situational roleplay, Speak Tutor ve Smart Review sunar. Plus, limitsiz özel ders ve hata hedefleme gibi kişiselleştirmeyi artırır. Speak Tutor; soruyu yanıtlama, kelime oyunu ve özel konuşma dersi üretme işlerini tek giriş noktasında birleştirir. [Speak plan comparison](https://help.speak.com/en/articles/5358417-what-s-the-difference-between-premium-and-premium-plus), [Speak Tutor](https://help.speak.com/en/articles/11396739-what-is-speak-tutor)

**ELSA.** Ürün İngilizce telaffuz geri bildirimiyle konumlanmış, daha sonra kişisel yol, AI tutor ve gerçek hayat rol oyunu eklemiştir. Ücretsiz sürüm sınırlı ders erişimi verir. [ELSA official](https://elsaspeak.com/en), [ELSA FAQ](https://elsaspeak.com/en/faqs-en/)

## 5. Public kullanıcı sinyalleri

### 5.1 Dil değişimi: değer insanlarda, risk de insanlarda

Tandem ve HelloTalk yorumlarında olumlu taraf, kitap/alıştırma dışına çıkıp gerçek insanlarla doğal ifade öğrenmek ve arkadaşlık kurmak. Olumsuz tarafta ise aynı temalar tekrar ediyor: dil öğrenmek yerine flört arayanlar, istenmeyen mesajlar, sahte profiller/scam, kadınların orantısız mesaj yükü, ciddi partner bulamama ve moderasyon kararının nedenini anlayamama. [Tandem public reviews](https://www.trustpilot.com/review/tandem.net), [HelloTalk public reviews](https://www.trustpilot.com/review/www.hellotalk.com), [HelloTalk Google Play](https://play.google.com/store/apps/details?id=com.hellotalk)

Hilokal’ın mağaza yorumları, topluluk öğretmenleri ve konuşma odalarını öven kullanıcılar yanında; hızlı ayrılan bir kullanıcıyı raporlayamama, ayrımcı davranış için kanıt/rapor akışının zayıflığı ve ses/çökme sorunlarını gösteriyor. [Hilokal App Store](https://apps.apple.com/us/app/hilokal-language-exchange-app/id1537500613), [Hilokal regional App Store reviews](https://apps.apple.com/id/app/language-exchange-with-hilokal/id1537500613)

**I — Çıkarım:** Sosyal dil pratiğinde yalnız “report/block” butonu yeterli bir farklılaşma değildir. Öğrenme niyeti, karşılıklılık, görüşme yapısı, kanıt toplama, itiraz/ban açıklaması ve mağdurun oturumdan hızla çıkabilmesi birlikte tasarlanmalıdır. Bu alan ayrı bir safety araştırması gerektirir.

### 5.2 Tutor pazarları: doğru insan büyük değer, platform mekaniği kırılgan

italki yorumlarında öğretmen çeşitliliği, öğretmenin ilgi/düzeye uyarlanması ve ders başına esneklik sık görülen olumlu sinyaller. Arayüzün sezgisel olmaması, bağlantı/ses sorunu ve otomatik öğretmen yaptırımları olumsuz sinyal. [italki Trustpilot](https://www.trustpilot.com/review/www.italki.com)

Preply’de kişiselleştirilmiş tutor, geniş seçim ve desteğin sorunu çözmesi övülüyor. Buna karşılık resmî olarak da doğrulanan 28 günlük yenileme, planlanmayan dersin sona ermesi ve her tutor için ayrı abonelik, kullanıcı zihinsel yükü yaratıyor. Bazı kullanıcılar kullanılmayan dersleri ancak destek müdahalesiyle geri almış. [Preply Trustpilot](https://www.trustpilot.com/review/preply.com), [Preply subscription model](https://help.preply.com/en/articles/4966680-how-does-my-preply-subscription-work)

Cambly örneklemi daha küçük ve tutor-ağırlıklı; öğrenci tarafında rahat konuşma olumlu, tutor kalitesinin değişmesi/no-show/teknik sorun/iade olumsuz. Tutor tarafında düşük ücret ve zayıf destek güçlü biçimde tekrar ediyor. [Cambly Trustpilot](https://www.trustpilot.com/review/cambly.com)

**I — Çıkarım:** İnsan dersinin kalitesi yalnız eşleştirme algoritması değildir. Tutor doğrulama, görünür yetkinlik alanı, deneme oturumu, kolay değiştirme, adil ücret, no-show garantisi, teknik yedek plan ve açık iade kuralı tek bir güven sistemidir.

### 5.3 Yapılandırılmış kurslar: alışkanlık ve gerçek yeterlilik ayrılmalı

Busuu yorumları net materyal, didaktik yapı ve erişilebilir fiyatı övüyor. İlerleme kaydının kaybolması, tamamlanan dersin tekrar gösterilmesi, puanlama bug’ları ve otomatik yenileme eleştiriliyor. [Busuu public reviews](https://www.trustpilot.com/review/www.busuu.com)

Duolingo yorumlarında eğlence ve erişilebilirlik büyük çekim gücü; buna karşın tekrar, gramer/bağlam açıklamasının zayıflığı, doğal konuşmaya aktaramama, doğru cevabın kabul edilmemesi, reklam/IAP ve AI kalite kaygıları tekrar ediyor. Trustpilot örneklemi belirgin biçimde negatif seçilimlidir; bu temalar ihtiyaç sinyali olarak okunmalı, genel memnuniyet oranı olarak değil. [Duolingo public reviews](https://www.trustpilot.com/review/duolingo.com), [Duolingo AI user backlash report](https://www.polygon.com/ai-artificial-intelligence/603216/duolingo-ai-language-lessons)

**I — Çıkarım:** XP, streak ve para davranış motivasyonudur; dil yeterliliği kanıtı değildir. Tasarımda en az üç ayrı gösterge düşünülmelidir: (1) gerçek beceri/yeterlilik, (2) çalışma sürekliliği, (3) oyun ekonomisi. Birbirine çevrilebilirlerse kullanıcı “puan kasarak dil öğrendim” yanılgısına düşebilir.

### 5.4 AI konuşma: psikolojik güven yüksek, epistemik güven kırılgan

Speak kullanıcıları uygulamanın kendilerini yüksek sesle konuşmaya zorlamasını, tekrarı ve Free Talk’ı övüyor. Eleştiriler hedef dil sayısı, bazı UI/replay kararları, ücretlendirme ve voice recognition kalitesi etrafında. [Speak App Store](https://apps.apple.com/us/app/speak-language-learning/id1286609883), [Speak UK App Store review](https://apps.apple.com/gb/app/speak-language-learning/id1286609883)

ELSA kullanıcıları detaylı telaffuz pratiği ve konuşma özgüvenini övüyor. Aynı anda AI’nın doğru telaffuzu yanlış puanlaması, billing/support, streak kuralı ve odaklı telaffuz ürününün yüzeysel genel AI sohbete dönüştüğü hissi görülüyor. Bu son sinyal “çok AI özelliği eklemek” ile “daha iyi öğrenme ürünü yapmak” arasındaki farkı açıkça gösteriyor. [ELSA public reviews](https://www.trustpilot.com/review/elsaspeak.com)

**I — Çıkarım:** AI’nın en iyi ilk rolü her şeyi öğreten otorite olmak değil; düşük riskli prova, hata örüntüsü bulma, uygun alıştırmayı çağırma ve insan/müfredat tarafından sınırlandırılmış geri bildirim olabilir. Doğruluğu ölçülmeyen “kişiselleştirme” yalnız daha kişisel görünen slop üretir.

## 6. Founder fikirlerinin novelty kontrolü

| Founder fikri | Yakın pazar örneği | Pilot hükmü |
|---|---|---|
| Günlük görev ve oyun ekonomisi | Duolingo streak/quests/XP; Lingbe Lingos; HelloTalk coin/diamond | **Tek başına özgün değil.** Ekonomi ile gerçek beceri ve güvenli yardım davranışının nasıl bağlandığı araştırılmalı. |
| İnsanlara ders veya yardım vererek kazanma | Lingbe yardım→Lingos; HelloTalk Paid Practice→diamond→nakit/VIP/coin | **Doğrudan yakın örnek var.** Fraud, kalite, emek ve ödeme yükümlülükleri ayrı risk alanı. |
| Kullanıcıların karşılıklı görüşmesi | Tandem, HelloTalk, Lingbe, Hilokal | **Olgun kategori.** Asıl boşluk güvenli ve ciddi pratik kalitesi olabilir. |
| AI ile konuşma | Speak, ELSA, Duolingo Max, Busuu, Hilokal | **Temel kategori beklentisi olmaya yaklaşıyor.** Doğruluk ve pedagojik bağ önem kazanıyor. |
| Takıldığı yerden quiz/podcast/sesli özet/özel egzersiz üretme | Speak Tutor ve custom lessons; Hilokal custom AI lessons; Busuu Mistake Repair | **Kısmen pazarda.** Podcast/özet kombinasyonu ayrıca incelenmeli; format sayısı değer kanıtı değildir. |
| Günlük gramer/kelime/yazma/konuşma oyunları | Duolingo, Busuu, ELSA ve Speak’te parçalı örnekler | **Tek başına özgün değil.** Günlük görev kişisel hata/amaçtan türetilirse daha anlamlı olabilir. |
| Bölüm sonu gerçek hayat oyunu/hikâye | Duolingo Adventures/roleplay, Speak situational roleplay, ELSA roleplay, Busuu AI Conversations | **Yakın örnekler var.** Fark, senaryonun ders hedefleriyle izlenebilir bağı ve sonucun sonraki öğrenmeyi değiştirmesi olabilir. |
| Quiz veya hikâye seçimi | Birçok üründe egzersiz türü/özel ders seçimi | **Kullanıcı kontrolü değerli olabilir ama novelty değil.** Öğrenme hedefini bozmadan seçim sunma test edilmeli. |
| Ayrı dil seviye puanı | CEFR/sertifika Busuu; Duolingo Score; tutor seviye belirleme | **Mevcut örnekler var.** Güvenilir, açıklanabilir ve beceri-bazlı ölçüm zor problemdir. |

## 7. Fırsat hipotezleri — karar değil

### H1 — Guided Practice Loop

Kurs, AI prova, senaryo, güvenli insan pratiği ve hata grafiği tek öğrenme döngüsünde bağlanırsa kullanıcı “uygulamada iyiyim ama konuşamıyorum” boşluğunu daha az yaşayabilir.

**Falsifier:** Kullanıcılar bu zinciri fazla uzun/karmaşık bulur; yalnız bir mod ister; insan eşleşmesinde yeterli likidite oluşmaz; öğrenme transferi ölçülemez.

### H2 — Guided Language Exchange

Serbest sosyal feed yerine hedef, seviye, süre ve karşılıklılık kuralı olan oturumlar; iki taraf için zaman bölüşümü, hazır promptlar, otomatik sıra, oturum sonrası faydalılık değerlendirmesi ve kolay güvenlik çıkışı sunabilir.

**Falsifier:** Yapı doğallığı öldürür; insanlar kurala uymaz; moderasyon ve canlı güvenlik maliyeti ücretsiz modeli imkânsız kılar.

### H3 — Üç ayrı ilerleme sistemi

Gerçek yeterlilik/skill graph, alışkanlık/streak ve oyun ekonomisi ayrı tutulursa kullanıcı hem motive olabilir hem de gerçek seviyesini yanlış anlamaz.

**Falsifier:** Üç sistem kullanıcıyı karıştırır; yeterlilik ölçümü güvenilir değildir; ekonomi öğrenme yerine farming davranışı üretir.

### H4 — Curriculum-grounded AI Studio

AI yalnız onaylı müfredat parçalarını, kullanıcının gerçek hata geçmişini ve düzey sınırlarını kullanarak quiz, kısa sesli özet, dinleme, rol oyunu veya tekrar üretebilir. Her içerik “neden bunu görüyorum?” ve hangi kaynağa/skill’e dayandığını gösterebilir.

**Falsifier:** Kalite kontrol maliyeti çok yüksek olur; grounding hatayı engellemez; kullanıcı format bolluğunu değil hazır, kısa yolu ister.

### H5 — Güvenilir yardım ekonomisi

Ödül, mesaj sayısı veya popülerlikten değil, tamamlanmış yapılandırılmış yardım, karşılıklı değerlendirme, kalite örneklemesi ve güvenlik geçmişinden doğabilir.

**Falsifier:** Sahte eşleşme/collusion, düşük kaliteli mikro-emek, ödeme/vergilendirme/çocuk güvenliği ve hukuki sınıflandırma riski sistemi savunulamaz kılar.

## 8. Rusça ve Almanca için özel sonuç

Founder’ın kişisel önceliği Rusça, daha sonra Almanca. Mevcut seed’lerde:

- Duolingo iki dili de sunuyor. [Duolingo language list](https://www.duolingo.com/learn)
- Busuu destek sayfası Almanca A1–C1 ve Rusça A1–B2 kursu listeliyor; sertifika kapsamı Almancada B2’ye, Rusçada A1’e kadar görünüyor. Bu, “kurs var” ile “ölçüm/sertifika derinliği var”ın ayrı olduğunu gösterir. [Busuu languages](https://help.busuu.com/hc/en-us/articles/16519527128849-How-many-languages-can-I-learn), [Busuu certificates](https://help.busuu.com/hc/en-us/articles/16559434818321-What-are-Certificates-and-how-can-I-get-them)
- Speak’in İngilizce konuşanlar için güncel hedef kurs listesinde Rusça ve Almanca yok. [Speak supported courses](https://help.speak.com/en/articles/8880569-what-languages-can-i-learn-with-speak)
- ELSA ve Cambly İngilizce odaklı; Rusça/Almanca için doğrudan içerik rakibi değiller.
- Tandem, HelloTalk, Hilokal, italki ve Preply’de iki dil için insan erişimi bulunabilir; fakat özellikle Rusça için aktif arz, ciddi partner oranı, güvenlik ve saat dilimi likiditesi ölçülmeden “destekleniyor” demek yeterli değildir.

**I — Çıkarım:** İlk derin pedagojik benchmark için Rusça A1 seçmek founder motivasyonunu artırabilir ve Kiril, vurgu, hâl sistemi, fiil görünüşü gibi zorluklarla sistemi erken zorlayabilir. Ancak ilk ticari hedef dil kararı olarak yorumlanmamalıdır. İngilizce arayüz kararı ile ilk öğretilecek dil kararı ayrıdır.

## 9. Ürün ilkeleri için erken sinyaller

Bunlar roadmap değil; bir sonraki araştırmada korunması gereken tasarım kriterleridir:

1. **AI özellik sayısı kalite değildir.** Her AI çıktısının öğrenme hedefi, kaynak sınırı, hata toleransı ve kullanıcıya itiraz yolu olmalı.
2. **Gerçek beceri, streak ve para ayrılmalı.** Aralarındaki ilişki görünür ama birbirinin yerine geçmez olmalı.
3. **Sosyal güvenlik yan özellik değil, çekirdek ürün maliyetidir.** Video varsayılanı, yaş sınırı, doğrulama, kayıt/kanıt, nudity/harassment tespiti, itiraz ve kriz akışı ayrı araştırma ister.
4. **Ücretsiz katman gerçek öğrenme döngüsü sunmalı.** Yalnız demo değil; kullanıcı ödeme yapmadan ürünün temel değerini gerçekten deneyebilmeli.
5. **Abonelik açık ve affedici olmalı.** Yenileme tarihi, kullanım hakkı, iptal, ders/coin sona ermesi ve iade sade dille görünmeli.
6. **İnsan katkısı sömürülmemeli.** Yardım eden kullanıcı/tutor için kalite, emek karşılığı, güvenlik ve platform payı birlikte düşünülmeli.
7. **İçerik müfredat grafiğine bağlı olmalı.** Hikâye, quiz, podcast veya oyun yalnız eğlence formatı değil; ölçülebilir bir skill’in pratiği olmalı.
8. **iOS/Android feature parity erken test edilmeli.** Busuu’nun Mistake Repair özelliğinin yalnız iOS’ta başlaması, çapraz platform eşitliğinin otomatik olmadığını gösteriyor.

## 10. Önerilen sonraki araştırma sırası

### Paket 2 — Derin VOC: “Neden konuşamıyorum ve neden sosyal pratikten kaçıyorum?”

Önce geniş pazar değil, iki yüksek riskli problemi derinleştirmek gerekir:

- Duolingo/Busuu gibi uygulamalarda düzenli çalışıp gerçek konuşmada donan kullanıcılar
- Tandem/HelloTalk/Hilokal deneyip ciddi partner, taciz, scam veya karşılıklılık sorunu yaşayan kullanıcılar

**Ucuz public yöntem:** 6 ürün × son 12–18 aydan en fazla 20 alakalı public yorum; dengeli pozitif/orta/negatif seçim; görev-bazlı kodlama. Toplam üst sınır 120 yorum. Ham kullanıcı adı/PII saklanmaz.

**Çıktı:** Job-to-be-done, tetikleyici, beklenen sonuç, workaround, bırakma nedeni ve ödeme itirazı matrisi. Ürün kararı yok.

### Paket 3 — Rusça A1 pedagojik benchmark

Duolingo, Busuu ve bir insan-tutor yaklaşımında aynı ilk 20–30 saatlik kapsam karşılaştırılır:

- Kiril ve ses-yazı eşleme
- vurgu/telaffuz
- temel hâller
- fiil çekimi/görünüşe giriş
- dinleme ve üretim oranı
- hata açıklaması
- gerçek hayat senaryosuna transfer
- CEFR izlenebilirliği

Bu paket, “Duolingo gibi ama daha iyi” ifadesini ölçülebilir boyutlara çevirir.

### Paket 4 — AI kalite ve anti-slop protokolü

Tek bir küçük Rusça A1 ünitesi için:

- insan yazarlı kaynak paket
- izin verilen AI görevleri
- yasaklanan serbest üretim alanları
- doğruluk, düzey uygunluğu, doğallık, çeşitlilik ve güvenlik rubriği
- yanlış geri bildirim ve belirsizlik davranışı
- ses tanıma hata seti

Önce prototip kalitesi ölçülür; sonra model/provider seçilir.

### Paket 5 — Sosyal güvenlik ve ekonomi fizibilitesi

Guided Language Exchange ve yardım ekonomisi için çocuk güvenliği, yaş kapısı, görüntülü içerik, taciz, dolandırıcılık, sahte yardım, collusion, tutor/çalışan sınıflandırması, ödeme/vergilendirme ve moderasyon maliyeti araştırılır. Bu paket tamamlanmadan video görüşme veya nakde çevrilen coin ürün sözü olmamalı.

### Paket 6 — Teknik ve mali mimari seçenekleri

Yalnız yukarıdaki kullanıcı ve kalite gereksinimleri netleşince iOS/Android teknoloji yığını, speech-to-text/text-to-speech, gerçek zamanlı ses/video, içerik moderasyonu, offline/senkronizasyon, gözlemlenebilirlik ve birim ekonomi karşılaştırılır.

## 11. Pilot kararı

**Devam etme kararı:** Evet, fakat “her şeyi yapan süper-app” olarak değil; önce iki çekirdek risk üzerinde kanıt toplayarak.

**Bir sonraki en yüksek değerli paket:** Paket 2 — konuşmaya transfer ve güvenli/ciddi insan pratiği VOC’si.

**Şimdilik dondurulması gereken kararlar:** teknoloji yığını, hedef ülke, kesin fiyat, coin’in nakde çevrilmesi, video varsayılanı, tutor marketplace açılması, ilk ticari hedef dil, roadmap ve launch tarihi.

**Şimdilik korunması gereken ürün tezi adayı:** Yapılandırılmış öğrenmeyi AI prova ve güvenli insan pratiğine bağlayan, ilerlemeyi gerçek beceri düzeyinde izleyen bir Guided Practice Loop.

---

## Kaynak notu

Kaynaklar metin içinde doğrudan ilgili iddianın yanında verilmiştir. Resmî sayfalar ürünün kendi iddiasını, kullanıcı yorumları ise yalnız yönsel deneyim sinyalini temsil eder. Bu rapor hiçbir şirketin etkinliğini, pazar liderliğini veya kullanıcı yorumlarının temsil gücünü doğrulamaz.
