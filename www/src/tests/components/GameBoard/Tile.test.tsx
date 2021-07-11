import React from 'react';
import renderer from 'react-test-renderer';
import {Tile} from "../../../components/GameBoard/Tile"

// Snapshot Test
test("renders correctly with props", () => {
    const tree = renderer.create(<Tile
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