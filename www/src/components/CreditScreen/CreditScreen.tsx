import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props {
    onLeave: () => void
}

interface State {
}

class CreditScreen extends Component<RouteComponentProps & Props, State> {
    render() {
        return null // TODO research react router
    }
}

export default withRouter(CreditScreen)