// Type definitions for components
// Project: The Game of the Amazons
// Definitions by: Marvin Kästing

declare global {
    type PlayerType = {
        id: number
        name: string
        controllable: boolean
    }

    type TurnType = {
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

    type BoardType = {
        gameSizeRows: number // Boards' rows
        gameSizeColumns: number // Boards' columns
        tiles: number[][]
    }

    type GameType = {
        gameId: number
        maxTurnTime: number // in milliseconds
        players: number[] // IDs only
        initialBoard: BoardType
    }
}

export {}
