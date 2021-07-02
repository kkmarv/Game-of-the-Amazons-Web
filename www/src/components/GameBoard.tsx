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
    private lastClickedTile: GameBoardTile | null = null

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
        if (clickedTile.state.tileType === TileType.PLAYER) {
            if (!clickedTile.state.selected) this.showPossibleMovesFor(clickedTile)
            else this.hidePossibleMoves()
            clickedTile.setState({selected: !clickedTile.state.selected})

        } else {
            if (clickedTile.state.possibleToMoveTo) this.moveAmazonTo(clickedTile)
            else this.hidePossibleMoves()
        }
        this.lastClickedTile = clickedTile
    }


    showPossibleMovesFor(clickedTile: GameBoardTile) {
        this.rows.forEach((row) => {
            row.forEach((tile) => {
                tile.setState({
                    possibleToMoveTo: false,
                    disabled: true,
                    selected: false,
                })
            })
        })
        const tileIndex = this.getIndexOfTile(clickedTile)
        if (tileIndex !== null) this.enableAllTheseTiles(this.getPossibleMovesFor(clickedTile))
    }

    hidePossibleMoves() {
        this.rows.forEach((row) => {
            row.forEach((tile) => {
                if (tile.state.tileType === TileType.PLAYER) {
                    tile.setState({
                        possibleToMoveTo: false,
                        disabled: false,
                        selected: false,
                    })
                } else {
                    tile.setState({
                        possibleToMoveTo: false,
                        disabled: true,
                        selected: false,
                    })
                }
            })
        })
    }

    moveAmazonTo(clickedTile: GameBoardTile) {
        this.hidePossibleMoves()
        clickedTile.setState({
            tileType: TileType.PLAYER,
            possibleToMoveTo: false,
            disabled: false,
            selected: false,
        })
        this.lastClickedTile!.setState({
            tileType: TileType.EMPTY,
            possibleToMoveTo: false,
            disabled: true,
            selected: false,
        })
    }


    enableAllTheseTiles(selectedTiles: GameBoardTile[]) {
        selectedTiles.forEach((tile) => {
            tile.setState({
                possibleToMoveTo: true,
                disabled: false,
                selected: false,
            })
        })
    }


    getPossibleMovesFor(clickedTile: GameBoardTile): GameBoardTile[] {
        const tileIndex: number[] = this.getIndexOfTile(clickedTile)
        const possibleMoves: GameBoardTile[] = [this.rows[tileIndex[0]][tileIndex[1]]] // start with clickedTile as a first possible mve

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


    getIndexOfTile(tile: GameBoardTile): number[] {
        for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
            const colIndex = this.rows[rowIndex].indexOf(tile)
            if (colIndex > -1) return [rowIndex, colIndex]
        }
        return [-1, -1] // means that tile was not found
    }


    getPossibleMovesToTop(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex >= 0 && !moveBlocked; rowIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowIndex][colStart]
            if (possibleTile.state.tileType === TileType.EMPTY) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToBottom(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex < this.rows.length && !moveBlocked; rowIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowIndex][colStart]
            if (possibleTile.state.tileType === TileType.EMPTY) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToRight(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.rows.length && !moveBlocked; colIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowStart][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToLeft(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked; colIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowStart][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }


    getPossibleMovesToTopLeft(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart >= 0; colIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowStart--][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToTopRight(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.rows[0].length && !moveBlocked && rowStart >= 0; colIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowStart--][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomLeft(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart < this.rows.length; colIndex--) {
            const possibleTile: GameBoardTile = this.rows[rowStart++][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomRight(rowStart: number, colStart: number, moves: GameBoardTile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.rows[0].length && !moveBlocked && rowStart < this.rows.length; colIndex++) {
            const possibleTile: GameBoardTile = this.rows[rowStart++][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }
}