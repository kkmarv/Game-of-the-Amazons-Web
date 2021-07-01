import {Component} from "react";
import {GameBoardTile} from "./GameBoardTile";

type Props = {
    id: number,
    row: number[]
    onTileClick: any
}


/**
 * Represents a single row of a GameBoard
 */
export class GameBoardRow extends Component<Props, any> {
    render() {
        return this.renderRow()
    }

    getCharacter(tileCount: number) {
        return String.fromCharCode(tileCount + 65)
    }

    renderRow() {
        let tileCount = 0;
        return this.props.row.map((cell) => {
            return (
                <GameBoardTile
                    columnName={this.getCharacter(tileCount)}
                    id={this.props.id + tileCount++}
                    onClick={this.props.onTileClick}
                    value={cell}
                />
            )
        });
    }
}