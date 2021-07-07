import {TileType} from "./TileType";

declare global {
    type Coordinates = {
        rowIndex: number
        colIndex: number
    }

    type TileProps = {
        tileType: TileType
        disabled: boolean
        selected: boolean
        possibleMove: boolean
    }
}

export {}