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
    1. [Typ Definitionen](#typ-definitionen)
        1. [Für das Spielbrett](#spielbrett-typen)
            1. [Coordinates](#coordinates)
            2. [TileEnum](#tileenum)
        2. [Für die API](#api-typen)
            1. [Player](#player)
            2. [Board](#board)
            3. [Turn](#turn)
            2. [Game](#game)
    2. [Komponenten](#komponenten)
2. [Weiterführende Links](#weiterführende-links)

## Dokumentation

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `` | `` | ??? |

## Typ Definitionen

Custom Typ Definitionen für TypeScript.

### Spielbrett Typen

#### Coordinates

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `row` | `number` | y-Koordinate eines 2D Arrays |
| `column` | `number` | x-Koordinate eines 2D Arrays |

#### TileEnum

| Konstante | Wert | Beschreibung |
| ------ | ------ | ------ |
| `PLAYER` | `0` | Feld mit eigener Amazone besetzt |
| `OPPONENT` | `1` | Feld mit gegnerischer Amazone besetzt |
| `EMPTY` | `-1` | Leeres Feld |
| `ARROW` | `-2` | Durch Pfeil blockiertes Feld |

#### TileProps

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `tileType` | `TileEnum` | ??? |
| `disabled` | `boolean` | ??? |
| `selected` | `boolean` | ??? |
| `possibleMove` | `boolean` | ??? |

### API Typen

#### Player

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | Spieler-ID |
| `name` | `string` | Spielername |
| `controllable` | `boolean` | `true` für menschliche und `false` für KI-Spieler |

#### Board

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `rowCount` | `number` | Reihenanzahl des Spielbrettes |
| `columnCount` | `number` |Spaltenanzahl des Spielbrettes |
| `tiles` | `number[][]` | Repräsentation des Spielbrettes mit den zugehörigen Werten des `TileEnum` |

#### Turn

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `move` | `{start: Coordinates, end: Coordinates}` | Start- und Endkoordinaten der Bewegung einer Amazone |
| `shot` | `Coordinates` | Koordinaten eines Pfeilschusses |

#### Game

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `number` | Spiel-ID |
| `players` | `Player[]` | Spieler, die am Spiel teilnehmen |
| `maxTurnTime` | `number` | Maximale Zugzeit eines jeden Spielers <br> Falls das Game Objekt per Aufruf von `GET: /games/<id>` erzeugt wurde, gibt `maxTurnTime` die verbleibende Zugzeit an |
| `board` | `Board` | Das zugehörige Spielbrett als `Board` Objekt |
| `turnId?` | `number` | Index des aktuellen Zuges, zählt von 0 <br> _OPTIONAL Wird erst nach der Spielerstellung benutzt_ |
| `playerId?` | `number` | Spieler-ID, dessen, der gerade am Zug ist <br> _OPTIONAL Wird erst nach der Spielerstellung benutzt_ |
| `lastTurn?` | `Turn` | Zuletzt getätigter Zug <br> _OPTIONAL Wird erst nach der Spielerstellung benutzt_ |
| `messageType?` | `string` | `start` Initialisierung des Spielservers <br> `turn` Warten auf Zug <br> `end` Spiel ist beendet <br> _OPTIONAL Wird erst nach der Spielerstellung benutzt_ |
| `winningPlayer?` | `number` | ID des Spielers, der gewonnen hat <br> _OPTIONAL Wird erst nach der Spielerstellung benutzt und ist nur bei bereits beendeten Spielen vorhanden_ <br> |

## Komponenten

Die React Komponenten der Webseite.

### Board

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onTurnEnd` | `(turn): turn => Promise<void>` | ??? |
| `isLocalPlayer` | `boolean` | ??? |
| `initialBoard` | `board` | ??? |

### Tile

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `string` | ??? |
| `color` | `string` | ??? |
| `onClick` | `() => void` | ??? |
| `tileType` | `TileEnum` | ??? |
| `disabled` | `boolean` | ??? |
| `selected` | `boolean` | ??? |
| `possibleMove` | `boolean` | ??? |

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

| Prop | Typ | Wert |
| ------ | ------ | ------ |
| `authServiceURL` | `string` | `"https://webengineering.ins.hs-anhalt.de:40989"` |
| `serviceBaseURLs` | `string[]` | `["https://webengineering.ins.hs-anhalt.de"]` |

## Spieler

### POST: `/players/`

Erstellt einen neuen KI-Spieler. _Erfordert Authentifizierung._

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `name` | `string` | Spielername |

**Response**

HTTP status code 200.

```json5
{
    "name": "Spieler1",
    "controllable": true,
    "playerId": 0
}
```

</details>

### DELETE: `/players/<id>`

Löscht den Spieler mit der ID `id`.  _Erfordert Authentifizierung._

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | Spieler-ID |

**Response**

HTTP status code 200.

### GET: `/players/` 

Fragt alle Spieler ab. _Erfordert Authentifizierung._

**Response**

HTTP status code 200.

```json5
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

### POST: `/games/` 

Startet ein neues Spiel. _Erfordert Authentifizierung._

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `maxTurnTime` | `int` | Millisekunden, welche jeder Spieler Zeit hat, um seinen Zug auszuführen |
| `initialBoard` | `array` | Das Spielbrett, auf welchem das Spiel stattfindet (siehe unten) |
| `players` | `array` | Liste der Spieler-IDs, welche an diesem Spiel teilnehmen sollen (2 IDs notwendig) |

```json5
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

HTTP status code 200.

```json5
{
    "gameId": 0,
    "maxTurnTime": 60000,
    "players": [
        {
            "name": "Spieler1",
            "controllable": true
        },
        {
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

### GET: `/games/<id>`

Fragt das Spiel mit der ID `id` ab. _Erfordert Authentifizierung._

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | ID des Spiels |

**Response**

HTTP status code 200.

```json5
{
    "gameId": 0,
    "playerId": 0, // Spieler, der gerade am Zug ist
    "turnId": 0, // Index des aktuellen Zuges (zählt von 0)
    "winningPlayer": 0, // optional: gibt an, welcher Spieler gewonnen hat
    "board": { // siehe oben
        // ...
    },
    "maxTurnTime": 60000, // verbleibende Zugzeit
    "enemyTurn": { // der letzte Zug des Gegners
        "move": {
            "start": {
                "row": 3, // Startzeile
                "column": 2, // Startspalte
            },
            "end": {
                "row": 5, // Zielzeile
                "column": 2, // Zielspalte
            }
        },
        "shot": { // Pfeilschuss
            "row": 5, // Zeile des Pfeiles
            "column": 2, // Spalte des Pfeiles
        }
    }
}
```

### DELETE: `/games/<id>`

Löscht das Spiel mit der ID `id`. _Erfordert Authentifizierung._

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | ID des Spiels |

**Response**

HTTP status code 200.

### GET: `/games/`

Fragt alle Spiele ab. _Erfordert Authentifizierung._

**Response**

HTTP status code 200.

```json5
{
    "games": [
        {
            "gameId": 0,
            "initialBoard": { // siehe oben, das initiale Board (nicht der aktuelle Zustand)
                // ...
            },
            "maxTurnTime": 60000, // Zugzeit, welche jeder Spieler zur Verfügung hat
            "winningPlayer": 0, // optional: gibt den Siegspieler an
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
        },
        {
            // ...
        }
        // ...
    ]
}
```

## Zug

### `POST: /move/<id>`

Setzt einen Zug im Spiel mit der ID `id`. _Erfordert Authentifizierung._

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | ID des Spiels |

```json5
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

HTTP status code 200.

## Zurücksetzen

### `DELETE: /reset/`

Setzt den Spielserver auf Standartwerte zurück. Löscht alle Spieler und Spiele.

**Response**

HTTP status code 200. 
