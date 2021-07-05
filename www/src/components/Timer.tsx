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
        if (props.maxTurnTime < 1000) throw new RangeError("Turn time cannot be less than 1 second!")
        if (props.maxTurnTime > 120000) throw new RangeError("Turn time cannot be more than 2 minutes!")

        if (Timer.timer != undefined) clearInterval(Timer.timer)

        Timer.timer = setInterval(() => {
            console.log(this.props.paused)
            if (this.state.timeLeft <= 0) {
                this.props.onTimeIsUp()
                this.setState({timeLeft: this.props.maxTurnTime})
            }
            if (!this.props.paused) this.setState({timeLeft: this.state.timeLeft - 1000})
        }, 1000)

        this.state = {
            timeLeft: props.maxTurnTime,
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
        const seconds: number = (milliSeconds / 1000) % 60
        const minutes: number = (milliSeconds / 60000) % 60
        if (milliSeconds > 60000) return this.convertToDigitalFormat(minutes, seconds)
        else return (milliSeconds / 1000).toString()
    }

    convertToDigitalFormat(minutes: number, seconds: number): string {
        const minString: string = minutes < 10 ? "0" + minutes.toString() : minutes.toString()
        const secString: string = seconds < 10 ? "0" + seconds.toString() : seconds.toString()
        return minString + ":" + secString
    }
}