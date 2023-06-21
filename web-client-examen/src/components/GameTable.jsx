import {useRef, useState} from "react";

let gameStatus = "NONE";

function GameCell( {handleCellClicked, id} ) {
    const td = useRef(null);

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
    const [coordinates, setCoordinates] = useState({"x":0, "y":0});
    let clickedCellId = 0;

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

    function handleStartGame() {
        gameStarted = true;
        let clickedCell = document.getElementById(clickedCellId);
        clickedCell.style.backgroundColor = "cyan";
        clickedCell.innerText = "^\n|";
    }

    function handleCellClicked(id) {
        clickedCellId = id;
        console.log(clickedCellId);
        if (gameStarted) {

        }
    }

    return (
        <>
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