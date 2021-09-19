import {Component} from "react";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    onSelect: (hasSelectedBot: boolean) => void
    hasSelectedBot: boolean
}


interface State {
}


class AIOrNotSelection extends Component<Props, State> {
    render() {
        return (
            <>
                <div className={"radio"}>
                    <div className={"bot"}>
                        <label htmlFor="aiTrue">{this.props.t("settings.settings.bot")}</label>
                        <input
                            id={"aiTrue"} type={"radio"} name={"ai"}
                            checked={this.props.hasSelectedBot}
                            onChange={() => {
                                this.props.onSelect(true)
                            }}
                        />
                    </div>
                    <div className={"human"}>
                        <label htmlFor="aiFalse">{this.props.t("settings.settings.human")}</label>
                        <input
                            disabled={true} // it is not yet supported so we disabled it
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


export default withTranslation()(AIOrNotSelection)