import React from 'react';
import renderer from 'react-test-renderer';
import {Timer} from "../../components/Timer"

// Snapshot Test
test("renders correctly with timeleft given", () => {
    const tree = renderer.create(<Timer timeLeft={50}/>).toJSON();
    expect(tree).toMatchSnapshot();
})