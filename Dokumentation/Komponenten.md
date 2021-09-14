[Wiki](README.md) > [Dokumentation](Dokumentation.md) > Komponenten

# Komponenten

## Inhalt

Die React Komponenten der Webseite.

1. [AuthenticationScreen](#authenticationscreen)
2. [CreditScreen](#creditscreen)
3. [GameBoardScreen](#gameboardscreen)
4. [SettingsScreen](#gamecreationscreen)
5. [LobbyScreen](#lobbyscreen)

<details>
<summary>Ordnerstruktur</summary>

```
...
├── components
... ├── AuthenticationScreen
    │   └── AuthenticationScreen.tsx
    ├── CreditScreen
    │   ├── CreditScreen.tsx
    ├── GameBoardScreen
    │   ├── GameBoard
    │   │   ├── GameBoard.tsx
    │   │   └── GameBoardButton.tsx
    │   ├── GameBoardScreen.tsx
    │   ├── PlayerSidebar.tsx
    │   ├── Timer.tsx
    │   └── TurnInfo.tsx
    ├── SettingsScreen
    │   ├── SettingsScreen.tsx
    │   └── GameSettings.tsx
    └── LoobbyScreen
        ├── GameCardList
        │   ├── GameCard.tsx
        │   ├── GameCardInfo.tsx
        │   └── GameCardList.tsx
        ├── LobbyScreen.tsx
        ├── Logo.tsx
        ├── Title.tsx
        └── Tutorial.tsx
```

</details>

## AuthenticationScreen

Ist der umgebende Container für das GUI der Anmelde-Seite.  
Der User beginnt hier, falls er nicht eingeloggt ist.

1. [AuthenticationScreen.tsx](#authenticationscreen.tsx)

### AuthenticationScreen.tsx

---

## CreditScreen

Ist der umgebende Container für das GUI der Credit-Seite.  
Hier werden Informationen zu den Entwicklern, dem Modul und den Dozenten aufgeführt. 

1. [CreditScreen.tsx](url)

### CreditScreen.tsx

---

## GameBoardScreen

Ist der umgebende Container für das GUI der Spiel-Seite.  
Hier werden Spiele zwischen 2 Spielern ausgetragen.

1. [GameBoard](url)
    1. [GameBoard.tsx](url)
    2. [GameBoardButton.tsx](url)
2. [GameBoardScreen.tsx](url)
3. [PlayerSidebar.tsx](url)
4. [Timer.tsx](url)
5. [TurnInfo.tsx](url)

### GameBoard

### GameBoard.tsx

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

### GameBoardButton.tsx

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

### GameBoardScreen.tsx

---

### PlayerSidebar.tsx

Repräsentiert die Spieler-Informationen am Seitenrand des Bildschirms.  
Speichert Informationen wie die Zug-Historie oder gespielte Zeit des jeweiligen Spielers.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `player` | `Player` | Spieler, für den die Informationen angezeigt werden |

**Methoden**

---

### Timer.tsx

---

### TurnInfo.tsx

---

## SettingsScreen

Ist der umgebende Container für das GUI der Spiel-Erstellungs-Seite.  
Hier können die Einstellungen eines neuen Spiel eingestellet, die teilnehmenden Spieler ausgewählt und das Spiel gestartet werden.

1. [SettingsScreen.tsx](url)
2. [GameSettings.tsx](url)

### SettingsScreen.tsx

---

### GameSettings.tsx

---

## LobbyScreen

Ist der umgebende Container für das GUI der Lobby-Seite.  
Von hier aus kann der User zu allen anderen Bereichen der Webseite navigieren.

1. [GameCardList](url)
    1. [GameCard.tsx](url)
    2. [GameCardInfo.tsx](url)
    3. [GameCardList.tsx](url)
2. [LobbyScreen.tsx](url)
3. [Logo.tsx](url)
4. [Title.tsx](url)
5. [Tutorial.tsx](url)
