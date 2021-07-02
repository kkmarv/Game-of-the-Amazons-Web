import {Component} from "react";
import {TileType} from "./TileType";

type Props = {
    id: number
    tileType: number
    onClick: any
    columnName: string
}

type State = {
    color: string
    disabled: boolean
    selected: boolean
    highlighted: boolean
    tileType: TileType
}


/**
 * Represents a single tile of a GameBoardRow
 */
export class GameBoardTile extends Component<Props, State> {
    private readonly id: string;

    constructor(props: Props) {
        super(props);
        this.id = "row" + this.props.id + "col" + this.props.columnName
        this.state = {
            color: props.id % 2 === 0 ? "white" : "black",
            tileType: props.tileType,
            selected: false,
            highlighted: false,
            disabled: props.tileType !== TileType.Player0
        }
    }

    render() {
        let className: string = "col-" + this.props.columnName
        if (this.state.selected) className += " selected"
        return (
            <button
                className={className}
                disabled={this.state.disabled}
                value={this.props.tileType}
                color={this.state.color}
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