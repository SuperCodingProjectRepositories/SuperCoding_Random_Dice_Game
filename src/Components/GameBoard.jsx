import React from 'react';
import PlayerBox from "./Player/PlayerBox";
import './GameBoard.css';

const GameBoard = ({game,currentPlayer,winner}) => {
    return (
        <div className="playerWrapper">
            <PlayerBox
                name="Player1"
                totalScore={game.player1.totalScore}
                currentScore={game.player1.currentScore}
                isActive={currentPlayer === 'player1'}
            />
            <PlayerBox
                name="Player2"
                totalScore={game.player2.totalScore}
                currentScore={game.player2.currentScore}
                isActive={currentPlayer === 'player2'}
            />
        </div>
    );
};

export default GameBoard;