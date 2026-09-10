# BudVia

Bir haftalık tatilini ikiye mi bölmen gerekti?
Çok mu fazla biletin var?
Hepsini organize edemiyor musun?

Tek bir uygulamada birleştirdim. Bu kadar basit.

Canlı: [cemalsakin.github.io/belvia](https://cemalsakin.github.io/belvia/)

---

## Direkt ne diyor?

Ucuz tatil şöyle işliyor. Uçak bir yerde, otobüs başka yerde, oda başka yerde. Wizz, FlixBus, Airbnb, Booking, şehir içi bisiklet, akşam yemeği. Her biri kendi uygulamasında, her teyit kendi kutusunda.

Bir haftalık işi ikiye bölüyorsun. Sonra üçe. Sonra “biletlerim çok, hangisi hangisi” diye bakıyorsun. Gidilecek saat, kalkış saati, ne kadar erken evden çıkman gerektiği, kapıda ne zaman olman gerektiği — hepsi dağınık.

BudVia bunu tek yerde topluyor.

Bilet satmıyor. Rezervasyon sitesi değil. Zaten aldığın şeyleri birleştiriyor.

Üstüne üstlük hepsi uygulama içinden tık diye açılıyor. Wizz’i Wizz’den aldıysan Wizz açılıyor. Otobüs FlixBus’taysa FlixBus açılıyor. Odaya gitmek istiyorsan Airbnb veya Booking. Ayrı ayrı aramıyorsun.

Sonra trip’in kendisi:

- Nerede başlıyor?
- Ne zaman başlıyor?
- Ne kadar erken çıkmalısın?
- Ne zaman orada bulunmalısın?
- Hangi yol, hangi saat, sıradaki iş ne?

Hepsini gösteriyor. Saatleri gösteriyor. Yolları gösteriyor. Çantayı gösteriyor. Bugün ne yapacağını gösteriyor.

Hesap yok. Sunucu yok. Analitik yok. Plan telefonda kalıyor.

## Ne işe yarar, madde madde

- Uçuş ve otobüs saatleri tek kartta
- Tarihli hatırlatmalar — sadece saat değil, gün de var
- Her bacak için harita / yol tarifi
- Cihazda kalan çanta listesi
- Wizz Air, FlixBus, Airbnb, Booking, MOL Bubi ve benzeri uygulamalara tık — telefonda varsa açılır
- Takvime veya Anımsatıcılara `.ics` ile çıkış

Örnek plan: 14–21 Eylül 2026, Ankara → Budapeşte → Viyana. Rezervasyon kodları maskeli, sokak numaraları yok.

## Telefonda aç

1. [cemalsakin.github.io/belvia](https://cemalsakin.github.io/belvia/) — Safari tercih
2. Paylaş → **Ana Ekrana Ekle**
3. Kendi tarihlerini yaz veya örnek trip’i yükle

Veri `localStorage` anahtarı `belvia-v2` içinde. Trip’i silersen gider.

Mağaza metni: [`APP_STORE.md`](APP_STORE.md)  
LinkedIn için hazır metin: [`LINKEDIN.md`](LINKEDIN.md)

## English, short

Cheap tickets live in five apps. BudVia puts the trip you already bought on one phone: times, routes, when to leave, when to be there, and a tap that opens the same app you booked with. No account. No server. The itinerary does not leave the device.

## Publisher

Tahsin Sakin  
[linkedin.com/in/tahsin-sakin-390961199](https://www.linkedin.com/in/tahsin-sakin-390961199)

Repo adı tarihsel olarak **Belvia**. Ekranda gördüğün yüz **BudVia**.

MIT. `LICENSE`.
