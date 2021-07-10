import {Component} from "react";

type Props = {
    paused: boolean
    timeLeft: number // in ms
}

type State = {
    timeLeft: number // in ms
}

export class Timer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        if (props.timeLeft <= 1000) throw new RangeError("Turn time must be more than 1 second!")
        if (props.timeLeft > 120000) throw new RangeError("Turn time cannot be more than 2 minutes!")
    }

    render() {
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