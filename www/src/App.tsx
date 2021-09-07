import './styles/components/_app.scss';

import React, {Component} from 'react';
import AuthButton from "@hs-anhalt/auth-button"
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {CreditScreen} from "./components/CreditScreen/CreditScreen";
import {GameCreationScreen} from "./components/GameCreationScreen/GameCreationScreen";
import {useHistory} from 'react-router-dom';
import {GameBoardScreen} from "./components/GameBoardScreen/GameBoardScreen";
import LobbyScreen from "./components/LobbyScreen/LobbyScreen";


interface Props {
}

interface State {
    isAuthenticated: boolean
}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAuthenticated: false
        }
    }

    render() {
        return (
            <div className={"App"}>
                {
                    this.state.isAuthenticated ? (
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/lobby" component={LobbyScreen}/>
                                <Route exact path="/credits" component={CreditScreen}/>
                                <Route exact path="/create" component={GameCreationScreen}/>
                                <Route exact path="/game" component={GameBoardScreen}/>
                                <Redirect to={"/lobby"}/>
                            </Switch>
                        </BrowserRouter>
                    ) : (
                        <AuthButton
                            authServiceURL={"https://webengineering.ins.hs-anhalt.de:40989"}
                            serviceBaseURLs={["https://webengineering.ins.hs-anhalt.de:40917"]}
                            onAuthorize={() => {
                                console.log("Authentication successful!")
                                this.setState({isAuthenticated: true})
                                useHistory().push('/lobby')
                            }}
                        />
                    )
                }
            </div>
        )
    }
}