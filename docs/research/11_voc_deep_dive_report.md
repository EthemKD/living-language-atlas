# Dil Öğrenme Uygulaması — Derin Public VOC Raporu

**Paket:** 2 — “Neden konuşamıyorum ve neden sosyal pratikten kaçıyorum?”
**Sürüm:** 0.1
**Tarih:** 12 Ağustos 2026
**Kapsam:** Duolingo, Busuu, Speak, Tandem, HelloTalk ve Hilokal hakkında public, login gerektirmeyen kullanıcı sinyalleri
**Durum:** Yönsel keşif araştırması; ürün kararı, pazar büyüklüğü, roadmap veya öğrenme-etkisi kanıtı değildir

## 1. Kısa hüküm

Bu örneklemde en güçlü problem **içerik eksikliği değil, pratikler arasındaki kopukluk**:

1. Kullanıcı kurs uygulamasında tanıma, çeviri ve kontrollü tekrar yapabiliyor; fakat gerçek konuşmada cümleyi zamanında üretemiyor.
2. AI konuşma bu eşiği düşürüyor; ancak yanlış duyan, hatayı açıklamayan veya senaryoyu yalnız “konuşuyormuş gibi” oynatan sistemler güven kaybettiriyor.
3. Gerçek insan konuşması özgün ifade, kültür ve beklenmedik cevap getiriyor; fakat ciddi partner bulma, sıra/karşılıklılık, flört-taciz-scam ve moderasyon yükü pratiği bozuyor.
4. Kullanıcılar çözümü tek bir rakipte bulmuyor. Kurs + dinleme kaynağı + konuşma uygulaması + tutor/Discord/WhatsApp gibi kendi “Frankenstein stack”lerini kuruyor.

Bu yüzden şu an en güçlü farklılaşma adayı yeni bir quiz, coin veya genel AI chat değildir. Araştırmaya değer aday şudur:

> **Skill-bound Guided Practice Loop:** Belirli bir beceriyi öğren → düşük riskli AI provası yap → gerçek hayat görevine uygula → istenirse yapılandırılmış ve güvenli bir insan oturumuna geç → güvenilir geri bildirim al → beceri grafiğini güncelle.

Bu bir **fırsat hipotezidir**. Örneklem, insanların böyle birleşik bir ürüne geçeceğini, ödeme yapacağını veya bu döngünün öğrenmeyi iyileştireceğini kanıtlamaz.

## 2. Yöntem ve kanıt sınırları

### 2.1 Araştırma soruları

1. Düzenli uygulama kullanan biri gerçek konuşmada neden hâlâ donuyor?
2. AI konuşma hangi işi iyi yapıyor, nerede güveni kırıyor?
3. İnsanlarla ücretsiz dil değişimi neden ciddi ve güvenli pratiğe dönüşmüyor?
4. Kullanıcılar bu açıkları bugün hangi workaround’larla kapatıyor?
5. Guided Practice Loop hipotezini destekleyen ve çürütebilecek işaretler neler?

### 2.2 Örneklem

Toplam **78 ayrı public kullanıcı sinyali** manuel olarak kodlandı. Bir sinyal, ayrı bir kullanıcı gönderisi veya yorumunda anlatılan deneyimdir. Aynı sinyal birden fazla koda girebildiği için tema toplamları örneklem toplamını aşabilir.

| Ürün | Rol | Kodlanan sinyal | Kaynak türleri | Güven notu |
|---|---|---:|---|---|
| Duolingo | Kurs/alışkanlık → konuşmaya aktarım | 15 | Reddit, Google Play, kullanıcı deneyimini aktaran yayın | Orta; farklı süre ve seviyeler var |
| Busuu | Yapı/müfredat → konuşmaya aktarım | 12 | Reddit, App Store | Orta; ileri seviye sinyali daha ince |
| Speak | AI konuşma/prova | 14 | Reddit, App Store, Google Play | Orta; erken deneme ve ücretli uzun kullanım karışık |
| Tandem | 1:1 ve grup dil değişimi | 15 | Reddit, App Store | Orta; dil çiftine göre deneyim çok değişiyor |
| HelloTalk | Sosyal dil değişimi/odalar | 13 | Reddit, Google Play | Orta; şikâyet başlıklarında negatif seçilim var |
| Hilokal | Grup ses odaları/topluluk + AI | 9 | App Store, Google Play, Reddit, tekil uzun dönem yorumu | Düşük-orta; örneklem küçük ve bazı sinyaller tarihsel |
| **Toplam** |  | **78** |  | **Yalnız yönsel** |

