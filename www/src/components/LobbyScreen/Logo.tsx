import {Component} from "react";
import logo from "../../assets/images/Logo_HSA.png"


interface Props {
    onClick?: () => void
}

interface State {
}

export class Logo extends Component<Props, State> {
    render() {
        return (
            <div className={"logo btn"} onClick={this.props.onClick}>
                <img src={logo} alt={"Anhalt University Logo"}/>
            </div>
        )
    }
}