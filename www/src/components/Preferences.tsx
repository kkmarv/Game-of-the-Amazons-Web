import React, {Component} from "react";
import {LanguageEnum, ThemeEnum} from "./LobbyScreen/lobbyScreenTypes";


interface Props {
    currentTheme: ThemeEnum
    currentLanguage: LanguageEnum
    switchTheme: () => void
    toggleLanguage: () => void
}

interface State {
}

export class Preferences extends Component<Props, State> {
    render() {
        return ( // TODO add icons
            <div className={"preferences"}>
                <button
                    id={"lang"}
                    value={this.props.currentLanguage} onClick={this.props.toggleLanguage}>
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