import React, {Component} from 'react';
import './App.css';
import {GameBoard} from "./components/GameBoard/GameBoard";

export default class App extends Component<any, any> {
    testBoard = {
        rows: 10,
        columns: 10,
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

    render() {
        return (
            <GameBoard initialBoard={this.testBoard}/>
        );
    }
}