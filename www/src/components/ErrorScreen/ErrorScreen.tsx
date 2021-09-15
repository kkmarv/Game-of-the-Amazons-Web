import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withTranslation, WithTranslation} from "react-i18next";
import "../../styles/components/_error-screen.scss"


interface Props extends RouteComponentProps, WithTranslation {
}


interface State {
}


class ErrorScreen extends Component<Props, State> {
    render() {
        const path = this.props.location.pathname
        return (
            <div className={"error-screen"}>
                <h1>{this.props.t("error.title")}</h1>
                <h2>{this.props.t("error.subtitle")}</h2>
                <h3>{this.props.t("error.demon")}</h3>
                {this.props.match.url === "/error" ? <h4>{this.props.t("error.additional")}</h4> : null}
                {
                    path === "/error/player" || path === "/game/error/player" ?
                        <>
                            <h4>{this.props.t("error.player.info")}</h4>
                            <p>{this.props.t("error.player.text")}</p>
                        </> : null
                }
                {
                    path === "/error/game" || path === "/game/error/game" ?
                        <>
                            <h4>{this.props.t("error.game.info")}</h4>
                            <p>{this.props.t("error.game.text")}</p>
                        </> : null
                }
                {
                    path === "/error/turn" || path === "/game/error/turn" ?
                        <>
                            <h4>{this.props.t("error.turn.info")}</h4>
                            <p>{this.props.t("error.turn.text")}</p>
                        </> : null
                }
                <p>{this.props.t("error.reload")}</p>
            </div>
        )
    }
}


export default withRouter(withTranslation()(ErrorScreen))