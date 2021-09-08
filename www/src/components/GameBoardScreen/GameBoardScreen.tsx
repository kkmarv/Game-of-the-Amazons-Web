import "../../styles/components/_game-screen.scss"

import {Component} from "react";
import {LoadingScreen} from "../LoadingScreen";
import {PlayerSidebar} from "./PlayerSidebar";
import {TurnInfo} from "./TurnInfo";
import {GameBoard} from "./GameBoard/GameBoard";
import * as requests from "../../requests";
import {BasicGame, DetailedGame, Player, Turn} from "../../requests";


interface Props {
    playerIds: number[]
    maxTurnTime: number
    tiles: number[][]
}

interface State {
    game?: DetailedGame
    gameIsLoaded: boolean
    currentPlayer?: Player
    gameIsFinished: boolean
    remainingTurnTime: number
}

export class GameBoardScreen extends Component<Props, State> {
    private timer!: NodeJS.Timeout;
    private localPlayer!: Player;

    constructor(props: Props) {
        super(props);
        this.state = {
            gameIsLoaded: false,
            gameIsFinished: false,
            remainingTurnTime: props.maxTurnTime
        }
    }

    /* Initialisierung
    -> fragt den lokalen Spieler ab
    -> fragt den initialen Stand des Spiels ab
    -> setzt den Timer auf ein 1-Sekunden-Intervall */
    async componentDidMount() {
        this.timer = setInterval(this.timerFunction, 1000)
        this.localPlayer = await requests.getOwnPlayer() as Player

        const createdGame: BasicGame = await requests.createGame(
            this.props.playerIds,
            this.props.maxTurnTime,
            this.props.tiles.length,
            this.props.tiles[0].length,
            this.props.tiles
        ) as BasicGame

        this.setState({
            game: await requests.getGame(createdGame.id) as DetailedGame,
        }, () => { // executes right after first setState()
            this.setState({
                gameIsLoaded: true,
                currentPlayer: this.getCurrentPlayer()
            })
        })
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        const winningPlayerId = this.state.game!.winningPlayer

        if (!winningPlayerId) { // if game is still running // TODO maybe add timer synchronization
            if (prevState.game && prevState.game.playerId !== this.state.game!.playerId) { // if player switches
                this.switchPlayer()
                await this.updateGame()
            }
        } else {
            if (!prevState.game!.winningPlayer) { // if game has ended with this update
                if (!this.state.gameIsFinished) {
                    clearInterval(this.timer)
                    this.switchPlayer()
                    // this.setState({gameIsFinished: true}) // TODO die endcard machen
                    console.log(this.getPlayerById(this.state.game!.winningPlayer!).name + " won")
                }
            }
        }
    }

    render() {
        if (!this.state.gameIsLoaded) {
            return (
                <LoadingScreen/>
            )
        } else {
            return !this.state.gameIsFinished ? (
                <>
                    <PlayerSidebar
                        player={this.state.game!.players[0]}
                        playerColor={this.getPlayersColorById(this.state.game!.players[0].id)}
                    />
                    <PlayerSidebar
                        player={this.state.game!.players[1]}
                        playerColor={this.getPlayersColorById(this.state.game!.players[1].id)}
                    />
                    <TurnInfo
                        isWinner={!!this.state.game!.winningPlayer}
                        currentPlayer={this.state.currentPlayer!}
                        remainingTurnTime={this.state.remainingTurnTime}
                    />
                    <GameBoard
                        onTurnEnd={this.makeATurn}
                        initialBoard={this.state.game!.board}
                        currentPlayerIsLocal={this.isItLocalPlayersTurn()}
                    />
                </>
            ) : ( // TODO die endcard machen
                <>
                    <h1>GREAT! ABSOLUTELY FKNG GREAT!</h1>
                    <h2>(you broke the page)</h2>
                </>
            )
        }
    }


    private makeATurn = async (turn: Turn): Promise<void> => {
        if (await requests.createTurn(this.state.game!.id, turn)) console.log("turn successfully submitted")
        await this.updateGame()
    }

    private timerFunction = async (): Promise<void> => { // TODO bot displayed am anfang beheben | Toni fragen
        if (this.state.gameIsLoaded && !this.state.gameIsFinished) {
            if (this.state.remainingTurnTime >= 1000) {
                if (!this.isItLocalPlayersTurn()) { // if we're waiting on opponents' turn
                    this.setState({game: await requests.getGame(this.state.game!.id)}) // update the game
                }

            } else { // if turn time is up
                this.setState({game: await requests.getGame(this.state.game!.id)})
            }
            this.setState({remainingTurnTime: this.state.remainingTurnTime - 1000})
        }
    }

    private switchPlayer() { // consistency in UI, I guess
        this.setState({currentPlayer: this.getTheOtherPlayer(this.state.currentPlayer!)})
    }

    private async updateGame() {
        this.setState({
            game: await requests.getGame(this.state.game!.id)
        }, () => { // executes right after first setState()
            this.setState({
                remainingTurnTime: this.state.game!.remainingTurnTime!
            })
        })
    }


    /* Helper Functions */

    private isItLocalPlayersTurn(): boolean {
        return this.getCurrentPlayer().id === this.localPlayer.id
    }

    private getCurrentPlayer(): Player {
        return this.getPlayerById(this.state.game!.playerId)
    }

    private getPlayerById(id: number): Player {
        return this.state.game!.players[0].id === id ? this.state.game!.players[0] : this.state.game!.players[1]
    }

    private getTheOtherPlayer(myPlayer: Player): Player {
        const playerArray: Player[] = this.state.game!.players
        return playerArray[0].id === myPlayer.id ? playerArray[1] : playerArray[0]
    }

    private getTheOtherPlayerId(myPlayerId: number): number {
        const playerArray: Player[] = this.state.game!.players
        return playerArray[0].id === myPlayerId ? playerArray[1].id : playerArray[0].id
    }

    private getPlayersColorById(id: number): string {
        return id < this.getTheOtherPlayerId(id) ? "white" : "black"
    }
}