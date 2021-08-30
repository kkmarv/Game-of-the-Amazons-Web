import {Component} from "react";
import {GameCardList} from "./GameCardList/GameCardList";
import {LoadingScreen} from "../LoadingScreen";
import {Credits} from "./Welcome/Credits";
import {HsAnhaltLogo} from "./Welcome/HsAnhaltLogo";
import {GotAHeading} from "./Welcome/GotAHeading";
import {Tutorial} from "./Welcome/Tutorial";
import {BasicGame, Player} from "../../requests";
import * as requests from "../../requests";


interface Props {
}

interface State {
    isLoaded: boolean
    viewingCredits: boolean
    gamesList: BasicGame[]
}

export class LobbyScreen extends Component<Props, State> {
    private localPlayer!: Player

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
                    <GotAHeading currentPlayerName={this.localPlayer.name}/>
                    <Tutorial/>
                    <GameCardList gamesList={this.state.gamesList}/>
                    <HsAnhaltLogo onClick={this.toggleCredits}/>
                </>
            )
        }
    }


    private toggleCredits = (): void => {
        this.setState({viewingCredits: !this.state.viewingCredits})
    }
}