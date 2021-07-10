import {Component} from "react";
import {TileType} from "./TileType";


type Props = {
    id: number
    onClick: any
    color: string
    tileType: TileType
    disabled: boolean
    selected: boolean
    possibleMove: boolean
}

type State = {
    tileType: TileType
    disabled: boolean
    selected: boolean
    possibleMove: boolean
}

/**
 * Represents a single tile
 */
export class Tile extends Component<Props, State> {
    render() {
        return (
            <button
                id={"tile" + this.props.id}
                key={"tile" + this.props.id}
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