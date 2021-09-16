import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";
import {Simulate} from "react-dom/test-utils";

import TimerInput from "../../../components/SettingsScreen/GameSettings/TimerInput";
import {defaultSettings} from "../../../components/SettingsScreen/settingsScreenTypes";
import React from "react";


jest.mock("../../../requests") // mocking the API here


function changeInputElementValue(inputElement: HTMLInputElement, newValue: any) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")!.set;
    nativeInputValueSetter!.call(inputElement, newValue);

    const changeEvent = new Event('input', {bubbles: true});
    inputElement.dispatchEvent(changeEvent);
}


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", () => {
        const onChangeMock = jest.fn();
        const tree = renderer.create(
            <TimerInput
                onChange={onChangeMock}
                turnTime={defaultSettings.maxTurnTime}
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
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
            })

            const timeSelection = document.querySelector(".time-selection") as HTMLDivElement
            const timeInput = document.querySelector("input") as HTMLInputElement

            expect(timeSelection).toBeTruthy()
            expect(timeInput).toBeTruthy()
        })

        it("renders correctly with default settings", () => {
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
            })

            const timeInput = document.querySelector("input") as HTMLInputElement

            // times 1000 because of millisecond to second conversion
            expect(timeInput.valueAsNumber * 1000).toEqual(defaultSettings.maxTurnTime)
        })
    })


    describe("Functionality Tests", () => {
        it("template", () => {
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
            })
        })

        it("calls onChange when changed", () => {
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
                const timeInput = document.querySelector("input") as HTMLInputElement
                Simulate.change(timeInput)
            })

            expect(onChangeMock).toHaveBeenCalledTimes(1)
        })

        it("does not call onChange when not changed", () => {
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
            })

            expect(onChangeMock).toHaveBeenCalledTimes(0)
        })

        it("calls onChange with correct values", () => {
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
                const timeInput = document.querySelector("input") as HTMLInputElement
                Simulate.change(timeInput)
            })

            expect(onChangeMock).toHaveBeenCalledWith(defaultSettings.maxTurnTime)
        })

        it("calls onChange correctly with valid value", () => {
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
                const timeInput = document.querySelector("input") as HTMLInputElement
                changeInputElementValue(timeInput, 40)
            })

            expect(onChangeMock).toHaveBeenCalledWith(40000)
        })

        it("does not call onChange with invalid values", () => {
            const onChangeMock = jest.fn();

            act(() => {
                ReactDOM.render(
                    <TimerInput
                        onChange={onChangeMock}
                        turnTime={defaultSettings.maxTurnTime}
                    />, container
                )
                const timeInput = document.querySelector("input") as HTMLInputElement
                changeInputElementValue(timeInput, 0)
                changeInputElementValue(timeInput, 1000)
            })

            expect(onChangeMock).toHaveBeenCalledTimes(0)
        })
    })
})