import React from 'react';
import renderer from 'react-test-renderer';
import {GameBoard} from "../../../components/GameBoardScreen/GameBoard/GameBoard"

// Snapshot Test
test("renders correctly with props", () => {
    const tree = renderer.create(<GameBoard
        initialBoard={{
            rowCount: 10,
            columnCount: 10,
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
        }} currentPlayerIsLocal={true} onTurnEnd={async (turn?: Turn):Promise<void> => {}}

    />).toJSON();
    expect(tree).toMatchSnapshot();
})