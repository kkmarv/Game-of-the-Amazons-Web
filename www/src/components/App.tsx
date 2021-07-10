import '../styles/App.css';
import React, {Component} from 'react';
import {GameControl} from "./GameControl";

import * as requests from "../requests";

type State = {
    isLoaded: boolean
}

export default class App extends Component<any, State> {
    private readonly loadingScreen = <div><h1>Loading...</h1></div>

    players: any = []
    game = undefined

    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    render() {
        // return this.debugButtons()
        if (!this.state.isLoaded) return this.loadingScreen
        else {
            return (
                <GameControl players={this.players} localPlayers={[this.players[0]]} initialGameInfo={this.game!}/>
            );
        }
    }

    async componentDidMount() {
        await this.readyUpPlayers()
        await this.readyUpGame()
        this.setState({isLoaded: true})
    }


    async readyUpPlayers(): Promise<void> {
        this.players = await requests.getAllPlayers()

        console.log("response all players:")
        console.log(this.players)

        if (this.players?.length !== 2) {
            this.players = []
            await requests.reset(true)
            this.players.push(await requests.createPlayer({name: "player1", controllable: false}) as player) // possible error : players!
            this.players.push(await requests.createPlayer({name: "player2", controllable: false}) as player)
        }
    }

    async readyUpGame(): Promise<void> {
        const games = await requests.getAllGames()

        console.log("response all games:")
        console.log(games)

        if (games?.length > 0) { // wenn es bereits ein Spiel gibt
            if (games[0].winningPlayer) await requests.deleteGame(games[0].gameId)
            else this.game = games[0]
        }
        this.game = await requests.getGame((await this.createTestGame()).gameId)
    }

    async createTestGame() {
        return requests.createGame({
            maxTurnTime: 60000,
            players: this.players.map((player: player) => {
                return player.playerId
            }),
            initialBoard: {
                gameSizeRows: 10,
                gameSizeColumns: 10,
                squares: [
                    [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1]
                ]
            }
        })
    }


    //


    debugButtons() {
        return (
            <div>
                <button className={"test!"} onClick={async () => {
                    const players = await requests.getAllPlayers()
                    let playersTakePart: number[] = []
                    if (players) {
                        playersTakePart = [players[players?.length - 1].playerId, players[players?.length - 2].playerId]
                        console.log(playersTakePart)
                    }
                    console.log(await requests.createGame({
                        maxTurnTime: 30000, players: playersTakePart, initialBoard: {
                            gameSizeRows: 10,
                            gameSizeColumns: 10,
                            squares: [
                                [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1],
                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                                [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1]
                            ]
                        }
                    }))
                }}>
                    Make Game
                </button>
                <button className={"test!"} onClick={async () => {
                    console.log(await requests.createPlayer({name: "pepego", controllable: true}))
                    console.log(await requests.createPlayer({name: "pepego", controllable: false}))
                }}>
                    Make Players
                </button>
                <button className={"test!"} onClick={async () => {
                    console.log(await requests.createTurn(0, {
                        move: {
                            start: {row: 6, column: 0},
                            end: {row: 6, column: 8},
                        },
                        shot: {row: 5, column: 8}
                    }))
                }}>
                    Shoot
                </button>
                <button className={"test!"} onClick={async () => {
                    console.log(await requests.getGame(0))
                }}>
                    Get Game 0
                </button>
                <button className={"test!"} onClick={async () => {
                    console.log(await requests.getAllPlayers())
                    console.log(await requests.getAllGames())
                }}>
                    Get Data
                </button>
                <button className={"test!"} onClick={async () => {
                    const a: player[] | undefined = await requests.getAllPlayers()
                    await a?.forEach(async (player) => {
                        await requests.deletePlayer(player.playerId)
                    })
                }}>
                    Delete all Players
                </button>
                <button className={"test!"} onClick={async () => {
                    const a: game[] | undefined = await requests.getAllGames()
                    console.log(a)
                    await a?.forEach(async (game) => {
                        await requests.deleteGame(game.gameId)
                    })
                }}>
                    Delete all Games
                </button>
                <button className={"test!"} onClick={async () => {
                    await requests.reset(true)
                }}>
                    Reset
                </button>
            </div>
        )
    }
}