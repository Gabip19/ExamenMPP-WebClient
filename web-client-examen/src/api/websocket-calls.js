import {getCurrentUser, getSessionId, setGameData, WEB_SOCKET_URL} from "./globals.js";
import {getNotificationHandler} from "./notification-handler.js";

let websocket = null;

export function openWebSocketConnection() {
    console.log("Deschid websocket");
    console.log(getSessionId());
    console.log(getCurrentUser());
    websocket = new WebSocket(WEB_SOCKET_URL + "/" + getCurrentUser().id);

    let notificationHandler = getNotificationHandler();

    websocket.onopen = function(ev) {
        console.log("Am deschis websocket");
    }

    websocket.onerror = function (ev) {
        console.log(ev.target.value);
    }

    websocket.onmessage = function (ev) {
        console.log("[WEB_SOCKET]: Received " + ev.data);
        let data = JSON.parse(ev.data);
        switch (data.notificationType) {
            case "GAME_STARTED":
                notificationHandler.handleGameStarted(data.data);
                break;
            case "NEW_MOVE":
                notificationHandler.handleNewMove(data.data);
                break;
            case "GAME_ENDED":
                notificationHandler.handleGameEnded(data.data);
                break;
        }
    }

    websocket.onclose = function (ev) {
        websocket.close();
    }
}

export function closeWebSocket() {
    if (websocket != null)
        websocket.close();
}