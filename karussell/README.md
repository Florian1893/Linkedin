# Karussell-Bilder

Handgezeichneter Flipchart-Stil, gebaut mit rough.js und Playwright.

## Neu bauen

```
npm install roughjs playwright
node render.js
```

`render.js` nutzt den vorinstallierten Chromium unter `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Die Caveat-Schrift liegt als TTF daneben, damit kein CDN gebraucht wird.

## Pruefen vor dem Ausliefern

Das Renderskript bricht ab, wenn `typeof rough` nicht `object` ist oder ein SVG leer bleibt. Trotzdem jedes Bild einmal anschauen: Elemente koennen sich ueberlappen, ohne dass die Pruefung anschlaegt.

## Format

1080 x 1350 (4:5). Nimmt im Feed maximal Platz ein. Ausgabe als PDF fuer den Dokument-Post, PNGs zur schnellen Vorschau.

Kein Logo, kein Markenname, kein Call-to-action im Bild. Sonst kippt es zur Anzeige.
