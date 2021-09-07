import {Component} from "react";
import {GameSettings} from "./GameSettings";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props { // RAWR
}

interface State {
}

class GameCreationScreen extends Component<RouteComponentProps & Props, State> {
    render() {
        return (
            <>
                <div className={"title"}><h1>Create a Game</h1></div>
                <div className={"game-settings"}><GameSettings/></div>
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
        )
    }
}

export default withRouter(GameCreationScreen)