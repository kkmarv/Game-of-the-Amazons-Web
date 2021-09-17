import {Component} from "react";
import {getAllPlayers, Player} from "../../../requests";
import {WithTranslation, withTranslation} from "react-i18next";


interface Props extends WithTranslation {
    localPlayer: Player
    hasSelectedBot: boolean
    onPlayerSelect: (player: Player) => void
}


interface State {
    isLoaded: boolean
    relevantPlayers: Player[]
}


class PlayerList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoaded: false,
            relevantPlayers: []
        }
    }

    async componentDidMount() {
        this.setState({relevantPlayers: await this.getRelevantPlayers()}, () => {
            if (this.state.relevantPlayers.length !== 0) {
                this.setState({isLoaded: true}, () => {
                    this.props.onPlayerSelect(this.state.relevantPlayers[0]) // set initial value
                })
            }
        })
    }

    async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps.hasSelectedBot !== this.props.hasSelectedBot) {
            this.setState({
                isLoaded: false,
                relevantPlayers: await this.getRelevantPlayers()
            }, () => {
                if (this.state.relevantPlayers.length !== 0) {
                    this.props.onPlayerSelect(this.state.relevantPlayers[0]) // select first available player
                    this.setState({isLoaded: true})
                }

            })
        }
    }

    render() {
        return (
            <>
                <div className={"opponent"}>
                    <label htmlFor="playerNames">{`${this.props.t("settings.settings.choose")} `}</label>
                    <select id="playerNames" name="playerNames" disabled={!this.state.isLoaded}>
                        {this.state.isLoaded ?
                            (
                                this.generateOptionElements()
                            ) : (
                                <option>{this.props.t("loading")}</option>
                            )}
                    </select>
                </div>
            </>
        )
    }


    /* Retrieve either all AI or human players depending on current props. */
    private async getRelevantPlayers(): Promise<Player[]> {
        const relevantPlayers: Player[] = []
        const allPlayers: Player[] = await getAllPlayers()
        for (let player of allPlayers) {
            if (!player.controllable === this.props.hasSelectedBot) {
                // make sure the player can't select themselves:
                if (player.id !== this.props.localPlayer.id) relevantPlayers.push(player)
            }
        }
        return relevantPlayers
    }

    /* Generate all the option elements for the select element based on this states wanted players. */
    private generateOptionElements(): JSX.Element[] {
        const options: JSX.Element[] = []
        for (let player of this.state.relevantPlayers) {
            options.push(
                <option
                    value={player.name}
                    onClick={() => {
                        this.props.onPlayerSelect(player)
                    }}
                >{player.name}</option>
            )
        }
        return options
    }
}


export default withTranslation()(PlayerList)