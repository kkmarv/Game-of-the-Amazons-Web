import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import {GameBoard} from "../../../components/GameScreen/GameBoard/GameBoard";
import {Board} from "../../../requests";
import {defaultSettings} from "../../../components/SettingsScreen/settingsScreenTypes";


jest.mock("../../../requests") // mocking the API here


const testBoard: Board = {
    rowCount: defaultSettings.boardSize,
    columnCount: defaultSettings.boardSize,
    tiles: defaultSettings.tiles
}


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", () => {
        const mockFunction = jest.fn();
        const tree = renderer.create(
            <GameBoard
                onTurnEnd={mockFunction}
                initialBoard={testBoard}
                currentPlayerIsLocal={true}
                currentPlayerPosition={0}
            />)
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
    });


    describe("Render Tests", () => {
        it("renders", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoard
                        onTurnEnd={mockFunction}
                        initialBoard={testBoard}
                        currentPlayerIsLocal={true}
                        currentPlayerPosition={0}
                    />, container)
            })

            const boardDiv = document.querySelector(".board")

            expect(boardDiv).toBeTruthy()
        })

        it("renders correctly", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoard
                        onTurnEnd={mockFunction}
                        initialBoard={testBoard}
                        currentPlayerIsLocal={true}
                        currentPlayerPosition={0}
                    />, container)
            })

            const boardDiv = document.querySelector(".board") as HTMLDivElement
            const firstRowDiv = document.querySelector(".row") as HTMLDivElement
            const emptyButton = document.querySelector("button[value='-1']") as HTMLButtonElement
            const ownAmazonButton = document.querySelector("button[value='0']") as HTMLButtonElement
            const enemyAmazonButton = document.querySelector("button[value='1']") as HTMLButtonElement

            expect(boardDiv.childElementCount).toBe(defaultSettings.boardSize) // row count
            expect(firstRowDiv.childElementCount).toBe(defaultSettings.boardSize) // col count
            expect(emptyButton.disabled).toBe(true)
            expect(ownAmazonButton.disabled).toBe(false) // only own amazons are allowed to be clicked
            expect(enemyAmazonButton.disabled).toBe(true)
        })
    })


    describe("Functionality Tests", () => {
        it("updates tiles correctly when own amazon is clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoard
                        onTurnEnd={mockFunction}
                        initialBoard={testBoard}
                        currentPlayerIsLocal={true}
                        currentPlayerPosition={0}
                    />, container)
                const leftestAmazonInLastRow = document.querySelector(".board > .row:last-of-type > button[value='0']") as HTMLButtonElement
                leftestAmazonInLastRow.click() // select amazon
            })

            const leftestEmptyInLastRow = document.querySelector(".board > .row:last-of-type > button[value='-1']") as HTMLButtonElement
            expect(leftestEmptyInLastRow.disabled).toBe(false)
        })

        it("updates tiles correctly when own amazon is moved", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoard
                        onTurnEnd={mockFunction}
                        initialBoard={testBoard}
                        currentPlayerIsLocal={true}
                        currentPlayerPosition={0}
                    />, container)
                const leftestAmazonInLastRow = document.querySelector(".board > .row:last-of-type > button[value='0']") as HTMLButtonElement
                leftestAmazonInLastRow.click() // select amazon
            })

            const leftestEmptyInLastRow = document.querySelector(".board > .row:last-of-type > button[value='-1']") as HTMLButtonElement

            act(() => {
                leftestEmptyInLastRow.click() // move amazon
            })

            expect(parseInt(leftestEmptyInLastRow.value)).toBe(0)
        })

        it("updates tiles correctly when own amazon is double clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoard
                        onTurnEnd={mockFunction}
                        initialBoard={testBoard}
                        currentPlayerIsLocal={true}
                        currentPlayerPosition={0}
                    />, container)
                const leftestAmazonInLastRow = document.querySelector(".board > .row:last-of-type > button[value='0']") as HTMLButtonElement
                leftestAmazonInLastRow.click() // select amazon
                leftestAmazonInLastRow.click() // deselect amazon
            })

            const leftestEmptyInLastRow = document.querySelector(".board > .row:last-of-type > button[value='-1']") as HTMLButtonElement
            expect(leftestEmptyInLastRow.disabled).toBe(true)
        })

        it("does not call onTurnEnd when nothing happens", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoard
                        onTurnEnd={mockFunction}
                        initialBoard={testBoard}
                        currentPlayerIsLocal={true}
                        currentPlayerPosition={0}
                    />, container)
            })

            expect(mockFunction).toHaveBeenCalledTimes(0)
        })

        it("calls onTurnEnd when a turn is made", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoard
                        onTurnEnd={mockFunction}
                        initialBoard={testBoard}
                        currentPlayerIsLocal={true}
                        currentPlayerPosition={0}
                    />, container)

                const leftestAmazonInLastRow = document.querySelector(".board > .row:last-of-type > button[value='0']") as HTMLButtonElement
                const leftestEmptyInLastRow = document.querySelector(".board > .row:last-of-type > button[value='-1']") as HTMLButtonElement

                leftestAmazonInLastRow.click() // select amazon
                leftestEmptyInLastRow.click() // move amazon
                leftestAmazonInLastRow.click() // shoot arrow
            })

            expect(mockFunction).toHaveBeenCalledTimes(1)
        })
    })
})