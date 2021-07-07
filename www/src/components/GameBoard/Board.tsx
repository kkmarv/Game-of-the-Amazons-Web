import React, {Component} from "react";
import {Tile} from "./Tile";
import {TileType} from "./TileType";

type Props = {
    onTurn: any
    initialBoard: BoardType
}

type State = {
    phase: string
    lastClick?: Coordinates
    clickBeforeLastClick?: Coordinates
    tiles: TileProps[][]
}

/**
 * Represents the board, players are able to move their pieces on. Saves references to each tile.
 */
export class Board extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            phase: "select",
            tiles: props.initialBoard.tiles.map((row) => {
                return row.map((value) => {
                    return {
                        tileType: value,
                        disabled: value !== TileType.PLAYER,
                        selected: false,
                        possibleMove: false
                    }
                })
            })
        }
    }

    render() {
        return (
            <div className={"board"}>
                {this.state.tiles.map((row, rowIndex) => {
                    const inverseRowIndex = this.props.initialBoard.gameSizeRows - rowIndex - 1
                    return (
                        <div className={"row"} id={"row" + inverseRowIndex} key={"row" + inverseRowIndex}>
                            {row.map((tileProps, colIndex) => {
                                return (
                                    <Tile
                                        id={inverseRowIndex * 10 + colIndex} // calculate the correct id from row and tiles' position in row
                                        key={inverseRowIndex * 10 + colIndex}
                                        onClick={() => this.handleClick({rowIndex: rowIndex, colIndex: colIndex})}
                                        tileProps={tileProps}
                                    />)
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }

    handleClick = async (currentCoords: Coordinates) => { // TODO parameter zum koordinaten typ machen
        const clickedTileProps: TileProps = this.state.tiles[currentCoords.rowIndex][currentCoords.colIndex]
        const clickBeforeLastClick = this.state.clickBeforeLastClick
        const lastClick = this.state.lastClick

        if (clickedTileProps.tileType === TileType.PLAYER) { // TODO auslagern
            if (this.state.phase === "select") {
                if (!clickedTileProps.possibleMove) {
                    this.showPossibleMovesForTileAt(currentCoords)
                    this.setState({phase: "move"})
                } else this.hidePossibleMoves()

            } else if (this.state.phase === "move") {
                this.hidePossibleMoves()
                this.setState({phase: "select"})

            } else if (this.state.phase === "shoot") {
                this.hidePossibleMoves()
                await this.moveAmazonFromTo(currentCoords, clickBeforeLastClick!)
                this.showPossibleMovesForTileAt(clickBeforeLastClick!)
                this.setState({phase: "move"})
            }

        } else if (clickedTileProps.tileType === TileType.EMPTY) {
            if (clickedTileProps.possibleMove) {
                if (this.state.phase === "move") {
                    await this.moveAmazonFromTo(lastClick!, currentCoords)
                    this.showPossibleMovesForTileAt(currentCoords)
                    this.setState({phase: "shoot"})

                } else if (this.state.phase === "shoot") {
                    await this.shootArrowAt(currentCoords)
                    this.hidePossibleMoves()
                    this.setState({phase: "select"})
                    this.endTurnWith(clickBeforeLastClick!, lastClick!, currentCoords)
                }
            }
        } else this.hidePossibleMoves()

        this.updateLastClickWith(currentCoords)
    }


    /* Enable alle von den gegebenen Koordinaten erreichbaren Buttons */
    showPossibleMovesForTileAt(currentCoords: Coordinates): void {
        console.log(`showing moves for ${currentCoords.rowIndex} and ${currentCoords.colIndex}`)
        const possibleMoves: TileProps[] = this.getPossibleMovesForTileAt(currentCoords)
        this.setState({
            tiles: this.state.tiles.map((row) => {
                return row.map((tileProps) => {
                    const isPossibleMove = possibleMoves.indexOf(tileProps) > -1
                    return {
                        tileType: tileProps.tileType,
                        disabled: !isPossibleMove,
                        selected: false,
                        possibleMove: isPossibleMove
                    }
                })
            })
        })
    }

    /* Disable alle angezeigten Buttons außer die der Player */
    hidePossibleMoves(): void {
        console.log("hiding moves!")
        this.setState({
            tiles: this.state.tiles.map((row) => {
                return row.map((tileProps) => {
                    return {
                        tileType: tileProps.tileType,
                        disabled: tileProps.tileType !== TileType.PLAYER,
                        selected: false,
                        possibleMove: false
                    }
                })
            })
        })
    }


    /* Setzt Zielkoordinaten auf Player und Startkoordinaten auf Empty.
       Ist Async damit es nicht mit den anderen setStates kollidiert. */
    async moveAmazonFromTo(lastCoords: Coordinates, currentCoords: Coordinates): Promise<void> {
        this.setState({
            tiles: this.state.tiles.map((row, rowIndex) => {
                return row.map((tileProps, colIndex) => {
                    if (rowIndex === lastCoords.rowIndex && colIndex === lastCoords.colIndex) return {
                        tileType: TileType.EMPTY,
                        disabled: true,
                        selected: false,
                        possibleMove: false
                    }; else if (rowIndex === currentCoords.rowIndex && colIndex === currentCoords.colIndex) return {
                        tileType: TileType.PLAYER,
                        disabled: false,
                        selected: false,
                        possibleMove: false
                    }; else return tileProps
                })
            })
        })
    }

    /* Setzt Zielkoordinaten auf Arrow.
       Ist Async damit es nicht mit den anderen setStates kollidiert. */
    async shootArrowAt(coordinates: Coordinates): Promise<void> {
        this.setState({
            tiles: this.state.tiles.map((row, rowIndex) => {
                return row.map((tileProps, colIndex) => {
                    const isArrowTile: boolean = rowIndex === coordinates.rowIndex && colIndex === coordinates.colIndex
                    return {
                        tileType: isArrowTile ? TileType.ARROW : tileProps.tileType,
                        disabled: isArrowTile ? true : tileProps.disabled,
                        selected: false,
                        possibleMove: false
                    }
                })
            })
        })
    }


    /* Updated den letzten Click mit neuen Koordinaten */
    updateLastClickWith(coordinates: Coordinates): void {
        if (!this.state.lastClick || (!(coordinates.rowIndex === this.state.lastClick.rowIndex && coordinates.colIndex === this.state.lastClick.colIndex))) {
            // wenn der letzte Zug undefined ist oder der letzte Zug nicht dem jetzigen Zug entspricht
            this.setState({
                lastClick: coordinates,
                clickBeforeLastClick: this.state.lastClick
            })
        } else if (this.state.clickBeforeLastClick) {
            // wenn der vorletzte Zug defined ist, tausche letzten und vorletzten Click
            this.setState({
                lastClick: this.state.clickBeforeLastClick,
                clickBeforeLastClick: this.state.lastClick
            })
        }
    }

    endTurnWith(moveStartCoords: Coordinates, moveEndCoords: Coordinates, shotCoords: Coordinates): void {
        // TODO
        this.props.onTurn({
            move: {
                start: moveStartCoords,
                end: moveEndCoords
            },
            shot: shotCoords
        })
    }


    // TODO FRAGE ob besser geht als 8 for loops
    /* Finde alle möglichen Koordinaten, zu denen man von der gegebenen Koordinate ziehen kann */
    getPossibleMovesForTileAt(coordinates: Coordinates): TileProps[] {
        const rowIndex: number = coordinates.rowIndex
        const colIndex: number = coordinates.colIndex
        const possibleMoves: TileProps[] = [this.state.tiles[rowIndex][colIndex]] // start with clickedTile as a first possible mve

        this.getPossibleMovesToTop(rowIndex - 1, colIndex, possibleMoves)
        this.getPossibleMovesToBottom(rowIndex + 1, colIndex, possibleMoves)
        this.getPossibleMovesToRight(rowIndex, colIndex + 1, possibleMoves)
        this.getPossibleMovesToLeft(rowIndex, colIndex - 1, possibleMoves)
        this.getPossibleMovesToTopLeft(rowIndex - 1, colIndex - 1, possibleMoves)
        this.getPossibleMovesToBottomLeft(rowIndex + 1, colIndex - 1, possibleMoves)
        this.getPossibleMovesToTopRight(rowIndex - 1, colIndex + 1, possibleMoves)
        this.getPossibleMovesToBottomRight(rowIndex + 1, colIndex + 1, possibleMoves)

        return possibleMoves
    }

    getPossibleMovesToTop(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex >= 0 && !moveBlocked; rowIndex--) {
            const possibleTile: TileProps = this.state.tiles[rowIndex][colStart]
            if (possibleTile.tileType === TileType.EMPTY) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToBottom(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let rowIndex = rowStart; rowIndex < this.state.tiles.length && !moveBlocked; rowIndex++) {
            const possibleTile: TileProps = this.state.tiles[rowIndex][colStart]
            if (possibleTile.tileType === TileType.EMPTY) moves.push(possibleTile)
            else moveBlocked = true
        }
    }

    getPossibleMovesToRight(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.state.tiles.length && !moveBlocked; colIndex++) {
            const possibleTile: TileProps = this.state.tiles[rowStart][colIndex]
            if (possibleTile.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToLeft(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked; colIndex--) {
            const possibleTile: TileProps = this.state.tiles[rowStart][colIndex]
            if (possibleTile.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }


    getPossibleMovesToTopLeft(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart >= 0; colIndex--) {
            const possibleTile: TileProps = this.state.tiles[rowStart--][colIndex]
            if (possibleTile.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToTopRight(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.state.tiles[0].length && !moveBlocked && rowStart >= 0; colIndex++) {
            const possibleTile: TileProps = this.state.tiles[rowStart--][colIndex]
            if (possibleTile.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomLeft(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex >= 0 && !moveBlocked && rowStart < this.state.tiles.length; colIndex--) {
            const possibleTile: TileProps = this.state.tiles[rowStart++][colIndex]
            if (possibleTile.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }

    getPossibleMovesToBottomRight(rowStart: number, colStart: number, moves: TileProps[], moveBlocked = false) {
        for (let colIndex = colStart; colIndex < this.state.tiles[0].length && !moveBlocked && rowStart < this.state.tiles.length; colIndex++) {
            const possibleTile: TileProps = this.state.tiles[rowStart++][colIndex]
            if (possibleTile.tileType === TileType.EMPTY) {
                moves.push(possibleTile)
            } else moveBlocked = true
        }
    }
}