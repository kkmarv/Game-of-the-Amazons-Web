import {Component} from "react";


interface Props {
    currentPlayerName: string
}

export class GotAHeading extends Component<Props, any> {
    render() {
        return ( // TODO think of css class names
            <div className={"title"}>
                <div className={"localized-name"}>
                    <div>
                        <h3>Welcome to the</h3>
                        <h2>Game of the</h2>
                    </div>
                    <h1>Amazons</h1>
                </div>
                <h3 className={"player-name"}>{this.props.currentPlayerName}</h3>
            </div>
        )
    }
}