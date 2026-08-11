#!/usr/bin/env bash
# Sitenin yayın adresini tek yerden değiştirir.
# Adres index.html (canonical + og:url + og:image), robots.txt ve sitemap.xml'de geçiyor.
#
# Kullanım:
#   ./set-site-url.sh https://nehirinsel.github.io/
set -euo pipefail

NEW="${1:-}"
if [ -z "$NEW" ]; then
  echo "Kullanım: $0 <adres>   (örn: https://nehirinsel.github.io/)" >&2
  exit 1
fi
case "$NEW" in
  https://*) ;;
  *) echo "Adres https:// ile başlamalı." >&2; exit 1 ;;
esac
NEW="${NEW%/}/"   # sonda tek bir / olsun

cd "$(dirname "$0")"

OLD=$(grep -oP '(?<=<link rel="canonical" href=")[^"]+' index.html)
if [ "$OLD" = "$NEW" ]; then
  echo "Adres zaten $NEW — değişiklik yok."
  exit 0
fi

for f in index.html robots.txt sitemap.xml; do
  sed -i "s#${OLD}#${NEW}#g" "$f"
done

echo "Adres güncellendi: $OLD  ->  $NEW"
grep -rn "$NEW" index.html robots.txt sitemap.xml
