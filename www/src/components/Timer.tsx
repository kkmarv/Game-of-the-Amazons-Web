import {Component} from "react";

type Props = {
    maxTurnTime: number // in ms
}

type State = {
    timeLeft: number
}

export class Timer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        if (props.maxTurnTime < 1000) throw new RangeError("Turn time cannot be less than 1 second!")
        this.state = {
            timeLeft: props.maxTurnTime
        }
    }

    render() {
        return (
            <div className={"timer"}>
                <h1>{this.formatAsTime(this.state.timeLeft)}</h1>
            </div>
        )
    }

    formatAsTime(number: number): string {
        return "" // TODO
    }
}