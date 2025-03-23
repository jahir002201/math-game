"use client";
import { useState, useEffect } from "react";

const MathGame = () => {
  const [playerName, setPlayerName] = useState("");
  const [gradeLevel, setGradeLevel] = useState(3);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setQuestion(`${num1} + ${num2} = ?`);
    return num1 + num2;
  };

  const checkAnswer = () => {
    const correctAnswer = eval(question.split("=")[0]);
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 3);
    } else {
      setScore(score - 1);
    }
    setAnswer("");
    generateQuestion();
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(180);
    generateQuestion();
  };

  const endGame = () => {
    setGameStarted(false);
    alert(`Game Over! Final Score: ${score}`);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-yellow-300 to-red-400 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Elementary Math Challenge</h1>
      {!gameStarted ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="p-2 border rounded-md mb-4"
          />
          <select
            className="p-2 border rounded-md mb-4"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(Number(e.target.value))}
          >
            <option value={3}>Easy</option>
            <option value={4}>Medium</option>
            <option value={5}>Hard</option>
            <option value={6}>Extreme</option>
          </select>
          <button
            onClick={startGame}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="text-lg font-bold">Time Left: {timeLeft}s</div>
          <div className="text-lg font-bold text-blue-600">Score: {score}</div>
          <div className="text-2xl my-4">{question}</div>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={checkAnswer}
            className="bg-blue-500 text-white p-2 rounded-md ml-2 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MathGame;
