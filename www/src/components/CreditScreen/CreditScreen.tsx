import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";


// type PathParamsType = {
//     note: string;
// };
// export type PropsType = RouteComponentProps<PathParamsType> & {};
//
// class NoteComponent extends Playback<PropsType, {}> {
//
//     constructor(props: PropsType) {
//         super(props);
//
//         // parsing the note out of the url parameter
//         this.note = mapLinkToNote(this.props.match.params.note);

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