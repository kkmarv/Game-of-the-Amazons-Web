import {Component} from "react";

type Props = {
    timeLeft: number // in ms
}

export class Timer extends Component<Props, any> {
    render() { // TODO move red coloring logic from css here (@Both)
        return (
            <div className={"timer " + this.props.timeLeft}>
                <h1>{this.formatAsReadableTime(this.props.timeLeft)}</h1>
            </div>
        )
    }

    formatAsReadableTime(milliSeconds: number): string {
        if (this.props.timeLeft <= 60000) return (milliSeconds / 1000).toString()
        else return new Date(milliSeconds).toISOString().substr(14, 5)
    }
}