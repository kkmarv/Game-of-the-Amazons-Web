import React, {Component} from "react";
import {Tile} from "./Tile";
import {TileType} from "./TileType";

type Props = {
    initialBoard: {
        gameSizeRows: number,
        gameSizeColumns: number,
        tiles: number[][]
    }
}

/**
 * Represents the board, players are able to move their pieces on. Saves references to each tile.
 */
export class Board extends Component<Props, any> {
    private readonly tiles: Tile[][] = [];
    private lastClickedTile: Tile | null = null

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
        return this.props.initialBoard.tiles.map((row, rowIndex) => {
            const tileRow: Tile[] = []
            rowIndex = this.props.initialBoard.gameSizeRows - rowIndex - 1
            return (
                <div className={"row"} id={"row" + rowIndex} key={"row" + rowIndex}
                     ref={() => {
                         this.tiles.push(tileRow)
                     }}>
                    {row.map((tileType, tileIndex) => {
                        return (
                            <Tile
                                id={rowIndex * 10 + tileIndex} // calculate the correct id from row and tiles' position in row
                                key={rowIndex * 10 + tileIndex}
                                tileType={tileType}
                                onClick={this.handleClick}
                                ref={(gameBoardTile: Tile) => { // add references of created tiles to this classes' tiles array
                                    tileRow.push(gameBoardTile) // (evtl nullcheck wieder adden)
                                }}
                            />)
                    })}
                </div>
            )
        })
    }

    handleClick = (clickedTile: Tile) => {
        if (clickedTile.state.tileType === TileType.PLAYER) {
            if (!clickedTile.state.selected) this.showPossibleMovesFor(clickedTile)
            else this.hidePossibleMoves()
            clickedTile.setState({selected: !clickedTile.state.selected})

        } else {
            if (clickedTile.state.highlighted) this.moveAmazonTo(clickedTile)
            else this.hidePossibleMoves()
        }
        this.lastClickedTile = clickedTile
    }


    showPossibleMovesFor(clickedTile: Tile) {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                tile.setState({
                    highlighted: false,
                    disabled: true,
                    selected: false,
                })
            })
        })
        const tileIndex = this.getIndexOfTile(clickedTile)
        if (tileIndex !== null) this.enableAllTheseTiles(this.getPossibleMovesFor(clickedTile))
    }

    hidePossibleMoves() {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if (tile.state.tileType === TileType.PLAYER) {
                    tile.setState({
                        highlighted: false,
                        disabled: false,
                        selected: false,
                    })
                } else {
                    tile.setState({
                        highlighted: false,
                        disabled: true,
                        selected: false,
                    })
                }
            })
        })
    }

    moveAmazonTo(clickedTile: Tile) {
        this.hidePossibleMoves()
        clickedTile.setState({
            tileType: TileType.PLAYER,
            highlighted: false,
            disabled: false,
            selected: false,
        })
        this.lastClickedTile!.setState({
            tileType: TileType.EMPTY,
            highlighted: false,
            disabled: true,
            selected: false,
        })
    }


    enableAllTheseTiles(selectedTiles: Tile[]) {
        selectedTiles.forEach((tile) => {
            tile.setState({
                highlighted: true,
                disabled: false,
                selected: false,
            })
        })
    }


    getPossibleMovesFor(clickedTile: Tile): Tile[] {
        const tileIndex: number[] = this.getIndexOfTile(clickedTile)
        const possibleMoves: Tile[] = [this.tiles[tileIndex[0]][tileIndex[1]]] // start with clickedTile as a first possible mve

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


    getIndexOfTile(tile: Tile): number[] {
        for (let rowIndex = 0; rowIndex < this.tiles.length; rowIndex++) {
            const colIndex = this.tiles[rowIndex].indexOf(tile)
            if (colIndex > -1) return [rowIndex, colIndex]
        }
        return [-1, -1] // means that tile was not found
    }


    getPossibleMovesToTop(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex >= 0 && !moveBlocked; rowIndex--) {
            const possibleTile: Tile = this.tiles[rowIndex][colStart]
            if (possibleTile.state.tileType === TileType.EMPTY) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToBottom(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex < this.tiles.length && !moveBlocked; rowIndex++) {
            const possibleTile: Tile = this.tiles[rowIndex][colStart]
            if (possibleTile.state.tileType === TileType.EMPTY) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToRight(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.tiles.length && !moveBlocked; colIndex++) {
            const possibleTile: Tile = this.tiles[rowStart][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToLeft(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked; colIndex--) {
            const possibleTile: Tile = this.tiles[rowStart][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }


    getPossibleMovesToTopLeft(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart >= 0; colIndex--) {
            const possibleTile: Tile = this.tiles[rowStart--][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToTopRight(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.tiles[0].length && !moveBlocked && rowStart >= 0; colIndex++) {
            const possibleTile: Tile = this.tiles[rowStart--][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomLeft(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart < this.tiles.length; colIndex--) {
            const possibleTile: Tile = this.tiles[rowStart++][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomRight(rowStart: number, colStart: number, moves: Tile[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.tiles[0].length && !moveBlocked && rowStart < this.tiles.length; colIndex++) {
            const possibleTile: Tile = this.tiles[rowStart++][colIndex]
            if (possibleTile.state.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }
}