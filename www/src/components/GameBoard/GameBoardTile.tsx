import {Component} from "react";
import {TileType} from "./TileType";

type Props = {
    id: number
    tileType: number
    onClick: any
}

type State = {
    color: string
    tileType: TileType
    disabled: boolean
    selected: boolean
    highlighted: boolean
}


/**
 * Represents a single tile of a GameBoardRow
 */
export class GameBoardTile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            color: props.id % 2 === 0 ? "white" : "black",
            tileType: props.tileType,
            disabled: props.tileType !== TileType.PLAYER,
            selected: false,
            highlighted: false,
        }
    }

    render() {
        let className: string = "tile " + this.state.color
        if (this.state.selected) className += " selected"
        if (this.state.highlighted) className += " highlighted"
        return (
            <button
                className={className}
                disabled={this.state.disabled}
                value={this.state.tileType}
                id={"tile" + this.props.id}
                key={"tile" + this.props.id}
                onClick={() => {
                    this.props.onClick(this)
                }}>
                {TileType[this.state.tileType]}
            </button>
        );
    }
}