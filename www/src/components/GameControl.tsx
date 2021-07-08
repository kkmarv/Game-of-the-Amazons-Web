import {Component} from "react";
import {Board} from "./GameBoard/Board";
import {Timer} from "./Timer";
import {Player} from "./Player";

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

export class GameControl extends Component<Props, State> {
    private static timer: NodeJS.Timeout

    constructor(props: Props) {
        super(props);
        if (props.players.length < 2) throw new RangeError("The prop 'players' of GameControl has to have at least 2 Players!")

        if (GameControl.timer !== undefined) clearInterval(GameControl.timer)

        GameControl.timer = setInterval(() => {
            if (this.state.timeLeft <= 1000) {
                this.endTurn()
                this.setState({timeLeft: this.props.game.maxTurnTime})
            } else if (!this.state.paused) this.setState({timeLeft: this.state.timeLeft - 1000})
        }, 1000)

        this.state = {
            paused: false,
            timeLeft: props.game.maxTurnTime,
            currentPlayer: props.players[0]
        }
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
                <button className={"test!"} onClick={() => {
                    this.setState({paused: !this.state.paused})
                }}>
                    RAWR
                </button>
            </div>
        )
    }


    handleTurnEnd = (turn?: TurnProps) => {
        // TODO send turn to server via api call
        this.resetTime()
        this.endTurn()
    }

    endTurn(): void {
        // TODO check if any players that can move are left (win condition)
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