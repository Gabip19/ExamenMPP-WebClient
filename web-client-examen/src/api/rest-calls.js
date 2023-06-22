import {
    GAME_BASE_URL, getCurrentUser, getGameData,
    getSessionId,
    LOGIN_URL,
    LOGOUT_URL,
    setCurrentUser, setGameData,
    setSessionId,
    unsetCurrentUser, unsetGameData,
    unsetSessionId
} from "./globals.js";
import {closeWebSocket} from "./websocket-calls.js";


function status(response) {
    console.log("Response status: " + response.status);
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

export function login(credentials) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    let init = {
        method: "POST",
        headers: headers,
        mode: "cors",
        body: JSON.stringify(credentials)
    };

    return fetch(LOGIN_URL, init)
        .then(status)
        .then((response) => {
            setSessionId(response.headers.get("Session-Id"));
            return response.json();
        })
        .then(user => {
            setCurrentUser(user);
            return user;
        })
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function logout() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Session-Id", getSessionId());

    let init = {
        method: "POST",
        headers: headers,
        mode: "cors"
    };

    return fetch(LOGOUT_URL, init)
        .then(status)
        .then(() => {
            unsetSessionId();
            unsetCurrentUser();
            unsetGameData();
            closeWebSocket();
        })
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function startGame() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Session-Id", getSessionId());

    let init = {
        method: "POST",
        headers: headers,
        mode: "cors"
    };

    fetch(GAME_BASE_URL, init)
        .then(status)
        .then((response) => response.json())
        .then((data) => {
            setGameData(data);
            console.log(data);
        })
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function makeMove(coordinates) {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Session-Id", getSessionId());

    let init = {
        method: "POST",
        headers: headers,
        mode: "cors",
        body: JSON.stringify(coordinates)
    };

    return fetch(GAME_BASE_URL + "/" + getGameData().gameId + "/moves", init)
        .then(status)
        .then((response) => response.json())
        .then((data) => {
            setGameData(data);
            console.log(getGameData());
        })
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function getGamesTop() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Session-Id", getSessionId());

    let init = {
        method: "GET",
        headers: headers,
        mode: "cors"
    };

    return fetch(GAME_BASE_URL, init)
        .then(status)
        .then((response) => response.json())
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}