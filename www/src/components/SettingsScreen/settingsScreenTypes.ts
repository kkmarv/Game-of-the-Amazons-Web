import {Player} from "../../requests";
import {checkerBoard4Amazons, chessBoard4Amazons} from "./GameSettings/boardTemplates";


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
    boardSize: 8,
    tiles: chessBoard4Amazons
}