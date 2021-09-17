/* Type definitions for the GameBoard components. */
export interface Tile {
    disabled: boolean
    tileType: TileEnum
}

export enum TileEnum {
    PLAYER = 0,
    OPPONENT = 1,
    EMPTY = -1,
    ARROW = -2
}

export enum PhaseEnum {
    SELECT,
    MOVE,
    SHOOT,
    WAIT
}
