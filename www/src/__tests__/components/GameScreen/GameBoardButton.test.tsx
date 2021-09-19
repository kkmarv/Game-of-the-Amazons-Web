import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import {GameBoardButton} from "../../../components/GameScreen/GameBoard/GameBoardButton";
import {TileEnum} from "../../../components/GameScreen/GameBoard/gameBoardTypes";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", () => {
        const mockFunction = jest.fn();
        const tree = renderer.create(
            <GameBoardButton
                id={"0"}
                color={"white"}
                onClick={mockFunction}
                tileType={TileEnum.EMPTY}
                disabled={true}
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
    });

    describe("Render Tests", () => {
        it("renders", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoardButton
                        id={"0"}
                        color={"white"}
                        onClick={mockFunction}
                        tileType={TileEnum.EMPTY}
                        disabled={true}
                    />, container
                )
            })

            const button = document.querySelector("button")

            expect(button).toBeTruthy()
        })

        it("renders correctly", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoardButton
                        id={"0"}
                        color={"white"}
                        onClick={mockFunction}
                        tileType={TileEnum.EMPTY}
                        disabled={true}
                    />, container
                )
            })

            const button = document.querySelector("button") as HTMLButtonElement

            expect(button.id).toBe("0")
            expect(button.className).toBe("tile white")
            expect(parseInt(button.value)).toBe(TileEnum.EMPTY)
            expect(button.disabled).toBe(true)
        })
    })


    describe("Functionality Tests", () => {
        it("calls onClick when clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoardButton
                        id={"0"}
                        color={"white"}
                        onClick={mockFunction}
                        tileType={TileEnum.EMPTY}
                        disabled={false}
                    />, container
                )
                const button = document.querySelector("button") as HTMLButtonElement
                button.dispatchEvent(new MouseEvent("click", {bubbles: true}))
            })

            expect(mockFunction).toHaveBeenCalledTimes(1)
        })

        it("does not call onClick when not clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <GameBoardButton
                        id={"0"}
                        color={"white"}
                        onClick={mockFunction}
                        tileType={TileEnum.EMPTY}
                        disabled={true}
                    />, container
                )
                const button = document.querySelector("button") as HTMLButtonElement
                button.click()
            })

            expect(mockFunction).toHaveBeenCalledTimes(0)
        })
    })
})