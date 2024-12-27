import React from 'react';
import './PlayerInfo.css';

const PlayerInfo = ({name, totalScore}) => {
    return (
        <div className="player-info-box">
            <div className="player-info-name">{name}</div>
            <div className="player-info-score">{totalScore}</div>
        </div>
    );
};

export default PlayerInfo;