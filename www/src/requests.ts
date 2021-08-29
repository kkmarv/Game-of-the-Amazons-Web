import {deserializeArray, Expose, plainToClass, Type} from 'class-transformer';


// Port range: 40910-40919
const webserviceUrl: string = "https://webengineering.ins.hs-anhalt.de:40917/"

/* Player requests */

export async function createAiPlayer(playerName: string): Promise<Player | undefined> {
    try {
        let response: Response = await fetch(webserviceUrl + "players/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: playerName
            })
        })
        if (response?.ok) return plainToClass(Player, await response.json(), {excludeExtraneousValues: true})
        else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return undefined
}

export async function deletePlayer(id: number): Promise<boolean> {
    try {
        let response: Response = await fetch(webserviceUrl + `players/${id}`, {
            method: "DELETE"
        })
        if (response?.ok) return true
        else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return false
}

export async function getOwnPlayer(): Promise<Player | undefined> {
    try {
        let response: Response = await fetch(webserviceUrl + "players/me")
        if (response?.ok) {
            return plainToClass(Player, await response.json(), {excludeExtraneousValues: true})
        }
    } catch (error) {
        console.log(error)
    }
    return undefined
}

export async function getAllPlayers(): Promise<Player[]> {
    try {
        let response: Response = await fetch(webserviceUrl + "players/")
        if (response?.ok) {
            const playerArray: string = JSON.stringify((await response.json()).players)
            return deserializeArray(Player, playerArray, {excludeExtraneousValues: true})
        } else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return []
}


/* Game requests */

export async function createGame(playerIds: number[], maxTurnTime: number, rowCount: number, columnCount: number, tiles: number[][]): Promise<BasicGame | undefined> {
    try {
        let response: Response = await fetch(webserviceUrl + `games/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                maxTurnTime: maxTurnTime,
                players: playerIds,
                board: {
                    gameSizeRows: rowCount,
                    gameSizeColumns: columnCount,
                    squares: tiles
                }
            })
        })
        if (response?.ok) return plainToClass(BasicGame, await response.json(), {excludeExtraneousValues: true})
        else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return undefined
}

export async function deleteGame(id: number): Promise<boolean> {
    try {
        let response: Response = await fetch(webserviceUrl + `games/${id}`, {
            method: "DELETE"
        })
        if (response?.ok) return true
        else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return false
}

export async function getGame(id: number): Promise<DetailedGame | undefined> {
    try {
        let response: Response = await fetch(webserviceUrl + `games/${id}`)
        if (response?.ok) return plainToClass(DetailedGame, await response.json(), {excludeExtraneousValues: true})
        else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return undefined
}

export async function getAllGames(): Promise<BasicGame[]> {
    try {
        let response: Response = await fetch(webserviceUrl + "games/")
        if (response?.ok) {
            const initialGameArray: string = JSON.stringify((await response.json()).games)
            return deserializeArray(BasicGame, initialGameArray, {excludeExtraneousValues: true})
        } else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return []
}


/* Turn request */

export async function createTurn(gameId: number, turn: Turn): Promise<boolean> {
    try {
        let response: Response = await fetch(webserviceUrl + `move/${gameId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(turn)
        })
        if (response?.ok) return true
        else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return false
}


/* Reset request */

export async function reset(): Promise<boolean> {
    try {
        let response: Response = await fetch(webserviceUrl + `reset/`, {
            method: "DELETE",
        })
        if (response?.ok) return true
        else console.log(`REQUEST FAILED: ${response.status} ${response.statusText}, MESSAGE: ${await response.text()}`)
    } catch (error) {
        console.log(error)
    }
    return false
}


/*  Type definitions for API usage. // TODO toni nach struktur fragen
*   Telling TypeScript to map attribute names used in json objects to attribute names from classes below.
*/

export class Player { // TODO toni fragen welcher spieler das spiel beginnt
    @Expose() id!: number
    @Expose() name!: string
    @Expose() controllable!: boolean
}

export class Board {
    @Expose({name: 'rows'}) rowCount!: number
    @Expose({name: 'columns'}) columnCount!: number
    @Expose({name: 'squares'}) tiles!: number[][]
}

export class Coordinates {
    @Expose() row!: number
    @Expose() column!: number
}

export class Turn {
    @Expose() move!: { start: Coordinates, end: Coordinates }
    @Expose() @Type(() => Coordinates) shot!: Coordinates
}

export class BasicGame {
    @Expose() id!: number
    @Expose() @Type(() => Player) players!: Player[]
    @Expose() maxTurnTime?: number // not used in GET /games/
    @Expose() winningPlayer?: number // only when game is already over
    @Expose() @Type(() => Board) board?: Board // not used in GET /games/
}

export class DetailedGame extends BasicGame {
    @Expose({name: 'turnPlayer'}) playerId!: number
    @Expose() maxTurnTime!: number
    @Expose() remainingTurnTime?: number
    @Expose() @Type(() => Board) board!: Board
    @Expose() @Type(() => Turn) turns?: Turn[] // only when turns were already made
}