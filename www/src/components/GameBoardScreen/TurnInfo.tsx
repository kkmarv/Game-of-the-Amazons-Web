import {Component} from "react";
import {Player} from "../../requests";
import {Timer} from "./Timer";


interface Props {
    isWinner: boolean
    currentPlayer: Player
    remainingTurnTime: number
}

export class TurnInfo extends Component<Props, any> {
    render() {
        if (this.props.isWinner) {
            return (
                <h1 className={"winner"}>{`${this.props.currentPlayer.name} has won!`}</h1>
            )
        } else if (this.props.remainingTurnTime < 500) {
            return (
                <h2>Your Time ran out!</h2>
            )
        } else {
            return (
                <>
                    <h2 className={"current-turn-player"}>{`It's ${this.props.currentPlayer.name}'s turn!`}</h2>
                    <Timer timeLeft={this.props.remainingTurnTime}/>
                </>
            )
        }
    }
}