Seçim, olumlu, karışık ve olumsuz deneyimleri birlikte tutacak şekilde amaçlı yapıldı. Büyük iddiaları desteklemeyen sansasyonel veya kimliği doğrulanamayan suçlama zincirleri kullanılmadı. Kullanıcı adları, profil bağlantıları, comment ID’leri ve uzun ham yorumlar saklanmadı.

### 2.3 Kodlar

- **JTBD / tetikleyici:** Kullanıcı uygulamayı hangi ilerleme veya sorun için açtı?
- **Faydalı mekanik:** Hangi özellik gerçekten işe yaradı?
- **Aktarım açığı:** Uygulama başarısı gerçek konuşmaya neden geçmedi?
- **Güvenilirlik:** AI/peer düzeltmesine neden güvenildi veya güvenilmedi?
- **Workaround:** Kullanıcı açığı hangi başka ürün, kişi veya yöntemle kapattı?
- **Churn:** Hangi olay bırakmaya veya kullanım azaltmaya itti?
- **Ödeme:** Ücret ne zaman makul, ne zaman itiraz sebebi oldu?
- **Sosyal güvenlik:** Ciddi niyet, karşılıklılık, flört/taciz/scam, raporlama ve moderasyon.

### 2.4 Okuma kuralı

- **U — User signal:** Kullanıcının public anlatımı; deneyimi gösterir, genel oranı göstermez.
- **O — Official observation:** Ürünün kendi tanımı; vaat veya mekanik gösterir, sonucu kanıtlamaz.
- **I — Inference:** Birden fazla sinyalden çıkarılan, ayrıca test edilmesi gereken yorum.

Bu rapordaki “x/n” sayıları yalnız bu amaçlı örneklemde kod tekrarını gösterir. Pazar oranı, yaygınlık veya nedensellik olarak okunmamalıdır.

## 3. Yönsel kod sonuçları

### 3.1 Kurs ve AI konuşma grubu — n=41

| Tema | Duolingo n=15 | Busuu n=12 | Speak n=14 | Toplam | Okuma |
|---|---:|---:|---:|---:|---|
| Dış kaynaklardan bir öğrenme stack’i kurma | 12 | 8 | 6 | **26/41** | Tek ürünün yeterli görülmediğine güçlü sinyal |
| Spontane cümle üretme/gerçek konuşma açığı | 11 | 6 | 5 | **22/41** | Kontrollü alıştırma ile zaman baskılı üretim farklı işler |
| İleri aşamada tekrar, kolaylık veya plateau | 8 | 6 | 4 | **18/41** | Başlangıç değeri ileri seviyeye aynı güçte taşınmıyor |
| Düşük baskılı konuşma/üretim faydalı | 3 | 4 | 10 | **17/41** | AI veya asenkron üretim konuşma eşiğini düşürebiliyor |
| Fiyat, reklam, enerji veya paywall itirazı | 6 | 3 | 8 | **17/41** | Değer görülse de ödeme kanıtı ve şeffaflık aranıyor |
| Açıklama ve yapı faydalı | 2 | 9 | 6 | **17/41** | “Neden?” açıklaması ve görünür yol kullanıcı güveni yaratıyor |
| AI/speech recognition/geri bildirim güven sorunu | 5 | 2 | 5 | **12/41** | Yanlış duyma veya hatayı geçme pedagojik güveni kırıyor |

### 3.2 Sosyal pratik grubu — n=37

| Tema | Tandem n=15 | HelloTalk n=13 | Hilokal n=9 | Toplam | Okuma |
|---|---:|---:|---:|---:|---|
| Ciddi partner bulma, ghosting ve devamlılık | 11 | 9 | 4 | **24/37** | En büyük operasyonel sürtünme yalnız “eşleşme” değil, sürdürülebilir eşleşme |
| Flört, taciz, scam veya öğrenme dışı yaklaşım | 9 | 8 | 3 | **20/37** | Sosyal güvenlik çekirdek değer önerisini doğrudan etkiliyor |
| Dil zamanı ve yardım karşılıklılığı bozuluyor | 8 | 7 | 3 | **18/37** | Partnerlerin hedefleri uyumlu olsa bile oturum protokolü eksik kalabiliyor |
| Moderasyon, raporlama veya ban güveni | 6 | 6 | 5 | **17/37** | Yalnız block/report varlığı güven oluşturmuyor |
| Uzun süreli faydalı partner/arkadaşlık başarısı | 6 | 5 | 4 | **15/37** | Kategori gerçek değer üretebiliyor; sorun imkânsızlık değil, yüksek arama maliyeti |
| Grup odasında baskın kişiler/katılım eşitsizliği | 4 | 4 | 2 | **10/37** | “Odaya gir” mekanizması konuşma fırsatını garanti etmiyor |
| Uygulama dışına veya ücretli tutora geçiş | 5 | 4 | 1 | **10/37** | İyi ilişki bulununca platformdan kaçış veya yapı satın alma görülüyor |
| Çağrı, çökme veya gecikme gibi teknik güvenilirlik | 2 | 2 | 3 | **7/37** | Canlı ses ürününde teknik hata öğrenme anını tamamen kesiyor |

