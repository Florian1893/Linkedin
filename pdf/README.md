# PDFs fuers Profil

## woran-dein-betrieb-haengt.pdf

Selbsttest mit zwoelf Fragen, neun Seiten A4. Gehoert in den Profilbereich "Im Fokus" (Featured).

**Warum ein Selbsttest und keine Anleitung.** Eine Anleitung zum Selbermachen bringt Downloads, aber keine Gespraeche, weil sie erklaert, warum man Florian nicht braucht. Ein Selbsttest dreht das um: der Leser diagnostiziert sich selbst, jede Luecke ist ein Grund zu reden. Der Gratis-Wert steckt trotzdem drin, auf Seite 7 stehen drei Dinge, die jeder sofort ohne Software umsetzen kann.

**Der Bogen.** Filter (fuer wen, fuer wen nicht) → warum es kippt → zwoelf Fragen in vier Bloecken → Auswertung → was du selbst aendern kannst → warum das irgendwann nicht reicht → Prozessanalyse.

**Ehrlichkeit.** Keine Kundenergebnisse, keine erfundenen Zahlen. Die einzige Geschichte im Dokument ist das dokumentierte Gipser-Gespraech (zwoelf auf zwanzig Mitarbeiter). Der Rest ist Prinzip und laesst sich im Erstgespraech verteidigen.

## Design

Folgt betriebsflow-design: Papierton, Marine als Tinte, Violett genau einmal pro Seite, Haarlinien statt Schatten, kein Schwarz, kein Schriftgewicht ueber 500, Radien 20px auf Karten und 48px auf Pillen, Abstaende in Vielfachen von 8.

Die Farbwerte sind Annaeherungen. Die verbindlichen Tokens stehen in DESIGN.md im Website-Repo, das hier nicht vorliegt. Zum Angleichen die Werte im `:root`-Block von `selbsttest.html` ersetzen.

## Neu bauen

```
node render-pdf.js
```

Braucht `playwright` und den vorinstallierten Chromium. Inter liegt als TTF daneben, damit kein CDN noetig ist.
