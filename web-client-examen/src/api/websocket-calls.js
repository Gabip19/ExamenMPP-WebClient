import {getCurrentUser, getSessionId, WEB_SOCKET_URL} from "./globals.js";

export function openWebSocketConnection() {
    console.log("Deschid websocket");
    console.log(getSessionId());
    console.log(getCurrentUser());
    const websocket = new WebSocket(WEB_SOCKET_URL + "/" + getCurrentUser().id);

    websocket.onopen = function(ev) {
        console.log("Am deschis websocket");
    }

    websocket.onerror = function (ev) {
        console.log(ev.target.value);
    }

    websocket.onmessage = function (ev) {
        console.log("[WEB_SOCKET]: Received " + ev.data);
    }

    websocket.onclose = function (ev) {
        websocket.close();
    }
}