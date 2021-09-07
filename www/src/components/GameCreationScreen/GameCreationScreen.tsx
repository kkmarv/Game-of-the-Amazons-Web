import {Component} from "react";


interface Props {
    onLeave: () => void
    onGameCreation: () => void
}

interface State {
}

export class GameCreationScreen extends Component<Props, State> {
    render() {
        return null // TODO research react router
    }
}