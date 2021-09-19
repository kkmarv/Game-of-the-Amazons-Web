import "../../styles/components/_game-screen.scss";

import {Component} from "react";
import LoadingScreen from "../LoadingScreen";
import PlayerSidebar from "./PlayerSidebar";
import TurnInfo from "./TurnInfo";
import {GameBoard} from "./GameBoard/GameBoard";
import * as requests from "../../requests";
import {DetailedGame, Player, Turn} from "../../requests";
import {RouteComponentProps, withRouter} from "react-router-dom";
import ParticlesBg from 'particles-bg';


interface URLParameter {
    id: string
}


interface Props extends RouteComponentProps<URLParameter> {

}


interface State {
    gameIsLoaded: boolean
    gameIsFinished: boolean
    game?: DetailedGame // gets defined later with game request
    currentPlayer?: Player // gets defined later with game request
    remainingTurnTime?: number // gets defined later with game request
}


class GameScreen extends Component<Props, State> {
    private timer!: NodeJS.Timeout;
    private localPlayer!: Player;


    constructor(props: RouteComponentProps & Props) {
        super(props);
        this.state = {
            gameIsLoaded: false,
            gameIsFinished: false
        }
    }

    /* Initialisierung
    -> fragt den lokalen Spieler ab
    -> fragt den initialen Stand des Spiels ab
    -> setzt den Timer auf ein 1-Sekunden-Intervall */
    async componentDidMount() {
        this.timer = setInterval(this.timerFunction, 1000)
        this.localPlayer = await requests.getOwnPlayer() as Player


        this.setState({
            game: await requests.getGame(parseInt(this.props.match.params.id)) as DetailedGame,
        }, () => { // executes right after first setState()
            if (this.state.game === undefined) this.props.history.push("/error/game")
            else { // initialize state when game request was successful
                this.setState({
                    gameIsLoaded: true,
                    currentPlayer: this.getCurrentPlayer(),
                    remainingTurnTime: this.state.game?.remainingTurnTime
                })
            }
        })
        console.log(this.state.game)
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        const winningPlayerId = this.state.game!.winningPlayer

        if (!winningPlayerId) { // if game is still running // TODO maybe add timer synchronization
            if (prevState.game && prevState.game.currentPlayerId !== this.state.game!.currentPlayerId) { // if player switches
                this.switchPlayer()
                await this.updateGame()
            }
        } else {
            if (!prevState.game!.winningPlayer) { // if game has ended with this update
                if (!this.state.gameIsFinished) {
                    clearInterval(this.timer)
                    this.switchPlayer()
                    this.setState({gameIsFinished: true})
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
            return (
                <>
                    <div className={"gameboard-screen"}>
                        <PlayerSidebar
                            playerName={this.state.game!.players[0].name}
                            playerColor={this.getPlayersColorById(this.state.game!.players[0].id)}
                            playerPosition={0}
                        />
                        <PlayerSidebar
                            playerName={this.state.game!.players[1].name}
                            playerColor={this.getPlayersColorById(this.state.game!.players[1].id)}
                            playerPosition={1}
                        />
                        <TurnInfo
                            isWinner={!!this.state.game!.winningPlayer}
                            currentPlayer={this.state.currentPlayer!}
                            remainingTurnTime={this.state.remainingTurnTime!}
                        />
                        <GameBoard
                            onTurnEnd={this.makeATurn}
                            initialBoard={this.state.game!.board}
                            currentPlayerIsLocal={this.isItLocalPlayersTurn()}
                            currentPlayerPosition={this.getIndexOfCurrentPlayer()}
                        />
                        {this.state.game!.winningPlayer && this.state.currentPlayer?.id === this.state.game!.winningPlayer ? (
                            <ParticlesBg type="fountain" num={10} bg={true}/>
                        ) : null
                        }
                        {this.state.game!.winningPlayer && this.state.currentPlayer?.id !== this.state.game!.winningPlayer ? (
                            <ParticlesBg type="cobweb" num={200} bg={true} color="#00008b"/>
                        ) : null
                        }
                    </div>
                </>
            )
        }
    }


    private makeATurn = async (turn: Turn): Promise<void> => {
        if (await requests.createTurn(this.state.game!.id, turn)) console.log("turn successfully submitted")
        else this.props.history.push("error/turn")
        await this.updateGame()
    }

    private timerFunction = async (): Promise<void> => {
        if (this.state.gameIsLoaded && !this.state.gameIsFinished) {
            if (this.state.remainingTurnTime! >= 1000) {
                if (!this.isItLocalPlayersTurn()) { // if we're waiting on opponents' turn
                    this.setState({game: await requests.getGame(this.state.game!.id)}) // update the game
                }

            } else { // if turn time is up
                this.setState({game: await requests.getGame(this.state.game!.id)})
            }
            if (this.state.game === undefined) this.props.history.push("/error/game")
            this.setState({remainingTurnTime: this.state.remainingTurnTime! - 1000})
        }
    }

    private switchPlayer() { // consistency in UI, I guess
        this.setState({currentPlayer: this.getTheOtherPlayer(this.state.currentPlayer!)})
    }

    private async updateGame() {
        this.setState({
            game: await requests.getGame(this.state.game!.id)
        }, () => { // executes right after first setState()
            if (this.state.game === undefined) this.props.history.push("/error/game")
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
        return this.state.game!.players[this.state.game!.currentPlayerId]
    }

    private getIndexOfCurrentPlayer(): number {
        return this.state.game!.players.indexOf(this.getCurrentPlayer())
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


export default withRouter(GameScreen)