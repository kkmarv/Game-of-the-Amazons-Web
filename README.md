# Game of the Amazons

Das Amazonenspiel ist ein abstraktes Strategie-Brettspiel für 2 Spieler, welches auf auf einem 10x10 Schachbrett gespielt wird.

Es spielt Schwarz gegen Weiß. Weiß beginnt.<br>
Jeder Spieler hat 4 Amazonen, die bereits zu Beginn des Spiels auf dem Brett platziert sind.<br>
Amazonen können sich wie die Dame im Schach auf der Horizontalen, Vertikalen und den beiden Diagonalen bewegen, bis sie auf ein Hindernis treffen. Die Besonderheit des Amazonenspiels ist jedoch, dass Amazonen nach jedem Zug einen "giftigen" Pfeil verschießen müssen, mit dem Ziel, gegnerische Züge zu blockieren.

Der Spieler, der zuerst keine seiner Amazonen mehr bewegen kann, verliert.

Mehr dazu auf der [deutschen Wikipedia Seite.](https://de.wikipedia.org/wiki/Amazonen_(Spiel))

### [Zum Spiel](https://webengineering.ins.hs-anhalt.de:40443/api/v1/web/whisk.system/911_master/website/)

## Anforderungen

### an die Zwischenabgabe (12.07.21) 

<details>
<summary><b>Funktionalitäten</b></summary>

#### Der Nutzer möchte:

<b>von der Logik:</b>

- [x] dass geprüft wird, ob bereits ein Spiel eröffnet ist:
    - [x] Falls nein, soll automatisch ein neues Spiel erstellt werden
    - [x] Falls ja, soll das Spiel angezeigt werden
- [x] dass geprüft wird, ob bereits Spieler existieren:
    - [x] Falls nein, sollen neue Spieler angelegt werden (einen mit controllable=true und einen mit controllable=false)
    - [x] Falls ja, soll der Spieler den kontrollierbaren Spieler übernehmen und die KI den unkontrollierbaren
- [x] dass ein durchgeführter Zug nach Abschluss an den Server gesendet wird
- [x] dass ein Zug des gegnerischen Spielers vom Server abgefragt wird

<b>von der GUI:</b>

- [x] das gesamte Spielfeld einsehen können
- [x] dass die Figuren beider Spieler deutlich voneinander unterscheidbar sind
- [x] dass der Spieler angezeigt bekommt, wenn er (oder respektive der gegnerische Spieler) am Zug ist
    - [x] dass der Zug des gegnerischen Spielers dem Spieler entsprechend angezeigt wird
- [x] dass der Spieler nach dem Zug einer Figur den Zielpunkt für den Pfeilwurf festlegen kann
- [x] dass der Spieler nur legale Züge durchführen kann
- [x] dass das Spiel endet, sobald ein Spieler nicht mehr ziehen kann

</details>

<details>
<summary><b>Tests</b></summary>

#### Als Entwickler müssen wir für sinnvolle Tests:

- [x] überprüfen, ob ein Spielfeld richtig dargestellt wird
    - [x] indem das Backend gemockt wird und Beispielwerte geladen werden,
    - [x] und das Gerenderte mit einem Snapshot verglichen wird.
- [ ] <del>überprüfen, ob Züge durchgeführt werden können</del>
    - [ ] <del>indem ein Spiel gemockt wird</del>
    - [ ] <del>und via Events ein Zug nachgestellt wird</del>
    - [ ] <del>das Ergebnis mittels eines Snapshot Tests abgeglichen wird</del>
- [ ] <del>überprüfen, ob inkorrekte Züge verboten sind</del>
    - [ ] <del>indem ein gemocktes Spiel initialisiert wird</del>
    - [ ] <del>und ein ungültiger Zug durchgeführt wird</del>
    - [ ] <del>entweder eine ungültige Eingabe simulieren, oder die dafür zuständige Funktion direkt aufrufen</del>
- [ ] <del>überprüfen, ob der Pfeilwurf korrekt gesetzt wird</del>
    - [ ] <del>entweder Snapshot- oder ->Funktionstests<- möglich</del>

</details>

### an die Abschlussabgabe (20.09.21)

Die **fettgedruckten** Funktionalitäten, sowie _alle Tests_ sind für die Abschlussabgabe erforderlich.

<details open>
<summary><b>Funktionalitäten</b></summary>

#### Auf der Spiel-Seite möchte der Nutzer:

- [ ] die Zug-Historie einsehen, unzwar
    - [ ] von sich selbst
    - [ ] von seinen Gegnern
- [ ] Pfeile besser unterscheiden können
    - [ ] vom Hintergrund und
    - [ ] seine eigenen von denen der Gegner
- [ ] **bei Sieg und Niederlage eine gesonderte Animation gezeigt bekommen**

#### Auf der Lobby-Seite möchte der Nutzer:
    
- [ ] seinen eigenen Namen frei wählen können
- [ ] **ein Tutorial sehen können, welches kurz das Spielprinzip erklärt**
    - [ ] in Form von GIFs und kurzen Texten
- [ ] **Mulitplayer-Spiele gegen andere Menschen spielen, indem er**
    - [ ] **laufende Spiele, sowie Informationen zu diesen einsehen kann und**
        - [ ] **diesen als Spieler beitreten kann, sofern noch Plätze frei sind oder**
        - [ ] diesen als Zuschauer beitreten kann
    - [ ] **eigene Spiele erstellen kann und**
        - [ ] ihnen einen Namen geben kann, sowie
        - [ ] **die Anzahl der Amazonen festlegen und**
        - [ ] **Spieler 1 oder 2 oder beide kontrollierbar machen** 

#### Weiterhin möchte der Nutzer:

- [ ] **Credits einsehen können. Diese beinhalten:**
    - [ ] **Entwicklernamen**
    - [ ] **Lehrveranstaltung**
    - [ ] **Semester**
    - [ ] **Dozenten**
    - [ ] [**das Logo der Hochschule Anhalt**](https://gitlab.hs-anhalt.de/both_a/webprog-services/-/blob/master/hsa-logos/Logo_HSA_a_o_Standorte_oneliner-400px.png)
- [ ] **zwischen Dark- und Light-Mode sowie einem dritten Design wechseln können**
- [ ] **zwischen deutscher und englischer Sprache wechseln können**
    - [ ] mithilfe von Lokalisierungsdateien
- [ ] **eine Optimierung für Mobilgeräte**
- [ ] wenn gewünscht, Audio-Feedback für seine Aktionen erhalten, unzwar bei(m)
    - [ ] Timer-Tick
    - [ ] Button-Klick
    - [ ] Amazonen picken
    - [ ] Amazonen setzen
    - [ ] Pfeilschüssen
    - [ ] Sieg & Niederlage

</details>

<details open>
<summary><b>Tests</b></summary>

#### Als Entwickler müssen wir für sinnvolle Tests:

- [ ] überprüfen, ob Züge durchgeführt werden können
    - [ ] indem ein Spiel gemockt wird
    - [ ] und via Events ein Zug nachgestellt wird
    - [ ] das Ergebnis mittels eines Snapshot Tests abgeglichen wird
- [ ] überprüfen, ob inkorrekte Züge verboten sind
    - [ ] indem ein gemocktes Spiel initialisiert wird
    - [ ] und ein ungültiger Zug durchgeführt wird
    - [ ] entweder eine ungültige Eingabe simulieren, oder die dafür zuständige Funktion direkt aufrufen
- [ ] überprüfen, ob der Pfeilwurf korrekt gesetzt wird
    - [ ] entweder Snapshot- oder ->Funktionstests<- möglich

</details>

## Fragen & Ideen zum Abschlussprojekt

- Alternative Spielmodi:
    - Damage/Death upon click on invalid tile


# Wiki

## Inhalt

1. [Dokumentation](#dokumentation)
    1. [Module](#module)
        1. [requests](#requests)
        2. [gameBoardTypes](#gameboardtypes)
    2. [Komponenten](#komponenten)
        1. [LobbyScreen](#lobbyscreen)
        2. [GameScreen](#gamescreen)
            1. [GameControl](#gamecontrol)
            2. [PlayerSidebar](#playersidebar)
            3. [GameBoard](#gameboard)
            4. [GameBoardTile](#gameboardtile)
2. [Weiterführende Links](#weiterführende-links)

## Dokumentation

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `Attributname` | `Datentyp` | Kurze Beschreibung |

## Module

TypeScript Dateien, welche kein TSX beinhalten und somit keine Komponenten sind.

### requests

Dieses Modul definiert die API-Anfragen mittels TypeScript.  
Es wird so gut wie möglich versucht, Konsistenz zu der gegebenen API herzustellen.

### Methoden

#### createAiPlayer(name)

Erstellt einen neuen KI Spieler.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `name` | `string` | Name des neuen KI-Spielers <br> Der Name darf noch nicht vorhanden sein |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<Player>` | Der erstellte Spieler |
| `Promise<undefined>` | Falls die Anfrage fehlgeschlagen ist |

#### deletePlayer(id)

Löscht einen Spieler.  
Schlägt automatisch fehl, sofern der Spieler an einem laufenden Spiel teilnimmt.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | ID des zu löschenden Spielers |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

#### getAllPlayers()

Gibt alle Spieler zurück.

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<Player[]>` | Liste aller menschlichen und KI-Spieler <br> Das Array ist leer, wenn keine Spieler vorhanden sind oder ein Fehler bei der Anfrage aufgetreten ist. |

#### createGame(players, maxTurnTime, initialBoard)

Erstellt ein neues Spiel.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `players` | `number[]` | Liste der Spieler-IDs, welche an diesem Spiel teilnehmen sollen <br> Es sind mindestens 2 IDs notwendig) |
| `maxTurnTime` | `int` | Zeit in Millisekunden, welche jeder Spieler hat, um seinen Zug auszuführen |
| `initialBoard` | `Board` | Das Spielbrett, auf welchem das Spiel stattfindet |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<BasicGame>` | Das erstellte Spiel |
| `Promise<undefined>` | Falls die Anfrage fehlgeschlagen ist |

#### deleteGame(id)

Löscht ein Spiel.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | ID des zu löschenden Spiels |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

#### getGame(id)

Ruft ein bestimmtes Spiel ab.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | ID des gefragten Spiels |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<DetailedGame>` | Das gefragte Spiel |
| `Promise<undefined>` | Falls die Anfrage fehlgeschlagen ist |

#### getAllGames()

Ruft alle Spiele ab.  
Hier werden im Gegensatz zu [`getGame(id)`](#getgameid) die Spiele in Form von `BasicGame` zurückgeben.

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<BasicGame[]>` | Liste aller Spiele <br> Das Array ist leer, wenn keine Spiele vorhanden sind oder ein Fehler bei der Anfrage aufgetreten ist. |

#### createTurn(gameId, turn)

Erstellt einen neuen Zug in einem laufenden Spiel.

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `gameId` | `number` | Die ID des Spiels, in dem der Zug gemacht werden soll |
| `turn` | `Turn` | Der Zug, der gesetzt werden soll <br> Sollte der Zug gemäß der Regeln des Amazonenspiels invalide sein, so wird das Spiel automatisch abgebrochen |

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

#### reset()

Setzt den Spielsever komplett auf Standartwerte zurück. Alle Spieler und Spiele werden gelöscht. Alle IDs werden auf 0 zurückgesetzt.

| Rückgabewert | Beschreibung |
| ------ | ------ |
| `Promise<boolean>` | `true` bei Erfolg, sonst `false` |

### Klassen

Typdefinitionen für die API Responses.

#### Player

Versucht Konsistenz mit den API-Responses von [`GET /games/<id>`](#get-gamesid), [`POST /games/`](#post-games) und [`GET /games/`](#get-games) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | Spieler-ID |
| `name` | `string` | Spielername |
| `controllable` | `boolean` | `true` für menschliche und `false` für KI-Spieler |

#### Board

Versucht Konsistenz mit den API-Responses von [`GET /games/<id>`](#get-gamesid) und [`POST /games/`](#post-games) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `rowCount` | `number` | Reihenanzahl des Spielbrettes |
| `columnCount` | `number` |Spaltenanzahl des Spielbrettes |
| `tiles` | `number[][]` | Repräsentation des Spielbrettes mit den zugehörigen Werten des `TileEnum` |

#### Coordinates

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `row` | `number` | y-Koordinate eines 2D Arrays |
| `column` | `number` | x-Koordinate eines 2D Arrays |

#### Turn

Versucht Konsistenz mit der API-Response von [`POST /move/<id>`](#post-moveid) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `move` | `{start: Coordinates, end: Coordinates}` | Start- und Endkoordinaten der Bewegung einer Amazone |
| `shot` | `Coordinates` | Koordinaten eines Pfeilschusses |

#### BasicGame

Versucht Konsistenz mit den API-Responses von [`GET /games/`](#get-games) und [`POST /games/`](#post-games) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | Spiel-ID |
| `players` | `Player[]` | Spieler, die am Spiel teilnehmen |
| `maxTurnTime?` | `number` | Maximale Zugzeit eines jeden Spielers <br> _OPTIONAL Wird nicht von [`GET /games/`](#get-games) verwendet_ |
| `winningPlayer?` | `number` | ID des Spielers, der gewonnen hat <br> _OPTIONAL Wird nicht von [`POST /games/`](#post-games) verwendet und ist nur bei bereits beendeten Spielen vorhanden_ |
| `board?` | `Board` | Das zugehörige Spielbrett <br> _OPTIONAL Wird nicht von [`GET /games/`](#get-games) verwendet_ |

#### DetailedGame `extends BasicGame`

Versucht Konsistenz mit der API-Response von [`GET /games/<id>`](#get-gamesid) zu erreichen.

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `playerId` | `number` | Spieler-ID, dessen, der gerade am Zug ist |
| `maxTurnTime` | `number` | Maximale Zugzeit eines jeden Spielers |
| `remainingTurnTime` | `number` | Verbleibende Zugzeit des aktuellen Spielers <br> Ist gleich der `maxTurnTime`, falls das Spiel bereit beendet wurde |
| `board` | `Board` | Das zugehörige Spielbrett |
| `turns?` | `Turn[]` | Liste aller Züge <br> _OPTIONAL Ist nur bei Spielen mit getätigten Zügen vorhanden_ |

### gameBoardTypes

### Klassen

Typdefinitionen für das Spielbrett.

#### Tile

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `disabled` | `boolean` | `false` anklickbar <br> `true` nicht anklickbar |
| `tileType` | `TileEnum` | Wert aus dem `TileEnum` |

#### TileEnum

| Konstante | Wert | Beschreibung |
| ------ | ------ | ------ |
| `PLAYER` | `0` | Feld mit eigener Amazone besetzt |
| `OPPONENT` | `1` | Feld mit gegnerischer Amazone besetzt |
| `EMPTY` | `-1` | Leeres Feld |
| `ARROW` | `-2` | Durch Pfeil blockiertes Feld |

## Komponenten

Die React Komponenten der Webseite.

### LobbyScreen

Ist der umgebende Container für das GUI der Lobby-Seite. Der User beginnt hier.

### GameScreen

Ist der umgebende Container für das GUI einer Spiel-Seite.

#### GameControl

Verwaltet ein Spiel und die zugehörigen API Requests.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `players` | `Player[]` | Spieler, die am Spiel teilnehmen |
| `localPlayers` | `Player[]` | ??? |
| `BasicGame` | `Game` | Das Spiel wird mit diesen Spiel-Informationen initialisiert |

**Methoden**

#### PlayerSidebar

Repräsentiert die Spieler-Informationen am Seitenrand des Bildschirms.  
Speichert Informationen wie die Zug-Historie oder gespielte Zeit des jeweiligen Spielers.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `player` | `Player` | Spieler, für den die Informationen angezeigt werden |

**Methoden**

#### GameBoard

Repräsentiert das Spielbrett, auf dem die Spieler ihre Amazonen bewegen.  
Stellt das GUI für das Brett bereit und sorgt für die Einhaltung valider Züge des Spielers.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onTurnEnd` | `(turn): Turn => Promise<void>` | Wird aufgerufen wenn ein Zug endet |
| `isLocalPlayer` | `boolean` | `true` falls gerade der lokale Spieler am Zug ist, sonst `false` |
| `initialBoard` | `Board` | `Board`, das gerendert wird |

**Methoden**

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

## Weiterführende Links

**Projekt-Abhängigkeiten**

- [Auth-Button](https://gitlab.hs-anhalt.de/zwischenprojekte/authentication-button)

**Tutorials**

- [Aufsetzen der öffentlichen Webseite über den OpenWhisk Service der Hochschule Anhalt](https://gitlab.hs-anhalt.de/gitlab-integration/userdocumentation/-/blob/master/web-action/Node-Web-Programm.md)

**Verweise**

- [Amazonenspiel API GitLab Repository](https://gitlab.hs-anhalt.de/zwischenprojekte/game-of-the-amazons-service)
- [Amazonenspiel Webseite während des Entwicklungszeitraums](https://webengineering.ins.hs-anhalt.de:40443/api/v1/web/whisk.system/911_master/website/)
- [Repository der Universität Paderborn, auf dem dieses Projekt basiert](https://github.com/dice-group/Amazons/wiki)


# API-Spezifikation

## Inhalt

1. [Anfragen zum Spieler](#spieler)
2. [Anfragen zum Spiel](#spiel)
3. [Anfragen zum Zug](#zug)
4. [Anfragen zum Zurücksetzen](#zurücksetzen)

Die API dieses Spiels ist während des Entwicklungszeitraums unter https://webengineering.ins.hs-anhalt.de erreichbar.
Dafür steht – aus technischen Gründen – ein variabler Port zwischen 40910 und 40919 zur Verfügung.

Sämtliche Aufrufe sollten mit dem Status-Code 200 antworten, sofern der Aufruf erfolgreich war. Fehlerhafte Aufrufe sollten mit dem Status-Code 400 und einem hilfreichen Fehlertext beantwortet werden. Ausnahmen können hierbei Fehler in der Programmierung des Backends darstellen, bei welchen üblicherweise mit Status-Code 500 und einer Webseite im HTML-Format geantwortet wird, welche den Stacktrace des Fehlers beinhaltet.

[API GitLab Repository](https://gitlab.hs-anhalt.de/zwischenprojekte/game-of-the-amazons-service)

**Authentifizierung**

Alle API-Aufrufe außer dem Reset (Zurücksetzen) bedürfen einer JSON Web Token (JWT) Authentifizierung.
Dazu wird die React Komponente [Auth-Button](https://gitlab.hs-anhalt.de/zwischenprojekte/authentication-button) der Hochschule Anhalt verwendet.
Mit ihr wird erreicht, dass immer nur der Spieler kontrolliert werden kann, als der man gerade angemeldet ist.

_Für den Auth Button werden folgende Properties benötigt:_

| Prop | Typ | Wert | Beschreibung |
| ------ | ------ | ------ | ------ |
| `authServiceURL` | `string` | `"https://webengineering.ins.hs-anhalt.de:40989"` | Die Authentifizierungs-Url der Hochschule Anhalt. |
| `serviceBaseURLs` | `string[]` | `["https://webengineering.ins.hs-anhalt.de:<port>"]` | Liste von URLs der Webservices, die eine Authentifizierung benötigen. |

## Spieler

### POST `/players/`

_Erfordert Authentifizierung._

Erstellt einen neuen KI-Spieler.

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `name` | `string` | Spielername |
| `controllable` | `boolean` | `true` für menschlichen Spieler, sonst `false` |

```json
{
    "name": "Spieler1"
}
```

**Response**

HTTP Status Code 200.

```json
{
    "name": "Spieler1",
    "controllable": false,
    "playerId": 0
}
```

</details>

### DELETE `/players/<id>`

_Erfordert Authentifizierung._

Löscht den Spieler mit der ID `id`.   
Ein Spieler kann nur gelöscht werden, wenn er gerade an keinem Spiel teilnimmt.

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | Spieler-ID |

**Response**

HTTP Status Code 200.

### GET `/players/` 

_Erfordert Authentifizierung._

Fragt alle Spieler ab.

**Response**

HTTP Status Code 200.

```json
{
    "players": [
        {
            "playerId": 0,
            "name": "Spieler 1",
            "controllable": true
        },
        {
            "playerId": 1,
            "name": "Spieler 2",
            "controllable": false
        }
        // ...
    ]
}
```

## Spiel

### POST `/games/` 

_Erfordert Authentifizierung._

Startet ein neues Spiel.

**Request**

```json
{
    "maxTurnTime": 60000, // eine Minute
    "players": [
        0,
        1
    ],
    "initialBoard": {
        "gameSizeRows": 10, // Zeilen des Spielbrettes
        "gameSizeColumns": 10, // Spalten des Spielbrettes
        "squares": [ // Liste von Zeilen des Spielbrettes (von 0 bis gameSizeRows - 1)
            // folgende Integer-Werte sind in diesen Arrays erlaubt:
            // 0: Amazone des Spielers mit Index 0 in players
            // 1: Amazone des Spielers mit Index 1 in players
            // -1: leeres Feld
            // -2: Giftpfeil
            [ -1, -1, -1,  1, -1, -1,  1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [  1, -1, -1, -1, -1, -1, -1, -1, -1,  1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [  0, -1, -1, -1, -1, -1, -1, -1, -1,  0],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1,  0, -1, -1,  0, -1, -1, -1]
        ]
    }
}
```

**Response**

HTTP Status Code 200.

```json
{
    "gameId": 0,
    "maxTurnTime": 60000,
    "players": [
        {
            "playerId": 0,
            "name": "Spieler1",
            "controllable": true
        },
        {
            "playerId": 1,
            "name": "Spieler2",
            "controllable": false
        }
    ],
    "initialBoard": {
        "gameSizeRows": 10, // Zeilen des Spielbrettes
        "gameSizeColumns": 10, // Spalten des Spielbrettes
        "squares": [
            [ -1, -1, -1,  1, -1, -1,  1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [  1, -1, -1, -1, -1, -1, -1, -1, -1,  1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [  0, -1, -1, -1, -1, -1, -1, -1, -1,  0],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [ -1, -1, -1,  0, -1, -1,  0, -1, -1, -1]
        ]
    }
}
```

### DELETE `/games/<id>`

_Erfordert Authentifizierung._

Löscht das Spiel mit der ID `id`.

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | ID des Spiels |

**Response**

HTTP Status Code 200.

### GET `/games/<id>`

_Erfordert Authentifizierung._

Fragt detaillierte Informationen des Spiels mit der ID `id` ab.

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | ID des Spiels |

**Response**

HTTP Status Code 200.

```json
{
    "gameId": 0,
    "playerId": 0, // Spieler, der gerade am Zug ist
    "winningPlayer": 0, // optional: gibt an, welcher Spieler gewonnen hat
    "maxTurnTime": 60000, // maximale Zugzeit
    "remainingTurnTime": 60000, // verbleibende Zugzeit des aktuellen Spielers
    "board": { // siehe oben
        // ...
    },
    "players": [
        {
            "playerId": 0,
            "name": "Spieler1",
            "controllable": true
        },
        {
            "playerId": 1,
            "name": "Spieler2",
            "controllable": false
        }
    ],
    "turns": [ // Optional: Liste aller Züge
        {
            "move": {
                "start": {
                    "row": 3, // Startzeile der Bewegung
                    "column": 2, // Startspalte der Bewegung
                },
                "end": {
                    "row": 5, // Zielzeile der Bewegung
                    "column": 2, // Zielspalte der Bewegung
                }
            },
            "shot": {
                "row": 3, // Zeile des Pfeilschusses
                "column": 2, // Spalte des Pfeilschusses
            }
        },
    ]
}

```

### GET `/games/`

_Erfordert Authentifizierung._

Fragt grobe Informationen aller Spiele ab.

**Response**

HTTP Status Code 200.

```json
{
    "games": [
        {
            "gameId": 0,
            "winningPlayer": 0, // optional: gibt den Siegspieler an
            "players": [ // Spieler, die am Spiel teilnehmen
                {
                    "playerId": 0,
                    "name": "Spieler1",
                    "controllable": true
                },
                {
                    "playerId": 1,
                    "name": "Spieler2",
                    "controllable": false
                }
            ],
        },
        {
            // ...
        },
        // ...
    ]
}
```

## Zug

### POST `/move/<id>`

_Erfordert Authentifizierung._

Setzt einen neuen Zug im Spiel mit der ID `id`.

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | ID des Spiels |

```json
{
    "move": {
        "start": {
            "row": 3, // Startzeile der Bewegung
            "column": 2, // Startspalte der Bewegung
        },
        "end": {
            "row": 6, // Zielzeile der Bewegung
            "column": 2, // Zielspalte der Bewegung
        }
    },
    "shot": {
        "row": 5, // Zeile des Pfeilschusses
        "column": 2, // Spalte des Pfeilschusses
    }
}
```

**Response**

HTTP Status Code 200.

## Zurücksetzen

### DELETE `/reset/`

Setzt den Spielserver auf Standartwerte zurück. Löscht alle Spieler und Spiele.  
Spieler, die sich per Auth-Button authentifiziert haben und noch eingeloggt sind, werden danach automatisch wieder angelegt.

**Response**

HTTP Status Code 200. 
