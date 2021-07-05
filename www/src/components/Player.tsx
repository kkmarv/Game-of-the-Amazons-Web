import {Component} from "react";

type Props = PlayerType

type State = {
    ableToMove: boolean
    turnHistory: TurnType[]
}

/**
 * Represents a Player. Allows to be AI controlled.
 */
export class Player extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            ableToMove: false,
            turnHistory: []
        }
    }

    render() {
        return (
            <div className={"player-info-" + this.props.id} id={"player" + this.props.id}>
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