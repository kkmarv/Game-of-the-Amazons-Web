// Type definitions for all components

declare global {
    /*  */
    type PlayerProps = {
        id: number
        name: string
        controllable: boolean
    }

    /* Ein Turn Objekt, wie es die API erwartet */
    type TurnProps = {
        move: {
            start: {
                row: number
                column: number
            }
            end: {
                row: number
                column: number
            }
        }
        shot: {
            row: number
            column: number
        }
    }

    /* Ein Board Objekt, wie es die API erwartet */
    type BoardProps = {
        gameSizeRows: number // Boards' rows
        gameSizeColumns: number // Boards' columns
        tiles: number[][]
    }

    /* Ein Spiel Objekt, wie es die API erwartet */
    type GameProps = {
        gameId: number
        maxTurnTime: number // in milliseconds
        players: number[] // IDs only
        initialBoard: BoardProps
    }
}

export {}
