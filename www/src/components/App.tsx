import '../styles/App.css';

import React, {Component} from 'react';
import AuthButton from "@hs-anhalt/auth-button"
import * as requests from "../requests";
import {BasicGame, Player} from "../requests";
import {LoadingScreen} from "./LoadingScreen";
import {GameScreen} from "./GameScreen/GameScreen";


type State = {
    isLoaded: boolean
    isAuthenticated: boolean
}

export default class App extends Component<any, State> {
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


    private players: any = []

    constructor(props: any) {
        super(props);
        this.state = {
            isLoaded: false,
            isAuthenticated: false
        }
    }

    render() {
        if (this.state.isAuthenticated) {
            return this.state.isLoaded ? (
                // <DebugButtons/>
                <GameScreen
                    playerIds={[0, 1]}
                    maxTurnTime={30000}
                    tiles={this.debugTilesArray}
                />
            ) : (
                <LoadingScreen/>
            )
        } else {
            return (
                <AuthButton
                    authServiceURL={"https://webengineering.ins.hs-anhalt.de:40989"}
                    serviceBaseURLs={["https://webengineering.ins.hs-anhalt.de:40917"]}
                    onAuthorize={async () => {
                        console.log("Authentication successful!")
                        this.setState({isAuthenticated: true})
                        await this.test()
                        // await this.readyUpPlayers()
                        // await this.readyUpGame()
                        this.setState({isLoaded: true})
                    }}
                />
            )
        }
    }


    async test() {
        let allGames: BasicGame[] = await requests.getAllGames()
        // let allGames: InitialGame[] = await requests.getAllGames()

        if (allGames.length === 0) await this.createTestGame()
    }


    async readyUpPlayers(): Promise<void> {
        let allPlayers: Player[] = await requests.getAllPlayers()

        console.log("response all players:")
        console.log(allPlayers)

        if (allPlayers.length !== 2) {
            allPlayers = []
            await requests.reset()
            allPlayers.push(await requests.createAiPlayer("player1") as Player) // possible error : players!
            allPlayers.push(await requests.createAiPlayer("player2") as Player)
        }
        this.players = allPlayers
    }

    // async readyUpGame(): Promise<void> {
    //     const allGames = await requests.getAllGames() as RunningGame[]
    //
    //     console.log("response all games:")
    //     console.log(allGames)
    //
    //     if (allGames.length === 0) this.game = await requests.getGame((await this.createTestGame() as InitialGame).id)
    //
    //     else if (allGames.length === 1) { // Wenn es bereits ein Spiel gibt,
    //         if (allGames[0].winningPlayer) { // und es bereits fertig ist
    //             await requests.deleteGame(allGames[0].id)
    //             this.game = await requests.getGame((await this.createTestGame() as InitialGame).id)
    //         } else this.game = await requests.getGame(allGames[0].id) // und es noch läuft
    //
    //     } else { // Fehlerzustand => reset und alles neu
    //         await requests.reset()
    //         await this.readyUpPlayers()
    //         await this.readyUpGame()
    //     }
    // }

    createTestGame() {
        return requests.createGame(
            [0, 1],
            30000,
            10,
            10,
            this.debugTilesArray
        )
    }
}