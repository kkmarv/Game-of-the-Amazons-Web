import React from 'react';
import renderer from 'react-test-renderer';
import {PlayerSidebar} from "../../components/GameScreen/PlayerSidebar"

// Snapshot Test
test("renders correctly with props", () => {
    const tree = renderer.create(<PlayerSidebar
        id={0}
        allowedToMove={true}
        controllable={true}
        name={"Pepego"}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})