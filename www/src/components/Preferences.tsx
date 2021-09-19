import React, {Component} from "react";
import {ThemeEnum} from "./LobbyScreen/lobbyScreenTypes";
import i18n from "i18next";
import deIcon from "../assets/images/de.svg"
import enIcon from "../assets/images/en.svg"


interface Props {
    currentTheme: ThemeEnum
    switchTheme: () => void
}


interface State {
    language: string
}


export class Preferences extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            language: i18n.language
        }
    }

    render() {
        return (
            <div className={"preferences"}>
                <button id={"lang"} value={i18n.language}
                        onClick={(event) => {
                            if (i18n.language === "de") {
                                i18n.changeLanguage("en").then(() => {
                                    this.setState({language: i18n.language})
                                })
                            } else if (i18n.language === "en") {
                                i18n.changeLanguage("de").then(() => {
                                    this.setState({language: i18n.language})
                                })
                            }
                        }}>
                    <img src={i18n.language === "de" ? deIcon : enIcon} alt={"Language Icon"}/>
                </button>
                {/*<button id={"theme"} value={this.props.currentTheme}*/}
                {/*        onClick={this.props.switchTheme}*/}
                {/*>*/}
                {/*    <img src={""} alt={"Theme Icon"}/>*/}
                {/*</button>*/}
            </div>
        )
    }
}
