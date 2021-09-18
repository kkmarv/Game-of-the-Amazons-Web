import renderer from "react-test-renderer";

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