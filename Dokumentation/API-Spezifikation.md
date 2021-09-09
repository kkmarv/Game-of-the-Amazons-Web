[Wiki](README.md) > [Dokumentation](Dokumentation.md) > API-Spezifikation

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
Dazu wird die React Komponente [Authentication Button](https://gitlab.hs-anhalt.de/zwischenprojekte/authentication-button) der Hochschule Anhalt verwendet.
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

```json
{
    "name": "Spieler1"
}
```

**Response**

HTTP Status Code 200.

```json
{
    "id": 0,
    "name": "Spieler1",
    "controllable": false
}
```

---

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

---

### GET `/players/me`

_Erfordert Authentifizierung._

Liefert den aktuell eingeloggten Spieler.

**Response**

HTTP Status Code 200.


```json
{
    "id": 0,
    "name": "Spieler1",
    "controllable": true
}
```

---

### GET `/players/`

_Erfordert Authentifizierung._

Fragt alle Spieler ab.

**Response**

HTTP Status Code 200.

```json
{
    "players": [
        {
            "id": 0,
            "name": "Spieler 1",
            "controllable": true
        },
        {
            "id": 1,
            "name": "Spieler 2",
            "controllable": false
        }
        // ...
    ]
}
```

---

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
    "board": {
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
    "id": 0,
    "maxTurnTime": 60000,
    "players": [
        {
            "id": 0,
            "name": "Spieler1",
            "controllable": true
        },
        {
            "id": 1,
            "name": "Spieler2",
            "controllable": false
        }
    ],
    "board": {
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

---

### DELETE `/games/<id>`

_Erfordert Authentifizierung._

Löscht das Spiel mit der ID `id`.

**Request**

| Parameter | Typ | Beschreibung |
| ------ | ------ | ------ |
| `id` | `int` | ID des Spiels |

**Response**

HTTP Status Code 200.

---

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
    "id": 0,
    "turnPlayer": 0, // Spieler, der gerade am Zug ist
    "winningPlayer": 0, // optional: gibt an, welcher Spieler gewonnen hat
    "maxTurnTime": 60000, // maximale Zugzeit
    "remainingTurnTime": 60000, // optional: verbleibende Zugzeit des aktuellen Spielers
    "board": { // siehe oben
        // ...
    },
    "players": [
        {
            "id": 0,
            "name": "Spieler1",
            "controllable": true
        },
        {
            "id": 1,
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

---

### GET `/games/`

_Erfordert Authentifizierung._

Fragt grobe Informationen aller Spiele ab.

**Response**

HTTP Status Code 200.

```json
{
    "games": [
        {
            "id": 0,
            "winningPlayer": 0, // optional: gibt den Siegspieler an
            "players": [ // Spieler, die am Spiel teilnehmen
                {
                    "id": 0,
                    "name": "Spieler1",
                    "controllable": true
                },
                {
                    "id": 1,
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

---

## Zurücksetzen

### DELETE `/reset/`

Setzt den Spielserver auf Standardwerte zurück. Löscht alle Spieler und Spiele.  
Spieler, die sich per Auth-Button authentifiziert haben und noch eingeloggt sind, werden danach automatisch wieder angelegt.

**Response**

HTTP Status Code 200.

---
