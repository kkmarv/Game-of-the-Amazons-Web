import {Component} from "react";
import {GameSettings} from "./GameSettings";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {getOwnPlayer, Player} from "../../requests";
import {LoadingScreen} from "../LoadingScreen";


interface Props {
}

interface State {
    isLoaded: boolean
}

class GameCreationScreen extends Component<RouteComponentProps & Props, State> {
    private localPlayer!: Player

    constructor(props: RouteComponentProps & Props) {
        super(props);
        this.state = {
            isLoaded: false
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
                <div className={"title"}><h1>Create a Game</h1></div>
                <GameSettings localPlayer={this.localPlayer}/>
                <div className={"back-button"}>
                    <button onClick={() => {
                        this.props.history.push("/lobby")
                    }}>Back to Lobby
                    </button>
                </div>
                <div className={"start-button"}>
                    <button onClick={() => {
                        // this.props.history.push("/game") // TODO gamecreation fertig machen und funktionalität hier hin
                    }}>Start
                    </button>
                </div>
            </>
        ) : (
            <LoadingScreen/>
        )

    }
}

export default withRouter(GameCreationScreen)