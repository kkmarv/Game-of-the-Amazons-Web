import {TileType} from "./TileType";

declare global {
    type Coordinates = {
        row: number
        column: number
    }

    type TileProps = {
        tileType: TileType
        disabled: boolean
        selected: boolean
        possibleMove: boolean
    }
}

export {}