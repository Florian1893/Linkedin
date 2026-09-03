# Notion-Migration Lead-Tracker (Uebergabe)

Angelegt 03.09.2026. Zweck: Der Lead-Tracker soll von der Markdown-Tabelle nach Notion umziehen, damit Florian ihn am Handy und am Laptop bedienen kann, ohne Chat.

## Stand jetzt

**Datenbank ist angelegt, aber LEER.**

| Feld | Wert |
|---|---|
| Titel | BetriebsFlow Lead-Tracker |
| URL | https://app.notion.com/p/ea6927cb99d74bd0894ed66d3f250a31 |
| Data Source ID (Parent fuer neue Seiten) | `collection://cad08457-c3af-4291-aeea-51ee071accc9` |
| Zeilen drin | 0 von 32 |

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

## Was noch fehlt

1. **Die 32 Leads importieren.** Quelle ist die Tabelle in `lead-tracker.md` (Spaltenreihenfolge identisch mit dem Schema). Mit `notion-create-pages` und `parent: {data_source_id: "collection://cad08457-c3af-4291-aeea-51ee071accc9"}`, maximal 100 Seiten pro Aufruf, also ein Aufruf reicht.
2. **Datumsformat umrechnen.** Im md stehen Kurzdaten ("01.09.", "Fr 04.09.", "Mo 07.09."), Notion braucht ISO: 2026-09-01, 2026-09-04, 2026-09-07, 2026-09-09, 2026-09-11. Ein Strich "-" heisst leeres Datumsfeld, nicht Text.
3. **Status mappen** (md → Notion): `ENTWURF`→Entwurf, `PENDENT`→Pendent, `GESENDET`→Gesendet, `FU1`→Follow-up 1, `FU2`→Follow-up 2, `ANTWORT (Absage)`→Absage, `ANTWORT (kein Zeit)`→Antwort, `TERMIN`→Termin, `GEWONNEN`→Gewonnen, `VERLOREN`→Verloren.
4. **Views anlegen:** "Heute faellig" (FU1 oder FU2 = heute), "Offene Entwuerfe" (Status = Entwurf), "Wiedervorlage" (Reto ~Maerz 2027, Ahmed Anfang November 2026), "Alle nach Prio".
5. **Zwei Sonderfaelle NICHT importieren:** Claudio Baggio (Florians Entscheid: nicht anschreiben, nicht tracken) und Paul Buehler (Netzwerk-Kontakt, kein Pitch). Beide bleiben nur als Notiz unten im md.

## Regeln nach dem Umzug

- Bis Notion vollstaendig gefuellt und geprueft ist, bleibt `lead-tracker.md` die Quelle der Wahrheit.
- Danach fuehrt Notion, `lead-tracker.md` laeuft als Backup im Repo mit und wird bei jeder Aenderung mitgezogen.
- Der Werktags-Check (Routine, 07:00 CH-Zeit) liest weiterhin `lead-tracker.md` aus dem Branch `claude/linkedin-outreach-agent-r48qr3`. Wenn Notion fuehrt, muss diese Routine auf die Notion-Datenbank umgestellt werden.
- `outreach-playbook.md` bleibt in Markdown im Repo. Nur der Tracker zieht um, nicht die Regeln.

## Offene Punkte aus dem Outreach (nicht Teil der Migration, aber offen)

- **4 Nachrichten liegen als Entwurf bereit, ungesendet:** Michel Baehler (#6), Fisnik Zeneli (#14), Hansruedi Roeschmann (#23), plus Timy Weidmann (#1, Vernetzung noch offen).
- **Antworten raus:** Ahmed Vuckic (Wiedervorlage Anfang November bestaetigen), Reto Wetter (Absage freundlich quittiert).
- **Follow-ups:** Fr 04.09. fuer Welle 1 (10 Leads), Mo 07.09. fuer Welle 2 und 3.
- **Unbeantwortete Inbounds:** Mike Mbokolanzi (pitcht Florian), Adrian Krasniqi ("Was baust du eigentlich gerade auf?"), Bastian Schmidt ("Woher?").
- **Testimonial bei Diego holen** mit konkreter Zahl. Wird der starke Proof-Satz und der Inhalt fuer Follow-up 2.
- **Headline:** Im Playbook steht noch die Fassung vom 02.09. Florian hat am 03.09. eine neuere gespeichert, welche genau ist offen. Playbook nachziehen, sobald klar.
