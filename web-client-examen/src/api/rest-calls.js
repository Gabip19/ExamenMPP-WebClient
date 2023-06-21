import {
    GAME_BASE_URL, getGameData,
    getSessionId,
    LOGIN_URL,
    LOGOUT_URL,
    setCurrentUser, setGameData,
    setSessionId,
    unsetCurrentUser, unsetGameData,
    unsetSessionId
} from "./globals.js";


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
        })
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}

export function startGame(coordinates) {
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

    return fetch(GAME_BASE_URL, init)
        .then(status)
        .then((response) => response.json())
        .then((data) => {
            setGameData(data);
            return data;
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

    return fetch(GAME_BASE_URL + "/" + getGameData().id + "/moves", init)
        .then(status)
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}