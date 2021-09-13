import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    onLeave: () => void
}


interface State {
}


class CreditScreen extends Component<RouteComponentProps & Props, State> {
    render() {
        return ( // TODO Back button is reused here, could be moved to own component
            <>
                <h1>{this.props.t("credits.title")}</h1>
                <p>{this.props.t("credits.part1")}</p>
                <p>{this.props.t("credits.part2")}</p>
                <p>{this.props.t("credits.part3")}</p>
                <div className={"back-button"}>
                    <button className={"btn"} onClick={() => {
                        this.props.history.push("/lobby")
                    }}>{this.props.t("buttons.lobby")}
                    </button>
                </div>
            </>
        )
    }
}


export default withRouter(withTranslation()(CreditScreen))
