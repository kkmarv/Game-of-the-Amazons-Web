import {ChangeEvent, Component} from "react";
import {Player} from "../../requests";
import {PlayerList} from "./PlayerList";
import {AIOrNotSelection} from "./AIOrNotSelection";
import {AdvancedSettings} from "./AdvancedSettings";
import {TimerInput} from "./TimerInput";


interface Props {
    localPlayer: Player
}

interface State {
    hasSelectedBot: boolean
    opposingPlayer: Player | undefined
    settings: {
        players: number[]
        rowCount: number
        columnCount: number
        amazonCount: number
        maxTurnTime: number
        tiles: number[][]
    }
}

const defaultSettings = {
    players: [],
    rowCount: 10,
    columnCount: 10,
    amazonCount: 4,
    maxTurnTime: 30000,
    tiles: [
        [-1, -1, -1, 1, -1, -1, 1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [1, -1, -1, -1, -1, -1, -1, -1, -1, 1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [0, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, 0, -1, -1, 0, -1, -1, -1]
    ]
}

export class GameSettings extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasSelectedBot: true,
            opposingPlayer: undefined,
            settings: defaultSettings
        }
    }

    render() {
        return ( // TODO layout überlegen -> Passi fragen // TODO evtl player-selection in eigene komponente
            <div className={"game-settings"}>
                <div className={"player-selection"}>
                    <div className={"player1"}>
                        <h3>Player 1: {`${this.props.localPlayer.name} (you)`}</h3>
                    </div>
                    <div className={"player2"}>
                        <h3>Player 2:
                            {` ${this.state.opposingPlayer ? this.state.opposingPlayer.name : "<select>"}`}
                        </h3>
                        <AIOrNotSelection
                            hasSelectedBot={this.state.hasSelectedBot}
                            onSelect={(hasSelectedBot: boolean) => {
                                this.setState({hasSelectedBot: hasSelectedBot})
                            }}
                        />
                        <br/>
                        <PlayerList
                            localPlayer={this.props.localPlayer}
                            hasSelectedBot={this.state.hasSelectedBot}
                            onPlayerSelect={(player: Player) => {
                                this.setState({opposingPlayer: player})
                            }}
                        />
                    </div>
                </div>
                <TimerInput
                    turnTime={this.state.settings.maxTurnTime}
                    onChange={(maxTurnTime: number) => {
                        const newSettings = defaultSettings
                        newSettings["maxTurnTime"] = maxTurnTime
                        this.setState({settings: newSettings})
                    }}
                />
                <AdvancedSettings
                    rowCount={this.state.settings.rowCount}
                    columnCount={this.state.settings.columnCount}
                    amazonCount={this.state.settings.amazonCount}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const inputElement: HTMLInputElement = event.currentTarget
                        if (inputElement.id === "amazon-selection") {
                            // TODO
                        } else if (inputElement.id === "row-selection") {
                            // TODO
                        } else if (inputElement.id === "column-selection") {
                            // TODO
                        }
                    }}
                />
            </div>
        )
    }
}