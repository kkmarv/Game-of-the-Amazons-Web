import {Component} from "react";
import {Board} from "./GameBoard/Board";
import {Timer} from "./Timer";
import {Player} from "./Player";

type Props = {
    players: PlayerType[]
    game: GameType
}

type State = {
    playerToMove: number
    winner?: number
}

export class GameControl extends Component<Props, State> {
    private readonly apiUrl: string = "https://webengineering.ins.hs-anhalt.de:40911"

    constructor(props: Props) {
        super(props);
        if (props.players.length < 2) throw new RangeError("The prop 'players' of GameControl has to have at least 2 Players!")
        this.state = {
            playerToMove: 0
        }
    }

    render() {
        return (
            <div>
                <Timer maxTurnTime={this.props.game.maxTurnTime}/>
                <div className={"player-info"}>
                    {this.props.players.map((player) => {
                        return <Player id={player.id} name={player.name} controllable={player.controllable}/>
                    })}
                </div>
                <Board initialBoard={this.props.game.initialBoard}/>
            </div>
        )
    }
}