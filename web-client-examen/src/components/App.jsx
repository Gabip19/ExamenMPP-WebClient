import {useEffect, useState} from 'react'
import '../css/App.css'
import LoginForm from "./LoginForm.jsx";
import {getCurrentUser, getGameData, getSessionId} from "../api/globals.js";
import {getGamesTop, login, logout, startGame} from "../api/rest-calls.js";
import GameTable from "./GameTable.jsx";
import TopTable from "./TopTable.jsx";
import {closeWebSocket, openWebSocketConnection} from "../api/websocket-calls.js";
import {getNotificationHandler} from "../api/notification-handler.js";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [gamesTop, setGamesTop] = useState([{"gameId":"0", "player":{"name":"-"},"totalSum":0, "startTime":""}]);
    const [tableconfig, setTableConfig] = useState([{}]);

    let notificationHandler = getNotificationHandler();
    notificationHandler.setGameEndedCallBack(setGamesTop);

    useEffect(() => {
        if (getCurrentUser() !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
            closeWebSocket();
        }
    });

    function handleLogin(credentials) {
        login(credentials).then(() => {
            setLoggedIn(true);
            console.log("[SESSION_ID]: " + getSessionId());
            console.log("[CURRENT_USER]: "); console.log(getCurrentUser());
            openWebSocketConnection();
        }).then(() => {
            getGamesTop().then((games) => setGamesTop(games));
        }).then(() => startGame())
            .then(() => setTableConfig(getGameData().configuration));
    }

    function handleLogout() {
        logout().then(() => setLoggedIn(false));
    }

    if (loggedIn === false) {
        return (
            <>
                <LoginForm handleLogin={handleLogin}></LoginForm>
            </>
        )
    } else  {
        return (
            <>
                <h1> GAME </h1>
                <h2> User-id: {getCurrentUser().id} </h2>
                <GameTable configuration={tableconfig}></GameTable>
                <button onClick={handleLogout}> Logout </button>
                <br/>
                <h2> Top </h2>
                <TopTable gamesTop={gamesTop}></TopTable>
            </>
        )
    }
}

export default App
