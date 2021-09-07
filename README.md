# Game of the Amazons

Das Amazonenspiel ist ein abstraktes Strategie-Brettspiel für 2 Spieler, welches standardmäßig auf einem 10x10 Schachbrett gespielt wird.

Es spielt Schwarz gegen Weiß. Weiß beginnt.  
Jeder Spieler hat 4 Amazonen, die bereits zu Beginn des Spiels auf dem Brett platziert sind.  
Amazonen können sich wie die Dame im Schach auf der Horizontalen, Vertikalen und den beiden Diagonalen bewegen, bis sie auf ein Hindernis treffen. Die Besonderheit des Amazonenspiels ist jedoch, dass Amazonen nach jedem Zug einen "giftigen" Pfeil verschießen müssen, mit dem Ziel, gegnerische Züge zu blockieren.

Der Spieler, der zuerst keine seiner Amazonen mehr bewegen kann, verliert.

Natürlich gibt es diverse Varianten des Amazonenspiels, in denen beispielsweise mehr Amazonen oder ein kleineres Spielbrett verwendet werden.

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

- [ ] die Zug-Historie einsehen, und zwar
    - [ ] von sich selbst
    - [ ] von seinen Gegnern
- [ ] Pfeile besser unterscheiden können
    - [ ] vom Hintergrund und
    - [ ] seine eigenen von denen der Gegner
- [ ] **bei Sieg und Niederlage eine gesonderte Animation gezeigt bekommen**

#### Auf der Lobby-Seite möchte der Nutzer:
    
- [ ] <del>seinen eigenen Namen frei wählen können</del>
- [ ] **ein Tutorial sehen können, welches kurz das Spielprinzip erklärt**
    - [ ] in Form von GIFs und kurzen Texten
- [ ] **Multiplayer-Spiele gegen andere Menschen spielen, indem er**
    - [ ] **laufende Spiele, sowie Informationen zu diesen einsehen kann und**
        - [ ] **diesen als Spieler beitreten kann, sofern noch Plätze frei sind oder**
        - [ ] diesen als Zuschauer beitreten kann
    - [ ] **eigene Spiele erstellen kann und**
        - [ ] ihnen einen Namen geben kann, sowie
        - [ ] **die Anzahl der Amazonen festlegen und**
        - [ ] **Spieler 1 oder 2 oder beide kontrollierbar machen und**
        - [ ] **die Spielfeldgröße einstellen kann**

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
- [ ] wenn gewünscht, Audio-Feedback für seine Aktionen erhalten, und zwar bei(m)
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
