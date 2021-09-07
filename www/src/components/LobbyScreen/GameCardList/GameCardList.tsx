import {Component} from "react";
import {BasicGame, Player} from "../../../requests";
import {GameCard} from "./GameCard";
import {GameCardInfo} from "./GameCardInfo";


interface Props {
    gamesList: BasicGame[]
    localPlayer: Player
    onCreateNewGame: () => void
}

interface State {
    isViewingGameInfo: boolean
}

export class GameCardList extends Component<Props, State> {
    private yourGames: BasicGame[] = this.getYourGames()
    private clickedGameId!: number

    constructor(props: Props) {
        super(props);
        this.state = {
            isViewingGameInfo: true
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps.gamesList.length !== this.props.gamesList.length) { // this will cause problems when many users
            this.yourGames = this.getYourGames()
        }
    }

    render() {
        return (
            <div className={"games"}>
                <div className={"title"}>
                    <h2>Your Games</h2>
                </div>
                <div className={"card-list"}>
                    {this.getGameCards()}
                </div>
                <div className={"new-game-button"}>
                    <button onClick={this.props.onCreateNewGame}>New Game</button>
                </div>
                {this.state.isViewingGameInfo ? (this.getGameCardInfo) : null}
            </div>
        )
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

    private getGameCards(): JSX.Element[] {
        return this.yourGames.map((yourGame, index) => {
            return (
                <GameCard
                    key={index}
                    game={yourGame}
                    onClick={() => { // TODO detailed game info machen
                        this.clickedGameId = yourGame.id
                    }}
                />
            )
        })
    }

    private getGameCardInfo(): JSX.Element {
        return (
            <GameCardInfo
                forGameId={this.clickedGameId}
                onLeave={() => {
                    this.toggleIsViewingGameInfo()
                }}
            />
        )
    }

    private toggleIsViewingGameInfo(): void {
        this.setState({isViewingGameInfo: !this.state.isViewingGameInfo})
    }
}