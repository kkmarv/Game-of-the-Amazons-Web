import {Component} from "react";
import video from '../../assets/videos/idle.mp4'
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
}


interface State {
    tutorialIndex: number
}


class Tutorial extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        console.log(video)

        this.state = {
            tutorialIndex: 0,
        }
    }

    nextTips = () => {
        this.setState({
            tutorialIndex: (this.state.tutorialIndex + 1) % 4
        })
    }

    previousTips = () => {
        this.setState({
            tutorialIndex: (this.state.tutorialIndex + 3) % 4
        })
    }

    render() {
        return (
            <div className={"tutorial"}>
                <div>
                    <button id={"previous"} onClick={this.previousTips}/>
                    <div>
                        <span>{this.props.t("tutorial.title" + this.state.tutorialIndex)}</span>
                        <p>{this.props.t("tutorial.tip" + this.state.tutorialIndex + "1")}</p>
                        <p>{this.props.t("tutorial.tip" + this.state.tutorialIndex + "2")}</p>
                        <p>{this.props.t("tutorial.tip" + this.state.tutorialIndex + "3")}</p>
                        <p>{this.props.t("tutorial.tip" + this.state.tutorialIndex + "4")}</p>
                    </div>
                    <button id={"next"} onClick={this.nextTips}/>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Tutorial)