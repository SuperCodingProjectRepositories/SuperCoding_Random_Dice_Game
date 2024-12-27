import './App.css';
import GameBoard from "./Components/GameBoard";
import Dice from "./Components/Others/Dice";
import { useState } from "react";
import HoldButton from "./Components/Others/HoldButton";

function App() {
    // 게임 상태를 관리하는 state
    // 각 플레이어의 누적 점수(totalScore)와 현재 점수(currentScore)를 저장
    const [game, setGame] = useState({
        player1: { totalScore: 0, currentScore: 0 },
        player2: { totalScore: 0, currentScore: 0 },
    });

    // 현재 턴인 플레이어를 관리하는 state
    const [currentPlayer, setCurrentPlayer] = useState("player1");

    // 승자를 관리하는 state (승자가 없으면 null)
    const [winner, setWinner] = useState(null);

    // 주사위를 굴릴 때 실행되는 함수
    const onhandleRoll = (score) => {
        if (winner) return; // 승자가 있으면 동작하지 않음

        const currentPlayerData = game[currentPlayer]; // 현재 플레이어의 데이터 가져오기

        if (score === 1 || score === 2) {
            // 주사위가 1 또는 2가 나오면 현재 점수를 초기화하고 턴을 변경
            setGame({
                ...game,
                [currentPlayer]: { ...currentPlayerData, currentScore: 0 },
            });
            switchPlayer(); // 턴 변경
        } else {
            // 주사위가 3~6 사이의 값이면 현재 점수에 추가
            setGame({
                ...game,
                [currentPlayer]: {
                    ...currentPlayerData,
                    currentScore: currentPlayerData.currentScore + score,
                },
            });
        }
    };

    // 턴을 변경하는 함수
    const switchPlayer = () => {
        // 현재 플레이어가 player1이면 player2로, 아니면 player1로 변경
        setCurrentPlayer((prev) => (prev === "player1" ? "player2" : "player1"));
    };

    // 홀드 버튼을 눌렀을 때 실행되는 함수
    const handleHold = () => {
        if (winner) return; // 승자가 있으면 동작하지 않음

        const currentPlayerData = game[currentPlayer]; // 현재 플레이어의 데이터 가져오기
        const updatedTotalScore =
            currentPlayerData.totalScore + currentPlayerData.currentScore; // 누적 점수 계산

        if (updatedTotalScore >= 50) {
            // 누적 점수가 50 이상이면 현재 플레이어를 승자로 설정
            setGame({
                ...game,
                [currentPlayer]: {
                    totalScore: updatedTotalScore,
                    currentScore: 0,
                },
            });
            setWinner(currentPlayer); // 승자 설정
        } else {
            // 누적 점수를 업데이트하고 현재 점수를 초기화, 턴 변경
            setGame({
                ...game,
                [currentPlayer]: {
                    totalScore: updatedTotalScore,
                    currentScore: 0,
                },
            });
            switchPlayer(); // 턴 변경
        }
    };

    return (
        <div className="app">
            <div className="game-board-wrapper">
                {/* 게임 상태와 현재 플레이어 정보를 GameBoard로 전달 */}
                <GameBoard game={game} currentPlayer={currentPlayer} winner={winner} />

                {/* 주사위 컴포넌트에서 onhandleRoll 함수를 콜백으로 전달 */}
                <Dice onRoll={onhandleRoll} />

                {/* 홀드 버튼 컴포넌트에서 handleHold 함수를 콜백으로 전달 */}
                <HoldButton handleHold={handleHold} winner={winner} />

                {/* 승자가 있을 경우 승자 메시지를 화면에 표시 */}
                {winner && <p>{winner} wins the game!</p>}
            </div>
        </div>
    );
}

export default App;
