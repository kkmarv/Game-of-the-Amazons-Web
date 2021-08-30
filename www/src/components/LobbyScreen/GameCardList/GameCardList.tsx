import {Component} from "react";
import {BasicGame} from "../../../requests";
import {GameCard} from "./GameCard";
import {GameCardButton} from "./GameCardButton";


interface Props {
    gamesList: BasicGame[]
}

interface State {
    selection: string // "your", "open", "ongoing", "finished"
}

export class GameCardList extends Component<Props, State> {
    private yourGames: BasicGame[]
    private openGames: BasicGame[]
    private ongoingGames: BasicGame[]
    private finishedGames: BasicGame[]

    constructor(props: Props) {
        super(props);

        this.yourGames = this.getYourGames()
        this.openGames = this.getOpenGames()
        this.ongoingGames = this.getOngoingGames()
        this.finishedGames = this.getFinishedGames()

        this.state = {
            selection: "open"
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        if (prevProps.gamesList.length !== this.props.gamesList.length) { // this will cause problems with many users
            this.yourGames = this.getYourGames()
            this.openGames = this.getOpenGames()
            this.ongoingGames = this.getOngoingGames()
            this.finishedGames = this.getFinishedGames()
        }
    }

    render() {
        return (
            <>
                <GameCardButton onClick={this.handleClick}/>
                <GameCardButton onClick={this.handleClick}/>
                <GameCardButton onClick={this.handleClick}/>
                <GameCardButton onClick={this.handleClick}/>
                {this.getGameCards()}
            </>
        )
    }


    private handleClick = () => {
        // TODO
    }


    private getGameCards(): JSX.Element[] {
        if (this.state.selection === "open") {
            return this.openGames.map((openGame) => {
                return <GameCard game={openGame}/>
            })
        } else if (this.state.selection === "your") {
            return this.yourGames.map((yourGame) => {
                return <GameCard game={yourGame}/>
            })
        } else if (this.state.selection === "ongoing") {
            return this.ongoingGames.map((ongoingGame) => {
                return <GameCard game={ongoingGame}/>
            })
        } else {
            return this.finishedGames.map((finishedGame) => {
                return <GameCard game={finishedGame}/>
            })
        }
    }

    // TODO

    private getYourGames(): BasicGame[] {
        return []
    }

    private getOpenGames(): BasicGame[] {
        return []
    }

    private getOngoingGames(): BasicGame[] {
        return []
    }

    private getFinishedGames(): BasicGame[] {
        return []
    }
}