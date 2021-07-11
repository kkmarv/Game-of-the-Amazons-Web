import {Component} from "react";

type Props = {
    id: number
    name: string
    controllable: boolean // TODO check if obsolete
    allowedToMove: boolean // TODO check if obsolete
}

// TODO turn history

/**
 * Represents players' stats and turn history.
 */
export class Player extends Component<Props, any> {
    render() {
        return (
            <div className={"player-info-" + this.props.id} id={"player" + this.props.id}>
                <div className={"player-label-" + this.props.id}>
                    <h2>{"PLAYER " + (this.props.id + 1) + ": " + this.props.name}</h2>
                </div>
            </div>
        )
    }
}