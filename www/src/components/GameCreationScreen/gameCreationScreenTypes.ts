import {Player} from "../../requests";


export interface Settings {
    opponent: Player
    maxTurnTime: number
    amazonCount: number
    boardSize: number
    tiles: number[][]
}

export const defaultSettings: Settings = {
    opponent: {name: "<select>", controllable: false, id: -1}, // this is a placeholder player
    maxTurnTime: 30000,
    amazonCount: 4,
    boardSize: 10,
    tiles: [
        [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1]
    ]
}