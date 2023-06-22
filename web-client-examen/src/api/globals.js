export const AUTH_BASE_URL = "http://localhost:8080/random-moves/auth";
export const LOGIN_URL = AUTH_BASE_URL + "/login";
export const LOGOUT_URL = AUTH_BASE_URL + "/logout";
export const WEB_SOCKET_URL = "ws://localhost:8080/websocket";
export const GAME_BASE_URL = "http://localhost:8080/random-moves/games";



export function setCurrentUser(user) {
    window.localStorage.setItem("currentUser", JSON.stringify(user));
}

export function getCurrentUser() {
   return JSON.parse(window.localStorage.getItem("currentUser"));
}

export function unsetCurrentUser() {
    window.localStorage.removeItem("currentUser");
}



export function setSessionId(session) {
    window.localStorage.setItem("sessionId", session);
}

export function getSessionId() {
    return window.localStorage.getItem("sessionId");
}

export function unsetSessionId() {
    window.localStorage.removeItem("sessionId");
}



export function setGameData(game) {
    window.localStorage.setItem("gameData", JSON.stringify(game));
}

export function getGameData() {
    return JSON.parse(window.localStorage.getItem("gameData"));
}

export function unsetGameData() {
    window.localStorage.removeItem("gameData");
}