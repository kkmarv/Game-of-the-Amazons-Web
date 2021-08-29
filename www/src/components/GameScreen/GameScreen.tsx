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
    gameIsFinished: boolean
    remainingTurnTime: number
}

export class GameScreen extends Component<Props, State> {
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

        const game: DetailedGame = await requests.getGame(createdGame.id) as DetailedGame
        this.setState({
            game: game,
            gameIsLoaded: true
        })
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        const winningPlayerId = this.state.game!.winningPlayer

        if (!winningPlayerId) { // if game is still running // TODO maybe add timer synchronization
            if (prevState.game && prevState.game.playerId !== this.state.game!.playerId) { // if player switches
                this.setState({
                    game: await requests.getGame(this.state.game!.id),
                    remainingTurnTime: this.props.maxTurnTime
                })
            }

        } else if (winningPlayerId && !prevState.game!.winningPlayer) { // if game has ended
            if (!this.state.gameIsFinished) await this.finishGame()
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
                        currentPlayer={this.getCurrentPlayer()}
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
        this.setState({
            game: await requests.getGame(this.state.game!.id),
            remainingTurnTime: this.state.game!.maxTurnTime
        })
    }

    private timerFunction = async (): Promise<void> => { // TODO bot displayed am anfang beheben
        if (this.state.gameIsLoaded && !this.state.gameIsFinished) { // TODO die null am ende beheben
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

    private async finishGame(): Promise<void> {
        clearInterval(this.timer)
        // this.setState({gameIsFinished: true}) // TODO die endcard machen
        console.log(this.getPlayerById(this.state.game!.winningPlayer!).name + " won")
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

    private getPlayersColorById(id: number): string {
        let theOthersPlayerId: number
        for (let player of this.state.game!.players) {
            if (player.id !== id) theOthersPlayerId = player.id
        }
        return id < theOthersPlayerId! ? "white" : "black"
    }
}