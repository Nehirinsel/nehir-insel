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
