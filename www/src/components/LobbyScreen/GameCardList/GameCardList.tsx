import {Component} from "react";
import {BasicGame, Player} from "../../../requests";
import {GameCard} from "./GameCard";
import {GameCardButton} from "./GameCardButton";


interface Props {
    gamesList: BasicGame[]
    localPlayer: Player
}

interface State {
    selection: string // "your", "open", "ongoing", "finished"
}

export class GameCardList extends Component<Props, State> {
    private yourGames: BasicGame[]
    // private openGames: BasicGame[] // TODO toni nach lobbynamen und -system fragen
    private ongoingGames: BasicGame[]
    private finishedGames: BasicGame[]

    constructor(props: Props) {
        super(props);

        this.yourGames = this.getYourGames()
        // this.openGames = this.getOpenGames() // TODO toni nach lobbynamen und -system fragen
        this.ongoingGames = this.getOngoingGames()
        this.finishedGames = this.getFinishedGames()

        this.state = {
            selection: "your"
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps.gamesList.length !== this.props.gamesList.length) { // this will cause problems with many users
            this.yourGames = this.getYourGames()
            // this.openGames = this.getOpenGames() // TODO toni nach lobbynamen und -system fragen
            this.ongoingGames = this.getOngoingGames()
            this.finishedGames = this.getFinishedGames()
        }
    }

    render() {
        return (
            <div className={"game-card-list"}>
                <div>
                    {/*<GameCardButton*/}
                    {/*    value={"open"}*/}
                    {/*    disabled={this.state.selection === "open"}*/}
                    {/*    onClick={this.handleClick}*/}
                    {/*/>*/}
                    <GameCardButton
                        value={"your"}
                        disabled={this.state.selection === "your"}
                        onClick={this.handleClick}
                    />
                    <GameCardButton
                        value={"ongoing"}
                        disabled={this.state.selection === "ongoing"}
                        onClick={this.handleClick}
                    />
                    <GameCardButton
                        value={"finished"}
                        disabled={this.state.selection === "finished"}
                        onClick={this.handleClick}
                    />
                </div>
                <div>
                    {this.getGameCards()}
                </div>
            </div>
        )
    }


    private handleClick = () => {
        // TODO
    }


    private getGameCards(): JSX.Element[] {
        //     if (this.state.selection === "open") { // TODO toni nach lobbynamen und -system fragen
        //         return this.openGames.map((openGame) => {
        //             return <GameCard players={openGame.players}/>
        //         })
        //     }
        let counter: number = 0
        if (this.state.selection === "your") {
            return this.yourGames.map((yourGame) => {
                const winningPlayer: Player | undefined = this.getPlayerById(yourGame.players, yourGame.winningPlayer)
                return <GameCard key={"gameCard" + counter++} players={yourGame.players} winningPlayer={winningPlayer}/>
            })
        } else if (this.state.selection === "ongoing") {
            return this.ongoingGames.map((ongoingGame) => {
                return <GameCard key={"gameCard" + counter++} players={ongoingGame.players}/>
            })
        } else {
            return this.finishedGames.map((finishedGame) => {
                return <GameCard
                    key={"gameCard" + counter++}
                    players={finishedGame.players}
                    winningPlayer={this.getPlayerById(finishedGame.players, finishedGame.winningPlayer)}
                />
            })
        }
    }

    private getYourGames(): BasicGame[] {
        let yourGames: BasicGame[] = []
        for (let game of this.props.gamesList) {
            for (let player of game.players) if (player.id === this.props.localPlayer.id) {
                yourGames.push(game)
                break
            }
        }
        return yourGames
    }

    // private getOpenGames(): BasicGame[] { // TODO toni nach lobbynamen und -system fragen
    //     let openGames: BasicGame[] = []
    //     for (let game of this.props.gamesList) if (!game.winningPlayer) openGames.push(game)
    //     return openGames
    // }

    private getOngoingGames(): BasicGame[] {
        let ongoingGames: BasicGame[] = []
        for (let game of this.props.gamesList) if (!game.winningPlayer) ongoingGames.push(game)
        return ongoingGames
    }

    private getFinishedGames(): BasicGame[] {
        let finishedGames: BasicGame[] = []
        for (let game of this.props.gamesList) if (game.winningPlayer) finishedGames.push(game)
        return finishedGames
    }

    /* Helper functions */

    private getPlayerById(players: Player[], id?: number): Player | undefined {
        if (id === undefined) return undefined
        else return players[0].id === id ? players[0] : players[1]
    }
}