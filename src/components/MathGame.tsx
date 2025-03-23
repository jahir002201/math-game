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
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState("");
  
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
    setTotalQuestions((prev) => prev + 1);
    if (parseInt(answer) === correctAnswer) {
      setScore((prev) => prev + 3);
      setCorrectAnswers((prev) => prev + 1);
      setFeedback("Correct! +3 points 🎉");
    } else {
      setScore((prev) => prev - 1);
      setIncorrectAnswers((prev) => prev + 1);
      setFeedback(`Incorrect! -1 point. Correct answer: ${correctAnswer}`);
    }
    setAnswer("");
    generateQuestion();
  };
  
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setTimeLeft(180);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setTotalQuestions(0);
    setFeedback("");
    generateQuestion();
  };
  
  const endGame = () => {
    setGameStarted(false);
    setFeedback(`Game Over! Final Score: ${score}`);
  };
  
  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-yellow-300 to-red-400 min-h-screen font-comic">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Elementary Math Challenge</h1>
      {!gameStarted ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <label className="font-bold">Enter your name:</label>
          <input
            type="text"
            placeholder="Your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="p-2 border rounded-md mb-4 w-full text-center"
          />
          <label className="font-bold">Select Level:</label>
          <select
            className="p-2 border rounded-md mb-4 w-full"
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
            className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-700 mt-4"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <div className="flex justify-between text-lg font-bold">
            <div className="text-blue-600">Score: {score}</div>
            <div className="text-red-600">Time: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
          </div>
          <div className="text-2xl my-4">{question}</div>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-2 border rounded-md w-full text-center"
          />
          <button
            onClick={checkAnswer}
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-700 mt-4"
          >
            Submit
          </button>
          <div className={`feedback mt-4 ${feedback.includes("Correct") ? "text-green-600" : "text-red-600"}`}>{feedback}</div>
        </div>
      )}
    </div>
  );
};

export default MathGame;
