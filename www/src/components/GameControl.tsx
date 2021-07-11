import {Component} from "react";
import {Board} from "./GameBoard/Board";
import {Timer} from "./Timer";
import {Player} from "./Player";

import * as requests from "../requests"

type Props = {
    players: player[]
    localPlayers: player[]
    initialGameInfo: { // TODO create own type for game info
        gameId: number,
        maxTurnTime: number, // time left
        playerId: number, // current player
        turnId: number,
        messageType: string,
        winningPlayer?: number,
        board: board,
        enemyTurn?: turn
    }
}

type State = {
    paused: boolean
    timeLeft: number
    gameInfo: {
        gameId: number,
        maxTurnTime: number, // time left
        playerId: number, // current player
        turnId: number,
        messageType: string,
        winningPlayer?: number,
        board: board,
        enemyTurn?: turn
    }
}

export class GameControl extends Component<Props, State> {
    private timer!: NodeJS.Timeout;

    constructor(props: Props) {
        super(props);

        console.log("what gets send to control:")
        console.log(props)

        this.state = {
            paused: false,
            timeLeft: props.initialGameInfo.maxTurnTime,
            gameInfo: this.props.initialGameInfo // TODO Toni darauf hinweisen, dass maxTurnTime die verbleibende Zeit des Zuges zurückgeben muss, wenn das Spiel bereits läuft
        }
    }

    /* Setzt den GameControl.timer auf einen 1-Sekunden-Timer, der von
       props.game.maxTurnTime runterzählt und bei 0 den aktuellen Zug beendet. */
    componentDidMount() {
        this.timer = setInterval(async () => {
            if (this.state.timeLeft <= 1000) {
                this.setState({timeLeft: this.props.initialGameInfo.maxTurnTime})
            } else if (!this.state.paused) {
                this.setState({
                    timeLeft: this.state.timeLeft - 1000,
                    gameInfo: await requests.getGame(this.state.gameInfo.gameId)
                })
            }
        }, 1000)
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        if (this.state.gameInfo.messageType !== "end" && (prevState.gameInfo.turnId !== this.state.gameInfo.turnId)) {
            this.setState({timeLeft: this.state.gameInfo.maxTurnTime})
        }

        if (this.state.gameInfo.messageType === "end" && prevState.gameInfo.messageType !== "end") {
            if (this.state.gameInfo.winningPlayer) {
                alert("Player " + (this.state.gameInfo.winningPlayer + 1) + " has won!")
            } else {  // TODO manchmal wird das Spiel nicht beendet
                console.log(await requests.getGame(this.state.gameInfo.gameId))
                alert("The match was aborted.")
            }
            clearInterval(this.timer)
        }
    }

    render() {
        return (
            <>
                <div className={"player-info"}>
                    {this.props.players.map((player) => {
                        return <Player
                            id={player.playerId}
                            key={"player" + player.playerId}
                            name={player.name}
                            controllable={player.controllable}
                            allowedToMove={player.playerId === this.state.gameInfo.playerId}/>
                    })}
                </div>
                <div className={"turn-info"}>
                    <h2>{"It's " + this.props.players[this.state.gameInfo.playerId].name + "'s turn!"}</h2>
                    <Timer timeLeft={this.state.timeLeft}/>
                </div>
                <Board onTurnEnd={this.handleTurnEnd}
                       isLocalPlayer={this.props.players[this.state.gameInfo.playerId].controllable}
                       initialBoard={this.state.gameInfo.board}
                />

                <div className={"debug info: remove later"}>
                    <p style={{textAlign: "center"}}> gameID: {this.props.initialGameInfo.gameId} |
                        maxTurnTime: {this.state.gameInfo.maxTurnTime / 1000}s</p>
                    <p style={{textAlign: "center"}}> turnID: {this.state.gameInfo.turnId} |
                        currentPlayer: {this.props.players[this.state.gameInfo.playerId].name}</p>
                </div>
            </>
        )
    }


    handleTurnEnd = async (turn?: turn): Promise<void> => { // TODO check if turn should always be demanded
        if (turn) await requests.createTurn(this.props.initialGameInfo.gameId, turn)
        this.resetTime() // Ist eigentlich unnötig, da das Spiel sowieso beendet wird, wenn kein Zug gemacht wurde
    }

    togglePause(): void {
        this.setState({paused: !this.state.paused})
    }

    resetTime(): void {
        this.setState({timeLeft: this.props.initialGameInfo.maxTurnTime})
    }


    debugButtons() {
        return (
            <>
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
                    await requests.reset()
                }}>
                    Reset
                </button>
            </>
        )
    }
}