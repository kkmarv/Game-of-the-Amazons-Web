import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import GameCard from "../../../components/LobbyScreen/GameCardList/GameCard";
import {BasicGame, createAiPlayer, createGame, getAllGames, Player, reset} from "../../../requests";
import {ownPlayer} from "../../../__mocks__/requests";
import {defaultSettings} from "../../../components/SettingsScreen/settingsScreenTypes";
import AdvancedSettings from "../../../components/SettingsScreen/GameSettings/AdvancedSettings/AdvancedSettings";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", async () => {
        const mockFunction = jest.fn();
        const bot: Player = await createAiPlayer("Franz") as Player
        const game: BasicGame = await createGame(
            [ownPlayer.id, bot.id],
            defaultSettings.maxTurnTime,
            defaultSettings.boardSize,
            defaultSettings.boardSize,
            defaultSettings.tiles
        ) as BasicGame
        const tree = renderer.create(
            <GameCard
                onClick={mockFunction}
                game={game}
            />).toJSON();

        expect(tree).toMatchSnapshot();
    })
})


describe("Blackbox Tests", () => {
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

            const bot: Player = await createAiPlayer("Franz") as Player
            const game: BasicGame = await createGame(
                [ownPlayer.id, bot.id],
                defaultSettings.maxTurnTime,
                defaultSettings.boardSize,
                defaultSettings.boardSize,
                defaultSettings.tiles
            ) as BasicGame

            act(() => {
                ReactDOM.render(
                    <GameCard
                        onClick={mockFunction}
                        game={game}
                    />, container);
            });

            const main = document.querySelector(".game-card") as HTMLDivElement

            expect(main).toBeTruthy()
        })
    })


    describe("Functionality Tests", () => {
        it("calls onClick when clicked", async () => {
            const mockFunction = jest.fn();

            const bot: Player = await createAiPlayer("Franz") as Player
            const game: BasicGame = await createGame(
                [ownPlayer.id, bot.id],
                defaultSettings.maxTurnTime,
                defaultSettings.boardSize,
                defaultSettings.boardSize,
                defaultSettings.tiles
            ) as BasicGame

            act(() => {
                ReactDOM.render(
                    <GameCard
                        onClick={mockFunction}
                        game={game}
                    />, container);
            });

            const main = document.querySelector(".game-card") as HTMLDivElement

            act(() => {
                main.click()
            })

            expect(mockFunction).toHaveBeenCalledTimes(1)
        })
    })
})