import "../../styles/components/_lobby-screen.sass"

import {Component} from "react";
import {GameCardList} from "./GameCardList/GameCardList";
import {LoadingScreen} from "../LoadingScreen";
import {CreditScreen} from "../CreditScreen/CreditScreen";
import {Logo} from "./Logo";
import {Title} from "./Title";
import {Tutorial} from "./Tutorial";
import {BasicGame, getAllGames, getOwnPlayer, Player} from "../../requests";
import {Preferences} from "../Preferences";
import {LanguageEnum, ThemeEnum} from "./lobbyScreenTypes";
import {GameCreationScreen} from "../GameCreationScreen/GameCreationScreen";
import {RouteComponentProps, withRouter} from 'react-router-dom';


interface Props {
}

interface State {
    theme: number
    isLoaded: boolean
    isGameCreated: boolean
    isCreatingGame: boolean
    isViewingCredits: boolean
    isCurrentLanguageGerman: boolean
    gamesList: BasicGame[]
}

class LobbyScreen extends Component<RouteComponentProps, State> {
    private localPlayer!: Player

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            theme: ThemeEnum.DARK,
            isLoaded: false,
            isGameCreated: false,
            isCreatingGame: false,
            isViewingCredits: false,
            isCurrentLanguageGerman: false,
            gamesList: []
        }
    }

    async componentDidMount() {
        this.localPlayer = await getOwnPlayer() as Player // TODO @Toni: Fehlerbehandlung WIE?
        this.setState({gamesList: await getAllGames()}, () => {
            this.setState({isLoaded: true})
        })
    }

    render() {
        if (!this.state.isLoaded) return <LoadingScreen/>
        else if (this.state.isCreatingGame)
            return <GameCreationScreen onLeave={this.toggleIsCreatingGame} onGameCreation={this.toggleIsGameCreated}/>
        else {
            return this.state.isViewingCredits ? (
                <CreditScreen onLeave={this.toggleIsViewingCredits}/>
            ) : (
                <>
                    <Preferences
                        currentTheme={this.state.theme}
                        currentLanguage={this.state.isCurrentLanguageGerman ? LanguageEnum.DE : LanguageEnum.EN}
                        switchTheme={this.switchTheme}
                        toggleLanguage={this.toggleLanguage}
                    />
                    <Title currentPlayerName={this.localPlayer.name}/>
                    <Tutorial/>
                    <GameCardList
                        localPlayer={this.localPlayer}
                        gamesList={this.state.gamesList}
                        onCreateNewGame={this.toggleIsCreatingGame}
                    />
                    <Logo onClick={this.toggleIsViewingCredits}/>
                </>
            )
        }
    }

    private toggleIsViewingCredits = (): void => {
        this.setState({isViewingCredits: !this.state.isViewingCredits}, () => {
            this.props.location.pathname === "/lobby" ? (
                this.props.history.push("/credits")
            ) : (
                this.props.history.push("/lobby")
            )
        })
    }

    private toggleIsCreatingGame = (): void => {
        this.setState({isCreatingGame: !this.state.isCreatingGame}, () => {
            this.props.location.pathname === "/lobby" ? (
                this.props.history.push("/create")
            ) : (
                this.props.history.push("/lobby")
            )
        })
    }

    private toggleIsGameCreated = (): void => {
        this.setState({isGameCreated: !this.state.isGameCreated})
    }

    private switchTheme = (): void => {
        // TODO
        this.setState({theme: (this.state.theme + 1) % (Object.keys(ThemeEnum).length / 2)})
    }

    private toggleLanguage = (): void => {
        // TODO
        this.setState({isCurrentLanguageGerman: !this.state.isCurrentLanguageGerman})
    }
}

export default withRouter(LobbyScreen)