import "../styles/components/_loading-screen.scss"

import React, {Component} from "react";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
}


interface State {
}


class LoadingScreen extends Component<Props, State> {
    render() {
        return <div className={"loading"}><h1>{this.props.t("loading")}</h1></div>
    }
}


export default withTranslation()(LoadingScreen)