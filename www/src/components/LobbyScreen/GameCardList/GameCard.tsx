import {Component} from "react";
import {Player} from "../../../requests";


interface Props {
    players: Player[]
    winningPlayer?: Player
}

interface State {
}

export class GameCard extends Component<Props, State> {
    render() {
        return (
            <div className={"game-card"}>
                <span>{`${this.props.players[0].name} VS ${this.props.players[1].name}`}</span>
                <span>{this.props.winningPlayer !== undefined ? this.props.winningPlayer.name + " has won this round" : "Still in progress..."}</span>
            </div>
        )
    }
}