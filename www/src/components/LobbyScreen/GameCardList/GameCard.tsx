import {Component} from "react";
import {BasicGame, Player} from "../../../requests";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    game: BasicGame
    onClick: () => void
}


interface State {
}


class GameCard extends Component<Props, State> {
    render() {
        return (
            <div className={"game-card btn"} onClick={this.props.onClick}>
                <span>
                    {
                        `${this.props.game.players[0].name} VS ${this.props.game.players[1].name}`
                    }
                </span>
                <span>
                        {this.props.game.winningPlayer === undefined ? (
                            this.props.t("lobby.card.progress")
                        ) : (
                            `${this.getPlayerById(this.props.game.winningPlayer).name} ${this.props.t("lobby.card.end")}`
                        )}
                </span>
            </div>
        )
    }


    private getPlayerById(id: number): Player {
        return this.props.game.players[0].id === id ? this.props.game.players[0] : this.props.game.players[1]
    }
}


export default withTranslation()(GameCard)