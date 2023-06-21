import {useEffect, useState} from 'react'
import '../css/App.css'
import LoginForm from "./LoginForm.jsx";
import {getCurrentUser} from "../api/globals.js";
import {logout} from "../api/rest-calls.js";
import GameTable from "./GameTable.jsx";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (getCurrentUser() !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    });

    function handleLogout() {
        logout().then(() => setLoggedIn(false));
    }

    if (loggedIn === false) {
        return (
            <>
                <LoginForm setLoggedIn={setLoggedIn}></LoginForm>
            </>
        )
    } else {
        return (
            <>
                <h1> GAME </h1>
                <h2> User-id: {getCurrentUser().id} </h2>
                <GameTable></GameTable>
                <button onClick={handleLogout}> Logout </button>
            </>
        )
    }
}

export default App
