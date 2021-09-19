import {Component} from "react";


interface Props {
    timeLeft: number // in ms
}


interface State {
}


export class Timer extends Component<Props, State> {
    render() { // TODO move red coloring logic from css here (@Both), may be deprecated by now
        return (
            <div className={"timer " + this.props.timeLeft}>
                <h1>{this.formatAsReadableTime(this.props.timeLeft)}</h1>
            </div>
        )
    }

    formatAsReadableTime(milliSeconds: number): string {
        if (this.props.timeLeft <= 60000) return Math.round((milliSeconds / 1000)).toString()
        else return new Date(milliSeconds).toISOString().substr(14, 5)
    }
}