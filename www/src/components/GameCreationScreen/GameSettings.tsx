import {Component} from "react";


interface Props {
}

interface State {
}

export class GameSettings extends Component<Props, State> {
    render() {
        return ( // TODO layout überlegen, passi fragen
            <>
                <div className={"player-selection"}>
                    <h3>Player 1: </h3>
                    <div className={"player2"}>
                        <h3>Player 2: </h3>
                        <input id={"aiTrue"} type={"radio"} name={"ai"} value={1} checked/>
                        <label htmlFor="aiTrue">Bot</label>
                        <input id={"aiFalse"} type={"radio"} name={"ai"} value={0}/>
                        <label htmlFor="aiFalse">Human</label>
                    </div>
                </div>
                <div className={"time-selection"}>
                    <h3>Turn Time: </h3>
                    <input id={"turnTime"} type={"number"} name={"time"} value={60}/>
                </div>
                <div className={"advanced-selection"}>

                </div>
            </>
        )
    }
}