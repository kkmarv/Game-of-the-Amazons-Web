import {Component} from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Props extends RouteComponentProps {
}


interface State {
}


class ErrorScreen extends Component<Props, State> {
    render() {
        return (
            <>
                <h1>GREAT!</h1>
                <h2>Absolutely fkng great!</h2>
                <h3>{"y̶̨̨̪̜̩̯̰̥̰̠͖͍̫͕̫̪̐̏̅̆̉͊̌̈͐̅̈́ͅo̷̥̘̙̩̘̫̻̺͚̦̠̘̟̒̂̌͗͐͑̐̍́͋̌̇̃͒͝u̴̠͈̪̜̗̤̱̞̟̹̖͙͑̋͗̑͋̂̔̂͆̏͊̊̀ͅ ̴͖̝̬̬̬̞̗͇͉̜̘̯͕̳͋͂̎̑̂̓͝b̴̪̈́̎͛̂̊͊̚̕͘r̴̡̘͓̹̝͖͇̩̬͓̝̼̩̼̩̳̈́͌̓͛̄̌̀̾͜o̸̡̧̥̬̤͕̬̺̖͓̯̰̝̱̯̼͛̎̾̑̊́̀͜k̷̛͙͇̰̫̈͛̾ͅȩ̷̨̜̞̼͖̺̝̜͙͇̯̝̦͂̏̀̉̒̒̈́̃̀̇ ̷̨̢͉̩̺͙́̑̈̓̐̄͘t̶̙͇̹̗̤̫̠̔̊̄̓̇̉́̃̉̋̇͊͋̔͆̃͒͘͝͠h̷̡̧̼̘̳͓̣̮̹̬̯̱͕͓͂̇̆̔̊͑̏̀̋͆͆͛̄͑̽̈́͋̍̈́̕e̴̮̪̍̾͂̑̈́͛̌̃͑̌̄́͆̆̒̃̕̕͝͠ ̴͓͉̜̬̻̯͍̱̥̳̲̺͇̥͆͊͛̋̾̊̔̃̓͝p̸͇̥͉̥̘̜͙̦͔̰̞̼̥̣͚̎̎̏̓͗̂̽̌ͅa̴̢̧̡͈͈͓̫͉̱̻̭͇̗̭̙̬̠̐͋̐̅̓̉̚͜͠ǵ̵̭̥̪͚͈̰͎̖̫͍̈́͋͂̽̈́̉͜͠ḗ̶̢̬̯̬͉͂̈́̈́̊͂̍̇̀̓̈́͛̾͠͠ͅ\n>"}</h3>
                {this.props.match.url === "/error" ? <h4>There is no additional info.</h4> : null}
                {
                    this.props.match.url === "/error/player" ?
                        <>
                            <h4>We could not verify your Player Account</h4>
                            <p>This could be due to a network issue or too long inactivity.</p>
                        </> : null
                }
                {
                    this.props.match.url === "/error/game" ?
                        <>
                            <h4>We could not retrieve any game information from the server</h4>
                            <p>This could be due to a network issue.</p>
                        </> : null
                }
                {
                    this.props.match.url === "/error/turn" ?
                        <>
                            <h4>We could not send your turn to the server</h4>
                            <p>This could be due to a network issue.</p>
                        </> : null
                }
                <p>Reload the page and try again.</p>
            </>
        )
    }
}


export default withRouter(ErrorScreen)