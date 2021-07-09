import {Component} from "react";

type Props = {
    id: number
    name: string
    controllable: boolean
    allowedToMove: boolean
}

type State = {
    ableToMove: boolean
    allowedToMove: boolean
    turnHistory: turn[]
}

/**
 * Represents a PlayerStats. Allows to be AI controlled.
 */
export class Player extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            ableToMove: false,
            allowedToMove: props.allowedToMove,
            turnHistory: []
        }
    }

    render() {
        return (
            <div className={"player-info-" + this.props.id} id={"player" + this.props.id}>
                <h2>{"PLAYER " + (this.props.id + 1) + ": " + this.props.name}</h2>
            </div>
        )
    }

    makeATurn(): void {
        // TODO
    }
}