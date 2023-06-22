
import React, {useState} from 'react';
import {getNotificationHandler} from "../api/notification-handler.js";

function TopRow({game}){
    return (
        <tr>
            <td>{game.player.name}</td>
            <td>{game.totalSum}</td>
            <td>{game.startTime}</td>
        </tr>
    );
}

export default function TopTable({gamesTop}){
    let rows = [];

    gamesTop.forEach(function(game) {
        rows.push(<TopRow game={game}  key={game.gameId} />);
    });

    return (
        <div className="center-container">
            <table>
                <thead>
                <tr>
                    <th>User</th>
                    <th>Score</th>
                    <th>Start Time</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}