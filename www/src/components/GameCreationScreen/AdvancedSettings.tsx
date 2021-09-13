import {ChangeEvent, Component} from "react";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    boardSize: number
    amazonCount: number
    onAmazonChange: (event: ChangeEvent<HTMLInputElement>) => void
    onBoardSizeChange: (newBoardSize: number) => void
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
                                        min={2} max={64}
                                        value={this.props.amazonCount}
                                        onKeyDown={(event) => event.preventDefault()}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            this.props.onAmazonChange(event)
                                        }}
                                    />
                                </label>
                            </div>
                            <div className={"board-size"}>
                                <label id={"front"}>{`${this.props.t("settings.advanced.size")} `}</label>
                                <select>
                                    <option id={"row-selection"} value={"checkerboard"}
                                            onChange={(event) => {
                                                this.props.onBoardSizeChange(10)
                                            }}>{`${this.props.t("settings.advanced.checkerboard")} (10)`}
                                    </option>
                                    <option id={"column-selection"} value={"chessboard (8)"}
                                            onSelect={(event) => {
                                                this.props.onBoardSizeChange(8)
                                            }}>{`${this.props.t("settings.advanced.chessboard")} (8)`}
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