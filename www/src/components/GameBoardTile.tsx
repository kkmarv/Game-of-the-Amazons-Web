import {Component} from "react";
import {TileType} from "./TileType";

type Props = {
    id: number
    tileType: number
    onClick: any
    columnName: string
}

type State = {
    disabled: boolean
    selected: boolean
    possibleToMoveTo: boolean
    tileType: TileType
}


/**
 * Represents a single tile of a GameBoardRow
 */
export class GameBoardTile extends Component<Props, State> {
    private readonly id: string;
    private readonly color: string

    constructor(props: Props) {
        super(props);
        this.id = "row" + this.props.id + "col" + this.props.columnName
        this.color = props.id % 2 === 0 ? "white" : "black"
        this.state = {
            tileType: props.tileType,
            selected: false,
            possibleToMoveTo: false,
            disabled: props.tileType !== TileType.PLAYER
        }
    }

    render() {
        let className: string = "col-" + this.props.columnName
        if (this.state.selected) className += " selected"
        if (this.state.possibleToMoveTo) className += " highlighted"
        return (
            <button
                className={className}
                disabled={this.state.disabled}
                value={this.props.tileType}
                color={this.color}
                key={this.id}
                id={this.id}
                onClick={() => {
                    this.props.onClick(this)
                }}>
                {TileType[this.state.tileType]}
            </button>
        );
    }
}