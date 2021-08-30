import React, {Component} from "react";


interface Props {
    currentTheme: string // TODO
    currentLanguage: string
    switchTheme: () => void
    toggleLanguage: () => void
}

interface State {
}

export class PreferenceButtons extends Component<Props, State> {
    render() {
        return (
            <>
                <button id={"langButton"} value={this.props.currentLanguage} onClick={this.props.toggleLanguage}/>
                <button id={"themeButton"} value={this.props.currentTheme} onClick={this.props.switchTheme}/>
            </>
        )
    }
}