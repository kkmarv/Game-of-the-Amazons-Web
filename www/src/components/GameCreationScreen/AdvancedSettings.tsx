import {ChangeEvent, Component} from "react";


interface Props {
    boardSize: number
    amazonCount: number
    onAmazonChange: (event: ChangeEvent<HTMLInputElement>) => void
    onBoardSizeChange: (newBoardSize: number) => void
}

interface State {
    visible: boolean
}

export class AdvancedSettings extends Component<Props, State> {
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
                }}>Advanced Settings</u>
                {
                    this.state.visible ? (
                        <>
                            <div className={"number-of-amazons"}>
                                <label>{`Number of Amazons `}
                                    <input
                                        id={"amazon-selection"}
                                        type={"number"}
                                        value={this.props.amazonCount}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            this.props.onAmazonChange(event)
                                        }}
                                    />
                                </label>
                            </div>
                            <div className={"board-size"}>
                                <label id={"front"}>Board Size: </label>
                                <select>
                                    <option id={"row-selection"} value={"checkerboard"}
                                            onChange={(event) => {
                                                this.props.onBoardSizeChange(10)
                                            }}>Checkerboard (10)
                                    </option>
                                    <option id={"column-selection"} value={"chessboard (8)"}
                                            onSelect={(event) => {
                                                this.props.onBoardSizeChange(8)
                                            }}>Chessboard (8)
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