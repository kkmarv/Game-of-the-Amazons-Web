// Type definitions for all components

declare global {
    /* Ein Spiel Objekt, wie es die API erwartet */
    type game = {
        gameId: number
        maxTurnTime: number // in milliseconds
        players: player[] // IDs only
        winningPlayer?: number // only when game is over
        initialBoard: board // only when game is running?
    }

    /* Ein Board Objekt, wie es die API erwartet */
    type board = {
        gameSizeRows: number // Boards' rows
        gameSizeColumns: number // Boards' columns
        squares: number[][]
    }

    /*  */
    type player = {
        playerId: number
        name: string
        controllable: boolean
    }

    /* Ein Turn Objekt, wie es die API erwartet */
    type turn = {
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
}

export {}
