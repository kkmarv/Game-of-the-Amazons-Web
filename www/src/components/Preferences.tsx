import React, {Component} from "react";
import {ThemeEnum} from "./LobbyScreen/lobbyScreenTypes";
import i18n from "i18next";


interface Props {
    currentTheme: ThemeEnum
    switchTheme: () => void
}


interface State {
}


export class Preferences extends Component<Props, State> {
    render() {
        return ( // TODO add icons
            <div className={"preferences"}>
                <button
                    id={"lang"}
                    value={i18n.language} onClick={() => {
                    i18n.language === "de" ? i18n.changeLanguage("en") : i18n.changeLanguage("de")
                }}>
                    <img src={""} alt={""}/>
                </button>
                <button
                    id={"theme"}
                    value={this.props.currentTheme} onClick={this.props.switchTheme}>
                    <img src={""} alt={""}/>
                </button>
            </div>
        )
    }
}
