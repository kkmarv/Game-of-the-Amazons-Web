### gameBoardTypes

### Klassen

Typdefinitionen für das Spielbrett.

---

#### Tile

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `disabled` | `boolean` | `false` anklickbar <br> `true` nicht anklickbar |
| `tileType` | `TileEnum` | Wert aus dem `TileEnum` |

---

#### TileEnum

| Konstante | Wert | Beschreibung |
| ------ | ------ | ------ |
| `PLAYER` | `0` | Feld mit eigener Amazone besetzt |
| `OPPONENT` | `1` | Feld mit gegnerischer Amazone besetzt |
| `EMPTY` | `-1` | Leeres Feld |
| `ARROW` | `-2` | Durch Pfeil blockiertes Feld |

---

## Komponenten

Die React Komponenten der Webseite.

---

### LobbyScreen

Ist der umgebende Container für das GUI der Lobby-Seite. Der User beginnt hier.

---

### GameScreen

Ist der umgebende Container für das GUI einer Spiel-Seite.

---

#### GameControl

Verwaltet ein Spiel und die zugehörigen API Requests.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `players` | `Player[]` | Spieler, die am Spiel teilnehmen |
| `localPlayers` | `Player[]` | ??? |
| `BasicGame` | `Game` | Das Spiel wird mit diesen Spiel-Informationen initialisiert |

**Methoden**

---

#### PlayerSidebar

Repräsentiert die Spieler-Informationen am Seitenrand des Bildschirms.  
Speichert Informationen wie die Zug-Historie oder gespielte Zeit des jeweiligen Spielers.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `player` | `Player` | Spieler, für den die Informationen angezeigt werden |

**Methoden**

---

#### GameBoard

Repräsentiert das Spielbrett, auf dem die Spieler ihre Amazonen bewegen.  
Stellt das GUI für das Brett bereit und sorgt für die Einhaltung valider Züge des Spielers.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onTurnEnd` | `(turn: Turn) => Promise<void>` | Wird aufgerufen wenn ein Zug endet |
| `isLocalPlayer` | `boolean` | `true` falls gerade der lokale Spieler am Zug ist, sonst `false` |
| `initialBoard` | `Board` | `Board`, das gerendert wird |

**Methoden**

---

#### GameBoardTile

Repräsentiert ein Feld des Spielbrettes, auf dem ein Spielstein liegen kann.  
Verwaltet jeweils ein `HTMLButtonElement`.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `string` | Feld-ID zur Verwendung in HTML |
| `color` | `string` | Farbe eines Feldes <br> Entweder `"white"` oder `"black"` |
| `onClick` | `() => void` | Callback Funktion für wenn das Feld angeklickt wird |
| `tileType` | `TileEnum` | Feldtyp |
| `disabled` | `boolean` | `false` anklickbar <br> `true` nicht anklickbar |

**Methoden**

---