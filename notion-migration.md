# Notion-Migration Lead-Tracker (Uebergabe)

Angelegt 03.09.2026, Import am 03.09.2026 abgeschlossen. Zweck: Der Lead-Tracker soll von der Markdown-Tabelle nach Notion umziehen, damit Florian ihn am Handy und am Laptop bedienen kann, ohne Chat.

## Stand jetzt

**Datenbank ist gefuellt: 33 von 33 Leads drin, Views angelegt.**

| Feld | Wert |
|---|---|
| Titel | BetriebsFlow Lead-Tracker |
| URL | https://app.notion.com/p/ea6927cb99d74bd0894ed66d3f250a31 |
| Database ID | `ea6927cb-99d7-4bd0-894e-d66d3f250a31` |
| Data Source ID (Parent fuer neue Seiten) | `cad08457-c3af-4291-aeea-51ee071accc9` |
| Zeilen drin | 33 von 33 |

Achtung beim Anlegen neuer Seiten: `notion-create-pages` will die **nackte UUID** im Parent (`{"type":"data_source_id","data_source_id":"cad08457-c3af-4291-aeea-51ee071accc9"}`). Mit dem Praefix `collection://` bricht der Aufruf mit `validation_error` ab. Das Praefix gilt nur fuer `query-data-sources` und `create-view`.

Schema wie angelegt:

```sql
CREATE TABLE (
  "Name"        TITLE,
  "Firma"       RICH_TEXT,
  "Gewerk"      RICH_TEXT,
  "Prio"        SELECT('A':red, 'B':gray),
  "Status"      SELECT('Entwurf':gray,'Pendent':yellow,'Gesendet':blue,'Follow-up 1':purple,
                       'Follow-up 2':pink,'Antwort':green,'Absage':red,'Termin':orange,
                       'Gewonnen':green,'Verloren':brown),
  "Gesendet"    DATE,
  "FU1 faellig" DATE,
  "FU2 faellig" DATE,
  "Antwort"     RICH_TEXT,
  "Notiz"       RICH_TEXT
)
```

## Was drin ist

**33 Leads importiert** (nicht 32 — die alte Notiz zaehlte falsch, die Tabelle in `lead-tracker.md` hat die Nummern 1 bis 33 ohne Luecke). Claudio Baggio und Paul Buehler sind wie vorgesehen **nicht** importiert, sie stehen weiter nur als Notiz unter der Tabelle im md.

Verteilung in Notion nach dem Import:

| Status | Anzahl |
|---|---|
| Gesendet | 26 |
| Entwurf | 3 |
| Pendent | 1 |
| Antwort | 1 |
| Absage | 1 |
| (leer, Sonderfall Night Schmid-Ouko) | 1 |
| **Total** | **33** |

Prio: 27x A, 6x B. Die 26 "Gesendet" plus Reto Wetter und Ahmed Vuckic (beide gesendet, dann geantwortet) ergeben die 28 gesendeten Nachrichten aus der KPI-Kette.

**Datumsumrechnung angewandt:** `01.09.`→2026-09-01, `02.09.`→2026-09-02, `03.09.`→2026-09-03, `Fr 04.09.`→2026-09-04, `Mo 07.09.`→2026-09-07, `Mi 09.09.`→2026-09-09, `Fr 11.09.`→2026-09-11. `-` wurde als leeres Datumsfeld uebernommen, nicht als Text.

**Status-Mapping angewandt:** `ENTWURF`→Entwurf, `PENDENT`→Pendent, `GESENDET`→Gesendet, `ANTWORT (Absage)`→Absage, `ANTWORT (kein Zeit)`→Antwort. Die uebrigen Codes (`FU1`, `FU2`, `TERMIN`, `GEWONNEN`, `VERLOREN`) kamen im md noch nicht vor, sind im Schema aber vorhanden.

### Views

