import './styles/components/_app.scss';

import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CreditScreen from "./components/CreditScreen/CreditScreen";
import GameCreationScreen from "./components/GameCreationScreen/GameCreationScreen";
import {GameBoardScreen} from "./components/GameBoardScreen/GameBoardScreen";
import LobbyScreen from "./components/LobbyScreen/LobbyScreen";
import AuthenticationScreen from "./components/AuthenticationScreen/AuthenticationScreen";


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
                                    <Route exact path="/lobby" component={LobbyScreen}/>
                                    <Route exact path="/credits" component={CreditScreen}/>
                                    <Route exact path="/create" component={GameCreationScreen}/>
                                    <Route exact path="/game" component={GameBoardScreen}/>
                                    <Redirect to={"/lobby"}/>
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