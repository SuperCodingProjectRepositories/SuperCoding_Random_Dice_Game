# 주사위 게임 프로젝트

## 프로젝트 개요

- **프로젝트 명**: 주사위 게임
- **설명**:
  번갈아 가며 주사위를 던지는 게임입니다. 먼저 누적 점수 50점을 달성하면 승리합니다.
    - 주사위를 던졌을 때:
        - **1~2**가 나오면 현재 점수를 초기화하고 턴이 변경됩니다.
        - **3~6**이 나오면 현재 점수에 주사위 점수가 더해집니다.
    - 플레이어는 자신의 턴에서 "홀드"를 선택하여 현재 점수를 누적 점수에 추가하거나, 계속 주사위를 던질 수 있습니다.

---

## 레퍼런스

[주사위 게임 레퍼런스](https://pig-game-v2.netlify.app/)

- 위 링크는 프로젝트 이해를 돕기 위한 참고 자료입니다. 요구사항이 다르므로 레퍼런스와는 다른 방식으로 구현될 수 있습니다.

---
## 구현 내용

### **React 컴포넌트**
1. **`App.js`**:
    - `useState`로 게임 상태 관리
    - `Dice`와 `GameBoard` 컴포넌트 조합

2. **`GameBoard.js`**:
    - 플레이어의 점수와 현재 상태를 표시
    - `PlayerBox`를 통해 각 플레이어 정보를 렌더링

3. **`Dice.js`**:
    - 주사위를 클릭하면 랜덤 숫자를 생성
    - `onRoll` 콜백을 통해 부모 컴포넌트에 점수 전달

4. **`PlayerBox.js`**:
    - 각 플레이어의 점수와 상태를 관리
    - `PlayerInfo`와 `PlayerCurrentScoreBox`를 포함

5. **`PlayerInfo.js`**:
    - 플레이어의 이름과 누적 점수를 표시

6. **`PlayerCurrentScoreBox.js`**:
    - 현재 점수를 표시

---

## 주요 기능

1. **주사위 던지기**
    - 주사위를 클릭하면 1~6 사이의 랜덤 숫자가 생성됩니다.
    - 1~2: 현재 점수 초기화 및 턴 변경.
    - 3~6: 현재 점수에 추가.

2. **턴 변경**
    - 플레이어는 번갈아 가며 주사위를 던집니다.
    - 현재 플레이어의 상태를 강조 표시합니다.

3. **홀드**
    - "홀드" 버튼 클릭 시, 현재 점수를 누적 점수에 추가하고 턴을 넘깁니다.

4. **승리 조건**
    - 누적 점수가 50점 이상인 경우, 해당 플레이어가 승리하며 게임이 종료됩니다.

---

## 주요 코드

### **App.js**
```javascript
import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import Dice from "./components/Dice";
import "./App.css";

function App() {
    const [game, setGame] = useState({
        player1: { totalScore: 0, currentScore: 0 },
        player2: { totalScore: 0, currentScore: 0 },
    });
    const [currentPlayer, setCurrentPlayer] = useState("player1");
    const [winner, setWinner] = useState(null);

    const handleRoll = (score) => {
        if (winner) return;

        const currentPlayerData = game[currentPlayer];
        if (score === 1 || score === 2) {
            setGame({
                ...game,
                [currentPlayer]: { ...currentPlayerData, currentScore: 0 },
            });
            switchPlayer();
        } else {
            setGame({
                ...game,
                [currentPlayer]: {
                    ...currentPlayerData,
                    currentScore: currentPlayerData.currentScore + score,
                },
            });
        }
    };

    const handleHold = () => {
        if (winner) return;

        const currentPlayerData = game[currentPlayer];
        const updatedTotalScore =
            currentPlayerData.totalScore + currentPlayerData.currentScore;

        if (updatedTotalScore >= 50) {
            setWinner(currentPlayer);
        } else {
            setGame({
                ...game,
                [currentPlayer]: {
                    totalScore: updatedTotalScore,
                    currentScore: 0,
                },
            });
            switchPlayer();
        }
    };

    const switchPlayer = () => {
        setCurrentPlayer((prev) => (prev === "player1" ? "player2" : "player1"));
    };

    return (
        <div className="app">
            <GameBoard game={game} currentPlayer={currentPlayer} winner={winner} />
            <Dice onRoll={handleRoll} />
            <button onClick={handleHold} disabled={!!winner}>Hold</button>
            {winner && <p>{winner} wins the game!</p>}
        </div>
    );
}

export default App;
```

Dice.js
```javascript
import React, { useState } from "react";
import "./Dice.css";

const Dice = ({ onRoll }) => {
    const [diceNumber, setDiceNumber] = useState(1);

    const rollDice = () => {
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        setDiceNumber(randomNumber);
        if (onRoll) onRoll(randomNumber);
    };

    return (
        <div className="dice-container">
            <div className="dice" onClick={rollDice}>{diceNumber}</div>
        </div>
    );
};

export default Dice;
```

## 결론
위 코드는 React를 사용하여 주사위 게임의 기본 로직과 구조를 포함합니다. 요구사항에 맞는 모든 기능을 구현하며, 유지보수성과 확장성을 고려하여 작성되었습니다. 추가적인 요청 사항이 있다면 반영 가능합니다.