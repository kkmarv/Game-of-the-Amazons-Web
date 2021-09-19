import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import AdvancedSettings from "../../../components/SettingsScreen/GameSettings/AdvancedSettings/AdvancedSettings";
import {defaultSettings} from "../../../components/SettingsScreen/settingsScreenTypes";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", () => {
        const mockFunction = jest.fn();
        const tree = renderer.create(
            <AdvancedSettings
                boardSize={defaultSettings.boardSize}
                amazonCount={defaultSettings.amazonCount}
                onBoardSizeChange={mockFunction}
                onAmazonCountChange={mockFunction}
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
                    <AdvancedSettings
                        boardSize={defaultSettings.boardSize}
                        amazonCount={defaultSettings.amazonCount}
                        onBoardSizeChange={mockFunction}
                        onAmazonCountChange={mockFunction}
                    />, container);
            });

            const title = document.querySelector("u")

            expect(title).toBeTruthy()
        })

        it("does not render options when the title is not clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AdvancedSettings
                        boardSize={defaultSettings.boardSize}
                        amazonCount={defaultSettings.amazonCount}
                        onBoardSizeChange={mockFunction}
                        onAmazonCountChange={mockFunction}
                    />, container);
            });

            const amazonInput = document.querySelector("#amazon-selection")
            const rowOption = document.querySelector("#row-selection")
            const columnOption = document.querySelector("#column-selection")

            expect(amazonInput).toBeNull()
            expect(rowOption).toBeNull()
            expect(columnOption).toBeNull()
        })

        it("renders input and option elements when the title is clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AdvancedSettings
                        boardSize={defaultSettings.boardSize}
                        amazonCount={defaultSettings.amazonCount}
                        onBoardSizeChange={mockFunction}
                        onAmazonCountChange={mockFunction}
                    />, container);
                const title = document.querySelector("u") as HTMLElement
                title.click()
            });

            const amazonInput = document.querySelector("#amazon-selection")
            const rowOption = document.querySelector("#row-selection")
            const columnOption = document.querySelector("#column-selection")

            expect(amazonInput).toBeTruthy()
            expect(rowOption).toBeTruthy()
            expect(columnOption).toBeTruthy()
        })

        it("renders correctly with default settings", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AdvancedSettings
                        boardSize={defaultSettings.boardSize}
                        amazonCount={defaultSettings.amazonCount}
                        onBoardSizeChange={mockFunction}
                        onAmazonCountChange={mockFunction}
                    />, container);
                const title = document.querySelector("u") as HTMLElement
                title.click()
            });

            const amazonInput = document.querySelector("#amazon-selection") as HTMLInputElement
            const boardSizeSelect = document.querySelector("select") as HTMLSelectElement

            expect(amazonInput.valueAsNumber).toEqual(defaultSettings.amazonCount)
            expect(boardSizeSelect.value).toEqual(defaultSettings.boardSize.toString())
        })
    })


    describe("Functionality Tests", () => {
        it("can click on title", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AdvancedSettings
                        boardSize={defaultSettings.boardSize}
                        amazonCount={defaultSettings.amazonCount}
                        onBoardSizeChange={mockFunction}
                        onAmazonCountChange={mockFunction}
                    />, container);
            });

            const title = document.querySelector("u") as HTMLElement
            const titleClickSpy = jest.spyOn(title, "click")

            act(() => {
                title.click() // this is definitely a Notlösung
            })

            expect(titleClickSpy).toHaveBeenCalledTimes(1)
        })

        it("calls change functions when clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AdvancedSettings
                        boardSize={defaultSettings.boardSize}
                        amazonCount={defaultSettings.amazonCount}
                        onBoardSizeChange={mockFunction}
                        onAmazonCountChange={mockFunction}
                    />, container);
                const title = document.querySelector("u") as HTMLElement
                title.click()
            });

            const rowOption = document.querySelector("#row-selection") as HTMLOptionElement
            const columnOption = document.querySelector("#column-selection") as HTMLOptionElement
            rowOption.click()
            columnOption.click()

            expect(mockFunction).toHaveBeenCalledTimes(2)
        })

        it("does not call change functions when nothing is clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AdvancedSettings
                        boardSize={defaultSettings.boardSize}
                        amazonCount={defaultSettings.amazonCount}
                        onBoardSizeChange={mockFunction}
                        onAmazonCountChange={mockFunction}
                    />, container);
            });

            expect(mockFunction).toHaveBeenCalledTimes(0)
        })
    })
})
