import React, {Component} from "react";
import * as requests from "../requests";
import {Player} from "../requests";


/**
 * Used for debugging a test game. For test purposes only.
 */
export class DebugButtons extends Component<any, any> {
    debugTilesArray: number[][] = [
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


    render() {
        return (
            <>
                <button onClick={async () => {
                    await requests.createAiPlayer("Bot Marv")
                }}>Create Bot Marv
                </button>
                <button onClick={async () => {
                    await requests.createAiPlayer("Bot Pascl")
                }}>Create Bot Pascl
                </button>
                <button onClick={async () => {
                    await this.createTestGame()
                }}>Create Game
                </button>

                <button onClick={async () => {
                    if ((await requests.reset())) console.log("Reset!")
                }}>Reset
                </button>

                <button onClick={async () => {
                    console.log(await requests.getGame(1))
                }}>get game 1
                </button>

                <button onClick={async () => {
                    console.log(await requests.getAllPlayers())
                }}>all Players
                </button>

                <button onClick={async () => {
                    console.log(await requests.getAllGames())
                }}>all Games
                </button>

                <button onClick={async () => {
                    await requests.createTurn(0, {
                        move: {
                            start: {row: 0, column: 4},
                            end: {row: 0, column: 5}
                        },
                        shot: {row: 0, column: 4}
                    })
                }}>Make Turn
                </button>

                <button onClick={async () => {
                    console.log(await requests.getOwnPlayer())
                }}>Get Yourself
                </button>

                <button onClick={async () => {
                    await this.createBotGame()
                }}>Create Bot Game
                </button>
            </>
        )
    }


    async getPlayerByName(name: string): Promise<Player | undefined> {
        const allPLayers: Player[] = await requests.getAllPlayers()
        for (let player of allPLayers) {
            if (player.name === name) return player
        }
        return undefined
    }


    async getTheBot(): Promise<Player | undefined> {
        const allPLayers: Player[] = await requests.getAllPlayers()
        for (let player of allPLayers) {
            if (!player.controllable) return player
        }
        return undefined
    }

    async createTestGame() {
        return requests.createGame(
            [1, 0],
            60000,
            10,
            10,
            this.debugTilesArray
        )
    }

    async createBotGame() {
        let botMarvin = await this.getPlayerByName("Bot Marvin")
        let botPascal = await this.getPlayerByName("Bot Pascal")
        if (!botMarvin) botMarvin = await requests.createAiPlayer("Bot Marvin") as Player
        if (!botPascal) botPascal = await requests.createAiPlayer("Bot Pascal") as Player
        await requests.createGame(
            [botMarvin.id, botPascal.id],
            60000,
            10,
            10,
            this.debugTilesArray
        )
    }
}