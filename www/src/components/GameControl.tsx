import {Component} from "react";
import {Board} from "./GameBoard/Board";
import {Timer} from "./Timer";
import {Player} from "./Player";
import {createTurn, getAllGames} from "../requests";

type Props = {
    game: GameProps
    players: PlayerProps[]
    localPlayers: PlayerProps[]
}

type State = {
    paused: boolean
    timeLeft: number // in ms
    currentPlayer: PlayerProps
    winner?: number
}

// TODO FRAGE: OpenWhisk geht net

export class GameControl extends Component<Props, State> {
    private static timer: NodeJS.Timeout

    constructor(props: Props) {
        super(props);

        if (props.players.length < 2) throw new RangeError("The prop 'players' of GameControl has to have at least 2 Players!")

        this.setTimer()
        this.state = {
            paused: true,
            timeLeft: props.game.maxTurnTime,
            currentPlayer: props.players[0]
        }
    }

    /* Setzt den GameControl.timer auf einen 1-Sekunden-Timer, der von
       props.game.maxTurnTime runterzählt und bei 0 den aktuellen Zug beendet. */
    setTimer() {
        if (GameControl.timer !== undefined) clearInterval(GameControl.timer)

        GameControl.timer = setInterval(() => {
            if (this.state.timeLeft <= 1000) {
                this.endTurn()
                this.setState({timeLeft: this.props.game.maxTurnTime})
            } else if (!this.state.paused) this.setState({timeLeft: this.state.timeLeft - 1000})
        }, 1000)
    }

    render() {
        return (
            <div>
                <div className={"player-info"}>
                    {this.props.players.map((player) => {
                        return <Player
                            id={player.id}
                            key={"player" + player.id}
                            name={player.name}
                            controllable={player.controllable}
                            allowedToMove={player.id === this.state.currentPlayer.id}/>
                    })}
                </div>
                <div className={"turn-info"}>
                    <h2>{"It's " + this.state.currentPlayer.name + "'s turn!"}</h2>
                    <Timer
                        paused={this.state.paused}
                        timeLeft={this.state.timeLeft}
                    />
                </div>
                <Board onTurnEnd={this.handleTurnEnd}
                       isLocalPlayer={this.props.localPlayers.includes(this.state.currentPlayer)}
                       initialBoard={this.props.game.initialBoard}
                />
                <button className={"test!"} onClick={async () => {
                    console.log(await getAllGames())
                }}>
                    RAWR
                </button>
            </div>
        )
    }


    handleTurnEnd = (turn?: TurnProps) => {
        if (turn) createTurn(this.props.game.gameId, turn)  // TODO send turn to server via api call
        this.resetTime()
        this.endTurn()
    }


    /* Beendet den Zug, indem der nächste Spieler dran genommen wird. */
    endTurn(): void {
        // TODO check if any players that can move are left (win condition) | wird sehr wahrscheinlich durch Backend geregelt
        this.setState({currentPlayer: this.getNextPlayer()})
    }

    togglePause(): void {
        this.setState({paused: !this.state.paused})
    }

    resetTime(): void {
        this.setState({timeLeft: this.props.game.maxTurnTime})
    }


    getNextPlayer(): PlayerProps {
        return this.props.players[(this.props.players.indexOf(this.state.currentPlayer) + 1) % this.props.players.length]
    }
}