import '../styles/components/_app.scss';

import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreditScreen from "./CreditScreen/CreditScreen";
import GameCreationScreen from "./SettingsScreen/SettingsScreen";
import GameBoardScreen from "./GameBoardScreen/GameBoardScreen";
import LobbyScreen from "./LobbyScreen/LobbyScreen";
import AuthenticationScreen from "./AuthenticationScreen/AuthenticationScreen";
import ErrorScreen from "./ErrorScreen/ErrorScreen";


interface Props {
}


interface State {
    isAuthorized: boolean
}


export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAuthorized: false
        }
    }

    render() {
        return (
            <div className={"App"}>
                <BrowserRouter>
                    <Switch>
                        {
                            this.state.isAuthorized ? (
                                <>
                                    <Route exact path="/"><Redirect to="/lobby"/></Route>
                                    <Route exact path="/lobby" component={LobbyScreen}/>
                                    <Route exact path="/create" component={GameCreationScreen}/>
                                    <Route exact path="/credits" component={CreditScreen}/>
                                    <Route exact path="/game/:id" component={GameBoardScreen}/>
                                    <Route exact path="/error" component={ErrorScreen}/>
                                    <Route exact path="/error/player" component={ErrorScreen}/>
                                    <Route exact path="/error/turn" component={ErrorScreen}/>
                                    <Route exact path="/error/game" component={ErrorScreen}/>
                                </>
                            ) : (
                                <AuthenticationScreen onAuthorize={() => {
                                    this.setState({isAuthorized: true}, () => {
                                        console.log("Authentication successful!")
                                    })
                                }}/>
                            )
                        }
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}