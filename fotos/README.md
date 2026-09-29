# Serienbild: Gesicht plus Frage

Wiederkehrendes Bild fuer "Die Frage, die zurueckkommt". Florian am
Schreibtisch, unten die Frage der Folge in Weiss auf dunklem Verlauf,
darueber die Zeile "Die Frage, die ich jedem Inhaber stelle:".

Pro Folge nur die Frage in `foto-frage.html` austauschen, dann
`node render-foto.js` (braucht playwright aus karussell/node_modules und
die Inter-TTFs). Das Foto kann bleiben oder pro Folge wechseln, der
Aufbau bleibt gleich, daran erkennt man die Serie.

Kein Logo, kein Markenname im Bild.

## Handgezeichnete Striche und Kringel, drei Fallen

1. IMMER innerhalb von `document.fonts.ready.then(...)` messen und zeichnen,
   sonst kommen die Koordinaten von der Ersatzschrift und der Strich sitzt falsch.
   Im Renderer zusaetzlich `await p.evaluate(()=>document.fonts.ready)`.
2. Wer eine Textzeile unterstreicht, darf NICHT den Block messen. Ein Block ist
   immer so breit wie die Spalte, der Strich laeuft dann quer durchs Bild. Das
   Element auf `display:inline-block` stellen, dann umschliesst das Rechteck den
   Text. Achtung: das naechste Element rutscht damit in dieselbe Zeile, es braucht
   `display:block;width:fit-content;`.
3. `rect.bottom` liegt bei `line-height` ueber 1 auf der Grundlinie und schneidet
   die Buchstaben. Rund 3 Pixel tiefer zeichnen.
