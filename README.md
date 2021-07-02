# Game of the Amazons

The Game of Amazons is an abstract strategic board game for two players.

It is played on a 10×10 chessboard (or an international checkerboard).<br>
The two players play with white and black. Each player has four Amazons, which are placed on the board at the beginning.
After each turn, the moved Amazon shoots a "poisonous" arrow from the end point of its move to another tile in order to
block the opponent's move.

The first player unable to move any of his Amazons looses.

Read more on the [English Wikipedia page.](https://en.wikipedia.org/wiki/Game_of_the_Amazons)

## Anforderungen

### an die Zwischenabgabe (12.07.21)

<details open>
<summary><b>Funktionalitäten</b></summary>

#### Der Nutzer möchte:

<b>von der Logik:</b>

- [ ] dass geprüft wird, ob bereits ein Spiel eröffnet ist:
    - [ ] Falls nein, soll automatisch ein neues Spiel erstellt werden
    - [ ] Falls ja, soll das Spiel angezeigt werden
- [ ] dass geprüft wird, ob bereits Spieler existieren:
    - [ ] Falls nein, sollen neue Spieler angelegt werden (einen mit controllable=true und einen mit controllable=false)
    - [ ] Falls ja, soll der Spieler den kontrollierbaren Spieler überehmen und die KI den unkontrollierbaren
- [ ] dass ein durchgeführter Zug nach Abschluss an den Server gesendet wird
- [ ] dass ein Zug des gegnerischen Spielers vom Server abgefragt wird

<b>von der GUI:</b>

- [ ] das gesamte Spielfeld einsehen können
- [ ] dass die Figuren beider Spieler deutlich voneinander unterscheidbar sind
- [ ] dass der Spieler angezeigt bekommt, wenn er (oder respektive der gegnerische Spieler) am Zug ist
    - [ ] dass der Zug des gegnerischen Spielers dem Spieler entsprechend angezeigt wird
- [ ] dass der Spieler nach dem Zug einer Figur den Zielpunkt für den Pfeilwurf festlegen kann
- [ ] dass der Spieler nur legale Züge durchführen kann
- [ ] dass das Spiel endet, sobald ein Spieler nicht mehr ziehen kann

</details>

<details open>
<summary><b>Tests</b></summary>

#### Als Entwickler müssen wir für sinnvolle Tests:

- [ ] überprüfen, ob ein Spielfeld richtig dargestellt wird
    - [ ] indem das Backend gemockt wird und Beispielwerte geladen werden,
    - [ ] und das Gerenderte mit einem Snapshot verglichen wird.<br>
- [ ] überprüfen, ob Züge durchgeführt werden können
    - [ ] indem ein Spiel gemockt wird
    - [ ] und via Events ein Zug nachgestellt wird
    - [ ] das Ergebnis mittels eines Snapshot Tests abgeglichen wird
- [ ] überprüfen, ob inkorrekte Züge verboten sind
    - [ ] indem ein gemocktes Spiel initialisiert wird
    - [ ] und ein ungültiger Zug durchgeführt wird
    - [ ] entweder eine ungültige Eingabe simulieren, oder die dafür zuständige Funktion direkt aufrufen
- [ ] überprüfen, ob der Pfeilwurf korrekt gesetzt wird
    - [ ] entweder Snapshot- oder Funktionstests möglich

</details>

### an die Abschlussabgabe (24.09.21)

_TODO_

## Fragen & Ideen

### zum GUI

- eigene Lobby Startseite? _-> Abschlussprojekt_
    - Liste mit allen Spielen, denen man beitreten/zuschauen kann _-> Abschlussprojekt_
    - Fragen:
        - KI vs KI? _-> Abschlussprojekt_
        - KI vs Player? _-> Zwischenprojekt_
        - Player vs Player? _-> Abschlussprojekt_
- kann man laufenden Spielen als Beobachter beitreten? _-> Abschlussprojekt_

### zum Abschlussprojekt

- Optionsmenü zur Auswahl des Spielbrett-/Seiten-Themes
- display the turn history on sidebar
- Alternative Spielmodi:
    - Damage/Death upon click on invalid tile
    - Tutorial/Training mode where one is allowed to revert their last turn

## Wiki

- [Game of the Amazons API Repository](https://gitlab.hs-anhalt.de/zwischenprojekte/game-of-the-amazons-service)
- [Aufsetzen der öffentlichen Webseite über den OpenWhisk Service der Hochschule Anhalt](https://gitlab.hs-anhalt.de/gitlab-integration/userdocumentation/-/blob/master/web-action/Node-Web-Programm.md)

Die API dieses Spieles ist während des Entwicklungszeitraums unter https://webengineering.ins.hs-anhalt.de auf den Ports
40910 und 40911 zu finden.

### API-Specification

Sämtliche erfolgreichen Aufrufe sollten mit dem Status-Code 200 antworten, sofern der Aufruf erfolgreich war.
Fehlerhafte Aufrufe sollten mit dem Status-Code 400 und einem hilfreichen Fehlertext beantwortet werden. Ausnahmen
können hierbei Fehler in der Programmierung des Backends darstellen, bei welchen üblicherweise mit Status-Code 500 und
einer Webseite im HTML-Format geantwortet wird, welche den Stacktrace des Fehlers beinhaltet.

#### Spieler

<details>
<summary><b>Spieler anlegen</b></summary><br>

`POST: /players/`

Response: 200 OK

Parameter:

- `name` (string): Spielername
- `controllable` (boolean): ist der Spieler spielbar oder nicht (computergesteuert)?

```javascript
{
    "name":"Spieler1",
    "controllable":true
}

```

```javascript
{
    "name":"Spieler1",
    "controllable":true,
    "playerId":0
}
```

</details>

<details>
<summary><b>alle Spieler abfragen</b></summary><br>

`GET: /players/`

Response: 200 OK

```javascript
{
    "players"
:
    [
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

</details>

<details>
<summary><b>einen Spieler löschen</b></summary><br>

`DELETE: /players/:id`

Response: 200 OK

Parameter:

- `id` (int): Spieler ID

</details>

#### Spiel

<details>
<summary><b>ein neues Spiel starten</b></summary><br>

`POST: /games/`

Response: 200 OK

Parameter:

- `maxTurnTime` (int): Millisekunden, welche jeder Spieler Zeit hat, um seinen Zug auszuführen
- `initialBoard` (Board): Das Spielbrett, auf welchem das Spiel stattfindet (siehe Body)
- `players` (Array): Liste der Spieler-IDs, welche an diesem Spiel teilnehmen sollen (2 IDs notwendig)

```javascript
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
            [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
            [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
            [1, -1, 1, -1, 1, -1, 1, -1, 1, -1]
        ]
    }
}
```

```javascript
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
            [0, -1, 0, -1, 0, -1, 0, -1, 0, -1],
            [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
            [1, -1, 1, -1, 1, -1, 1, -1, 1, -1]
        ]
    }
}
```

</details>

<details>
<summary><b>ein bestimmtes Spiel und dessen aktuellen Zustand abfragen</b></summary><br>

`GET: /games/:id`

Response: 200 OK

Parameter:

- `id` (int): ID des Spiels

```javascript
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

</details>

<details>
<summary><b>alle Spiele abfragen</b></summary><br>

`GET: /games/`

Response: 200 OK

```javascript
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

</details>

<details>
<summary><b>ein Spiel löschen</b></summary><br>

`DELETE: /games/:id`

Response: 200 OK

Parameter:

- `id` (int): ID des Spiels

</details>

#### Zug

<details>
<summary><b>einen Zug setzen</b></summary><br>

`POST: /move/:id`

Response: 200 OK

Parameter:

- `id` (int): ID des Spiels

```javascript
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

</details>

#### Resetting

<details>
<summary><b>alles auf Standardwerte zurücksetzen</b></summary><br>

`DELETE: /reset/`

Response: 200 OK

</details>

## Weiterführende Links

- [This projects public website](https://webengineering.ins.hs-anhalt.de:40443/api/v1/web/whisk.system/911_master/website/)
- [Initial project Wiki from the Paderborn University (on which this project is based on)](https://github.com/dice-group/Amazons/wiki)

