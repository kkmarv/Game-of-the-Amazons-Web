// Port range: 40910-40920
const webserviceUrl: string = "https://webengineering.ins.hs-anhalt.de:40918/"

// player requests

export function createPlayer(name: string, controllable: boolean, id?: number): string {
    const req = new XMLHttpRequest();
    req.open("POST", webserviceUrl + "/players/", false);
    console.log(`{ "name": "${name}", "controllable": ${controllable} }`)
    req.send(`{ "name": "${name}", "controllable": ${controllable} ` + (id ? `id: ${id} }` : "}"));
    return req.responseText;
}

export async function getAllPlayers(): Promise<any> {
    let response
    try {
        response = await fetch(webserviceUrl + "players/")
    } catch (error) {
        console.log(error)
    }
    if (response?.ok) return response.json() // TODO ins array auspacken
    else console.log("No response")
}

export function deletePlayer(id: number): string {
    const req = new XMLHttpRequest();
    req.open("POST", webserviceUrl + "/players/:" + id, false);
    req.send(null);
    return req.responseText;
}


// game requests

export function createGame(game: GameProps): string {
    const req = new XMLHttpRequest();
    req.open("POST", webserviceUrl + "/games/", false);
    console.log(`{ "maxTurnTime": "${game.maxTurnTime}", "players": ${game.players}, "initialBoard": ${game.initialBoard} }`)
    req.send(`{ "maxTurnTime": "${game.maxTurnTime}", "players": ${game.players}, "initialBoard": ${game.initialBoard} }`);
    return req.responseText;
}

export function getGame(id: number): string {
    const req = new XMLHttpRequest();
    req.open("GET", webserviceUrl + "/games/:" + id, false);
    req.send(null);
    return req.responseText;
}

export async function getAllGames(): Promise<any> {
    let response
    try {
        response = await fetch(webserviceUrl + "games/")
    } catch (error) {
        console.log(error)
    }
    if (response?.ok) return response.json() // TODO ins array auspacken
    else console.log("No response")
}

export function deleteGame(id: number): string {
    const req = new XMLHttpRequest();
    req.open("DELETE", webserviceUrl + "/games/:" + id, false);
    req.send(null);
    return req.responseText;
}


// turn request

export function createTurn(id: number, turn: TurnProps): string {
    const req = new XMLHttpRequest();
    req.open("POST", webserviceUrl + "/move/:" + id, false);
    req.send(`{ turn }`);
    return req.responseText;
}


// reset request

export function reset(confirmed: boolean): string | void {
    if (confirmed) {
        const req = new XMLHttpRequest();
        req.open("DELETE", webserviceUrl + "/reset/", false);
        req.send(null);
        return req.responseText;
    }
}