import React from 'react';
import renderer from 'react-test-renderer';
import {Player} from "../../components/Player"

// Snapshot Test
test("renders correctly with props", () => {
    const tree = renderer.create(<Player
        id={0}
        allowedToMove={true}
        controllable={true}
        name={"Pepego"}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})