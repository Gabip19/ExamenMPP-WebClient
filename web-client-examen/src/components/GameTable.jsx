import {useEffect, useRef, useState} from "react";
import {makeMove, startGame} from "../api/rest-calls.js";
import {getCurrentUser, getGameData, setGameData} from "../api/globals.js";
import {getNotificationHandler} from "../api/notification-handler.js";

let gameStarted = false;

function GameCell( {handleCellClicked, id} ) {
    const td = useRef(null);

    useEffect(() => {
        if (getGameData() === null) {
            gameStarted = false;
        }
    }, []);

    function handleFocus() {
        if (gameStarted) return;
        td.current.style.backgroundColor = "cyan";
        td.current.innerText = "^\n|";
    }

    function handleUnFocus() {
        if (gameStarted) return;
        td.current.style.backgroundColor = "transparent";
        td.current.innerText = "";
    }

    return (
        <td
            ref={td}
            id={id}
            onFocus={handleFocus}
            onBlur={handleUnFocus}
            tabIndex="0"
            onClick={handleCellClicked}
        >
        </td>
    );
}

export default function GameTable() {
    let coordinates = {"x":0, "y":0};
    let clickedCellId = 0;
    const [userStateMessage, setUserStateMessage] = useState("");

    function handleNewMove(coord) {
        let hitCellId = coord.x * 10 + coord.y;
        document.getElementById(hitCellId).classList.add("hit-cell");
        setUserStateMessage("Your turn");
    }

    function handleGameStart() {
        if (getCurrentUser().id === getGameData().activePlayerId) {
            setUserStateMessage("Your turn");
        } else {
            setUserStateMessage("Wait")
        }
    }

    function handleGameEnded() {
        if (getCurrentUser().id === getGameData().winnerId) {
            alert("YOU WON!");
        } else {
            alert("You lost this time...");
        }
        gameStarted = false;
    }

    let notificationHandler = getNotificationHandler();
    notificationHandler.setNewMoveCallBack(handleNewMove);
    notificationHandler.setGameStartedCallBack(handleGameStart);
    notificationHandler.setGameEndedCallBack(handleGameEnded);

    function handleStartGame() {
        if (gameStarted) return;
        gameStarted = true;

        startGame(coordinates);

        let clickedCell = document.getElementById(clickedCellId);
        clickedCell.style.backgroundColor = "cyan";
        clickedCell.innerText = "^\n|";

        setUserStateMessage("Waiting for players");
    }

    function handleCellClicked(id) {
        clickedCellId = id;

        let x = Math.floor(clickedCellId / 10);
        let y = clickedCellId % 10;

        coordinates = {"x": x, "y": y};
        console.log(coordinates);

        if (gameStarted && getCurrentUser().id === getGameData().activePlayerId) {
            makeMove(coordinates).then(() => {
                let newGameData = getGameData();
                newGameData.activePlayerId = null;
                setGameData(newGameData);

                let clickedCell = document.getElementById(clickedCellId);
                clickedCell.innerText = "X";
                setUserStateMessage("Wait")
            });
        }
    }

    const tbody = () => {
        let content = [];
        for (let i = 0; i < 3; i++) {
            let cells = [];
            for (let j = 0; j < 3; j++) {
                cells.push(<GameCell key={i * 10 + j}
                                     id={i * 10 + j}
                                     handleCellClicked={() => handleCellClicked(i * 10 + j)}/>)
            }
            content.push(<tr key={"row"+i}>{cells}</tr>);
        }
        return content;
    }

    return (
        <>
            <h3>{userStateMessage}</h3>
            <div className="table-container">
                <table>
                    <tbody>
                        {tbody()}
                    </tbody>
                </table>
            </div>
            <button onClick={handleStartGame}> Start Game </button> <br/>
        </>
    );
}