| View | Filter / Sortierung | MCP-ID |
|---|---|---|
| Heute faellig | FU1 **oder** FU2 = Datum, sortiert nach Prio | `view://3d024c77-42d1-81c5-a50e-000ce20bec16` |
| Offene Entwuerfe | Status = Entwurf, sortiert nach Prio | `view://3d024c77-42d1-8144-9711-000c9430aee4` |
| Wiedervorlage | Status = Absage oder Antwort, sortiert nach Name | `view://3d024c77-42d1-81e6-91f1-000c967c014e` |
| Alle nach Prio | Prio, dann Status, dann FU1 | `view://3d024c77-42d1-8110-86b8-000c9b11b358` |

### Geprueft

Alle 33 Zeilen wurden nach dem Import aus Notion zurueckgelesen und maschinell Feld fuer Feld gegen `lead-tracker.md` verglichen (Firma, Gewerk, Prio, Status, alle drei Datumsfelder, Antwort, dazu Laenge sowie Anfang und Ende der Notiz). **Null Abweichungen**, keine Spalte verrutscht. Zusaetzlich geprueft: Baggio und Buehler sind nicht in der Datenbank, "Offene Entwuerfe" trifft genau die drei Entwuerfe, "Wiedervorlage" genau Reto Wetter und Ahmed Vuckic.

## Was noch offen ist

