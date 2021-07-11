import {Component} from "react";
import {TileType} from "./TileType";


type Props = {
    id: string
    color: string
    onClick: () => void
    tileType: TileType
    disabled: boolean
    selected: boolean
    possibleMove: boolean
}

/**
 * Represents a single tile
 */
export class Tile extends Component<Props, any> {
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