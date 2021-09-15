import {Component} from "react";
import {Player} from "../../requests";
import {Timer} from "./Timer";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    isWinner: boolean
    currentPlayer: Player
    remainingTurnTime: number
}


interface State {
}


class TurnInfo extends Component<Props, State> {
    render() {
        if (this.props.isWinner) {
            return (
                <h1 className={"winner"}>{`${this.props.currentPlayer.name} ${this.props.t("game.info.won")}`}</h1>
            )
        } else if (this.props.remainingTurnTime < 500) {
            return (
                <h1 className={"time-ran"}>{this.props.t("game.info.ran")}</h1>
            )
        } else {
            return (
                <>
                    <h2 className={"current-turn-player"}>{`${this.props.t("game.info.its")} ${this.props.currentPlayer.name}${this.props.t("game.info.turn")}`}</h2>
                    <Timer timeLeft={this.props.remainingTurnTime}/>
                </>
            )
        }
    }
}


export default withTranslation()(TurnInfo)