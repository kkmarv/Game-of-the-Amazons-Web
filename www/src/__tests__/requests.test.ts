import {checkerBoard4Amazons} from "../components/SettingsScreen/GameSettings/boardTemplates";
import {ownPlayer} from "../__mocks__/requests";
import {
    createAiPlayer,
    deletePlayer,
    getAllPlayers,
    getOwnPlayer,
    createGame,
    getGame,
    getAllGames,
    reset,
    Turn,
    Player,
    BasicGame,
    DetailedGame, createTurn
} from "../requests";


jest.mock("../requests")

afterEach(async () => {
    await reset()
})

// templates for later use:
const expectedOwnPlayer: Player = ownPlayer

const expectedBotPlayer: Player = {
    id: 1,
    name: "Bot Nudelkammer",
    controllable: false
}


describe("Functionality Test of /__mocks__/requests.ts, not testing the real requests.ts", () => {
    describe("Testing all player methods", () => {
        it("returns own player correctly", async () => {
            const ownPlayer = await getOwnPlayer()
            expect(ownPlayer).toStrictEqual(expectedOwnPlayer)
        })

        it("creates a player correctly", async () => {
            const botPlayer: Player = await createAiPlayer("Bot Nudelkammer") as Player

            expect(botPlayer).toStrictEqual(expectedBotPlayer)
            expect(await getAllPlayers()).toContain(botPlayer)
        })

        it("deletes a player correctly", async () => {
            await createAiPlayer(expectedBotPlayer.name)
            const succeeded: boolean = await deletePlayer(1)

            expect(succeeded).toBe(true)
            expect(await getAllPlayers()).toHaveLength(1)
        })

        it("cannot delete own player", async () => {
            const succeeded: boolean = await deletePlayer(0)

            expect(succeeded).toBe(true)
            expect(await getAllPlayers()).toHaveLength(1)
        })

        it("returns all players correctly", async () => {
            const allPlayers: Player[] = await getAllPlayers()

            expect(allPlayers).toHaveLength(1)
            expect(allPlayers).toStrictEqual([expectedOwnPlayer])
        })
    })


    describe("Testing all game methods", () => {
        it("creates a game correctly", async () => {
            await createAiPlayer(expectedBotPlayer.name)
            const expectedGame: BasicGame = {
                id: 0,
                players: [expectedOwnPlayer, expectedBotPlayer],
                maxTurnTime: 60000,
                board: {
                    rowCount: 10,
                    columnCount: 10,
                    tiles: checkerBoard4Amazons
                }
            }

            const newGame: BasicGame = await createGame(
                [expectedOwnPlayer.id, expectedBotPlayer.id],
                60000,
                10,
                10,
                checkerBoard4Amazons
            ) as BasicGame

            expect(await getAllGames()).toHaveLength(1)
            expect(newGame).toStrictEqual(expectedGame)
        })

        it("returns a game correctly", async () => {
            await createAiPlayer(expectedBotPlayer.name)
            const expectedGame: DetailedGame = {
                id: 0,
                players: [expectedOwnPlayer, expectedBotPlayer],
                maxTurnTime: 60000,
                currentPlayerId: expectedOwnPlayer.id,
                board: {
                    rowCount: 10,
                    columnCount: 10,
                    tiles: checkerBoard4Amazons
                }
            }

            await createGame(
                [expectedOwnPlayer.id, expectedBotPlayer.id],
                60000,
                10,
                10,
                checkerBoard4Amazons
            )

            expect(await getAllGames()).toHaveLength(1)
            expect(await getGame(expectedGame.id) as DetailedGame).toStrictEqual(expectedGame)
        })

        it("returns all games correctly", async () => {
            const allGames: BasicGame[] = await getAllGames()

            expect(allGames).toHaveLength(0)
        })
    })


    it("creates a turn", async () => {
        const newTurn: Turn = {
            move: {
                start: {
                    row: 0,
                    column: 3,
                },
                end: {
                    row: 1,
                    column: 3
                }
            },
            shot: {
                row: 0,
                column: 3
            }
        }
        await createAiPlayer(expectedBotPlayer.name)
        const newGame: BasicGame = await createGame(
            [expectedOwnPlayer.id, expectedBotPlayer.id],
            60000,
            10,
            10,
            checkerBoard4Amazons
        ) as BasicGame

        const succeeded: boolean = await createTurn(newGame.id, newTurn)

        expect(succeeded).toBe(true)
        expect((await getGame(newGame.id))!.turns).toHaveLength(1)
        expect((await getGame(newGame.id))!.turns).toStrictEqual([newTurn])
    })


    it("resets games and players correctly", async () => {
        const succeeded: boolean = await reset()
        const allGames: BasicGame[] = await getAllGames()
        const allPlayers: Player[] = await getAllPlayers()

        expect(succeeded).toBe(true)
        expect(allGames).toStrictEqual([])
        expect(allPlayers).toStrictEqual([
            {
                id: 0,
                name: "Petra Lustig",
                controllable: true
            }
        ])
    })
})