## 4. En güçlü beş problem

### P1 — “Dersi biliyorum ama cümleyi zamanında çıkaramıyorum”

**Sinyal gücü:** 22/41 aktarım örnekleminde spontane üretim açığı; 26/41 dış kaynak stack’i kullanıyor.

Duolingo kullanıcılarında uzun streak veya kurs ilerlemesine rağmen konuşurken donma, okumada/yazmada daha rahat olup dinleme-konuşmada zorlanma ve “uygulamada doğru cevap” ile gerçek konuşmanın ayrışması tekrar etti. Olumlu karşı örnekte bile kullanıcı Paris’te temel işlemleri yapabildiğini, fakat ayrıntılı konuşmada tıkandığını ve Duolingo yanında kitap, haber, TV, YouTube, podcast ve Discord kullandığını anlattı. [Ten-year Duolingo review](https://www.reddit.com/r/languagelearning/comments/1peqo25/duolingo_review_after_10_years/), [Three-year streak, little Spanish](https://www.reddit.com/r/duolingo/comments/1v9unhj/i_still_dont_know_spanish_should_i_just_stop/), [Positive but mixed French transfer](https://www.reddit.com/r/duolingo/comments/1owj98f/duolingo_french_course/), [Completed-course discussion](https://www.reddit.com/r/duolingo/comments/1u5kbzj/for_anyone_who_completed_an_entire_course/)

Busuu’da yapı ve “neden?” açıklaması Duolingo’ya göre daha güçlü algılanıyor; ancak ileri aşamada kolaylık/tekrar, sınırlı dinleme ve ayrı konuşma aracı ihtiyacı görülüyor. Kullanıcıların Dreaming Spanish, Speechling, kitap ve gerçek insan pratiğini yanına eklemesi aynı kopukluğun daha hafif biçimini gösteriyor. [Busuu in 2025](https://www.reddit.com/r/Busuu/comments/1mrc3oc/busuu_in_2025/), [Busuu is overhyped discussion](https://www.reddit.com/r/Busuu/comments/1ngp8yn/busuu_is_overhyped_for_what_it_really_is/), [Busuu App Store reviews](https://apps.apple.com/us/app/busuu-language-learning-app/id379968583)

**I — Kök neden hipotezi:** Tanıma, kontrollü çeviri ve tekrar; zaman baskısı, niyet oluşturma, karşı tarafın beklenmedik cevabı ve konuşma onarımıyla aynı beceri değildir. “Daha fazla aynı alıştırma” transfer açığını otomatik kapatmaz.

**Falsifier:** Hedef beceri, önceki yeterlik ve dış çalışma kontrol edildiğinde kurs kullanıcılarının çoğu gerçek konuşmaya sorunsuz geçiyorsa problem yanlış çerçevelenmiştir.

### P2 — Ciddi partner bulmak ayrı bir iştir

**Sinyal gücü:** 24/37 sosyal örneklemde ciddi partner, ghosting veya devamlılık; bunun yanında 15/37 başarılı uzun ilişki karşı kanıtı.

Tandem ve HelloTalk’ta birkaç günlük konuşmalar, tek taraflı çaba, yanlış seviye/niyet, dil çifti arz-talep dengesizliği ve iyi partner bulunca WhatsApp/Discord’a geçme tekrar etti. Bazı kullanıcılar aylar/yıllar süren partner ve arkadaşlık buldu; yani problem “insanlar asla ciddi değil” değil, iyi eşleşmenin yüksek filtreleme emeği istemesi. [Tandem disappointment discussion](https://www.reddit.com/r/languagelearning/comments/1l6ud46/disappointed_with_tandem_is_anyone_actually_using/), [Language-exchange success discussion](https://www.reddit.com/r/languagelearning/comments/1ioyasv/have_you_ever_had_success_with_language_exchange/), [Permanent HelloTalk partner discussion](https://www.reddit.com/r/HelloTalk/comments/1fjpb0j/has_anyone_found_a_permanent_language_partner_on/), [The truth about HelloTalk](https://www.reddit.com/r/HelloTalk/comments/1lcdz0y/the_truth_about_hellotalk/)

**I — Kök neden hipotezi:** Profil ve hedef dil eşleştirmesi yeterli değildir. Seviye, konuşma amacı, uygun zaman, tercih edilen düzeltme biçimi, oturum süresi, karşılıklılık ve davranış güvenilirliği birlikte eşleşmelidir.

**Falsifier:** Kullanıcılar daha sıkı filtreleri kullanmıyor veya iyi eşleşmeye rağmen planlı oturuma gelmiyorsa keşif değil, bağlılık/motivasyon ana sorundur.

### P3 — Sosyal güvenlik, öğrenme akışının kendisidir

**Sinyal gücü:** 20/37 flört, taciz, scam veya öğrenme dışı yaklaşım; 17/37 moderasyon/raporlama/ban güveni.

Tandem ve HelloTalk başlıklarında dating-benzeri kullanım, istenmeyen yaklaşım, dolandırıcılık şüphesi ve özellikle kadınların/minörlerin karşılaşabileceği riskler görülüyor. Hilokal sinyallerinde uygunsuz davranan kişi hızlı çıkınca kanıt/rapor geçmişinin kaybolması ve moderasyon güveni öne çıktı. Karşı kanıt olarak bazı kullanıcılar block/leave ile normal insanlara ulaştıklarını, küratörlü küçük gruplarda güvenli pratik kurabildiklerini anlattı. [Tandem experience discussion](https://www.reddit.com/r/languagelearning/comments/1i8flux/what_was_your_experience_in_apps_like_tandem/), [Is Tandem legitimate?](https://www.reddit.com/r/languagelearning/comments/1jejn6b/is_tandem_a_legitimate_app_for_learning_a_language/), [HelloTalk experience and counterviews](https://www.reddit.com/r/languagelearning/comments/1t19ftg/my_experience_with_hello_talk_was_terrible/), [HelloTalk scam complaint](https://www.reddit.com/r/HelloTalk/comments/1skc30w/hellotalk_is_horrible_now/), [Hilokal App Store reviews](https://apps.apple.com/us/app/hilokal-language-exchange-app/id1537500613?platform=iphone&see-all=reviews)

**I — Kök neden hipotezi:** Serbest sosyal keşif, etkileşimi artırabilir ama öğrenme niyetini doğrulamaz. Güvenlik sonradan açılan bir rapor ekranı değil; kimle, ne amaçla, hangi formatta ve hangi kanıt iziyle konuşulduğunu belirleyen oturum mimarisidir.

**Falsifier:** Yapılandırılmış, kimlik/niyet kontrollü oturumlarda da aynı zarar oranı ve churn görülürse problem yalnız ürün mimarisiyle çözülemez.

### P4 — Karşılıklılık kendiliğinden oluşmuyor

**Sinyal gücü:** 18/37 sosyal örneklem.

Kullanıcılar partnerin sürekli İngilizceye dönmesi, iki taraftan yalnız birinin düzeltilmesi, ses odasında birkaç kişinin konuşmayı ele geçirmesi veya yabancı arkadaşlık ile ciddi çalışma arasında hedef çatışması yaşadı. Bir HelloTalk başlığı doğrudan “herkes benimle İngilizce konuşuyor, hedef dilimi nasıl çalışacağım?” sorusuna dönüştü. [HelloTalk language-balance question](https://www.reddit.com/r/HelloTalk/comments/14pbn4h/everyone_wants_to_speak_english_to_me_and_i_dont/), [Tandem language-exchange legitimacy discussion](https://www.reddit.com/r/languagelearning/comments/1jejn6b/is_tandem_a_legitimate_app_for_learning_a_language/), [Tandem party experience](https://www.reddit.com/r/languagelearning/comments/1i8flux/what_was_your_experience_in_apps_like_tandem/)

**I — Kök neden hipotezi:** İyi niyetli iki kişi bile sıra, süre, dil dağılımı, düzeltme izni ve hedefi konuşmadan verimli değişim kuramayabilir.

**Falsifier:** Otomatik sıra/süre protokolü memnuniyeti düşürür, sohbeti mekanikleştirir veya kullanıcılar protokolü sürekli kapatırsa yapı yanlış çözümdür.

### P5 — Geri bildirim var, fakat güvenilirliği görünmüyor

**Sinyal gücü:** 12/41 kurs/AI sinyalinde doğrudan recognition veya geri bildirim güven sorunu; sosyal yorumlarda peer’lerin öğretmen olmadığı sık hatırlatıldı.

Speak’in güçlü tarafı anında konuşma ve hata geri bildirimi; kullanıcılar utanç olmadan tekrar yapabildiklerini anlattı. Olumsuz karşı örneklerde sistem tek kelimeyi yanlış duyunca bütün cümleyi bozdu, hata varken otomatik ilerledi veya anlamı fazla kaba eşledi. Duolingo’da özellikle daha az desteklenen diller için AI ses ve açıklama doğruluğu sorgulandı. Sosyal uygulamalarda native speaker olmanın doğru açıklama yapma veya öğretme becerisi anlamına gelmediği vurgulandı. [Speak App Store reviews](https://apps.apple.com/us/app/speak-language-learning/id1286609883), [Speak Google Play reviews](https://play.google.com/store/apps/details?id=com.selabs.speak), [Speak user discussion](https://www.reddit.com/r/Spanish/comments/1asx2ei/has_anyone_used_the_speak_app_thoughts/), [Duolingo AI user report](https://www.polygon.com/ai-artificial-intelligence/603216/duolingo-ai-language-lessons)

**I — Kök neden hipotezi:** Kullanıcının yalnız düzeltmeye değil, düzeltmenin kaynağına, belirsizliğine ve itiraz yoluna ihtiyacı vardır.

**Falsifier:** Açıklanabilirlik/uncertainty göstermek kullanıcı kararını veya hata tekrarını değiştirmiyorsa ek karmaşıklık değer üretmiyor olabilir.

## 5. Rakip vaadi nerede kırılıyor?

| Ürün | Gerçek kullanıcı değeri | Vaadin kırıldığı yer | Kullanıcı workaround’u |
|---|---|---|---|
| Duolingo | Düşük eşik, günlük alışkanlık, temel kelime/örüntü | Tanıma ve oyun ilerlemesi spontan üretimle karışabiliyor; açıklama/bağlam ve ileri derinlik zayıflayabiliyor | Kitap, podcast, haber, YouTube, Discord, tutor |
| Busuu | Daha görünür yapı, gramerin “neden”i, native feedback | İleri aşamada kolaylık/tekrar; canlı ve zaman baskılı konuşma yine sınırlı | Dreaming Spanish, Speechling, kitap, gerçek konuşma |
| Speak | Konuşmayı erteleyen kullanıcıya düşük utançlı tekrar ve anlık üretim | Recognition hatası, scripted hissi, sınırlı dil/kurs kapsamı ve yüksek fiyat itirazı | Tutor, başka input kaynakları veya rakip AI uygulaması |
| Tandem | Gerçek insan, kültür, beklenmedik konuşma ve uzun arkadaşlık ihtimali | Ciddi niyet filtresi, dil dengesi, ghosting, dating/scam ve reaktif moderasyon | Sabırlı filtreleme, WhatsApp/Discord, ücretli tutor |
| HelloTalk | Büyük sosyal yüzey, yazı/konuşma düzeltmesi, odalar ve arkadaşlık | Sosyal feed dinamiği öğrenme amacını bastırabiliyor; harassment/scam ve hedef-dil dengesi | Küçük özel grup, Discord, alternatif partner/tutor |
| Hilokal | Listen-first katılım, sınıf + exchange hibriti, grup konuşması | Konuşma sırası ve kalite değişken; moderasyon kanıtı ve canlı teknik stabilite kritik | Oda/öğretmen değiştirme veya uygulamayı bırakma |

“Kırılma” burada ürünlerin tüm kullanıcılar için başarısız olduğu anlamına gelmez. Aynı kaynaklarda güçlü karşı örnekler vardır. Tablo, ürün vaadinin hangi koşullarda kullanıcı işiyle ayrıştığını gösterir.

## 6. Guided Practice Loop: destek ve karşı kanıt

### 6.1 Hipotezi destekleyen kanıt zinciri

1. **Foundation değeri var.** Duolingo/Busuu kullanıcıları kelime, temel örüntü, yapı ve düzenlilik kazanıyor.
2. **Foundation tek başına transfer etmiyor.** 22/41 sinyal gerçek konuşma/üretim açığını, 26/41 dış stack’i gösterdi.
3. **AI prova psikolojik eşiği düşürüyor.** Speak sinyallerinde yüksek sesle konuşma, tekrar ve kişiye özel senaryo en güçlü olumlu mekanikler.
4. **İnsan konuşması farklı bir değer üretiyor.** 15/37 sosyal sinyal, doğru partner bulunduğunda uzun dönem pratik, arkadaşlık ve doğal ifade değeri gösterdi.
5. **Geçiş bugün manuel.** Kullanıcılar kurs → podcast/kitap → AI veya tutor → Discord/WhatsApp geçişini kendileri kuruyor; hata geçmişi ve beceri hedefi araçlar arasında kayboluyor.

**I — Sentez:** Olası özgünlük, modların aynı uygulamada bulunması değil; **aynı becerinin bağlam, geri bildirim ve güvenlik bilgisini kaybetmeden modlar arasında ilerlemesi** olabilir.

### 6.2 Hipoteze karşı kanıt ve riskler

- **All-in-one talebi kanıtlanmadı.** Kullanıcılar uzman araçların ayrı olmasını tercih edebilir.
- **AI comfort trap olabilir.** Kullanıcı risksiz AI’da kalıp gerçek insan konuşmasını daha da erteleyebilir.
- **Yapı doğallığı öldürebilir.** Çok sıkı sıra ve görev kuralları sosyal bağı ve spontane konuşmayı azaltabilir.
- **Dil çifti likiditesi değişir.** İngilizce–Çince gibi bir çiftte işe yarayan eşleşme, Rusça–Türkçe veya Almanca–başka dil çiftinde çalışmayabilir.
- **Safety maliyeti ürün maliyetidir.** Canlı ses/video, minörler, taciz, scam, itiraz, kanıt saklama ve moderatör emeği ücretsiz modele ciddi yük getirir.
- **Skill update güvenilir ölçüm ister.** AI veya peer yorumunu doğrudan “seviye arttı”ya çevirmek sahte kesinlik üretir.
- **Sosyal ödül ekonomisi ters teşvik yaratabilir.** Coin kazanmak için sahte oturum, collusion, spam ve düşük kaliteli yardım doğabilir.

### 6.3 Bir sonraki test için daraltılmış hipotez

> A1–A2 kullanıcı, belirli bir beceri için 10–15 dakikalık görev açabilirse — kısa retrieval warm-up, AI prova, isteğe bağlı karşılıklı insan oturumu ve kaynaklı geri bildirim — ayrı araçlarla yaptığı pratiğe kıyasla görevi daha sık tamamlayabilir ve hangi hatayı çalışacağını daha iyi anlayabilir.

Bu metin bir ürün spesifikasyonu değildir. Özellikle “daha iyi öğrenme” iddiası kurmaz; ilk testte yalnız görev tamamlama, geçiş isteği, güven, algılanan fayda ve hata anlama ölçülebilir.

### 6.4 Minimum falsifier seti

Hipotez aşağıdakilerden biri görülürse durdurulmalı veya ciddi biçimde değiştirilmeli:

1. Uygun kullanıcıların çoğu AI’dan insana geçişi istemiyor.
2. Yapılandırılmış oturum, serbest konuşmadan daha düşük fayda/güven alıyor.
3. Karşılıklı süre protokolü yüksek oranda kapatılıyor veya ihlal ediliyor.
4. İnsan oturumu için yeterli eşleşme süresi/likidite oluşmuyor.
5. AI geri bildirimi insan benchmark’ına karşı kabul edilemez yanlış-düzeltme veya yanlış-kabul üretiyor.
6. Safety/moderasyon maliyeti ücretsiz temel döngüyü ekonomik olarak savunulamaz kılıyor.

## 7. AI slop’a dönüşmeme kuralları

Bu örneklemde kullanıcıların kalite güvenini zedeleyen desenler:

1. **Genel chat’i ders gibi sunmak.** Her konuşma belirli skill, seviye ve başarı ölçütüne bağlı olmalı.
2. **Scripted akışı free-form diye pazarlamak.** Kullanıcı hangi bölümün serbest, hangi bölümün sınırlandırılmış olduğunu bilmeli.
3. **Yanlış duyarken otomatik ilerlemek.** Speech recognition belirsizliğini göstermeli; replay, transcript düzeltme ve itiraz sağlamalı.
4. **Düzeltmenin nedenini saklamak.** Öneri; kural, örnek ve güven düzeyiyle açıklanmalı; “tek doğru” olmayan kullanım belirtilmeli.
5. **Format çoğaltmayı kişiselleştirme sanmak.** Podcast, quiz, hikâye, özet veya oyun ancak aynı öğrenme hedefi için neden uygun olduğu belli ise üretilmeli.
6. **Kaynağı olmayan seviye iddiası.** Streak, XP, coin ve içerik tüketimi beceri kanıtı sayılmamalı.
7. **Nadir dilleri ikinci sınıf bırakmak.** Her dil için doğal konuşmacı review’ı, hata seti, ses kalitesi ve kapsam matrisi ayrı tutulmalı.
8. **İnsan katkısını “AI doğruladı” diye güvenilir saymak.** Peer, tutor ve uzman geri bildirimi farklı yetki ve görünür etikete sahip olmalı.

İlk kalite kapısı tek cümleyle özetlenebilir:

> **AI çıktı üretmeden önce hangi beceriyi çalıştırdığını; çıktıdan sonra neye dayanarak geri bildirim verdiğini gösterebilmeli.**

## 8. Founder fikirlerine etkisi

| Fikir | Bu paketin hükmü | Şimdiki hareket |
|---|---|---|
| Skill-bound Guided Practice Loop | **En güçlü araştırma adayı** | Dar bir Rusça A1 görevinde prototip/benchmark öncesi pedagojik tanım yap |
| AI lesson studio, quiz, podcast, hikâye | **Değer yalnız müfredat bağlantısı varsa** | Format listesi büyütme; tek skill için kalite rubriği kur |
| İnsanlarla karşılıklı görüşme | **Değerli ama güvenlik/likidite riski yüksek** | Serbest sosyal feed yerine yapılandırılmış oturum hipotezini test et |
| İnsanlara yardım ederek coin kazanma | **Şimdilik ertelenmeli** | Önce safety, kalite, fraud ve emek ekonomisi fizibilitesi |
| Streak/XP/seviye/coin | **Ayrı tutulmalı** | Beceri, alışkanlık ve ekonomi göstergelerini birbirine çevirmeme ilkesini koru |
| Video görüşme | **Safety maliyeti çok yüksek** | İlk sosyal testte ses/metin ve kontrollü oturum; video ayrı risk kapısı |

## 9. Önerilen bir sonraki düşük maliyetli paket

### Package 3 — Rusça A1 pedagojik benchmark

Bir sonraki adım geniş ürün tasarımı veya kod değil, aynı küçük öğrenme görevinin karşılaştırması olmalı. Founder motivasyonuyla uyumlu olduğu için Rusça seçilebilir; bu ticari ilk dil kararı değildir.

**Dar görev:** Kullanıcı Kiril ile kendini tanıtsın, temel kişisel soru sorsun/yanıtlasın ve basit bir kafe siparişi versin.

**Karşılaştırılacak boyutlar:**

- ses–harf eşleme ve Kiril yükü
- kelime vurgusu ve anlaşılabilirlik
- tanıma → kontrollü üretim → spontane üretim sırası
- gramer açıklamasının doğruluğu ve düzeyi
- dinleme çeşitliliği ve hız
- gerçek hayat senaryosuna transfer
- hata düzeltmesinin kaynağı/belirsizliği
- hangi performansın beceri kanıtı sayıldığı

**Benchmark seti:** Duolingo, Busuu ve başlangıç düzeyi insan-tutor/müfredat yaklaşımı. Speak, Rusça hedef kursu olmadığı için içerik benchmark’ı değil, yalnız konuşma etkileşim deseni referansı olabilir.

**Bütçe sınırı:** Public ve erişilebilir materyalle başla; üyelik, ödeme, kullanıcı görüşmesi veya kod ancak ayrı açık kararla.

## 10. Kaynak defteri

### Duolingo

- [Ten-year Duolingo review](https://www.reddit.com/r/languagelearning/comments/1peqo25/duolingo_review_after_10_years/)
- [Finished Japanese course review](https://www.reddit.com/r/duolingo/comments/1oangvl/finished_the_japanese_course_heres_my_review/)
- [Three-year streak, little Spanish](https://www.reddit.com/r/duolingo/comments/1v9unhj/i_still_dont_know_spanish_should_i_just_stop/)
- [French course: useful basics, limited detailed conversation](https://www.reddit.com/r/duolingo/comments/1owj98f/duolingo_french_course/)
- [Positive/negative tradeoffs discussion](https://www.reddit.com/r/duolingo/comments/1qu0ylk/unpopular_opinion_duolingo_isnt_that_bad_and/)
- [Completed-course outcomes discussion](https://www.reddit.com/r/duolingo/comments/1u5kbzj/for_anyone_who_completed_an_entire_course/)
- [Duolingo Google Play](https://play.google.com/store/apps/details?hl=en_US&id=com.duolingo)
- [User-facing report on Duolingo AI lessons](https://www.polygon.com/ai-artificial-intelligence/603216/duolingo-ai-language-lessons)

### Busuu

- [Busuu in 2025](https://www.reddit.com/r/Busuu/comments/1mrc3oc/busuu_in_2025/)
- [Busuu is overhyped discussion](https://www.reddit.com/r/Busuu/comments/1ngp8yn/busuu_is_overhyped_for_what_it_really_is/)
- [Tired of Duolingo, considering Busuu](https://www.reddit.com/r/Busuu/comments/1m2hvkd/tired_of_duolingo_considering_busuu_is_it_a_good/)
- [Busuu Premium alongside other resources](https://www.reddit.com/r/Busuu/comments/1jwrs2y/is_busuu_premium_worth_it_if_using_it_alongside/)
- [Busuu Premium worth discussion](https://www.reddit.com/r/Busuu/comments/1lpraoe/is_busuu_premium_worth_it_in_2025/)
- [Busuu App Store](https://apps.apple.com/us/app/busuu-language-learning-app/id379968583)

### Speak

- [Speak app discussion](https://www.reddit.com/r/languagelearning/comments/1ohb6xd/thoughts_on_the_speak_app/)
- [Speak App Store](https://apps.apple.com/us/app/speak-language-learning/id1286609883)
- [Speak Google Play](https://play.google.com/store/apps/details?id=com.selabs.speak)
- [Speak for Spanish discussion](https://www.reddit.com/r/Spanish/comments/1asx2ei/has_anyone_used_the_speak_app_thoughts/)
- [AI companion vs tutor discussion](https://www.reddit.com/r/languagelearning/comments/1dn01uv/thoughts_on_speakcom_or_its_app/)
- [Multi-app AI comparison; directional only](https://www.reddit.com/r/AI_language_learners/comments/1roep0o/i_tested_6_ai_language_learning_apps_in_2026_here/)

### Tandem

- [Tandem and similar apps experience](https://www.reddit.com/r/languagelearning/comments/1i8flux/what_was_your_experience_in_apps_like_tandem/)
- [Disappointed with Tandem](https://www.reddit.com/r/languagelearning/comments/1l6ud46/disappointed_with_tandem_is_anyone_actually_using/)
- [Language-exchange success and failure](https://www.reddit.com/r/languagelearning/comments/1ioyasv/have_you_ever_had_success_with_language_exchange/)
- [Is Tandem legitimate for learning?](https://www.reddit.com/r/languagelearning/comments/1jejn6b/is_tandem_a_legitimate_app_for_learning_a_language/)
- [Tandem App Store reviews](https://apps.apple.com/ph/app/tandem-conversation-exchange/id959001619?see-all=reviews)

### HelloTalk

- [HelloTalk negative experience with counterexamples](https://www.reddit.com/r/languagelearning/comments/1t19ftg/my_experience_with_hello_talk_was_terrible/)
- [The truth about HelloTalk](https://www.reddit.com/r/HelloTalk/comments/1lcdz0y/the_truth_about_hellotalk/)
- [HelloTalk toxic/unserious claim and counterviews](https://www.reddit.com/r/HelloTalk/comments/1nvpbpk/my_wild_hellotalk_experience_language_exchange_or/)
- [HelloTalk scam complaint](https://www.reddit.com/r/HelloTalk/comments/1skc30w/hellotalk_is_horrible_now/)
- [HelloTalk used as dating rather than practice](https://www.reddit.com/r/HelloTalk/comments/1kw55zh/hellotalk_is_not_really_for_language_practice/)
- [Permanent partner discussion](https://www.reddit.com/r/HelloTalk/comments/1fjpb0j/has_anyone_found_a_permanent_language_partner_on/)
- [Target-language balance problem](https://www.reddit.com/r/HelloTalk/comments/14pbn4h/everyone_wants_to_speak_english_to_me_and_i_dont/)
- [HelloTalk Google Play](https://play.google.com/store/apps/details?hl=en_US&id=com.hellotalk)

### Hilokal

- [Hilokal App Store reviews](https://apps.apple.com/us/app/hilokal-language-exchange-app/id1537500613?platform=iphone&see-all=reviews)
- [Hilokal Google Play reviews](https://play.google.com/store/apps/details?hl=en&id=com.hilokal)
- [Hilokal community welcome/experience thread](https://www.reddit.com/r/Hilokal/comments/14lu7wm/hello_and_welcome/)
- [Hilokal long-term single-user review](https://www.trustpilot.com/review/hilokal.com)
- [Hilokal official teacher testimonial; product-side evidence only](https://www.hilokal.com/blog/i-taught-english-for-4-weeks-heres-what-i-learned/)

## 11. Son karar durumu

- **Doğrulanan:** Kullanıcıların kurs başarısı ile gerçek konuşma arasında algıladığı boşluk; düşük baskılı AI konuşmanın değer ihtimali; ciddi/güvenli/karşılıklı insan pratiğinin yüksek arama ve moderasyon maliyeti; manuel çoklu-araç workaround’u.
- **Doğrulanmayan:** Tek uygulama talebi, ödeme isteği, hedef pazar, hedef dil, öğrenme etkisi, güvenlik fizibilitesi, sosyal likidite, coin ekonomisi, teknik mimari.
- **En güçlü sonraki hipotez:** Skill-bound Guided Practice Loop.
- **Bir sonraki ucuz iş:** Rusça A1 pedagojik benchmark.
- **Şimdilik yapılmaması gereken:** Kod, geniş roadmap, fiyat kararı, coin ekonomisi, video görüşme veya “AI her şeyi üretir” içerik hattı.
