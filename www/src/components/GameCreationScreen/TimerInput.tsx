import {ChangeEvent} from "react";
import {Component} from "react";


interface Props {
    turnTime: number
    onChange: (turnTime: number) => void
}

interface State {
}

export class TimerInput extends Component<Props, State> {
    render() {
        return (
            <div className={"time-selection"}>
                <label>{"Draw time "}
                    <input
                        id={"turnTime"} type={"number"} name={"time"} value={this.props.turnTime / 1000}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const inputValue: number = parseInt(event.currentTarget.value)
                            if (inputValue >= 5 && inputValue <= 600) this.props.onChange(inputValue * 1000)
                        }}
                    />
                    {" sec"}
                </label>
            </div>
        )
    }
}

