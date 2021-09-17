import {Component} from "react";
import {TileEnum} from "./gameBoardTypes";


type Props = {
    id: string
    color: string
    onClick: () => void
    tileType: TileEnum
    disabled: boolean
}

/**
 * Represents a single tile
 */
export class GameBoardButton extends Component<Props, any> {
    render() {
        return (
            <button
                id={this.props.id}
                className={"tile " + this.props.color}
                value={this.props.tileType}
                disabled={this.props.disabled}
                onClick={() => {
                    this.props.onClick()
                }}>
            </button>
        );
    }
}