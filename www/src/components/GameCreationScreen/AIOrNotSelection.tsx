import {Component} from "react";


interface Props {
    onSelect: (hasSelectedBot: boolean) => void
    hasSelectedBot: boolean
}

interface State {
}

export class AIOrNotSelection extends Component<Props, State> {
    render() {
        return (
            <>
                <div className={"radio"}>
                    <div className={"bot"}>
                        <label htmlFor="aiTrue">Play vs Bot</label>
                        <input
                            id={"aiTrue"} type={"radio"} name={"ai"}
                            checked={this.props.hasSelectedBot}
                            onChange={() => {
                                this.props.onSelect(true)
                            }}
                        />
                    </div>
                    <div className={"human"}>
                        <label htmlFor="aiFalse">Play vs Human</label>
                        <input
                            id={"aiFalse"} type={"radio"} name={"ai"}
                            checked={!this.props.hasSelectedBot}
                            onChange={() => {
                                this.props.onSelect(false)
                            }}
                        />
                    </div>
                </div>
            </>
        )
    }
}