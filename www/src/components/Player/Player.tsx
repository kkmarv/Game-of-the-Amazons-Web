import {Component} from "react";

type Props = {
    name: string
    controllable: boolean
    id?: number
}

type State = {
    ableToMove: boolean
    lastTurn: any // TODO
}

/**
 * Represents a Player. Allows to be AI controlled.
 */
export class Player extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ableToMove: false,
            lastTurn: []
        }
    }

    render() {
        return (
            <div className={"player-info"} id={"player" + this.props.id}>
                <h1>{"PLAYER " + this.props.id}</h1>
            </div>
        )
    }

    login() {
        // TODO
    }

    makeATurn() {
        // TODO
    }
}