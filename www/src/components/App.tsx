import React, {Component} from 'react';
import '../styles/App.css';
import {GameControl} from "./GameControl";

export default class App extends Component<any, any> {
    testPlayers: PlayerProps[] = [
        {
            name: "pepegoTest",
            controllable: true,
            id: 0
        },
        {
            name: "AI",
            controllable: false,
            id: 1
        }
    ]
    testGame: GameProps = {
        gameId: 0,
        maxTurnTime: 10000,
        players: this.testPlayers.map((testPlayer) => {
            return testPlayer.id
        }),
        initialBoard: {
            gameSizeRows: 10,
            gameSizeColumns: 10,
            tiles: [
                [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -2, 1, -2, -1, -1, -1, -1, -1],
                [-1, -1, 1, 0, 1, -1, 0, -1, -1, -1]
            ]
        }
    }

    render() {
        return (
            <GameControl players={this.testPlayers} localPlayers={[this.testPlayers[0]]} game={this.testGame}/>
        );
    }
}