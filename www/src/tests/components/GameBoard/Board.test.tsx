import React from 'react';
import renderer from 'react-test-renderer';
import {Board} from "../../../components/GameBoard/Board"

// Snapshot Test
test("renders correctly with props", () => {
    const tree = renderer.create(<Board
        initialBoard={{
            gameSizeRows: 10,
            gameSizeColumns: 10,
            squares: [
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
        }} isLocalPlayer={true} onTurnEnd={async (turn?: turn):Promise<void> => {}}

    />).toJSON();
    expect(tree).toMatchSnapshot();
})