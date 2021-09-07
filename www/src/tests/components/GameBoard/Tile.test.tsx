import React from 'react';
import renderer from 'react-test-renderer';
import {GameBoardButton} from "../../../components/GameBoardScreen/GameBoard/GameBoardButton"

// Snapshot Test
test("renders correctly with props", () => {
    const tree = renderer.create(<GameBoardButton
        tileType={0}
        color={"white"}
        disabled={false}
        id={"tile64"}
        onClick={(): void => {
        }}
        possibleMove={true}
        selected={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})