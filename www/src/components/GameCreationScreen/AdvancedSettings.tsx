import {ChangeEvent, Component} from "react";


interface Props {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    rowCount: number
    columnCount: number
    amazonCount: number
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
                                <h3>{`Number of Amazons: `}
                                    <input
                                        id={"amazon-selection"}
                                        type={"number"}
                                        value={this.props.amazonCount}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            this.props.onChange(event)
                                        }}
                                    />
                                </h3>
                            </div>
                            <div className={"board-size"}>
                                <h3>Board Size</h3>
                                <h4>{`Rows: `}
                                    <input
                                        id={"row-selection"}
                                        type={"number"}
                                        value={this.props.rowCount}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            this.props.onChange(event)
                                        }}
                                    />
                                </h4>
                                <h4>{`Columns: `}
                                    <input
                                        id={"column-selection"}
                                        type={"number"}
                                        value={this.props.columnCount}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                            this.props.onChange(event)
                                        }}
                                    />
                                </h4>
                            </div>
                        </>
                    ) : null
                }
            </div>
        )
    }
}