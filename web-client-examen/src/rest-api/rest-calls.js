import {currentUser, LOGIN_URL, sessionId, setCurrentUser, setSessionId} from "./globals.js";


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
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log("Request failed: ", error);
            return Promise.reject(error);
        });
}