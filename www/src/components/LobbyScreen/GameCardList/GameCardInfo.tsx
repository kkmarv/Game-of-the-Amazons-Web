import {Component} from "react";
import {DetailedGame, getGame} from "../../../requests";


interface Props {
    onLeave: () => void
    forGameId: number
}

interface State {
}

/* Displays detailed game infos. */
export class GameCardInfo extends Component<Props, State> {
    private game!: DetailedGame

    async componentDidMount() {
        this.game = await getGame(this.props.forGameId) as DetailedGame
    }

    render() {
        return (
            <div className={"game-info"}>

            </div>
        )
    }
}