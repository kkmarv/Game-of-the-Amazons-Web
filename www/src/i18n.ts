import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';


i18n
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    loading: "Loading...",
                    lobby: {
                        title: {
                            part1: "Welcome to the",
                            part2: "Game of the",
                            part3: "Amazons",
                        },
                        card: {
                            title: "Your Games",
                            progress: "Still in progress...",
                            end: "has won!",
                        }
                    },
                    settings: {
                        title: "Create a Game",
                        settings: {
                            player: "Player",
                            you: "you",
                            bot: "Play vs Bot",
                            human: "Play vs Human",
                            choose: "Choose your opponent",
                            time: "Draw time",
                            sec: "sec",
                        },
                        advanced: {
                            title: "Advanced Settings",
                            number: "Number of Amazons",
                            size: "Board Size",
                            checkerboard: "Checkerboard",
                        }
                    },
                    game: {
                        player: "PLAYER",
                        info: {
                            its: "It's",
                            turn: "'s turn",
                            won: "has won!",
                            ran: "Your time ran out!",
                        }
                    },
                    credits: {
                        title: "Credits",
                        part1: "We, that are the two students Pascal Wegener and Marvin Kästing, have developed this website during the second semester in the module Web and Media Programming of Prof. Andreas Both.",
                        part2: "During the whole development Toni Barth assisted us bravely.",
                        part3: "The goal of this site is to provide a user interface for the AI for the Game of the Amazons, which was developed by students of the University of Paderborn in the winter semester of 20/21.",
                    },
                    error: {
                        title: "GREAT!",
                        subtitle: "Absolutely fkng great!",
                        demon: "y̶̨̨̪̜̩̯̰̥̰̠͖͍̫͕̫̪̐̏̅̆̉͊̌̈͐̅̈́ͅo̷̥̘̙̩̘̫̻̺͚̦̠̘̟̒̂̌͗͐͑̐̍́͋̌̇̃͒͝u̴̠͈̪̜̗̤̱̞̟̹̖͙͑̋͗̑͋̂̔̂͆̏͊̊̀ͅ ̴͖̝̬̬̬̞̗͇͉̜̘̯͕̳͋͂̎̑̂̓͝b̴̪̈́̎͛̂̊͊̚̕͘r̴̡̘͓̹̝͖͇̩̬͓̝̼̩̼̩̳̈́͌̓͛̄̌̀̾͜o̸̡̧̥̬̤͕̬̺̖͓̯̰̝̱̯̼͛̎̾̑̊́̀͜k̷̛͙͇̰̫̈͛̾ͅȩ̷̨̜̞̼͖̺̝̜͙͇̯̝̦͂̏̀̉̒̒̈́̃̀̇ ̷̨̢͉̩̺͙́̑̈̓̐̄͘t̶̙͇̹̗̤̫̠̔̊̄̓̇̉́̃̉̋̇͊͋̔͆̃͒͘͝͠h̷̡̧̼̘̳͓̣̮̹̬̯̱͕͓͂̇̆̔̊͑̏̀̋͆͆͛̄͑̽̈́͋̍̈́̕e̴̮̪̍̾͂̑̈́͛̌̃͑̌̄́͆̆̒̃̕̕͝͠ ̴͓͉̜̬̻̯͍̱̥̳̲̺͇̥͆͊͛̋̾̊̔̃̓͝p̸͇̥͉̥̘̜͙̦͔̰̞̼̥̣͚̎̎̏̓͗̂̽̌ͅa̴̢̧̡͈͈͓̫͉̱̻̭͇̗̭̙̬̠̐͋̐̅̓̉̚͜͠ǵ̵̭̥̪͚͈̰͎̖̫͍̈́͋͂̽̈́̉͜͠ḗ̶̢̬̯̬͉͂̈́̈́̊͂̍̇̀̓̈́͛̾͠͠ͅ >",
                        additional: "There is no additional info.",
                        player: {
                            info: "We could not verify your Player Account",
                            text: "This could be due to a network issue or too long inactivity.",
                        },
                        game: {
                            info: "We could not retrieve any game information from the server",
                            text: "This could be due to a network issue.",
                        },
                        turn: {
                            info: "We could not send your turn to the server",
                            text: "This could be due to a network issue.",
                        },
                        reload: "Reload the page and try again.",
                    },
                    buttons: {
                        lobby: "Back to Lobby",
                        start: "Start",
                        new: "New Game",
                    }
                }
            },
            de: {
                translation: {
                    loading: "Lädt...",
                    lobby: {
                        title: {
                            part1: "Willkommen zum",
                            part2: "Spiel der",
                            part3: "Amazonen",
                        },
                        card: {
                            title: "Deine Spiele",
                            progress: "Noch am Laufen...",
                            end: "hat das Spiel für sich entschieden!",
                        }
                    },
                    settings: {
                        title: "Spielerstellung",
                        settings: {
                            player: "Spieler",
                            you: "du",
                            bot: "Spiel vs Bot",
                            human: "Spiel vs Mensch",
                            choose: "Wähle deinen Gegner",
                            time: "Zugzeit",
                            sec: "sek",
                        },
                        advanced: {
                            title: "Erweiterte Einstellungen",
                            number: "Amazonenanzahl",
                            size: "Brettgröße",
                            checkerboard: "Damebrett",
                        }
                    },
                    game: {
                        player: "SPIELER",
                        info: {
                            its: "",
                            turn: " ist am Zug",
                            won: "hat gewonnen!",
                            ran: "Deine Zeit ist um!",
                        }
                    },
                    credits: {
                        title: "Credits",
                        part1: "Wir, das sind die beiden Studenten Pascal Wegener und Marvin Kästing, haben diese Webseite während des zweiten Semesters im Modul Web- und Medienprogrammierung von Herrn Prof. Andreas Both entwickelt.",
                        part2: "Während der gesamten Entwicklung stand uns Toni Barth tapfer zur Seite.",
                        part3: "Ziel dieser Seite ist es, der von Studenten der Universität Paderborn im Wintersemester 20/21 entwickelten KI zum Amazonenspiel ein User Interface zu bieten.",
                    },
                    error: {
                        title: "SUPER!",
                        subtitle: "Absolut toll gemacht!",
                        demon: "y̶̨̨̪̜̩̯̰̥̰̠͖͍̫͕̫̪̐̏̅̆̉͊̌̈͐̅̈́ͅo̷̥̘̙̩̘̫̻̺͚̦̠̘̟̒̂̌͗͐͑̐̍́͋̌̇̃͒͝u̴̠͈̪̜̗̤̱̞̟̹̖͙͑̋͗̑͋̂̔̂͆̏͊̊̀ͅ ̴͖̝̬̬̬̞̗͇͉̜̘̯͕̳͋͂̎̑̂̓͝b̴̪̈́̎͛̂̊͊̚̕͘r̴̡̘͓̹̝͖͇̩̬͓̝̼̩̼̩̳̈́͌̓͛̄̌̀̾͜o̸̡̧̥̬̤͕̬̺̖͓̯̰̝̱̯̼͛̎̾̑̊́̀͜k̷̛͙͇̰̫̈͛̾ͅȩ̷̨̜̞̼͖̺̝̜͙͇̯̝̦͂̏̀̉̒̒̈́̃̀̇ ̷̨̢͉̩̺͙́̑̈̓̐̄͘t̶̙͇̹̗̤̫̠̔̊̄̓̇̉́̃̉̋̇͊͋̔͆̃͒͘͝͠h̷̡̧̼̘̳͓̣̮̹̬̯̱͕͓͂̇̆̔̊͑̏̀̋͆͆͛̄͑̽̈́͋̍̈́̕e̴̮̪̍̾͂̑̈́͛̌̃͑̌̄́͆̆̒̃̕̕͝͠ ̴͓͉̜̬̻̯͍̱̥̳̲̺͇̥͆͊͛̋̾̊̔̃̓͝p̸͇̥͉̥̘̜͙̦͔̰̞̼̥̣͚̎̎̏̓͗̂̽̌ͅa̴̢̧̡͈͈͓̫͉̱̻̭͇̗̭̙̬̠̐͋̐̅̓̉̚͜͠ǵ̵̭̥̪͚͈̰͎̖̫͍̈́͋͂̽̈́̉͜͠ḗ̶̢̬̯̬͉͂̈́̈́̊͂̍̇̀̓̈́͛̾͠͠ͅ >",
                        additional: "Es gibt keine weiteren Informationen.",
                        player: {
                            info: "Wir konnten deinen Spieler-Account nicht verifizieren",
                            text: "Das könnte einem Netzwerkfehler oder langer Inaktivität zu Grunde liegen.",
                        },
                        game: {
                            info: "Wir konnten keine Spielinformationen vom Server abrufen",
                            text: "Das könnte einem Netzwerkfehler zu Grunde liegen.",
                        },
                        turn: {
                            info: "Wir konnten deinen Zug nicht zum Server senden",
                            text: "Das könnte einem Netzwerkfehler zu Grunde liegen.",
                        },
                        reload: "Versuch, die Seite neu zu laden.",
                    },
                    buttons: {
                        lobby: "Zurück zur Lobby",
                        start: "Start",
                        new: "Neues Spiel",
                    }
                }
            }
        }
    });

export default i18n;
