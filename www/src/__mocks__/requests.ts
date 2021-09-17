/*
This module mocks the implementation of the requests module to deliver consistent responses,
independent from HTTP requests.
*/

import * as requests from "../requests";
import {TileEnum} from "../components/GameScreen/GameBoard/gameBoardTypes";


export type BasicGame = requests.BasicGame
export type DetailedGame = requests.DetailedGame
export type Player = requests.Player
export type Turn = requests.Turn


/* Player requests */

// this represents our own constantly logged in user
export const ownPlayer: Player = {
    id: 0,
    name: "Petra Lustig",
    controllable: true
}

let allPlayers: Player[] = [ownPlayer]


export async function createAiPlayer(playerName: string): Promise<Player | undefined> {
    const newPlayer = {
        id: allPlayers.length > 0 ? (allPlayers[allPlayers.length - 1].id) + 1 : 0,
        name: playerName,
        controllable: false
    }
    allPlayers.push(newPlayer)
    return newPlayer
}

export async function deletePlayer(id: number): Promise<boolean> {
    if (id === ownPlayer.id) return true // simulate deleting own player (player gets re-added automatically)
    let playerIndex = 0
    for (let player of allPlayers) {
        if (player.id === id) {
            allPlayers.splice(playerIndex, 1)
            return true
        }
        playerIndex++
    }
    return false
}

export async function getOwnPlayer(): Promise<Player | undefined> {
    return ownPlayer
}

export async function getAllPlayers(): Promise<Player[]> {
    return allPlayers
}


/* Game requests */

let allGames: DetailedGame[] = []


export async function createGame(playerIds: number[], maxTurnTime: number, rowCount: number, columnCount: number, tiles: number[][]): Promise<BasicGame | undefined> {
    // check game constraints:
    if (playerIds.length !== 2 || maxTurnTime <= 0 || rowCount <= 0 || columnCount <= 0) return undefined
    if (tiles.length !== rowCount || tiles[0].length !== columnCount) return undefined

    // try to find player IDs
    const participatingPlayers: Player[] = []
    allPlayers.forEach((player: Player) => {
        if (player.id === playerIds[0] || playerIds[1]) participatingPlayers.push(player)
    })

    // if not both players could be found
    if (participatingPlayers.length !== 2) return undefined

    const newBasicGame: BasicGame = {
        id: allGames.length > 0 ? allGames[allGames.length - 1].id + 1 : 0,
        players: participatingPlayers,
        maxTurnTime: maxTurnTime,
        board: {
            rowCount: rowCount,
            columnCount: columnCount,
            tiles: tiles
        }
    }

    const newDetailedGame: DetailedGame = {
        id: newBasicGame.id,
        players: newBasicGame.players,
        maxTurnTime: newBasicGame.maxTurnTime!,
        currentPlayerId: newBasicGame.players[0].id,
        board: newBasicGame.board!
    }

    allGames.push(newDetailedGame)
    return newBasicGame
}

export async function deleteGame(id: number): Promise<boolean> {
    allGames.forEach((game: DetailedGame, index: number) => {
        if (game.id === id) {
            allGames.splice(index, 1)
            return true
        }
    })
    return false
}

export async function getGame(id: number): Promise<DetailedGame | undefined> {
    for (let game of allGames) {
        if (game.id === id) return game
    }
    return undefined
}

export async function getAllGames(): Promise<BasicGame[]> {
    const basicGames: BasicGame[] = []
    allGames.forEach((game: DetailedGame) => {
        basicGames.push({
            id: game.id,
            maxTurnTime: game.maxTurnTime,
            players: game.players,
            winningPlayer: game.winningPlayer,
            board: game.board
        })
    })
    return basicGames
}


/* Turn request */

export async function createTurn(gameId: number, turn: Turn): Promise<boolean> {
    for (let game of allGames) {
        if (game.id === gameId) {
            // roughly check turn constraints: (the movement is not checked)
            if (game.board.tiles[turn.move.start.row][turn.move.start.column] === TileEnum.EMPTY) return false // if move start is empty tile
            if (game.board.tiles[turn.move.end.row][turn.move.end.column] !== TileEnum.EMPTY) return false // if move end is non empty tile
            if (game.board.tiles[turn.shot.row][turn.shot.column] !== game.board.tiles[turn.move.start.row][turn.move.start.column]) { // if shot not previous amazon position
                if (game.board.tiles[turn.shot.row][turn.shot.column] !== TileEnum.EMPTY) return false // and not on empty tile
            }

            // add turn to turns history !! BUT NOT to the actual board
            game.turns ? game.turns.push(turn) : game.turns = [turn]

            return true
        }
    }
    return false
}


/* Reset request */

export async function reset(): Promise<boolean> {
    allGames = []
    allPlayers = [ownPlayer]
    return true
}
