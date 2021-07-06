import {Component} from "react";
import {Board} from "./GameBoard/Board";
import {Timer} from "./Timer";
import {Player} from "./Player";
import {createTurn} from "../requests";

type Props = {
    players: PlayerType[]
    game: GameType
}

type State = {
    paused: boolean
    currentPlayer: PlayerType // player's ID
    winner?: number
}

export class GameControl extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        if (props.players.length < 2) throw new RangeError("The prop 'players' of GameControl has to have at least 2 Players!")
        this.state = {
            paused: true,
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
                            name={player.name}
                            controllable={player.controllable}
                            allowedToMove={player.id === this.state.currentPlayer.id}/>
                    })}
                </div>
                <div className={"turn-info"}>
                    <h2>{"It's " + this.state.currentPlayer.name + "'s turn!"}</h2>
                    <Timer
                        paused={this.state.paused}
                        onTimeIsUp={this.handleTimeIsUp}
                        maxTurnTime={this.props.game.maxTurnTime}
                    />
                </div>
                <Board onTurn={this.handleTurn} initialBoard={this.props.game.initialBoard}/>
                <button className={"test!"} onClick={() => {
                    this.setState({paused: !this.state.paused})
                    console.log("click")
                }
                }>RAWR
                </button>
            </div>
        )
    }

    handleTurn = (turn: TurnType) => {
        // TODO createTurn(this.props.game.gameId, turn)
        this.endTurn()
    }

    handleTimeIsUp = () => {
        this.endTurn()
    }

    endTurn() {
        this.setState({currentPlayer: this.getNextPlayer()})
    }

    togglePause(): void {
        this.setState({paused: this.state.paused})
    }


    getNextPlayer(): PlayerType {
        return this.props.players[(this.props.players.indexOf(this.state.currentPlayer) + 1) % this.props.players.length]
    }
}