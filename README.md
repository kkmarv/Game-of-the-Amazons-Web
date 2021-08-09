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

### an die Abschlussabgabe (24.09.21)

<details>
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
    - [ ] in Form von GIFs
- [ ] **Mulitplayer-Spiele gegen andere Menschen spielen, indem er**
    - [ ] **laufende Spiele, sowie Informationen zu diesen einsehen kann und**
        - [ ] **diesen als Spieler beitreten kann, sofern noch Plätze frei sind oder**
        - [ ] diesen als Zuschauer beitreten kann
    - [ ] **eigene Spiele erstellen kann und**
        - [ ] ihnen einen Namen geben kann, sowie
        - [ ] Spieler 1 oder 2 oder beide kontrollierbar machen 

#### Weiterhin möchte der Nutzer:

- [ ] **Credits einsehen können. Diese beinhalten:**
    - [ ] Entwicklernamen
    - [ ] Lehrveranstaltung
    - [ ] Semester
    - [ ] Dozenten
    - [ ] das Logo der Hochschule Anhalt
- [ ] **zwischen Dark- und Light-Mode wechseln können**
- [ ] **zwischen deutscher und englischer Sprache wechseln können**
    - [ ] mithilfe von Lokalisierungsdateien
- [ ] wenn gewünscht, Audio-Feedback für seine Aktionen erhalten, unzwar bei(m)
    - [ ] Timer-Tick
    - [ ] Button-Klick
    - [ ] Amazonen picken
    - [ ] Amazonen setzen
    - [ ] Pfeilschüssen
    - [ ] Sieg & Niederlage

</details>

<details>
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

1. [Dokumentation](#dokumentation)
2. [API-Spezifikation](#api-spezifikation)
    1. [Spieler](#spieler)
    2. [Spiel](#spiel)
    3. [Zug](#zug)
    4. [Resetting](#resetting)
3. [Weiterführende Links](#weiterführende-links)

## Dokumentation

### Todo

## API-Spezifikation

Die API dieses Spiels ist während des Entwicklungszeitraums unter https://webengineering.ins.hs-anhalt.de erreichbar.
Dafür steht – aus technischen Gründen – ein variabler Port zwischen 40910 und 40919 zur Verfügung.

Alle erfolgreichen Aufrufe sollten mit dem Status-Code 200 antworten, sofern der Aufruf erfolgreich war.
Fehlerhafte Aufrufe sollten mit dem Status-Code 400 und einem hilfreichen Fehlertext beantwortet werden. Ausnahmen
können hierbei Fehler in der Programmierung des Backends darstellen, bei welchen üblicherweise mit Status-Code 500 und
einer Webseite im HTML-Format geantwortet wird, welche den Stacktrace des Fehlers beinhaltet.

[Game of the Amazons API Repository](https://gitlab.hs-anhalt.de/zwischenprojekte/game-of-the-amazons-service)

### Spieler

<details>
<summary><b>Spieler anlegen</b></summary><br>

`POST: /players/`

#### Parameter:

- `name` (string): Spielername
- `controllable` (boolean): ist der Spieler spielbar oder nicht (computergesteuert)?

Example for requests' body:

```json5
{
    "name":"Spieler1",
    "controllable":true
}

```
#### Response: 200 OK

Response body:
```json5
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

#### Response: 200 OK

Response body:
```json5
{
    "players": [
        {
            "playerId":0,
            "name":"Spieler 1",
            "controllable":true
        },
        {
            "playerId":1,
            "name":"Spieler 2",
            "controllable":false
        }
        // ...
    ]
}
```

</details>

<details>
<summary><b>einen Spieler löschen</b></summary><br>

`DELETE: /players/<id>`

#### Parameter:

- `id` (int): Spieler ID

#### Response: 200 OK

</details>

### Spiel

<details>
<summary><b>ein neues Spiel starten</b></summary><br>

`POST: /games/`

#### Parameter:

- `maxTurnTime` (int): Millisekunden, welche jeder Spieler Zeit hat, um seinen Zug auszuführen
- `initialBoard` (Board): Das Spielbrett, auf welchem das Spiel stattfindet (siehe Body)
- `players` (Array): Liste der Spieler-IDs, welche an diesem Spiel teilnehmen sollen (2 IDs notwendig)

Example for requests' body:

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
#### Response: 200 OK

Response body:
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

</details>

<details>
<summary><b>ein bestimmtes Spiel und dessen aktuellen Zustand abfragen</b></summary><br>

`GET: /games/<id>`

#### Parameter:

- `id` (int): ID des Spiels

#### Response: 200 OK

Response body:
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

</details>

<details>
<summary><b>alle Spiele abfragen</b></summary><br>

`GET: /games/`

#### Response: 200 OK

Response body:
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

</details>

<details>
<summary><b>ein Spiel löschen</b></summary><br>

`DELETE: /games/<id>`

#### Parameter:

- `id` (int): ID des Spiels

#### Response: 200 OK

</details>

### Zug

<details>
<summary><b>einen Zug setzen</b></summary><br>

`POST: /move/<id>`

#### Parameter:

- `id` (int): ID des Spiels

Example for requests' body:
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

#### Response: 200 OK

</details>

### Resetting

<details>
<summary><b>alles auf Standardwerte zurücksetzen</b></summary><br>

`DELETE: /reset/`

#### Response: 200 OK

</details>

## Weiterführende Links

- [Aufsetzen der öffentlichen Webseite über den OpenWhisk Service der Hochschule Anhalt](https://gitlab.hs-anhalt.de/gitlab-integration/userdocumentation/-/blob/master/web-action/Node-Web-Programm.md)
- [Repository der Universität Paderborn, auf dem dieses Projekt basiert](https://github.com/dice-group/Amazons/wiki)

