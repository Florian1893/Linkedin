# PDF fuers Profil

## fuenf-dinge-selbst-automatisieren.pdf

Fuenf Seiten A4. Gehoert in den Profilbereich "Im Fokus" (Featured).

Inhalt: fuenf Ablaeufe, die ein Handwerksbetrieb ohne neue Software selbst
einrichten kann. Pro Punkt das Problem, die konkrete Umsetzung und wie lange
es dauert.

1. Automatische Eingangsbestaetigung auf Anfragen (15 Minuten)
2. Offerten einsprechen statt abtippen (sofort)
3. Nachfassen ueber einen Kalendereintrag (10 Sekunden pro Offerte)
4. Bewertungslink als Textbaustein (20 Minuten)
5. Alle Anfragen an eine Sammeladresse (30 Minuten)

Am Schluss der ehrliche Punkt: vier der fuenf haengen daran, dass es jemand
tatsaechlich macht. Genau dort faengt ein System an. Kein Verkaufsblock,
ein Satz.

Keine erfundenen Zahlen, keine Zeitersparnis-Versprechen, keine Kundenergebnisse.
Die Zeitangaben beschreiben den Einrichtungsaufwand, nicht einen Nutzen.

## Design

Folgt betriebsflow-design: Papierton, Marine als Tinte, Violett genau einmal
pro Seite, Haarlinien statt Schatten, kein Schwarz, kein Schriftgewicht ueber 500.

Die Farbwerte sind Annaeherungen. Die verbindlichen Tokens stehen in DESIGN.md
im Website-Repo, das hier nicht vorliegt. Zum Angleichen die Werte im
`:root`-Block von `mehrwert.html` ersetzen.

## Neu bauen

```
node render-mehrwert.js
```

Braucht `playwright` und den vorinstallierten Chromium. Inter liegt als TTF daneben.
