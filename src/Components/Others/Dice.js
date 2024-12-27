import React, { useState } from "react";
import "./Dice.css";

const Dice = ({ onRoll }) => {
    const [diceNumber, setDiceNumber] = useState(1);

    // 랜덤 주사위 값 생성 함수
    const rollDice = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(randomNumber);
        if (onRoll) {
            onRoll(randomNumber); // 외부에서 점수를 처리하도록 값 전달
        }
    };

    // 주사위 면에 따른 점(dot) 렌더링
    const renderDots = (face) => {
        const dotPositions = {
            1: ["5"],
            2: ["1", "9"],
            3: ["1", "5", "9"],
            4: ["1", "3", "7", "9"],
            5: ["1", "3", "5", "7", "9"],
            6: ["1", "3", "4", "6", "7", "9"],
        };

        return dotPositions[face].map((position) => (
            <div key={position} className={`dot dot-${position}`}></div>
        ));
    };

    return (
        <div className="dice-container">
            <div className="dice" onClick={rollDice}>
                {renderDots(diceNumber)}
            </div>
            <p>Click the dice to roll!</p>
        </div>
    );
};

export default Dice;