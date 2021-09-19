import {Component} from "react";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    currentPlayerName: string
}


interface State {
}


class Title extends Component<Props, State> {
    render() {
        return (
            <div className={"title"}>
                <div className={"row"}>
                    <div className={"column"}>
                        <h3 className={"row"}>{this.props.t("lobby.title.part1")}</h3>
                        <h2 className={"row"}>{this.props.t("lobby.title.part2")}</h2>
                    </div>
                    <h1 className={"column"}>{this.props.t("lobby.title.part3")}</h1>
                </div>
                <h3 className={"row playername"}>{this.props.currentPlayerName}</h3>
            </div>
        )
    }
}


export default withTranslation()(Title)