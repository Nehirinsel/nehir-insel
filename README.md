# Nehir İnsel — Kişisel CV Sitesi

Marmara Üniversitesi İşletme (İngilizce) öğrencisi Nehir İnsel'in kişisel portfolyo / CV sitesi.

## Özellikler

- **TR / EN dil desteği** — tüm içerik `data-tr` / `data-en` öznitelikleriyle çift dilli, seçim `localStorage`'da saklanır
- **Koyu / açık tema** — sistem tercihine göre başlar, kullanıcı seçimi hatırlanır, ilk boyamadan önce uygulanır (flash yok)
- Scroll ile tetiklenen reveal animasyonları, sayaçlar, yatay sinematik galeri, manyetik butonlar
- Bölüm başına değişen vurgu rengi paleti
- Bağımlılık yok — düz HTML / CSS / JS

## Yapı

```
index.html      tüm içerik (çift dilli)
style.css       tema, düzen, animasyonlar
script.js       dil, tema, scroll etkileşimleri
images/         optimize edilmiş .webp görseller
assets/         CV (PDF), sertifikalar, favicon
```

## Yerelde çalıştırma

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Yayına alma

GitHub Pages: `Settings → Pages → Branch: main / root`.

Yayın adresi `index.html` (canonical + og:url + og:image), `robots.txt` ve `sitemap.xml`
içinde geçiyor. Hepsini birden değiştirmek için:

```bash
./set-site-url.sh https://nehirinsel.github.io/
```

> **Cloudflare Pages kullanmayın.** Site bir süre `nehir-insel.pages.dev`
> adresinden yayındaydı, ancak `*.pages.dev` alan adının tamamı Türkiye'de
> engelli: yurt içi DNS sahte bir adres döndürüyor ve hostname'i gören DPI
> bağlantıyı resetliyor, sayfa sonsuza kadar yükleniyor görünüyor.
> `github.io` engelli değil.

## Nehir'in hesabına devir

1. Nehir bir GitHub hesabı açar (kullanıcı adı **`nehirinsel`** — adres bundan türüyor).
2. Bu repoda `Settings → General → Transfer ownership` ile repo o hesaba aktarılır.
3. Nehir'in hesabında repo adı **`nehirinsel.github.io`** yapılır (kök kullanıcı sitesi olur).
4. `Settings → Pages → Branch: main / root` açılır.
5. `./set-site-url.sh https://nehirinsel.github.io/` çalıştırılıp commit'lenir.

Tüm görsel/asset yolları göreli, bu yüzden 5. adım dışında değişiklik gerekmiyor.
