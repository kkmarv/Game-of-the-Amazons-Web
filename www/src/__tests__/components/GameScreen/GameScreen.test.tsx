import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import GameScreen from "../../../components/GameScreen/GameScreen";
import {BasicGame, createAiPlayer, createGame, Player, reset} from "../../../requests";
import {MemoryRouter} from "react-router-dom";
import {ownPlayer} from "../../../__mocks__/requests";
import {defaultSettings} from "../../../components/SettingsScreen/settingsScreenTypes";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", async () => {
        const bot: Player = await createAiPlayer("Ferdinand") as Player
        const game: BasicGame = await createGame(
            [ownPlayer.id, bot.id],
            defaultSettings.maxTurnTime,
            defaultSettings.boardSize,
            defaultSettings.boardSize,
            defaultSettings.tiles
        ) as BasicGame

        const tree = renderer.create(
            <MemoryRouter initialEntries={["/game/0"]}>
                <GameScreen/>
            </MemoryRouter>
        ).toJSON()

        expect(tree).toMatchSnapshot();
    })
})


describe("Blackbox Tests", () => {
    let container: HTMLDivElement;
    let bot: Player;
    let game: BasicGame;

    beforeEach(async () => {
        container = document.createElement("div");
        document.body.appendChild(container);
        bot = await createAiPlayer("Ferdinand") as Player
        game = await createGame(
            [ownPlayer.id, bot.id],
            defaultSettings.maxTurnTime,
            defaultSettings.boardSize,
            defaultSettings.boardSize,
            defaultSettings.tiles
        ) as BasicGame
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        reset()
    });


    describe("Render Tests", () => {
        it("renders correctly with url parameter", () => {
            act(() => {
                ReactDOM.render(
                    <MemoryRouter initialEntries={["/game/0"]}>
                        <GameScreen/>
                    </MemoryRouter>, container
                )
            })

            const mainDiv = document.querySelector(".gameboard-screen") as HTMLDivElement

            expect(mainDiv).toBeTruthy()
        })

        it("renders loose animation", () => { // this is not yet mocked in the API therefore cannot be tested
            act(() => {
                createGame(
                    [ownPlayer.id, bot.id],
                    0,
                    defaultSettings.boardSize,
                    defaultSettings.boardSize,
                    defaultSettings.tiles
                )
                ReactDOM.render(
                    <MemoryRouter initialEntries={["/game/1"]}>
                        <GameScreen/>
                    </MemoryRouter>, container
                )

                const looseDiv = document.querySelector(".loose-animation") as HTMLDivElement

                expect(looseDiv).toBeTruthy()
            })
        })
    })
})
