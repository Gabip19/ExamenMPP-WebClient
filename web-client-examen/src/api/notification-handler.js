import {getCurrentUser, getGameData, setGameData} from "./globals.js";

let notificationHandler = null;

export function getNotificationHandler() {
    if (notificationHandler === null) {
        notificationHandler = new NotificationHandler();
    }
    return notificationHandler;
}

class NotificationHandler {
    constructor() {
        this.gameStartedCallBack = null;
        this.newMoveCallBack = null;
        this.gameEndedCallBack = null;
    }

    setGameStartedCallBack(method) {
        this.gameStartedCallBack = method;
    }

    setNewMoveCallBack(method) {
        this.newMoveCallBack = method;
    }

    setGameEndedCallBack(method) {
        this.gameEndedCallBack = method;
    }

    handleGameStarted(gameData) {
        console.log(gameData);
        setGameData(gameData);
        this.gameStartedCallBack(gameData);
    }

    handleNewMove(data) {
        let newGameData = getGameData();
        newGameData.activePlayerId = getCurrentUser().id;
        setGameData(newGameData);
        this.newMoveCallBack(data);
    }

    handleGameEnded(gameData) {
        setGameData(gameData);
        this.gameEndedCallBack(gameData);
        setGameData(null);
    }
}