[Wiki](README.md) > [Dokumentation](Dokumentation.md) > Komponenten

# Komponenten

## Inhalt

Die React Komponenten der Webseite.

1. [AuthenticationScreen](#authenticationscreen)
2. [CreditScreen](#creditscreen)
3. [GameScreen](#gamescreen)
4. [SettingsScreen](#settingsscreen)
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
    ├── GameScreen
    │   ├── GameBoard
    │   │   ├── GameBoard.tsx
    │   │   └── GameBoardButton.tsx
    │   ├── GameScreen.tsx
    │   ├── PlayerSidebar.tsx
    │   ├── Timer.tsx
    │   └── TurnInfo.tsx
    ├── LobbyScreen
    │   ├── GameCardList
    │   │   ├── GameCard.tsx
    │   │   ├── GameCardInfo.tsx
    │   │   └── GameCardList.tsx
    │   ├── LobbyScreen.tsx
    │   ├── Logo.tsx
    │   ├── Title.tsx
    │   └── Tutorial.tsx
    └── SettingsScreen
        ├── SettingsScreen.tsx
        └── GameSettings.tsx
            ├── AdvancedSettings
            │   └── AdvancedSettings.tsx
            ├── AIOrNotSelection.tsx
            ├── GameSettings.tsx
            ├── PlayerList.tsx
            └── TimerInput.tsx

```

</details>

## AuthenticationScreen

1. [AuthenticationScreen.tsx](#authenticationscreentsx)

### AuthenticationScreen.tsx

Ist der umgebende Container für das GUI der Anmelde-Seite.  
Der User beginnt hier, falls er nicht eingeloggt ist.  

Verwaltet einen `AuthButton`.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onAuthorize` | `() => void` | Wird aufgerufen, wenn der zugehöhrige `AuthButton` betätigt wird. |

---

## CreditScreen

1. [CreditScreen.tsx](#creditscreentsx)

### CreditScreen.tsx

Ist der umgebende Container für das GUI der Credit-Seite.  
Hier werden Informationen zu den Entwicklern, dem Modul und den Dozenten aufgeführt.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onLeave` | `() => void` | Wird aufgerufen, wenn der zugehörige zurück-Button betätigt wird. |

---

## ErrorScreen

1. [ErrorScreen.tsx](#errorscreentsx)

### ErrorScreen.tsx

Ist der umgebende Container für das GUI der Error-Seite.  
Hierhin gelangt der Nutzer nicht durch die eigene Navigation, sondern nur im Fehlerfall der Seite.

Es gibt 3 verschiedene Fehlerfälle:  

- player: Authentifizierung des Spielers ist fehlgeschlagen
- game: Abfrage eines Spiels ist fehlgeschlagen
- turn: Setzen eines Zuges ist fehlgeschlagen

---

## GameScreen

Hier werden Spiele zwischen 2 Spielern ausgetragen.

1. [GameBoard](#gameboard)
    1. [GameBoard.tsx](#gameboardtsx)
    2. [GameBoardButton.tsx](#gameboardbuttontsx)
2. [GameScreen.tsx](#gamescreentsx)
3. [PlayerSidebar.tsx](#playersidebartsx)
4. [Timer.tsx](#timertsx)
5. [TurnInfo.tsx](#turninfotsx)

### GameBoard.tsx

Repräsentiert das Spielbrett, auf dem die Spieler ihre Amazonen bewegen.  
Stellt das GUI für das Brett bereit und sorgt für die Einhaltung valider Züge des Spielers.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onTurnEnd` | `(turn: Turn) => Promise<void>` | Wird aufgerufen wenn ein Zug endet |
| `initialBoard` | `Board` | `Board`, das gerendert wird |
| `currentPlayerIsLocal`|`boolean`| `true` falls gerade der lokale Spieler am Zug ist, sonst `false`|
| `currentPlayerPosition`|`number`| Der Index des aktuellen Spielers im `players` Array |

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `tiles` | `Tile[][]` | Verwaltet die Felder des Spielbrettes |
| `lastClickCoords?` | `Coordinates` | Die Koordintaten des zuletzt angelickten Feldes <br> __OPTIONAL Ist nicht definiert, wenn noch nicht mindestens ein Feld angeklickt wurde__ |
| `clickBeforeLastClickCoords?` | `Coordinates` | Die Koordintaten des zuvorletzt angelickten Feldes <br> __OPTIONAL Ist nicht definiert, wenn noch nicht mindestens 2 Felder angeklickt wurden__ |

**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| `async` | `handleclick` | `currentCoords: Coordinates` | `Promise<void>` | Definiert das Verhalten des Brettes, wenn ein Feld angeklickt wird |
| `async` | `cancelMove` | | `Promise<void>` | Bricht die Bewegen-Phase ab |
| `async` | `cancelShot` | `currentCoords: Coordinates` | `Promise<void>` |  Bricht die Schuss-Phase ab |
| `async` | `showPossibleMovesForTileAt` | `currentCoords: Coordinates` | `Promise<void>` | Zeigt alle erreichbaren Felder von den gegebenen Koordinaten an |
| `async` | `hidePossibleMoves` | | `Promise<void>` | Versteckt alle erreichbaren Felder wieder |
| `async` | `moveAmazonFromTo` | `fromCoords: Coordinates` <br> `toCoords: Coordinates` | `Promise<void>` | Rückgabewert Bewegt eine Amazone von den `fromCoords` zu den `toCoords` Koordinaten |
| `async` | `shootArrowAt` | `coordinates: Coordinates` | `Promise<void>` | Schießt einen Pfeil auf die gegebenen Koordinaten |
| `async` | `endTurnWith` | `moveStartCoords: Coordinates` <br> `moveEndCoords: Coordinates` <br> `shotCoords: Coordinates` | `Promise<void>` | Gibt den gesamten Spielzug aus den Parametern an die `GameControl` weiter |
| `async` | `updateLastClickWith` | `coordinates: Coordinates` | `Promise<void>` | Updated den letzten Click mit neuen Koordinaten |
| | `getPossibleMovesForTileAt` | `coordinates: Coordinates` | `Tile[]` | Gibt alle validen Koordinaten zurück, die von den gegebenen Koordinaten erreicht werden können |
| | `getPossibleMovesToTop` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach oben aus |
| | `getPossibleMovesToBottom` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach unten aus | 
| | `getPossibleMovesToRight` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach rechts aus |
| | `getPossibleMovesToLeft` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach links aus |
| | `getPossibleMovesToTopLeft` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach oben links aus |
| | `getPossibleMovesToTopRight` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach oben rechts aus |
| | `getPossibleMovesToBottomLeft` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach unten links aus |
| | `getPossibleMovesToBottomRight` | `rowStart: number` <br> `colStart: number` <br> `moves: Tile[]` <br> `moveBlocked = false` | `void` | Gibt alle valide Züge für die gegeben Koordinaten nach unten rechts aus |

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

---

### GameScreen.tsx

Ist der umgebende Container für das GUI der Spiel-Seite.

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `gameIsLoaded` | `boolean` | `true` wenn das Spiel erfolgreich von der API abgefragt wurde <br> `false` sonst |
| `gameIsFinished` | `boolean` | `true` wenn `game` einen `winningPlayer` definiert hat <br> `false` sonst |
| `game?` | `DetailedGame` | Das aktuelle Spiel <br> __OPTIONAL Ist undefiniert, solange die API Anfrage noch kein Spiel zurückgeben hat__ |
| `currentPlayer?` | `Player` | Spieler-Objekt des aktuellen Spielers <br> __OPTIONAL Ist undefiniert, solange die API Anfrage noch kein Spiel zurückgeben hat__ |
| `remainingTurnTime?` | `number` | Die verbleibende Zugezeit des aktuellen Spielers in Millisekunden <br> __OPTIONAL Ist undefiniert, solange die API Anfrage noch kein Spiel zurückgeben hat__ |

**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| `private async` | `makeATurn` | `turn: Turn` | `Promise<void>` | Sendet gegebenen ´turn´ an die API weiter |
| `private async` | `timerFunction` | | `Promise<void>` | Die Funktion, die jede Sekunde aufgerufen wird <br> Sie zählt den Countdown herunter und fragt den aktuellen Spielstand ab |
| `private` | `switchPlayer` | | `void` | Wechselt den aktuellen Spieler zum jeweils anderen und aktualisiert `state` |
| `private async` | `updateGame` | | `Promise<void>` | Macht eine Anfrage nach dem aktuellen Spielstatus und aktualisiert `state` |
| `private` | `isItLocalPlayersTurn` | | `boolean` | Gibt zurück, ob der lokale Spieler am Zug ist <br> `true` wenn der lokale Spieler am Zug ist <br> `false` sonst |
| `private` | `getCurrentPlayer` | | `Player` | Gibt den Spieler zurück, der am Zug ist |
| `private` | `getIndexOfCurrentPlayer` | | `number` | Gibt den Index des aktuellen Spielers in der Spielerliste aus |
| `private` | `getPlayerById` | `id: number` | `Player` | Gibt den Spieler zurück, der die ID `id` hat |
| `private` | `getTheOtherPlayer` | `myPlayer: Player` | `Player` | Gibt den gegnerischen Spieler zurück |
| `private` | `getTheOtherPlayerId` | `myPlayerId: number` | `number` | Gibt die ID des Spielers zurück, der nicht die ID `id` hat |
| `private` | `getPlayersColorById` | `id: number` | `string` | Gibt die Farbe des Players mit der ID `id` zurück |

---

### PlayerSidebar.tsx

Repräsentiert die Spieler-Informationen am Seitenrand des Bildschirms.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `playerName` | `string` | Name des Spielers |
| `playerColor` | `string` | Farbe des Spielers <br> Entweder `"white"` oder `"black"` |
| `playerPosition` | `number` | Die Position des Spielers in der Spielerliste |
 
---

### Timer.tsx

Zeigt die verbleibende Zugzeit an.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `timeLeft` | `number` | Die verbleibende Zugzeit in Millisekunden |

**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| | `formatAsReadableTime` | `milliSeconds: number` | `string` | Gibt gegebene `milliSeconds` als `"mm:ss"` zurück |

---

### TurnInfo.tsx

Repräsentiert die Informationen zum aktuellen Spiel und Zug am oberen Bildschirmrand.  
Zeigt die verbleibende Zeit und den aktuellen Spieler, der am Zug ist, an.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `isWinner` | `boolean` | Gibt an, ob der aktuelle Spieler der Gewinner des Spiels ist |
| `currentPlayer` | `Player` | Der Spieler, der am Zug ist |
| `remainingTurnTime` | `number` | Gibt die verbleibende Zeit an, um einen Spielzug durchzuführen |

---

## LobbyScreen

1. [GameCardList](#gamecardlisttsx)
    1. [GameCard.tsx](#gamecardtsx)
    2. [GameCardInfo.tsx](#gamecardinfotsx)
    3. [GameCardList.tsx](#gamecardlisttsx)
2. [LobbyScreen.tsx](#lobbyscreentsx)
3. [Logo.tsx](#logotsx)
4. [Title.tsx](#titletsx)
5. [Tutorial.tsx](#tutorialtsx)

### GameCard.tsx

Repräsentiert eine Infokarte zu einem Spiel, auf der die teilnehmenden Spieler sowie der aktulle Status des Spiels dargestellt werden.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `game` | `BasicGame` | Das Spiel, dessen Informationen angezeigt werden |
| `onClick` | `() => void` | Die Funktion, die beim Klick aufgerufen wird |

**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| `private` | `getPlayerById` | `id: number` | `Player` | Gibt den Spieler zurück, der die ID `id` hat |

---

### GameCardInfo.tsx

Diese Komponente wird aktuell nicht verwendet.

### GameCardList.tsx

Ist der umgebende Container für das GUI der Spieleliste.  

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `gamesList` | `BasicGame[]` | Das Array, in dem alle `BasicGame` gelistet sind |
| `localPlayer` | `Player` | Der lokale Spieler |
| `onCreateGame` | `() => void` | Die Funktion, die beim Klick auf den Spiel-Erstellen-Button aufgerufen wird |

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `isViewingGameInfo` | `boolean` | Hat aktuell keine Funktion |

**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| `private` | `getYourGames` | | `BasicGame[]` | Gibt alle Spiele aus, an denen der aktuelle Spieler teilnimmt `hallo? ... HALLO?` |
| `private` | `getGameCards` | | `JSX.Element[]` | Gibt alle `GameCard` zu den Spielen zurück, an denen der aktuelle Spieler teilnimmt |
| `private` | `getGameCardInfo` | | `JSX.Element` | Hat aktuell keine Funktion |
| `private` | `toggleIsViewingGameInfo` | | `void` | Hat aktuell keine Funktion |

---

### LobbyScreen.tsx

Ist der umgebende Container für das GUI der Lobby-Seite.  
Von hier aus kann der Nutzer zu allen anderen Bereichen der Webseite navigieren.

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `theme` | `number` | Hat aktuell keine Funktion |
| `isLoaded` | `boolean` | Gibt an, ob die Spieleliste fertig geladen wurde |
| `isCurrentLanguageGerman`| `boolean` | Gibt an, ob die derzeitige Sprache Deutsch ist |
| `gamesList` | `BasicGame[]` | Die Spielerliste des Nutzers |

**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| private | `onCreateNewGameClick` | | `void` | Navigiert zu `SettingsScreen.tsx` |
| private | `onLogoClick` | | `void` | Navigiert zu `CreditScreen.tsx` |
| private | `onSwitchThemeClick` | | `void` | Hat aktuell keine Funktion |

---

### Logo.tsx

Repräsentiert das HS Anhalt Logo.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onClick` | `() => void` | Funktion, die beim Klick auf das Logo ausgeführt wird |

---

### Title.tsx

Repräsentiert den Titel und die Begrüßung des Spielers auf der Startseite.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `currentPlayerName` | `string` | Der Name des aktuellen Spielers |

---

### Tutorial.tsx

Bietet dem Nutzer eine Galerie aus verschiedenen Tipps zur Seite und Spiel.

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `tutorialIndex` | `number` | Aktueller Index der Tutorialseite :33 |

---

## SettingsScreen

1. [SettingsScreen.tsx](#settingsscreen)
2. [GameSettings](#gamesettings)
    1. [AdvancedSettings](#advancedsettings)
       1. [AdvancedSettings.tsx](#advancedsettingstsx)
    2. [AIOrNotSelection.tsx](#aiornotselectiontsx)
    3. [GameSettings.tsx](#gamesettingstsx)
    4. [PlayerList.tsx](#playerlisttsx)
    5. [TimerInput.tsx](#timerinputtsx)

### SettingsScreen.tsx

Ist der umgebende Container für das GUI der Spiel-Erstellungs-Seite.  
Hier können die Einstellungen eines neuen Spiel eingestellt, die teilnehmenden Spieler ausgewählt und das Spiel gestartet werden.

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `isLoaded` | `boolean` | Gibt an, ob der aktuelle Spieler erfolgreich von der API geladen wurde |
| `settings` | `Settings` | Die Optionen, die für die Spielerstellung genutzt werden |

**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| private | `updateSettings` | `settingToChange: keyof Settings` <br> `newValue: any` | `void` | Aktualisiert `settingToChange` auf `newValue` des aktuellen `Settings` Objektes <br> Dabei kann `settingToChange` nur Strings annehmen, die den Namen eines Attributs aus `Settings` enthalten |
| private static | `updateTiles` | `settings: Settings` | `number[]` | Wandelt das Spielbrett in die passende Form für die gegebene Amazonenanzahl und Spielbrettgröße um |
| private async | `createGame` | `settings: Settings` | `Promise<void>` | Erstellt ein Spiel mit den gegebenen Einstellungen |

---

### AdvancedSettings.tsx

Die fortgeschrittenen Einstellungen zum zu erstellenden Spiel.
Hier können Amazonenanzahl und Spielbrettgröße festgelegt werden.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `boardSize` | `number` | Die Größe des Spielbretts |
| `amazonCount` | `number` | Die Anzahl der Amazonen pro Spieler |
| `onBoardSizeChange` | `(newBoardSize: number) => void` | Funktion, die bei einer Veränderung im Eingabefeld der Brettgröße aufgerufen wird   |
| `onAmazonCountChange` | `(newValue: number) => void` | Funktion, die bei einer Veränderung im Eingabefeld der Amazonenanzahl aufgerufen wird  |

---

### AIOrNotSelection.tsx

Repräsentiert einen Schalter, mit dem zwischen menschlichen oder KI-Gegner gewechselt werden kann.  
Seine Funktion ist momentan deaktiviert.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `onSelect` | `(hasSelectedBot: boolean) => void` | Funktion, die bei einer Veränderung im Eingabefeld aufgerufen wird |
| `hasSelectedBot` | `boolean` | `true` wenn gerade ein Bot als Gegner gewählt ist <br> `false` sonst |

---

### GameSettings.tsx

Ist der umgebende Container für alle Spieleinstellungen.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `settings` | `Settings` | Die zu festlegenden Einstellungen zur Spielerstellung |
| `localPlayer` | `Player` | Der lokale Spieler |
| `updateSettings` | `(settingToChange: keyof Settings, newValue: any) => void` | Funktion, die aufgerufen wird, wenn Einstellungen verändert werden |

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `hasSelectedBot` | `boolean` | `true` wenn gerade ein Bot als Gegner gewählt ist <br> `false` sonst  |
| `opposingPlayer?` | `Player` | Der Spieler, gegen den gespielt wird. <br> __OPTIONAL Ist nicht definiert, solange die Spielerliste von der API nicht vorliegt__ |

---

### PlayerList.tsx

Repräsentiert ein Eingabefeld für die Spielerliste, aus der ein Gegner gewählt werden kann.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `localPlayer` | `Player` | Der lokale Spieler |
| `hasSelectedBot` | `boolean` | `true` wenn gerade ein Bot als Gegner gewählt ist <br> `false` sonst |
| `onPlayerSelect` | `(player: Player) => void` | Funktion, die aufgerufen wird, wenn ein Gegner ausgewählt wird |

**State**

| Attribut | Typ | Beschreibung |
| ------ | ------ | ------ |
| `isLoaded` | `boolean` | Gibt an, ob die `relevantPlayers` erfolgreich von der API geladen wurden |
| `relevantPlayers` | `Player[]` | Liste der möglichen Gegner, die, basierend auf `hasSelectedBot`, angezeigt werden sollen |


**Methoden**

| Modifikatoren | Name | Parameter | Rückgabewert | Beschreibung |
| ------ | ------ | ------ | ------ | ------ |
| `private` `async` | `getRelevantPlayers` | | `Promise<Player[]>` | Gibt alle Spieler zurück, gegen die der Nutzer spielen kann |
| `private` | `generateOptionElements` | | JSX.Element[] | Generiert alle `options` Elemente, die, basierend auf `hasSelectedBot`, angezeigt werden sollen |

---

### TimerInput.tsx

Repräsentiert ein Eingabefeld für Zahlen, mit dem die Zeit pro Zug des zu erstellenden Spiels eingestellt werden kann.  
Valide Werte für die Zugzeit liegen einschließlich zwischen 5 und 600 Sekunden.

**Properties**

| Prop | Typ | Beschreibung |
| ------ | ------ | ------ |
| `turnTime` | `number` | Die eingestellte Zugzeit in Millisekunden |
| `onChange` | `(turnTime: number) => void` | Funktion, die bei einer Veränderung im Eingabefeld aufgerufen wird |

---
