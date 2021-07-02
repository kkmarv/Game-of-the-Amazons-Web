import React, {Component} from "react";
import {GameBoardRow} from "./GameBoardRow";
import {GameBoardTile} from "./GameBoardTile";
import {TileType} from "./TileType";


type Props = {
    board: {
        rows: number,
        columns: number,
        tiles: number[][]
    }
}


/**
 * Represents the board on which players are able to move their pieces on. Saves references to each row.
 */
export class GameBoard extends Component<Props, any> {
    private rows: GameBoardTile[][] = [];

    constructor(props: Props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={"board"}>
                {this.renderGameBoard()}
            </div>
        );
    }

    renderGameBoard() {
        let rowId: number = this.props.board.rows;
        return this.props.board.tiles.map((row) => {
            const rowName: string = "row" + rowId
            return (
                <div className={rowName} key={rowName}>
                    <GameBoardRow
                        id={rowId--}
                        row={row}
                        onClick={this.handleClick}
                        ref={(gameBoardRow) => { // add references of created rows to this classes rows array
                            if (gameBoardRow !== null) this.rows.push(gameBoardRow.tiles)
                        }}
                    /><br/>
                </div>
            )
        });
    }

    handleClick = (clickedTile: GameBoardTile) => {
        if (clickedTile.state.tileType === TileType.Player0) {

            if (clickedTile.state.selected) {
                this.disableNonPlayableTiles()
                this.enablePlayableTiles()

            } else {
                this.disableAllTiles()
                const tileIndex = this.getIndexOfTile(clickedTile)
                if (tileIndex !== null) {
                    const possibleMoves: GameBoardTile[] = this.getPossibleMovesFromIndex(tileIndex)
                    this.enableAllTheseTiles(possibleMoves)
                }
            }
            clickedTile.setState({selected: !clickedTile.state.selected})
        }
    }

    getIndexOfTile(tile: GameBoardTile): number[] | null {
        for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
            const colIndex = this.rows[rowIndex].indexOf(tile)
            if (colIndex > -1) return [rowIndex, colIndex]
        }
        return null
    }


    enableAllTheseTiles(selectedTiles: GameBoardTile[]) {
        selectedTiles.forEach((tile) => {
            tile.setState({disabled: false})
        })
    }

    disableAllTiles() {
        this.rows.forEach((row) => {
            row.forEach((tile) => {
                tile.setState({disabled: true})
            })
        })
    }

    enablePlayableTiles() {
        this.rows.forEach((row) => {
            row.forEach((tile) => {
                if (tile.state.tileType === TileType.Player0) tile.setState({disabled: false})
            })
        })
    }

    disableNonPlayableTiles() {
        this.rows.forEach((row) => {
            row.forEach((tile) => {
                if (tile.state.tileType !== TileType.Player0) tile.setState({disabled: true})
            })
        })
    }


    getPossibleMovesFromIndex(tileIndex: number[]): GameBoardTile[] {
        const possibleMoves: GameBoardTile[] = []
        possibleMoves.push(this.rows[tileIndex[0]][tileIndex[1]]) // add selected tile to possibleMoves

        this.getPossibleMovesToTop(tileIndex[0] - 1, tileIndex[1], possibleMoves)
        this.getPossibleMovesToBottom(tileIndex[0] + 1, tileIndex[1], possibleMoves)
        this.getPossibleMovesToRight(tileIndex[0], tileIndex[1] + 1, possibleMoves)
        this.getPossibleMovesToLeft(tileIndex[0], tileIndex[1] - 1, possibleMoves)
        this.getPossibleMovesToTopLeft(tileIndex[0] - 1, tileIndex[1] - 1, possibleMoves)
        this.getPossibleMovesToBottomLeft(tileIndex[0] + 1, tileIndex[1] - 1, possibleMoves)
        this.getPossibleMovesToTopRight(tileIndex[0] - 1, tileIndex[1] + 1, possibleMoves)
        this.getPossibleMovesToBottomRight(tileIndex[0] + 1, tileIndex[1] + 1, possibleMoves)

        return possibleMoves
    }


    getPossibleMovesToTop(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex >= 0 && !moveBlocked; rowIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowIndex][colStart]
            if (possibleTile.state.tileType === TileType.Empty) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToBottom(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex < this.rows.length && !moveBlocked; rowIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowIndex][colStart]
            if (possibleTile.state.tileType === TileType.Empty) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToRight(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.rows.length && !moveBlocked; colIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowStart][colIndex]
            if (possibleTile.state.tileType === TileType.Empty) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToLeft(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked; colIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowStart][colIndex]
            if (possibleTile.state.tileType === TileType.Empty) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }


    getPossibleMovesToTopLeft(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart >= 0; colIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowStart--][colIndex]
            if (possibleTile.state.tileType === TileType.Empty) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToTopRight(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.rows[0].length && !moveBlocked && rowStart >= 0; colIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowStart--][colIndex]
            if (possibleTile.state.tileType === TileType.Empty) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomLeft(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart < this.rows.length; colIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowStart++][colIndex]
            if (possibleTile.state.tileType === TileType.Empty) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomRight(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.rows[0].length && !moveBlocked && rowStart < this.rows.length; colIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowStart++][colIndex]
            if (possibleTile.state.tileType === TileType.Empty) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }
}