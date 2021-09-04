import "../../styles/components/_lobby-screen.sass"

import {Component} from "react";
import {GameCardList} from "./GameCardList/GameCardList";
import {LoadingScreen} from "../LoadingScreen";
import {Credits} from "./Welcome/Credits";
import {HsAnhaltLogo} from "./Welcome/HsAnhaltLogo";
import {GotAHeading} from "./Welcome/GotAHeading";
import {Tutorial} from "./Welcome/Tutorial";
import {BasicGame, Player} from "../../requests";
import * as requests from "../../requests";
import {PreferenceButtons} from "../PreferenceButtons";


interface Props {
}

interface State {
    isLoaded: boolean
    viewingCredits: boolean
    gamesList: BasicGame[]
}

export class LobbyScreen extends Component<Props, State> {
    private localPlayer: Player = {id: -1, name: "loading", controllable: false}

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoaded: false,
            viewingCredits: false,
            gamesList: []
        }
    }

    async componentDidMount() {
        this.localPlayer = await requests.getOwnPlayer() as Player
        console.log(this.localPlayer)
        this.setState({gamesList: await requests.getAllGames()}, () => {
            this.setState({isLoaded: true})
        })
    }

    render() {
        if (!this.state.isLoaded) return <LoadingScreen/>
        else {
            return this.state.viewingCredits ? (
                <Credits onLeave={this.toggleCredits}/>
            ) : (
                <>
                    <div className={"greeting"}>
                        <PreferenceButtons
                            currentTheme={""}
                            currentLanguage={""}
                            switchTheme={() => {
                                return null // TODO
                            }}
                            toggleLanguage={() => {
                                return null // TODO
                            }}
                        />
                        <GotAHeading currentPlayerName={this.localPlayer.name}/>
                        <Tutorial/>
                        <HsAnhaltLogo onClick={this.toggleCredits}/>
                    </div>
                    <GameCardList localPlayer={this.localPlayer} gamesList={this.state.gamesList}/>
                </>
            )
        }
    }


    private toggleCredits = (): void => {
        this.setState({viewingCredits: !this.state.viewingCredits})
    }
}