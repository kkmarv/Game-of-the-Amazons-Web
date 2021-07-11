import React, {Component} from "react";
import {Tile} from "./Tile";
import {TileType} from "./TileType";

type Props = {
    onTurnEnd: any
    isLocalPlayer: boolean
    initialBoard: board
}

type State = {
    phase: string
    lastClickCoords?: Coordinates
    clickBeforeLastClickCoords?: Coordinates
    tiles: TileProps[][]
}

/* Represents the local board, controllable players are able to move their pieces on.
   Ensures that a controllable player can only do legal moves. */
export class Board extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        console.log("board arriving in board component:")
        console.log(this.props.initialBoard)

        this.state = {
            phase: props.isLocalPlayer ? "select" : "wait",
            tiles: this.props.initialBoard.squares.map((row) => {
                return row.map((value) => {
                    return {
                        tileType: value,
                        disabled: !this.props.isLocalPlayer || (this.props.isLocalPlayer && value !== TileType.PLAYER),
                        selected: false, // TODO remove because obsolete
                        possibleMove: false // TODO remove because obsolete
                    }
                })
            })
        }
    }

    /* Wenn neue Props übergeben wurden. */ // TODO manchmal wird das Board nicht aktualisiert wenn ein lokaler Spieler einen Zug gemacht hat
    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        // Ist eigentlich unnötig, da das Spiel sowieso beendet wird, wenn kein Zug gemacht wurde
        if (prevProps.isLocalPlayer && (prevProps.isLocalPlayer !== this.props.isLocalPlayer)) { // Wenn der Zug durch Spielerwechsel unterbrochen wird,
            if (this.state.phase === "shoot") { // und sich der alte Spieler in der Schuss-Phase befand
                await this.cancelShot(this.state.lastClickCoords!)
                await this.cancelMove()
            } else if (this.state.phase === "move") await this.cancelMove()  // oder sich in der Bewegen-Phase befand
            this.setState({lastClickCoords: undefined, clickBeforeLastClickCoords: undefined})
        }

        if (this.state.phase === "wait") { // Aktualisiere die state-Tiles nur falls jemand anderes dran ist.
            if (prevProps.initialBoard !== this.props.initialBoard) {
                this.setState({
                    phase: this.props.isLocalPlayer ? "select" : "wait",
                    tiles: this.props.initialBoard.squares.map((row) => {
                        return row.map((value) => {
                            return {
                                tileType: value,
                                disabled: !this.props.isLocalPlayer || (this.props.isLocalPlayer && value !== TileType.PLAYER),
                                selected: false,
                                possibleMove: false
                            }
                        })
                    })
                })
            }
        }
    }

    render() {
        return (
            <div className={"board"}>
                {this.state.tiles.map((row, rowIndex) => {
                    const inverseRowIndex = this.props.initialBoard.gameSizeRows - rowIndex - 1 // Spielbretter fangen mit (0,0) unten links an
                    return (
                        <div className={"row"} id={"row" + inverseRowIndex} key={"row" + inverseRowIndex}>
                            {row.map((tileProps, colIndex) => {
                                const tileId: number = inverseRowIndex * 10 + colIndex
                                return (
                                    <Tile
                                        id={"tile" + tileId} // calculate the correct id from row and tiles' position in row
                                        key={"tile" + tileId}
                                        color={rowIndex % 2 === colIndex % 2 ? "white" : "black"}
                                        onClick={() => this.handleClick({row: rowIndex, column: colIndex})}
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
        const lastClickCoords: Coordinates = this.state.lastClickCoords!
        const clickBeforeLastClickCoords: Coordinates = this.state.clickBeforeLastClickCoords!
        const clickedTileProps: TileProps = this.state.tiles[currentCoords.row][currentCoords.column]

        if (clickedTileProps.tileType === TileType.PLAYER) {
            if (this.state.phase === "select") {
                await this.showPossibleMovesForTileAt(currentCoords)
                this.setState({phase: "move"})

            } else if (this.state.phase === "move") await this.cancelMove()
            else if (this.state.phase === "shoot") await this.cancelShot(currentCoords)

        } else if (clickedTileProps.tileType === TileType.EMPTY) {
            if (this.state.phase === "move") {
                await this.moveAmazonFromTo(lastClickCoords, currentCoords)
                await this.showPossibleMovesForTileAt(currentCoords)
                this.setState({phase: "shoot"})

            } else if (this.state.phase === "shoot") {
                await this.shootArrowAt(currentCoords)
                await this.hidePossibleMoves()
                this.setState({phase: "wait"})
                this.endTurnWith(clickBeforeLastClickCoords, lastClickCoords, currentCoords)
            }
        }
        await this.updateLastClickWith(currentCoords)
    }


    /* Bricht die Bewegen-Phase ab. */
    async cancelMove() {
        await this.hidePossibleMoves()
        this.setState({phase: "select"})
    }

    /* Bricht die Schuss-Phase ab. */
    async cancelShot(currentCoords: Coordinates) {
        await this.hidePossibleMoves()
        await this.moveAmazonFromTo(currentCoords, this.state.clickBeforeLastClickCoords!)
        await this.showPossibleMovesForTileAt(this.state.clickBeforeLastClickCoords!)
        this.setState({phase: "move"})
    }


    /* Enable alle von den gegebenen Koordinaten erreichbaren Buttons */
    async showPossibleMovesForTileAt(currentCoords: Coordinates): Promise<void> {
        console.log(`showing moves for ${currentCoords.row} and ${currentCoords.column}`)
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

    /* Disable alle angezeigten Buttons außer die der PlayerStats */
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


    /* Setzt Zielkoordinaten auf PlayerStats und Startkoordinaten auf Empty.
       Ist Async damit es nicht mit den anderen setStates kollidiert. */
    async moveAmazonFromTo(fromCoords: Coordinates, toCoords: Coordinates): Promise<void> {
        this.setState({
            tiles: this.state.tiles.map((row, rowIndex) => {
                return row.map((tileProps, colIndex) => {
                    if (rowIndex === fromCoords.row && colIndex === fromCoords.column) return {
                        tileType: TileType.EMPTY,
                        disabled: true,
                        selected: false,
                        possibleMove: false
                    }; else if (rowIndex === toCoords.row && colIndex === toCoords.column) return {
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
                    const isArrowTile: boolean = (rowIndex === coordinates.row && colIndex === coordinates.column)
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


    /* Reicht den getätigten Zug an die GameControl weiter. */
    async endTurnWith(moveStartCoords: Coordinates, moveEndCoords: Coordinates, shotCoords: Coordinates): Promise<void> {
        await this.props.onTurnEnd({
            move: {start: moveStartCoords, end: moveEndCoords},
            shot: shotCoords
        })
    }


    /* Updated den letzten Click mit neuen Koordinaten */
    async updateLastClickWith(coordinates: Coordinates): Promise<void> {
        if (!this.state.lastClickCoords || (!(coordinates.row === this.state.lastClickCoords.row && coordinates.column === this.state.lastClickCoords.column))) {
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

    // TODO evtl ein enum für alle 8 richtungen verwenden
    // TODO FRAGE ob besser geht als 8 for loops | evtl eine Methode, die eine Richtung annimmt zB [-1,-1] und dann immer in diese weiter geht
    /* Finde alle möglichen Koordinaten, zu denen man von der gegebenen Koordinate ziehen kann */
    getPossibleMovesForTileAt(coordinates: Coordinates): TileProps[] {
        const rowIndex: number = coordinates.row
        const colIndex: number = coordinates.column
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