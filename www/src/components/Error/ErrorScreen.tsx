import {Component} from "react";


interface Props {
}

interface State {
}

export class ErrorScreen extends Component<Props, State> {
    render() {
        return (
            <>
                <h1>GREAT! ABSOLUTELY FKNG GREAT!</h1>
                <h2>(you broke the page)</h2>
            </>
        ) // TODO
    }
}