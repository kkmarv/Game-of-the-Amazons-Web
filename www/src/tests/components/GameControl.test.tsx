import React from 'react';
import renderer from 'react-test-renderer';
import {GameControl} from "../../components/GameControl"

// Snapshot Test
test("renders correctly with props", () => {
    const tree = renderer.create(<GameControl
        players={[{controllable: true, playerId: 0, name: "Pepego"}, {controllable: false, playerId: 1, name: "Al"}]}
        localPlayers={[{controllable: true, playerId: 0, name: "Pepego"}]}
        initialGameInfo={{
            gameId: 0,
            maxTurnTime: 7353,
            playerId: 1,
            turnId: 4,
            messageType: "turn",
            winningPlayer: undefined,
            board: {
                gameSizeRows: 10,
                gameSizeColumns: 10,
                squares: [
                    [-1, -1, -1, 1, -1, -1, -2, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, 1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, 1, -2, -1, -1, -1, -1, -1, -1, 1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-2, 0, -1, -1, -1, -1, -1, -1, -1, 0],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1]
                ]
            }
        }}
    />).toJSON();
    expect(tree).toMatchSnapshot();
})