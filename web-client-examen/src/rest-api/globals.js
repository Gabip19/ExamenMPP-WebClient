export const AUTH_BASE_URL = "http://localhost:8080/game/auth";
export const LOGIN_URL = AUTH_BASE_URL + "/login";
export const LOGOUT_URL = AUTH_BASE_URL + "/logout";
export let currentUser = null;
export let sessionId = null;

export function setCurrentUser(user) {
    currentUser = user;
}

export function setSessionId(session) {
    sessionId = session;
}