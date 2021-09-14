import {ChangeEvent, Component} from "react";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    boardSize: number
    amazonCount: number
    onBoardSizeChange: (newBoardSize: number) => void
    onAmazonCountChange: (newValue: number) => void
}


interface State {
    visible: boolean
}


class AdvancedSettings extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        return (
            <div className={"advanced-selection"}>
                <u onClick={() => {
                    this.setState({visible: !this.state.visible})
                }}>{this.props.t("settings.advanced.title")}</u>
                {
                    this.state.visible ? (
                        <>
                            <div className={"number-of-amazons"}>
                                <label>{`${this.props.t("settings.advanced.number")} `}
                                    <input
                                        id={"amazon-selection"} type={"number"} disabled={false} // TODO
                                        min={4} max={8}
                                        value={this.props.amazonCount}
                                        onKeyDown={(event) => event.preventDefault()}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            this.props.onAmazonCountChange(event.currentTarget.valueAsNumber)
                                        }}
                                    />
                                </label>
                            </div>
                            <div className={"board-size"}>
                                <label id={"front"}>{`${this.props.t("settings.advanced.size")} `}</label>
                                <select>
                                    <option id={"row-selection"} value={10}
                                            onClick={() => {
                                                this.props.onBoardSizeChange(10)
                                            }}>{`${this.props.t("settings.advanced.checkerboard")} (10)`}
                                    </option>
                                    <option id={"column-selection"} value={12}
                                            onClick={() => {
                                                this.props.onBoardSizeChange(12)
                                            }}>{`${this.props.t("settings.advanced.checkerboard")} (12)`}
                                    </option>
                                </select>
                            </div>
                        </>
                    ) : null
                }
            </div>
        )
    }
}


export default withTranslation()(AdvancedSettings)