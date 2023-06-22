import {useEffect, useRef, useState} from "react";
import {makeMove, startGame} from "../api/rest-calls.js";
import {getCurrentUser, getGameData} from "../api/globals.js";

let gameStarted = true;

function GameCell( {handleCellClicked, cell} ) {
    const td = useRef(null);

    useEffect(() => {
        // if (getGameData() === null) {
        //     gameStarted = false;
        // }
        gameStarted = true;
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
            id={cell.position}
            onFocus={handleFocus}
            onBlur={handleUnFocus}
            tabIndex="0"
            onClick={handleCellClicked}
        >
            {cell.value}
        </td>
    );
}

export default function GameTable({configuration}) {
    let coordinates = {"x":0, "y":0};
    let clickedCellId = 0;
    const [score, setScore] = useState(0);
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
    // let notificationHandler = getNotificationHandler();
    // notificationHandler.setNewMoveCallBack(handleNewMove);
    // notificationHandler.setGameStartedCallBack(handleGameStart);
    // notificationHandler.setGameEndedCallBack(handleGameEnded);
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

        if (gameStarted && x === getGameData().level) {
            makeMove(coordinates).then(() => {
                let clickedCell = document.getElementById(clickedCellId);
                clickedCell.innerText = "X";
                setScore(getGameData().score);
            }).then(() => {
                if (getGameData().gameStatus === "ENDED") {
                    if (getGameData().level === 4) {
                        alert("You won!");
                    } else {
                        alert("You lost!");
                    }
                    showMines(getGameData().mines);
                }
            });
        }
    }

    function handleBtnClicked() {
        if (getGameData().generationNumber <= 3) {
            let number = 1 + Math.floor(Math.random() * 3);

            makeMove(number).then(() => showOwnedCells());
        }
    }

    function showOwnedCells() {
        console.log("Showing cells");
        getGameData().configuration.forEach((cell) => {
            if (cell.owned === true) {
                document.getElementById(cell.position).classList.add("hit-cell");
            }
        })
    }

    const tbody = () => {
        let cells = [];
        configuration.forEach((cell) => {
            cells.push(
                <GameCell key={cell.position}
                          cell={cell}
                          handleCellClicked={() => handleCellClicked(i)}
                />
            );
        });
        return <tr key={"row"}>{cells}</tr>;
    }

    return (
        <>
            <h3>Score: {score}</h3>
            <div className="table-container center-container">
                <table>
                    <tbody>
                        {tbody()}
                    </tbody>
                </table>
            </div>
            <button onClick={handleBtnClicked}>Generate</button>
        </>
    );
}