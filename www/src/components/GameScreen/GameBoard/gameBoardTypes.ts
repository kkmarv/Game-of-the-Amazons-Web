/* Type definitions for the GameBoard components. */
export type Tile = {
    disabled: boolean
    tileType: TileEnum
}

export enum TileEnum {
    PLAYER = 0,
    OPPONENT = 1,
    EMPTY = -1,
    ARROW = -2
}
