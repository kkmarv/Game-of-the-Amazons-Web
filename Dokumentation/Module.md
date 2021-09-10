[Wiki](README.md) > [Dokumentation](Dokumentation.md) > Module

# Module

## Inhalt

Hier werden die TypeScript Dateien gelistet, welche kein TSX beinhalten und somit keine Komponenten sind.

1. [gameBoardTypes](#gameboardtypes)
3. [lobbyScreenTypes](#lobbyscreentypes)
2. [requests](#requests)

## gameBoardTypes

Dieses Modul enthält Typdefinitionen für die Benutzung des Spielbrettes.

### Klassen

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

## lobbyScreenTypes

Dieses Modul enthält Typdefinitionen für die Benutzung der Lobby.

### Klassen

---

## requests

Dieses Modul definiert die API-Anfragen an den [Game Of The Amazons Service](https://gitlab.hs-anhalt.de/zwischenprojekte/game-of-the-amazons-service) mittels TypeScript, wobei so gut wie möglich versucht wird, Konsistenz zu der gegebenen API herzustellen.  
Eine verbesserte Version der API Dokumentation ist [hier](API-Spezifikation.md) zu finden.

### Methoden

---

#### createAiPlayer(name)

Erstellt einen neuen KI-Spieler.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `name` | `string` | Name des neuen KI-Spielers <br> Der Name darf noch nicht vorhanden sein |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<Player>` | Der erstellte Spieler |
| `Promise<undefined>` | Falls die Anfrage fehlgeschlagen ist |

---

#### deletePlayer(id)

Löscht einen Spieler.  
Schlägt automatisch fehl, sofern der Spieler an einem laufenden Spiel teilnimmt.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | ID des zu löschenden Spielers |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

---

#### getLocalPlayer()

Gibt den aktuell angemeldeten Spieler zurück.

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<Player>` | Der aktuell angemeldete Spieler |
| `Promise<undefined>` | Falls die Anfrage fehlgeschlagen ist |

---

#### getAllPlayers()

Gibt alle Spieler zurück.

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<Player[]>` | Liste aller menschlichen und KI-Spieler <br> Das Array ist leer, wenn keine Spieler vorhanden sind oder ein Fehler bei der Anfrage aufgetreten ist. |

---

#### createGame(players, maxTurnTime, rowCount, columnCount, tiles)

Erstellt ein neues Spiel.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `players` | `number[]` | Liste der Spieler-IDs, welche an diesem Spiel teilnehmen sollen <br> Es sind mindestens 2 IDs notwendig) |
| `maxTurnTime` | `int` | Zeit in Millisekunden, welche jeder Spieler hat, um seinen Zug auszuführen |
| `rowCount` | `number` | Anzahl der Zeilen des Spielbrettes |
| `columnCount` | `number` | Anzahl der Spalten des Spielbrettes |
| `tiles` | `number[][]` | Liste der Spalten des Spielbrettes (von 0 bis rowCount - 1) <br> Folgende Integer-Werte sind in diesen Arrays erlaubt: <br> `0` - Amazone des Spielers mit Index 0 in `players` <br> `1` - Amazone des Spielers mit Index 1 in `players` <br> `-1` - leeres Feld <br> `-2` - Giftpfeil |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<BasicGame>` | Das erstellte Spiel |
| `Promise<undefined>` | Falls die Anfrage fehlgeschlagen ist |

---

#### deleteGame(id)

Löscht ein Spiel.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | ID des zu löschenden Spiels |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

---

#### getGame(id)

Ruft ein bestimmtes Spiel ab.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | ID des gefragten Spiels |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<DetailedGame>` | Das gefragte Spiel |
| `Promise<undefined>` | Falls die Anfrage fehlgeschlagen ist |

---

#### getAllGames()

Ruft alle Spiele ab.  
Hier werden, im Gegensatz zu [`getGame(id)`](#getgameid), die Spiele in Form von `BasicGame` zurückgeben.

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<BasicGame[]>` | Liste aller Spiele <br> Das Array ist leer, wenn keine Spiele vorhanden sind oder ein Fehler bei der Anfrage aufgetreten ist. |

---

#### createTurn(gameId, turn)

Erstellt einen neuen Zug in einem laufenden Spiel.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `gameId` | `number` | Die ID des Spiels, in dem der Zug gemacht werden soll |
| `turn` | `Turn` | Der Zug, der gesetzt werden soll <br> Sollte der Zug gemäß der Regeln des Amazonenspiels invalide sein, so wird das Spiel automatisch abgebrochen |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

---

#### reset()

Setzt den Spielserver komplett auf Standardwerte zurück. Alle Spieler und Spiele werden gelöscht. Alle IDs werden auf 0 zurückgesetzt.

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

---

### Klassen

Typdefinitionen für die API Responses.

---

#### Player

Versucht Konsistenz mit den API-Responses von [`GET /games/<id>`](API-Spezifikation.md#get-gamesid), [`POST /games/`](API-Spezifikation.md#post-games) und [`GET /games/`](API-Spezifikation.md#get-games) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | Spieler-ID |
| `name` | `string` | Spielername |
| `controllable` | `boolean` | `true` für menschliche und `false` für KI-Spieler |

---

#### Board

Versucht Konsistenz mit den API-Responses von [`GET /games/<id>`](API-Spezifikation.md#get-gamesid) und [`POST /games/`](API-Spezifikation.md#post-games) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `rowCount` | `number` | Reihenanzahl des Spielbrettes |
| `columnCount` | `number` |Spaltenanzahl des Spielbrettes |
| `tiles` | `number[][]` | Repräsentation des Spielbrettes mit den zugehörigen Werten des `TileEnum` |

---

#### Coordinates

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `row` | `number` | y-Koordinate eines 2D Arrays |
| `column` | `number` | x-Koordinate eines 2D Arrays |

---

#### Turn

Versucht Konsistenz mit der API-Response von [`POST /move/<id>`](API-Spezifikation.md#post-moveid) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `move` | `{start: Coordinates, end: Coordinates}` | Start- und Endkoordinaten der Bewegung einer Amazone |
| `shot` | `Coordinates` | Koordinaten eines Pfeilschusses |

---

#### BasicGame

Versucht Konsistenz mit den API-Responses von [`GET /games/`](API-Spezifikation.md#get-games) und [`POST /games/`](API-Spezifikation.md#post-games) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | Spiel-ID |
| `players` | `Player[]` | Spieler, die am Spiel teilnehmen |
| `maxTurnTime?` | `number` | Maximale Zugzeit eines jeden Spielers <br> _OPTIONAL Wird nicht von [`GET /games/`](API-Spezifikation.md#get-games) verwendet_ |
| `winningPlayer?` | `number` | ID des Spielers, der gewonnen hat <br> _OPTIONAL Wird nicht von [`POST /games/`](API-Spezifikation.md#post-games) verwendet und ist nur bei bereits beendeten Spielen vorhanden_ |
| `board?` | `Board` | Das zugehörige Spielbrett <br> _OPTIONAL Wird nicht von [`GET /games/`](API-Spezifikation.md#get-games) verwendet_ |

---

#### DetailedGame `extends BasicGame`

Versucht Konsistenz mit der API-Response von [`GET /games/<id>`](API-Spezifikation.md#get-gamesid) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `playerId` | `number` | Spieler-ID, dessen, der gerade am Zug ist |
| `maxTurnTime` | `number` | Maximale Zugzeit eines jeden Spielers |
| `remainingTurnTime?` | `number` | Verbleibende Zugzeit des aktuellen Spielers <br> _OPTIONAL Ist nur bei laufenden Spielen vorhanden_ |
| `board` | `Board` | Das zugehörige Spielbrett |
| `turns?` | `Turn[]` | Liste aller Züge <br> _OPTIONAL Ist nur bei Spielen mit getätigten Zügen vorhanden_ |

---
