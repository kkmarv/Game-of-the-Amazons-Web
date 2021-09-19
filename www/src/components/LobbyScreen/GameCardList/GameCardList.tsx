import {Component} from "react";
import {BasicGame, DetailedGame, getGame, Player} from "../../../requests";
import GameCard from "./GameCard";
import {GameCardInfo} from "./GameCardInfo";
import {Scrollbars} from "react-custom-scrollbars";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends RouteComponentProps, WithTranslation {
    gamesList: BasicGame[]
    localPlayer: Player
    onCreateNewGame: () => void
}


interface State {
    isViewingGameInfo: boolean
}


class GameCardList extends Component<Props, State> {
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
                    <h2>{this.props.t("lobby.card.title")}</h2>
                </div>
                <div className={"card-list"}>
                    <Scrollbars id={"scroll"} autoHide={true} autoHideTimeout={1500}>
                        {this.getGameCards()}
                    </Scrollbars>
                </div>
                <div className={"new-game-button"}>
                    <button
                        className={"btn"}
                        onClick={this.props.onCreateNewGame}
                    >{this.props.t("buttons.new")}
                    </button>
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
                    onClick={async () => {
                        const yourGameIsRunning: boolean = (await getGame(yourGame.id) as DetailedGame).winningPlayer === undefined
                        if (yourGameIsRunning) { // view game if its still running
                            this.props.history.push(`/game/${yourGame.id}`)
                        }
                    }}
                />
            )
        }).reverse() // to view the games in chronological order
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


export default withRouter(withTranslation()(GameCardList))