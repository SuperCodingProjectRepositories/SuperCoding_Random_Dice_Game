import React from 'react';
import "./PlayerCurrentScoreBox.css";

const PlayerCurrentScoreBox = ({currentScore}) => {
    return (
        <div className="score-box">
            <div className="score-box-title">Current</div>
            <div className="score-box-current">{currentScore}</div>
        </div>
    );
};

export default PlayerCurrentScoreBox;