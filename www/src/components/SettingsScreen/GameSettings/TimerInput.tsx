import {ChangeEvent} from "react";
import {Component} from "react";
import {WithTranslation, withTranslation} from "react-i18next";


interface Props extends WithTranslation {
    turnTime: number
    onChange: (turnTime: number) => void
}


interface State {
}


class TimerInput extends Component<Props, State> {
    render() {
        return (
            <div className={"time-selection"}>
                <label>{`${this.props.t("settings.settings.time")} `}
                    <input
                        id={"turnTime"} type={"number"} name={"time"}
                        value={this.props.turnTime / 1000} min={5} max={600}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const inputValue: number = parseInt(event.currentTarget.value)
                            if (inputValue >= 5 && inputValue <= 600) this.props.onChange(inputValue * 1000)
                        }}
                    />
                    {` ${this.props.t("settings.settings.sec")}`}
                </label>
            </div>
        )
    }
}


export default withTranslation()(TimerInput)