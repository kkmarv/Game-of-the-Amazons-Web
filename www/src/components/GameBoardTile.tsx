import {Component} from "react";


type Props = {
    id: number,
    value: number,
    onClick: any,
    columnName: string
}

type State = {
    color: string
}


/**
 * Represents a single tile of a GameBoardRow
 */
export class GameBoardTile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            color: props.id % 2 == 0 ? "white" : "black"
        }
    }

    render() {
        return (
            <button
                className={"col " + this.props.columnName}
                onClick={this.props.onClick}
                value={this.props.value}
                color={this.state.color}>
                {this.props.value}
            </button>
        );
    }
}