import {Component} from "react";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    playerName: string
    playerColor: string
    playerPosition: number
}


interface State {
}


class PlayerSidebar extends Component<Props, State> { // TODO add a turn history
    render() {
        return (
            <div className={`player-sidebar ${this.props.playerColor}`}>
                <div className={"player-label"}>
                    <h2>{`${this.props.t("game.player")} ${this.props.playerPosition + 1}: `}</h2>
                    <h2>{this.props.playerName}</h2>
                </div>
                <div className={"player-stats"}>

                </div>
            </div>
        )
    }
}


export default withTranslation()(PlayerSidebar)