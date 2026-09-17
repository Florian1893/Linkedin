# LinkedIn-Formate der Post-Bilder

Jedes Chat-Bild gibt es in drei Groessen. Gerendert mit `node fotos/render-formate.js`,
die Quelldateien sind `fmt-*.html`.

| Datei | Groesse | Wann |
|---|---|---|
| bild-notiz.png / bild-whatsapp.png | 1080 x 1350 (4:5) | STANDARD. Nimmt im Feed am meisten Platz ein, also die meiste Aufmerksamkeit pro Scroll. |
| fmt-*-quadrat.png | 1080 x 1080 (1:1) | Wenn das Hochformat auf dem Desktop zu stark beschnitten wirkt. Wird nie zugeschnitten. |
| fmt-*-quer.png | 1200 x 627 (1.91:1) | Klassisches Linkempfehlungs-Format. Nimmt am wenigsten Platz, dafuer steht die Pointe als Schlagzeile daneben. |

Die 4:5-Version ist der rohe Chat ohne Rahmen. Quadrat und Quer setzen denselben Chat als
Karte auf dunklen Grund, mit Schatten und der Adresse betriebsflow.ch. Bei der Querversion
steht rechts die Schlagzeile, weil der Chat allein in diesem Verhaeltnis zu klein waere.

Empfehlung: 4:5 posten. Die anderen zwei liegen bereit, falls Florian dasselbe Bild spaeter
in einem Beitrag mit Link oder in einer Anzeige braucht.

Gerendert wird aus den fertigen PNG. Wer den Chat aendert, rendert zuerst
`render-notiz.js` beziehungsweise `render-whatsapp.js` neu und danach `render-formate.js`.
