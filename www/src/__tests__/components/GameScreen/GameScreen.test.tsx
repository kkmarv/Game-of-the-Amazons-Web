import "reflect-metadata"
import {render} from "react-dom";
import {act} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import SettingsScreen from "../../../components/SettingsScreen/SettingsScreen";
import {createGame, getOwnPlayer, Player} from "../../../requests";


jest.mock("../../../requests")


describe("SettingsScreen Components __tests__", () => {
    let container: HTMLDivElement
    const mockFunction = jest.fn()

    beforeEach(() => {
        container = document.createElement("div")
        document.body.appendChild(container)
    })

    afterEach(() => {
        document.body.removeChild(container)
        container.remove()
    })


    it("", async () => {
        const ownPlayer = await getOwnPlayer() as Player
        expect(ownPlayer.name).toEqual("Petra Lustig")
    })


    it("renders default settings correctly", async () => {
        await act(async () => {
                render(
                    <BrowserRouter>
                        <SettingsScreen/>
                        {/*<AdvancedSettings*/}
                        {/*    boardSize={10}*/}
                        {/*    amazonCount={4}*/}
                        {/*    onBoardSizeChange={mockFunction}*/}
                        {/*    onAmazonCountChange={mockFunction}*/}
                        {/*/>*/}
                    </BrowserRouter>
                    , container)
            }
        )
        const fakeUser = {name: "Joni Baez", age: "32", address: "123, Charming Avenue"};
        jest.spyOn(global, "fetch").mockImplementation(async (input: RequestInfo): Promise<Response> => {
            return Promise.resolve(new Response());
        })
        const inputs = container.querySelectorAll("div")
        expect(inputs).toHaveLength(3)
    })
})

