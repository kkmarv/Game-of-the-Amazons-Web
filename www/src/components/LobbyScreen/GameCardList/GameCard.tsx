import {Component} from "react";
import {BasicGame, Player} from "../../../requests";


interface Props {
    game: BasicGame
    onClick: () => void
}

interface State {
}


export class GameCard extends Component<Props, State> {
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
                            "Still in progress..."
                        ) : (
                            this.getPlayerById(this.props.game.winningPlayer).name + " has won this round"
                        )}
                </span>
            </div>
        )
    }


    private getPlayerById(id: number): Player {
        return this.props.game.players[0].id === id ? this.props.game.players[0] : this.props.game.players[1]
    }
}