1. **"Heute faellig" enthaelt ein fixes Datum (2026-09-03), kein relatives "Heute".** Die MCP-Schnittstelle kann keine relativen Datumsfilter setzen: die View-DSL akzeptiert ausschliesslich ISO-Daten, `TODAY` ohne Anfuehrungszeichen wird als Syntaxfehler abgewiesen, und `"today"` als Text wird zwar gespeichert, matcht dann aber nie (getestet und bestaetigt: 0 statt der erwarteten 5 Treffer). **Florian muss den Filter in der Notion-UI einmalig von Hand auf "Heute" umstellen** — beide Bedingungen, FU1 und FU2. Die Filterstruktur (OR ueber beide Felder) steht bereits korrekt, es ist nur die Umstellung des Wertes. Bis dahin zeigt der View den Stand vom 03.09. und ab dem 04.09. Falsches.
2. **Night Schmid-Ouko (#9 im md) hat leere Felder.** Im md stehen dort Werte, die nicht ins Schema passen: Status `FU1 bereit` (kein gueltiger Status-Code), Gesendet `Erstnachricht 02.07.` (kein Datum, Jahr unklar), FU1 `sofort moeglich`, FU2 `+4-5 Tage danach`. Diese vier Felder wurden bewusst leer uebernommen statt geraten. Die Originalwerte stehen als Import-Hinweis am Ende des Notiz-Feldes, damit nichts verloren geht. **Florian muss entscheiden**, welcher Status und welches Datum hier gelten sollen — der Lead haengt sonst in keinem View.
3. **"Wiedervorlage" laeuft ueber den Status, nicht ueber ein Datum.** Das Schema hat kein Wiedervorlage-Feld, deshalb filtert der View auf Status = Absage oder Antwort. Das trifft aktuell genau die beiden gemeinten Faelle (Reto ~Maerz 2027, Ahmed Anfang November 2026), skaliert aber nicht: sobald eine dritte Antwort ohne Wiedervorlage kommt, steht sie faelschlich drin. Sauberer waere ein eigenes Datumsfeld "Wiedervorlage" — auf Zuruf ergaenzbar.
4. **Der Testview ist recycelt, nicht geloescht.** Beim Pruefen des Datumsfilters entstand ein Hilfsview; da die MCP-Schnittstelle kein Loeschen von Views kann, wurde er zu "Alle nach Prio" umkonfiguriert. Es liegt kein Muell-View in der Datenbank.

## Regeln nach dem Umzug

- Der Import ist durch und geprueft. Ob Notion oder `lead-tracker.md` ab jetzt fuehrt, entscheidet Florian — solange das nicht entschieden ist, bleibt `lead-tracker.md` die Quelle der Wahrheit.
- Wenn Notion fuehrt: `lead-tracker.md` laeuft als Backup im Repo mit und wird bei jeder Aenderung mitgezogen.
- Der Werktags-Check (Routine, 07:00 CH-Zeit) liest weiterhin `lead-tracker.md` aus dem Branch `claude/linkedin-outreach-agent-r48qr3`. **Diese Umstellung auf Notion ist noch nicht gemacht und braucht Florians Entscheid.** Sie haengt an Punkt 1 oben: solange "Heute faellig" ein fixes Datum hat, kann die Routine den View nicht blind auslesen.
- `outreach-playbook.md` bleibt in Markdown im Repo. Nur der Tracker zieht um, nicht die Regeln.

## Offene Punkte aus dem Outreach (nicht Teil der Migration, aber offen)

- **4 Nachrichten liegen als Entwurf bereit, ungesendet:** Michel Baehler (#6), Fisnik Zeneli (#14), Hansruedi Roeschmann (#23), plus Timy Weidmann (#1, Vernetzung noch offen).
- **Antworten raus:** Ahmed Vuckic (Wiedervorlage Anfang November bestaetigen), Reto Wetter (Absage freundlich quittiert).
- **Follow-ups:** Fr 04.09. fuer Welle 1 (10 Leads), Mo 07.09. fuer Welle 2 und 3.
- **Unbeantwortete Inbounds:** Mike Mbokolanzi (pitcht Florian), Adrian Krasniqi ("Was baust du eigentlich gerade auf?"), Bastian Schmidt ("Woher?").
- **Testimonial bei Diego holen** mit konkreter Zahl. Wird der starke Proof-Satz und der Inhalt fuer Follow-up 2.
- **Headline:** Im Playbook steht noch die Fassung vom 02.09. Florian hat am 03.09. eine neuere gespeichert, welche genau ist offen. Playbook nachziehen, sobald klar.

## Zweite Datenbank: BetriebsFlow Tagesaktivitaet (angelegt 04.09.2026)

Zeigt, wie viele Nachrichten pro Tag rausgingen, aufgeteilt nach Typ.

| Feld | Wert |
|---|---|
| URL | https://app.notion.com/p/f1e7144998c74631b38b5684f3158c35 |
| Database ID | `f1e71449-98c7-4631-b38b-5684f3158c35` |
| Data Source ID | `90320b6e-202c-4898-b171-f604bed222e0` |

Spalten: Tag (Titel), Datum (date), Erstnachrichten (number), Follow-up 1 (number), Follow-up 2 (number), Total (FORMEL, nicht setzen), Notiz (rich text).

Ansichten: "Total pro Tag" (Saeulendiagramm, blau), "Erstnachrichten pro Tag" (Saeulendiagramm, gruen, mit SOP-Ziel 15-20 in der Bildunterschrift), "Aufteilung pro Tag" (Tabelle, neueste zuerst).

Die 08:00-Routine (trig_01K9v85heURGvQBoDmFkkXDw) fuellt diese DB taeglich aus lead-tracker.md nach. Erstnachrichten = Anzahl Leads mit diesem Gesendet-Datum. Follow-ups = Anzahl Leads mit "FU1 raus TT.MM." bzw. "FU2 raus TT.MM." in der jeweiligen Spalte.

Stand 04.09.2026:

| Tag | Erst | FU1 | FU2 | Total |
|---|---|---|---|---|
| Di 01.09. | 10 | 0 | 0 | 10 |
| Mi 02.09. | 13 | 0 | 0 | 13 |
| Do 03.09. | 9 | 0 | 0 | 9 |
| Fr 04.09. | 9 | 10 | 0 | 19 |

Korrigiert am 04.09. anhand der echten Zeitstempel im LinkedIn-Postfach: Zacharias Sennrich, Raphael Feigenwinter, Jeannine Hintermeister, Luca Monaco und Tobias Aeppli gingen am 03.09. raus, nicht am 04.09. MERKE: Versanddatum immer am LinkedIn-Zeitstempel pruefen, nicht aus dem Chatverlauf ableiten.
