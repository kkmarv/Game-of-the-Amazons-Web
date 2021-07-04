import {Component} from "react";
import {Board} from "./GameBoard/Board";

type Props = {
    players: { name: string, controllable: boolean, id?: number }[]
    game: {
        maxTurnTime: number // in ms
        players: number[] // IDs only
        initialBoard: {
            gameSizeRows: number
            gameSizeColumns: number
            tiles: number[][]
        }
    }
}

export class GameControl extends Component<Props, any> {
    private readonly apiUrl: string = "https://webengineering.ins.hs-anhalt.de:40911"

    render() {
        return (
            <div>
                <Board initialBoard={this.props.game.initialBoard}/>
            </div>
        )
    }
}