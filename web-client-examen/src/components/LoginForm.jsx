import {useState} from "react";
import {login, startGame} from "../api/rest-calls.js";
import {getCurrentUser, getSessionId} from "../api/globals.js";
import {openWebSocketConnection} from "../api/websocket-calls.js";

export default function LoginForm({ handleLogin }) {
    const [name, setName] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (name === "") {
            return;
        }

        let credentials = {
            name: name
        };

        setName("");
        console.log(credentials);

        handleLogin(credentials);
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1> Login </h1>
                <label>
                    <strong> Name: </strong>
                    <input className="input-field"
                           type="text"
                           onChange={e => setName(e.target.value)}
                           value={name}
                    />
                </label> <br/>
                <input className="login-btn" type="submit" value="Login" />
            </form>
        </div>
    );
}