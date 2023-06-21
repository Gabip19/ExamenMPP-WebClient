import {useState} from "react";
import {login} from "../rest-api/rest-calls.js";
import {currentUser, sessionId} from "../rest-api/globals.js";

export default function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (name === "" || password === "") {
            return;
        }

        let credentials = {
            name: name,
            password: password
        };

        setName("");
        setPassword("");
        console.log(credentials);

        login(credentials).then(() => {
            console.log(currentUser);
            console.log(sessionId);
            window.location = "/game/";
        });
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
                <label>
                    <strong> Password: </strong>
                    <input className="input-field"
                           type="password"
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                    />
                </label> <br/>
                <input className="login-btn" type="submit" value="Login" />
            </form>
        </div>
    );
}