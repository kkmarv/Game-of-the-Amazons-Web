import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";

import GameCardList from "../../../components/LobbyScreen/GameCardList/GameCardList";
import {ownPlayer} from "../../../__mocks__/requests";
import {createAiPlayer, createGame, getAllGames, Player, reset} from "../../../requests";
import {defaultSettings} from "../../../components/SettingsScreen/settingsScreenTypes";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", async () => {
        const mockFunction = jest.fn();
        const gamesList = await getAllGames()
        const tree = renderer.create(
            <GameCardList
                localPlayer={ownPlayer}
                gamesList={gamesList}
                onCreateNewGame={mockFunction}
            />).toJSON();

        expect(tree).toMatchSnapshot();
    })
})


describe("Blackbox Tests", () => { // they have to exist, don't they?
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        reset()
    });


    describe("Render Tests", () => {
        it("renders", async () => {
            const mockFunction = jest.fn();
            const gamesList = await getAllGames()

            act(() => {
                ReactDOM.render(
                    <BrowserRouter>
                        <GameCardList
                            localPlayer={ownPlayer}
                            gamesList={gamesList}
                            onCreateNewGame={mockFunction}
                        />
                    </BrowserRouter>, container)
            })

            const mainDiv = document.querySelector(".games") as HTMLDivElement
            const scrollElement = document.querySelector("#scroll")

            expect(mainDiv).toBeTruthy()
            expect(scrollElement).toBeTruthy()
        })

        it("renders correctly with default settings", async () => {
            const mockFunction = jest.fn();
            const gamesList = await getAllGames()

            act(() => {
                ReactDOM.render(
                    <BrowserRouter>
                        <GameCardList
                            localPlayer={ownPlayer}
                            gamesList={gamesList}
                            onCreateNewGame={mockFunction}
                        />
                    </BrowserRouter>, container)
            })

            const gameCardElements = document.querySelectorAll(".game-card")

            expect(gameCardElements).toHaveLength(0)
        })

        it("renders correctly with 2 created games", async () => {
            const mockFunction = jest.fn();
            const bot = await createAiPlayer("Test") as Player
            await createGame(
                [ownPlayer.id, bot.id],
                defaultSettings.maxTurnTime,
                defaultSettings.boardSize,
                defaultSettings.boardSize,
                defaultSettings.tiles
            )
            await createGame(
                [ownPlayer.id, bot.id],
                defaultSettings.maxTurnTime,
                defaultSettings.boardSize,
                defaultSettings.boardSize,
                defaultSettings.tiles
            )
            const gamesList = await getAllGames()

            act(() => {
                ReactDOM.render(
                    <BrowserRouter>
                        <GameCardList
                            localPlayer={ownPlayer}
                            gamesList={gamesList}
                            onCreateNewGame={mockFunction}
                        />
                    </BrowserRouter>, container)
            })

            const gameCardElements = document.querySelectorAll(".game-card")

            expect(gameCardElements).toHaveLength(2)
        })
    })


    describe("Functionality Tests", () => {
        it("start game is clickable", async () => {
            const mockFunction = jest.fn();
            const gamesList = await getAllGames()

            act(() => {
                ReactDOM.render(
                    <BrowserRouter>
                        <GameCardList
                            localPlayer={ownPlayer}
                            gamesList={gamesList}
                            onCreateNewGame={mockFunction}
                        />
                    </BrowserRouter>, container)
            })

            const createGameButton = document.querySelector("button") as HTMLButtonElement

            expect(createGameButton.disabled).toBe(false)
        })

        it("calls onCreateNewGame when clicked", async () => {
            const mockFunction = jest.fn();
            const gamesList = await getAllGames()

            act(() => {
                ReactDOM.render(
                    <BrowserRouter>
                        <GameCardList
                            localPlayer={ownPlayer}
                            gamesList={gamesList}
                            onCreateNewGame={mockFunction}
                        />
                    </BrowserRouter>, container)
                const createGameButton = document.querySelector("button") as HTMLButtonElement
                createGameButton.click()
            })

            expect(mockFunction).toHaveBeenCalledTimes(1)
        })

        it("does not call onCreateNewGame when not clicked", async () => {
            const mockFunction = jest.fn();
            const gamesList = await getAllGames()

            act(() => {
                ReactDOM.render(
                    <BrowserRouter>
                        <GameCardList
                            localPlayer={ownPlayer}
                            gamesList={gamesList}
                            onCreateNewGame={mockFunction}
                        />
                    </BrowserRouter>, container)
            })

            expect(mockFunction).toHaveBeenCalledTimes(0)
        })
    })
})