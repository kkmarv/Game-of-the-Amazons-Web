import "../../styles/components/_lobby-screen.scss"

import React, {Component} from "react";
import GameCardList from "./GameCardList/GameCardList";
import {LoadingScreen} from "../LoadingScreen";
import {Logo} from "./Logo";
import {Title} from "./Title";
import {Tutorial} from "./Tutorial";
import {BasicGame, getAllGames, getOwnPlayer, Player} from "../../requests";
import {Preferences} from "../Preferences";
import {LanguageEnum, ThemeEnum} from "./lobbyScreenTypes";
import {RouteComponentProps, withRouter} from 'react-router-dom';


interface Props {
}

interface State {
    theme: number
    isLoaded: boolean
    isCurrentLanguageGerman: boolean
    gamesList: BasicGame[]
}

class LobbyScreen extends Component<RouteComponentProps & Props, State> {
    private localPlayer!: Player

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            theme: ThemeEnum.DARK,
            isLoaded: false,
            isCurrentLanguageGerman: false,
            gamesList: []
        }
    }

    async componentDidMount() {
        this.localPlayer = await getOwnPlayer() as Player
        this.setState({gamesList: await getAllGames()}, () => {
            if (this.localPlayer === undefined) this.props.history.push("/error/player")
            else this.setState({isLoaded: true})
        })
    }

    render() {
        if (!this.state.isLoaded) return <LoadingScreen/>
        else {
            return (
                <>
                    <div className={"lobby"}>
                        <div className={"left"}>
                            <Preferences
                                currentTheme={this.state.theme}
                                currentLanguage={this.state.isCurrentLanguageGerman ? LanguageEnum.DE : LanguageEnum.EN}
                                switchTheme={this.onSwitchThemeClick}
                                toggleLanguage={this.onToggleLanguageClick}
                            />
                            <Title currentPlayerName={this.localPlayer.name}/>
                            <Tutorial/>
                        </div>
                        <div className={"right"}>
                            <GameCardList
                                localPlayer={this.localPlayer}
                                gamesList={this.state.gamesList}
                                onCreateNewGame={this.onCreateNewGameClick}
                            />
                            <Logo onClick={this.onLogoClick}/>
                        </div>
                    </div>
                </>
            )
        }
    }

    private onCreateNewGameClick = (): void => {
        this.props.history.push("/create")
    }

    private onLogoClick = (): void => {
        this.props.history.push("/credits")
    }

    private onSwitchThemeClick = (): void => { // TODO Funktionalität, themes googlen
        this.setState({theme: (this.state.theme + 1) % (Object.keys(ThemeEnum).length / 2)})
    }

    private onToggleLanguageClick = (): void => { // TODO Funktionalität, lokalisierung googlen
        this.setState({isCurrentLanguageGerman: !this.state.isCurrentLanguageGerman})
    }
}

export default withRouter(LobbyScreen)