import {Component} from "react";

type Props = {
    id: number
    controllable: boolean
}

type State = {
    isOnTurn: boolean
    ableToMove: boolean
}

/**
 * Represents a Player. Allows to be AI controlled.
 */
export class Player extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOnTurn: false,
            ableToMove: false
        }
    }

    render() {
        return undefined;
    }
}