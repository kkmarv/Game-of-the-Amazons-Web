import "../styles/components/_loading-screen.scss"

import React, {Component} from "react";


export class LoadingScreen extends Component<any, any> {
    render() {
        return <div className={"loading"}><h1>Loading...</h1></div>
    }
}