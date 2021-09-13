import {Component} from "react";
import {Player} from "../../requests";


interface Props {
    player: Player
    playerColor: string
}

// TODO turn history

export class PlayerSidebar extends Component<Props, any> {
    private playerId: number = this.props.player.id
    private playerName: string = this.props.player.name
    private playerControllable: boolean = this.props.player.controllable

    render() {
        return (
            <div className={`player-sidebar ${this.props.playerColor}`}>
                <div className={"player-label"}>
                    <h2>{"PLAYER " + (this.playerId + 1) + ":"}</h2>
                    <h2>{this.playerName}</h2>
                </div>
                <div className={"player-stats"}>

                </div>
            </div>
        )
    }
}