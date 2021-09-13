import {Component} from "react";
import {Player} from "../../requests";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    player: Player
    playerColor: string
}


interface State {
}


class PlayerSidebar extends Component<Props, State> { // TODO add a turn history
    private playerId: number = this.props.player.id
    private playerName: string = this.props.player.name

    render() {
        return (
            <div className={`player-sidebar ${this.props.playerColor}`}>
                <div className={"player-label"}>
                    <h2>{`${this.props.t("game.player")} ${this.playerId + 1}: `}</h2>
                    <h2>{this.playerName}</h2>
                </div>
                <div className={"player-stats"}>

                </div>
            </div>
        )
    }
}


export default withTranslation()(PlayerSidebar)