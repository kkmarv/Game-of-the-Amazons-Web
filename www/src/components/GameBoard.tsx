import React, {Component} from "react";
import {GameBoardRow} from "./GameBoardRow";


type Props = {
    board: {
        rows: number,
        columns: number,
        tiles: number[][]
    }
}


/**
 * Represents the board players move their pieces on.
 */
export class GameBoard extends Component<Props, any> {
    render() {
        return (
            <div className={"board"}>
                {this.renderGameBoard()}
            </div>
        );
    }

    handleClick = () => {
        // TODO
    }

    renderGameBoard() {
        let rowId: number = this.props.board.rows;
        return this.props.board.tiles.map((row) => {
            return (
                <div className={"row " + rowId}>
                    <GameBoardRow id={rowId--} row={row} onTileClick={this.handleClick}/><br/>
                </div>
            )
        });
    }
}