import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import {ownPlayer} from "../../../__mocks__/requests";
import {createAiPlayer, getAllPlayers, reset} from "../../../requests";
import PlayerList from "../../../components/SettingsScreen/GameSettings/PlayerList";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", () => {
        const mockFunction = jest.fn();
        const tree = renderer.create(
            <PlayerList
                localPlayer={ownPlayer}
                hasSelectedBot={true}
                onPlayerSelect={mockFunction}
            />).toJSON()

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
        it("template", () => {
        })

        it("renders without bots created", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            const mainDiv = document.querySelector(".opponent") as HTMLDivElement
            const playerListSelect = document.querySelector("select") as HTMLSelectElement

            expect(mainDiv).toBeTruthy()
            expect(playerListSelect).toBeTruthy()
        })

        it("renders with one bot created", async () => {
            const mockFunction = jest.fn();
            await createAiPlayer("Test")

            act(() => {
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            const mainDiv = document.querySelector(".opponent") as HTMLDivElement
            const playerListSelect = document.querySelector("select") as HTMLSelectElement

            expect(mainDiv).toBeTruthy()
            expect(playerListSelect).toBeTruthy()
        })

        it("renders correctly without any bots", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            const playerListSelect = document.querySelector("select") as HTMLSelectElement

            expect(playerListSelect.disabled).toBe(true)
            expect(playerListSelect.children).toHaveLength(1)
        })

        it("calls API requests correctly", async () => {
            const mockFunction = jest.fn();
            const requests = require("../../../requests")
            const getAllPlayersMock = jest.spyOn(requests, "getAllPlayers")

            act(() => {
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            expect(getAllPlayersMock).toHaveBeenCalledTimes(1)
            getAllPlayersMock.mockRestore()
        })

        it("renders correctly with one bot created", async () => {
            const mockFunction = jest.fn();
            await createAiPlayer("Test")

            await act(async () => { // this await is bullshit but necessary to wait for all API calls
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            const playerListSelect = document.querySelector("select") as HTMLSelectElement

            expect(playerListSelect).toBeTruthy()
            expect(playerListSelect.disabled).toBe(false)
            expect(playerListSelect.children).toHaveLength(1)
        })

        it("renders correctly with 2 bots created", async () => {
            const mockFunction = jest.fn();
            await createAiPlayer("Test")
            await createAiPlayer("Arnulf")

            await act(async () => { // this await is bullshit but necessary to wait for all API calls
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            const playerListSelect = document.querySelector("select") as HTMLSelectElement

            expect(playerListSelect).toBeTruthy()
            expect(playerListSelect.children).toHaveLength(2)
            expect(playerListSelect.disabled).toBe(false)
        })
    })


    describe("Functionality Tests", () => {
        it("calls onPlayerSelect when player is selected", async () => {
            const mockFunction = jest.fn();
            await createAiPlayer("Test")
            await createAiPlayer("Arnulf")

            await act(async () => { // this await is bullshit but necessary to wait for all API calls
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            const playerBot1Option = document.querySelector("option[value='Test']") as HTMLSelectElement
            const playerBot2Option = document.querySelector("option[value='Arnulf']") as HTMLSelectElement

            playerBot1Option.click()
            playerBot2Option.click()

            expect(mockFunction).toHaveBeenCalledTimes(3)
        })

        it("does not call onPlayerSelect when no player is created", async () => {
            const mockFunction = jest.fn();

            await act(async () => { // this await is bullshit but necessary to wait for all API calls
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            expect(mockFunction).toHaveBeenCalledTimes(0)
        })

        it("calls onPlayerSelect only once when no player is selected", async () => {
            const mockFunction = jest.fn();
            await createAiPlayer("Test")
            await createAiPlayer("Arnulf")

            await act(async () => { // this await is bullshit but necessary to wait for all API calls
                ReactDOM.render(
                    <PlayerList
                        localPlayer={ownPlayer}
                        hasSelectedBot={true}
                        onPlayerSelect={mockFunction}
                    />, container
                )
            })

            expect(mockFunction).toHaveBeenCalledTimes(1)
        })
    })
})