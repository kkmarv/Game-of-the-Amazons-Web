// Type definitions for all components

declare global {
    /* Ein Spiel Objekt, wie es die API erwartet */
    type game = {
        gameId: number
        maxTurnTime: number // in milliseconds
        players: number[] // IDs only
        initialBoard: board
    }

    /* Ein Board Objekt, wie es die API erwartet */
    type board = {
        gameSizeRows: number // Boards' rows
        gameSizeColumns: number // Boards' columns
        squares: number[][]
    }

    /*  */
    type player = {
        id: number
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


    /* Response types */

    type multiPlayerResponse = { players: player[] }

    type singlePlayerResponse = {}

    type multiGameResponse = { games: game[] }

    type singleGameResponse = {}
}

export {}
