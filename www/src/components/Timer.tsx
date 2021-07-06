import {Component} from "react";

type Props = {
    paused: boolean
    maxTurnTime: number // in ms
    onTimeIsUp: any
}

type State = {
    timeLeft: number // in ms
}

export class Timer extends Component<Props, State> {
    private static timer: NodeJS.Timeout

    constructor(props: Props) {
        super(props);
        if (props.maxTurnTime <= 1000) throw new RangeError("Turn time must be more than 1 second!")
        if (props.maxTurnTime > 120000) throw new RangeError("Turn time cannot be more than 2 minutes!")

        if (Timer.timer != undefined) clearInterval(Timer.timer)

        Timer.timer = setInterval(() => {
            if (this.state.timeLeft <= 1000) {
                this.props.onTimeIsUp()
                this.setState({timeLeft: this.props.maxTurnTime})
            } else if (!this.props.paused) this.setState({timeLeft: this.state.timeLeft - 1000})
        }, 1000)

        this.state = {
            timeLeft: props.maxTurnTime
        }
    }

    render() {
        return (
            <div className={"timer"}>
                <h1>{this.formatAsReadableTime(this.state.timeLeft)}</h1>
            </div>
        )
    }

    formatAsReadableTime(milliSeconds: number): string {
        if (this.props.maxTurnTime <= 60000) return (milliSeconds / 1000).toString()
        else return new Date(milliSeconds).toISOString().substr(14, 5)
    }
}