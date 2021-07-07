import React, {Component} from "react";
import {Tile} from "./Tile";
import {TileType} from "./TileType";
import {createDeflateRaw} from "zlib";

// TODO FRAGE wie deklariert man ein globales enum?

type Props = {
    onTurnEnd: any
    isLocalPlayer: boolean
    initialBoard: BoardProps
}

type State = {
    phase: string
    lastClickCoords?: Coordinates
    clickBeforeLastClickCoords?: Coordinates
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
                        disabled: !props.isLocalPlayer || (props.isLocalPlayer && value !== TileType.PLAYER),
                        selected: false,
                        possibleMove: false
                    }
                })
            })
        }
    }

    /* Wenn das Spielbrett aktualisiert werden soll: */
    async componentWillReceiveProps(props: Readonly<Props>) {
        if (!props.isLocalPlayer && this.state.phase !== "select") { // Und der nächste Spieler nicht lokal ist,
            if (this.state.phase === "shoot") { // dann brich seinen Schuss und Amazonen-Zug ab
                await this.cancelShot(this.state.lastClickCoords!)
                await this.cancelMove()
            }
            if (this.state.phase === "move") await this.cancelMove()  // dann brich seinen Amazonen-Zug ab
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
                                        tileType={tileProps.tileType}
                                        disabled={this.props.isLocalPlayer ? tileProps.disabled : true}
                                        selected={tileProps.selected}
                                        possibleMove={tileProps.possibleMove}
                                    />)
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }

    handleClick = async (currentCoords: Coordinates) => {
        const clickedTileProps: TileProps = this.state.tiles[currentCoords.rowIndex][currentCoords.colIndex]
        const clickBeforeLastClickCoords = this.state.clickBeforeLastClickCoords
        const lastClickCoords = this.state.lastClickCoords

        if (clickedTileProps.tileType === TileType.PLAYER) { // TODO in funktionen auslagern
            if (this.state.phase === "select") {
                if (!clickedTileProps.possibleMove) {
                    await this.showPossibleMovesForTileAt(currentCoords)
                    this.setState({phase: "move"})
                } else await this.hidePossibleMoves()

            } else if (this.state.phase === "move") {
                await this.cancelMove()

            } else if (this.state.phase === "shoot") {
                await this.cancelShot(lastClickCoords!)
            }

        } else if (clickedTileProps.tileType === TileType.EMPTY) {
            if (clickedTileProps.possibleMove) {
                if (this.state.phase === "move") {
                    await this.moveAmazonFromTo(lastClickCoords!, currentCoords)
                    await this.showPossibleMovesForTileAt(currentCoords)
                    this.setState({phase: "shoot"})

                } else if (this.state.phase === "shoot") {
                    await this.shootArrowAt(currentCoords)
                    await this.hidePossibleMoves()
                    this.endTurnWith(clickBeforeLastClickCoords!, lastClickCoords!, currentCoords)
                    this.setState({phase: "select"})
                }
            }
        } else await this.hidePossibleMoves()

        this.updateLastClickWith(currentCoords)
    }

    async cancelShot(currentCoords: Coordinates) {
        await this.hidePossibleMoves()
        await this.moveAmazonFromTo(currentCoords, this.state.clickBeforeLastClickCoords!)
        await this.showPossibleMovesForTileAt(this.state.clickBeforeLastClickCoords!)
        this.setState({phase: "move"})
    }

    async cancelMove() {
        await this.hidePossibleMoves()
        this.setState({phase: "select"})
    }


    /* Enable alle von den gegebenen Koordinaten erreichbaren Buttons */
    async showPossibleMovesForTileAt(currentCoords: Coordinates): Promise<void> {
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
    async hidePossibleMoves(): Promise<void> {
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

    /* Setzt Arrow auf Zielkoordinaten.
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
        if (!this.state.lastClickCoords || (!(coordinates.rowIndex === this.state.lastClickCoords.rowIndex && coordinates.colIndex === this.state.lastClickCoords.colIndex))) {
            // wenn der letzte Zug undefined ist oder der letzte Zug nicht dem jetzigen Zug entspricht
            this.setState({
                lastClickCoords: coordinates,
                clickBeforeLastClickCoords: this.state.lastClickCoords
            })
        } else if (this.state.clickBeforeLastClickCoords) {
            // wenn der vorletzte Zug defined ist, tausche letzten und vorletzten Click
            this.setState({
                lastClickCoords: this.state.clickBeforeLastClickCoords,
                clickBeforeLastClickCoords: this.state.lastClickCoords
            })
        }
    }

    endTurn(): void {
        // TODO call this when player changes through game control
        this.props.onTurnEnd()
    }

    endTurnWith(moveStartCoords: Coordinates, moveEndCoords: Coordinates, shotCoords: Coordinates): void {
        this.props.onTurnEnd({
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