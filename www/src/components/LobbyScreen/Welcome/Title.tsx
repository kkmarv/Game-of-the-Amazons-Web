import {Component} from "react";


interface Props {
    currentPlayerName: string
}

interface State {
}

export class Title extends Component<Props, State> {
    render() {
        return (
            <div className={"title"}>
                <div className={"row"}>
                    <div className={"column"}>
                        <h3 className={"row"}>Welcome to the</h3>
                        <h2 className={"row"}>Game of the</h2>
                    </div>
                    <h1 className={"column"}>Amazons</h1>
                </div>
                <h3 className={"row"}>{this.props.currentPlayerName}</h3>
            </div>
        )
    }
}