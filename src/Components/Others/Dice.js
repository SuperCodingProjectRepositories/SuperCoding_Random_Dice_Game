import React, { useState } from "react";
import "./Dice.css";

const Dice = ({ onRoll }) => {
    // diceNumber: 현재 주사위의 숫자를 저장하는 상태 변수
    const [diceNumber, setDiceNumber] = useState(1);

    // 랜덤 주사위 값 생성 함수
    const rollDice = () => {
        // 1부터 6 사이의 랜덤 숫자 생성
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        // 상태 업데이트: 주사위의 숫자를 저장
        setDiceNumber(randomNumber);

        // onRoll 콜백 함수가 존재하면, 랜덤 숫자를 부모 컴포넌트로 전달
        if (onRoll) {
            onRoll(randomNumber);
        }
    };

    // 주사위 면에 따른 점(dot) 렌더링 함수
    const renderDots = (face) => {
        // 주사위 숫자에 따른 점의 위치를 정의한 객체
        const dotPositions = {
            1: ["5"], // 중앙에 하나의 점
            2: ["1", "9"], // 좌상단, 우하단에 점
            3: ["1", "5", "9"], // 좌상단, 중앙, 우하단에 점
            4: ["1", "3", "7", "9"], // 네 귀퉁이에 점
            5: ["1", "3", "5", "7", "9"], // 네 귀퉁이 + 중앙
            6: ["1", "3", "4", "6", "7", "9"], // 네 귀퉁이 + 좌우 중간
        };

        // dotPositions에서 해당 숫자의 위치를 가져와서 각 점을 렌더링
        return dotPositions[face].map((position) => (
            <div key={position} className={`dot dot-${position}`}></div>
        ));
    };

    return (
        <div className="dice-container">
            {/* 주사위를 클릭하면 rollDice 함수가 실행 */}
            <div className="dice" onClick={rollDice}>
                {renderDots(diceNumber)} {/* 현재 주사위 숫자에 따라 점 렌더링 */}
            </div>
            <p>Click the dice to roll!</p> {/* 사용자 안내 메시지 */}
        </div>
    );
};

export default Dice;
