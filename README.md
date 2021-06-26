# Game of the Amazons

The Game of the Amazons is played on a 10x10 chessboard.<br />
It is a two-player strategy game and is played by moving pieces around the board in order to block the opponent from moving their pieces. The last player able to move is the winner.

Read more on the [English Wikipedia page.](https://en.wikipedia.org/wiki/Game_of_the_Amazons)

## Anforderungen

### an das GUI

[ ] dass über einen Bildschirm offene Spiele angezeigt werden (Lobby) `<API>`<br /> 
[ ] vor dem Start eines Spieles jeder Mitspieler über einen Button bestätigt, dass er bereit ist<br />
[ ] das Spiel nach einem Countdown von bspw. 15 Sekunden sichtbar heruntergezählt für alle beginnt. Im Hintergrund soll für den Spieler bereits seine Farbe und das Spielbrett ersichtlich sein

[ ] dass die Figuren beider Spieler deutlich voneinander unterscheidbar sind (selbiges gilt für Pfeile)<br />
[ ] dass der Sieger eine gesonderte Animation bekommt

[ ] dass zu jeder Zeit lediglich die Bedienelemente gezeigt werden, die zu dem Zeitpunkt relevant sind

### an die Struktur/Logik

[ ] dass den offenen Spielen beigetreten werden kann `<API>`<br />
[ ] dass beide Spieler eines Spiels abwechselnd ihre Figuren (regelkonform) ziehen können `<API>`<br />
[ ] dass beide Spieler nach dem Zug einer Figur den Zielpunkt für den Pfeilwurf festlegen können<br />
[ ] das Spiel endet, sobald ein Spieler nicht mehr ziehen kann `<API>`

## Ideen

### zum GUI
- eigene Lobby Startseite?
    - Liste mit allen Spielen, denen man beitreten/zuschauen kann
    - Fragen:
        - KI vs KI?
        - KI vs Player?
        - Player vs Player?
- kann man laufenden Spielen als Beobachter beitreten?

### zum Abschlussprojekt
- Optionsmenü zur Auswahl des Spielbrett-/Seiten-Themes
- display the turn history on sidebar
- Alternative Spielmodi:
    - Damage/Death upon click on invalid tile
    - Tutorial/Training mode where one is allowed to revert their last turn

## Umsetzung

### GUI

1. Lobby

2. Gameboard

### Serverkommunikation

Uns wurde (hoffentlich) eine REST API zur Verfügung gestellt, mit derer Hilfe wir dem Spielerserver sowie dem Spielserver Anfragen stellen können.

## Wiki

- [Aufsetzen der öffentlichen Webseite über den OpenWhisk Service der Hochschule Anhalt](https://gitlab.hs-anhalt.de/gitlab-integration/userdocumentation/-/blob/master/web-action/Node-Web-Programm.md)


## Weiterführende Links

- [This projects Public website](https://webengineering.ins.hs-anhalt.de:40443/api/v1/web/whisk.system/911_master/website/)

- [Initial project Wiki from the Paderborn Univesitiy this project is based on](https://github.com/dice-group/Amazons/wiki)

