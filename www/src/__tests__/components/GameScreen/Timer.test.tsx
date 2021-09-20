import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import {act} from "@testing-library/react";

import {Timer} from "../../../components/GameScreen/Timer";
import {defaultSettings} from "../../../components/SettingsScreen/settingsScreenTypes";


jest.mock("../../../requests") // mocking the API here


describe("Snapshot Tests", () => { // they have to exist, don't they?
    it("renders correctly with default settings", () => {
        const tree = renderer.create(
            <Timer timeLeft={defaultSettings.maxTurnTime}/>
        ).toJSON()
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
            act(() => {
                ReactDOM.render(
                    <Timer timeLeft={defaultSettings.maxTurnTime}/>, container
                )
            })

            const timerDiv = document.querySelector(".timer")
            const timerH1 = document.querySelector("h1") as HTMLHeadingElement

            expect(timerDiv).toBeTruthy()
            expect(timerH1).toBeTruthy()
        })
    })


    describe("Functionality Tests", () => {
        it("sets time correctly with default time", () => {
            act(() => {
                ReactDOM.render(
                    <Timer timeLeft={defaultSettings.maxTurnTime}/>, container
                )
            })

            const timerH1 = document.querySelector("h1") as HTMLHeadingElement

            expect(timerH1.textContent).toBe("30")
        })

        it("sets time correctly with 0 seconds left", () => {
            act(() => {
                ReactDOM.render(
                    <Timer timeLeft={0}/>, container
                )
            })

            const timerH1 = document.querySelector("h1") as HTMLHeadingElement

            expect(timerH1.textContent).toBe("0")
        })

        it("sets time correctly with more than 1 minute left", () => {
            act(() => {
                ReactDOM.render(
                    <Timer timeLeft={100000}/>, container
                )
            })

            const timerH1 = document.querySelector("h1") as HTMLHeadingElement

            expect(timerH1.textContent).toBe("01:40")
        })
    })
})

