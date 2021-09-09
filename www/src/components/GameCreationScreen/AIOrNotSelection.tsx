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
                <label htmlFor="aiTrue">Bot</label>
                <input
                    id={"aiTrue"} type={"radio"} name={"ai"}
                    checked={this.props.hasSelectedBot}
                    onChange={() => {
                        this.props.onSelect(true)
                    }}
                />
                <label htmlFor="aiFalse">Human</label>
                <input
                    id={"aiFalse"} type={"radio"} name={"ai"}
                    checked={!this.props.hasSelectedBot}
                    onChange={() => {
                        this.props.onSelect(false)
                    }}
                />
            </>
        )
    }
}