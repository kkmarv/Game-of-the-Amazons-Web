import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props {
    onLeave: () => void
}


interface State {
}


class CreditScreen extends Component<RouteComponentProps & Props, State> {
    render() {
        return ( // TODO Back button is reused here, could be moved to own component
            <>
                <h1>Credits</h1>
                <p>We, that are the two students Pascal Wegener and Marvin Kästing, have developed this website during
                    the second semester in the module Web and Media Programming of Prof. Andreas Both.</p>
                <p>During the whole development Toni Barth bravely assisted by us.</p>
                <p>The goal of this site is to provide a user interface for the AI for the Game of the Amazons, which
                    was
                    developed by students of the University of Paderborn in the winter semester 20/21.
                </p>
                <div className={"back-button"}>
                    <button className={"btn"} onClick={() => {
                        this.props.history.push("/lobby")
                    }}>Back to Lobby
                    </button>
                </div>
            </>
        )
    }
}


export default withRouter(CreditScreen)

/*
* Wir, das sind die beiden Studenten Pascal Wegener und Marvin Kästing, haben diese Webseite während des zweiten Semesters im Modul Web- und Medienprogrammierung von Herrn Prof. Andreas Both entwickelt.

Während der gesamten Entwicklung stand uns Toni Barth tapfer zur Seite.

Ziel dieser Seite ist es, der von Studenten der Universität Paderborn im Wintersemester 20/21 entwickelten KI zum Amazonenspiel, ein User Interface zu bieten.
* */