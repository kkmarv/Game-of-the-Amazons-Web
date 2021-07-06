import {Component} from "react";
import {TileType} from "./TileType";

type Props = {
    id: number
    onClick: any
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
    private readonly className: string // TODO FRAGE ob klassenvar sonnvoll

    constructor(props: Props) {
        super(props);
        const color: string = this.props.id % 2 === 0 ? "white" : "black"
        this.className = "tile " + color
        if (this.props.selected) this.className += " selected"
        if (this.props.possibleMove) this.className += " possibleMove"
    }

    render() {
        return (
            <button
                id={"tile" + this.props.id}
                key={"tile" + this.props.id}
                className={this.className}
                value={this.props.tileType}
                disabled={this.props.disabled}
                onClick={() => {
                    this.props.onClick()
                }}>
                {TileType[this.props.tileType]}
            </button>
        );
    }
}