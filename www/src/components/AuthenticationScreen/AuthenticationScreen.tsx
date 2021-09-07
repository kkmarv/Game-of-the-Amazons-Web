import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AuthButton from "@hs-anhalt/auth-button";


interface Props {
    onAuthorize: () => void
}

interface State {
}

class AuthenticationScreen extends Component<RouteComponentProps & Props, State> {
    render() {
        return (
            <div className={"auth-button"}>
                <AuthButton
                    authServiceURL={"https://webengineering.ins.hs-anhalt.de:40989"}
                    serviceBaseURLs={["https://webengineering.ins.hs-anhalt.de:40917"]}
                    onAuthorize={() => {
                        this.props.onAuthorize()
                        this.props.history.push("/lobby")
                    }}
                />
            </div>
        )
    }
}

export default withRouter(AuthenticationScreen)