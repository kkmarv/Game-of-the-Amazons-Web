import {Component} from "react";
import {GameSettings} from "./GameSettings";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {BasicGame, createGame, getOwnPlayer, Player} from "../../requests";
import {LoadingScreen} from "../LoadingScreen";
import {defaultSettings, Settings} from "./gameCreationScreenTypes";
import "../../styles/components/_game-creation-screen.scss"


interface Props extends RouteComponentProps {
}

interface State {
    isLoaded: boolean
    settings: Settings
}


class GameCreationScreen extends Component<Props, State> {
    private localPlayer!: Player

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoaded: false,
            settings: defaultSettings
        }
    }

    async componentDidMount() {
        this.localPlayer = await getOwnPlayer() as Player
        if (this.localPlayer === undefined) this.props.history.push("/error")
        else this.setState({isLoaded: true})
    }

    render() {
        return this.state.isLoaded ? (
            <>
                <div className={"game-creation-screen"}>
                    <div className={"title"}><h1>Create a Game</h1></div>
                    <GameSettings
                        settings={this.state.settings}
                        localPlayer={this.localPlayer}
                        updateSettings={this.updateSettings}
                    />
                    <div className={"bottom-buttons"}>
                        <div className={"back-button"}>
                            <button className={"btn"} onClick={() => {
                                this.props.history.push("/lobby")
                            }}>Back to Lobby
                            </button>
                        </div>
                        <div className={"start-button"}>
                            <button className={"btn"} onClick={async () => {
                                await this.createGame(this.state.settings)
                            }}>Start
                            </button>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <LoadingScreen/>
        )
    }


    private updateSettings = (settingToChange: keyof Settings, newValue: any): void => {
        console.log("updated: " + settingToChange)
        const newSettings: Settings = this.state.settings
        newSettings[settingToChange] = newValue
        this.setState({settings: newSettings})
    }

    private createGame = async (settings: Settings): Promise<void> => {
        const newGame: BasicGame | undefined = await createGame(
            [this.localPlayer.id, this.state.settings.opponent.id],
            settings.maxTurnTime,
            this.state.settings.boardSize,
            this.state.settings.boardSize,
            settings.tiles
        )
        newGame === undefined ? (
            this.props.history.push("/error")
        ) : (
            this.props.history.push(`/game/${newGame.id}`)
        )
    }
}

export default withRouter(GameCreationScreen)