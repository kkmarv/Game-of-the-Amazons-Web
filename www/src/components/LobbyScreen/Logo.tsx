import {Component} from "react";
import logo from "../../assets/images/Logo_HSA_a_o_Standorte_oneliner-400px.png"


interface Props {
    onClick?: () => void
}

interface State {
}

export class Logo extends Component<Props, State> {
    render() {
        return (
            <div className={"logo btn"}>
                <button onClick={this.props.onClick}>
                    <img src={logo} alt={"Anhalt University Logo"}/>
                </button>
            </div>
        )
    }
}