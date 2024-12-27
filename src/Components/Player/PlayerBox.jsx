import React from 'react';
import './PlayerBox.css';
import PlayerCurrentScoreBox from "./PlayerCurrentScoreBox";
import PlayerInfo from "./PlayerInfo";

const PlayerBox = ({ name, totalScore, currentScore, isActive }) => {
    return (
        <div className={`player-box ${isActive ? 'active' : ''}`}>
            <PlayerInfo name={name} totalScore={totalScore} />
            <PlayerCurrentScoreBox currentScore={currentScore} />
        </div>
    );
};

export default PlayerBox;