import {Component} from "react";


interface Props {
    currentPlayerName: string
}

export class GotAHeading extends Component<Props, any> {
    render() {
        return ( // TODO think of css class names
            <>
                <h3>Welcome to the</h3>
                <h2>Game of the</h2>
                <h1>Amazons</h1>
                <h3>{this.props.currentPlayerName}</h3>
            </>
        )
    }
}