const apiUrl: string = "https://webengineering.ins.hs-anhalt.de:40911"


// player requests

export function createPlayer(name: string, controllable: boolean, id?: number): string {
    const req = new XMLHttpRequest();
    req.open("POST", apiUrl + "/players/", false);
    console.log(`{ "name": "${name}", "controllable": ${controllable} }`)
    req.send(`{ "name": "${name}", "controllable": ${controllable} ` + (id ? `id: ${id} }` : "}"));
    return req.responseText;
}

export function getAllPlayers(): string {
    const req = new XMLHttpRequest();
    req.open("GET", apiUrl + "/players/", false);
    req.send(null);
    return req.responseText;
}

export function deletePlayer(id: number): string {
    const req = new XMLHttpRequest();
    req.open("POST", apiUrl + "/players/:" + id, false);
    req.send(null);
    return req.responseText;
}


// game requests

export function createGame(game: GameProps): string {
    const req = new XMLHttpRequest();
    req.open("POST", apiUrl + "/games/", false);
    console.log(`{ "maxTurnTime": "${game.maxTurnTime}", "players": ${game.players}, "initialBoard": ${game.initialBoard} }`)
    req.send(`{ "maxTurnTime": "${game.maxTurnTime}", "players": ${game.players}, "initialBoard": ${game.initialBoard} }`);
    return req.responseText;
}

export function getGame(id: number): string {
    const req = new XMLHttpRequest();
    req.open("GET", apiUrl + "/games/:" + id, false);
    req.send(null);
    return req.responseText;
}

export function getAllGames(): string {
    const req = new XMLHttpRequest();
    req.open("GET", apiUrl + "/games/", false);
    req.send(null);
    return req.responseText;
}

export function deleteGame(id: number): string {
    const req = new XMLHttpRequest();
    req.open("DELETE", apiUrl + "/games/:" + id, false);
    req.send(null);
    return req.responseText;
}


// turn request

export function createTurn(id: number, turn: TurnProps): string {
    const req = new XMLHttpRequest();
    req.open("POST", apiUrl + "/move/:" + id, false);
    req.send(`{ turn }`);
    return req.responseText;
}


// reset request

export function reset(confirmed: boolean): string | void {
    if (confirmed) {
        const req = new XMLHttpRequest();
        req.open("DELETE", apiUrl + "/reset/", false);
        req.send(null);
        return req.responseText;
    }
}