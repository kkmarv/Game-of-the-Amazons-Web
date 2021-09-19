import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import AIOrNotSelection from "../../../components/SettingsScreen/GameSettings/AIOrNotSelection";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", () => {
        const mockFunction = jest.fn();
        const tree = renderer.create(
            <AIOrNotSelection
                hasSelectedBot={true}
                onSelect={mockFunction}
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
        it("renders correctly with bot selected ", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AIOrNotSelection
                        hasSelectedBot={true}
                        onSelect={mockFunction}
                    />, container)
            })

            const aiRadioTrueInput = document.querySelector("input#aiTrue") as HTMLInputElement
            const aiRadioFalseInput = document.querySelector("input#aiFalse") as HTMLInputElement

            expect(aiRadioTrueInput.checked).toBe(true)
            expect(aiRadioFalseInput.checked).toBe(false)
            expect(aiRadioFalseInput.disabled).toBe(true)
        })

        it("renders correctly with human selected", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AIOrNotSelection
                        hasSelectedBot={false}
                        onSelect={mockFunction}
                    />, container)
            })

            const aiRadioTrueInput = document.querySelector("input#aiTrue") as HTMLInputElement
            const aiRadioFalseInput = document.querySelector("input#aiFalse") as HTMLInputElement

            expect(aiRadioTrueInput.checked).toBe(false)
            expect(aiRadioFalseInput.checked).toBe(true)
            expect(aiRadioFalseInput.disabled).toBe(true)
        })
    })


    describe("Functionality Tests", () => {
        it("can click on bot", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AIOrNotSelection
                        hasSelectedBot={false}
                        onSelect={mockFunction}
                    />, container)
            })
            const aiRadioTrueInput = document.querySelector("input#aiTrue") as HTMLInputElement

            expect(aiRadioTrueInput.disabled).toBe(false)
        })

        it("calls onCLick when bot is clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AIOrNotSelection
                        hasSelectedBot={false}
                        onSelect={mockFunction}
                    />, container)
                const aiRadioTrueInput = document.querySelector("input#aiTrue") as HTMLInputElement
                aiRadioTrueInput.click()
            })

            expect(mockFunction).toHaveBeenCalledTimes(1)
        })

        it("does not call onCLick when bot is not clicked", () => {
            const mockFunction = jest.fn();

            act(() => {
                ReactDOM.render(
                    <AIOrNotSelection
                        hasSelectedBot={false}
                        onSelect={mockFunction}
                    />, container)
            })

            expect(mockFunction).toHaveBeenCalledTimes(0)
        })
    })
})