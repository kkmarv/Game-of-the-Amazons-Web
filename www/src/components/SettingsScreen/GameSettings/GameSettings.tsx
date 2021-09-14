import {ChangeEvent, Component} from "react";
import {Player} from "../../../requests";
import PlayerList from "./PlayerList";
import AIOrNotSelection from "./AIOrNotSelection";
import AdvancedSettings from "./AdvancedSettings/AdvancedSettings";
import TimerInput from "./TimerInput";
import {Settings} from "../settingsScreenTypes";
import {withTranslation, WithTranslation} from "react-i18next";


interface Props extends WithTranslation {
    settings: Settings
    localPlayer: Player
    updateSettings: (settingToChange: keyof Settings, newValue: any) => void
}


interface State {
    hasSelectedBot: boolean
    opposingPlayer: Player | undefined
}


class GameSettings extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasSelectedBot: true,
            opposingPlayer: undefined
        }
    }

    render() {
        return ( // TODO evtl player-selection in eigene komponente
            <div className={"game-settings"}>
                <div className={"player-selection"}>
                    <div className={"player1"}>
                        <h3>{`${this.props.t("settings.settings.player")} 1: ${this.props.localPlayer.name} (${this.props.t("settings.settings.you")})`}</h3>
                    </div>
                    <div className={"player2"}>
                        <h3>{`${this.props.t("settings.settings.player")} 2: ${this.props.settings.opponent.name}`}</h3>
                        <AIOrNotSelection
                            hasSelectedBot={this.state.hasSelectedBot}
                            onSelect={(hasSelectedBot: boolean) => {
                                this.setState({hasSelectedBot: hasSelectedBot})
                            }}
                        />
                        <PlayerList
                            localPlayer={this.props.localPlayer}
                            hasSelectedBot={this.state.hasSelectedBot}
                            onPlayerSelect={(player: Player) => {
                                this.props.updateSettings("opponent", player)
                            }}
                        />
                    </div>
                </div>
                <TimerInput
                    turnTime={this.props.settings.maxTurnTime}
                    onChange={(maxTurnTime: number) => {
                        this.props.updateSettings("maxTurnTime", maxTurnTime)
                    }}
                />
                <AdvancedSettings
                    boardSize={this.props.settings.boardSize}
                    amazonCount={this.props.settings.amazonCount}
                    onBoardSizeChange={(newBoardSize: number) => {
                        this.props.updateSettings("boardSize", newBoardSize)
                    }}
                    onAmazonChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const inputElement: HTMLInputElement = event.currentTarget
                        if (inputElement.id === "amazon-selection") {
                            let newValue = inputElement.valueAsNumber
                            const oldValue = this.props.settings.amazonCount

                            if (newValue > oldValue) newValue = (newValue - 1) * 2
                            else if (newValue < oldValue) newValue = (newValue + 1) / 2

                            this.props.updateSettings("amazonCount", newValue)
                        } else {
                            if (inputElement.id === "row-selection") {
                                this.props.updateSettings("boardSize", 10)
                            } else if (inputElement.id === "column-selection") {
                                this.props.updateSettings("boardSize", 8)
                            }
                        }
                    }}
                />
            </div>
        )
    }
}


export default withTranslation()(GameSettings)