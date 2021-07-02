import {Component} from "react";
import {GameBoardTile} from "./GameBoardTile";


type Props = {
    id: number,
    row: number[]
    onClick: any
}


/**
 * Represents a single row of a GameBoard. Saves references to its tiles.
 */
export class GameBoardRow extends Component<Props, any> {
    public tiles: (GameBoardTile)[] = []

    render() {
        let tileCount = 0;
        return this.props.row.map((value) => {
            return (
                <GameBoardTile
                    tileType={value}
                    id={this.props.id}
                    onClick={this.props.onClick}
                    columnName={this.getCharacter(tileCount++)}
                    ref={(gameBoardTile) => { // add references of created GameBoardTiles to this classes tiles array
                        if (gameBoardTile !== null) this.tiles.push(gameBoardTile)
                    }}
                />
            )
        });
    }

    getCharacter(tileCount: number) {
        return String.fromCharCode(tileCount + 65)
    }
}