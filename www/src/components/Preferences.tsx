import React, {Component} from "react";


interface Props {
    currentTheme: string // TODO
    currentLanguage: string
    switchTheme: () => void
    toggleLanguage: () => void
}

interface State {
}

export class Preferences extends Component<Props, State> {
    render() {
        return (
            <div className={"preferences"}>
                <button value={this.props.currentLanguage} onClick={this.props.toggleLanguage}/>
                <button value={this.props.currentTheme} onClick={this.props.switchTheme}/>
            </div>
        )
    }
}