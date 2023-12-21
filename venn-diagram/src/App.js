import React, { useState } from 'react';
import VennDiagram from './VennDiagram';
import './App.css';
import questions from './questions';

const App = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Answers, setPlayer1Answers] = useState([]);
  const [player2Answers, setPlayer2Answers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [namesSubmitted, setNamesSubmitted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (player, answer) => {
    if (player === 1) {
      setPlayer1Answers((prevAnswers) => [...prevAnswers, answer]);
    } else {
      setPlayer2Answers((prevAnswers) => [...prevAnswers, answer]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Last question reached, mark the quiz as completed
      setQuizCompleted(true);
    }
  };

  const handleSubmitNames = () => {
    // Add any additional logic for name submission if needed
    setNamesSubmitted(true);
  };

  const sets = [
    { sets: [player1Name], size: player1Answers.length },
    { sets: [player2Name], size: player2Answers.length },
    { sets: [player1Name, player2Name], size: player1Answers.filter((answer) => player2Answers.includes(answer)).length },
  ];

  return (
    <div>
      <h1>U4U Venn Diagram Quiz</h1>

      {!namesSubmitted && (
        <div className="player-names">
          <label>Player 1 Name: </label>
          <input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />

          <label>Player 2 Name: </label>
          <input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />

          <button onClick={handleSubmitNames}>Submit</button>
        </div>
      )}

      {namesSubmitted && !quizCompleted && (
        <div>
          <h2>Question: {currentQuestion.text}</h2>
          <p>{player1Name}</p>
          {currentQuestion.options.map((option) => (
            <button key={option} onClick={() => handleAnswerSelect(1, option)}>
              {option}
            </button>
          ))}
          <p>Selected Option: {player1Answers[player1Answers.length - 1]}</p>

          <p>{player2Name}</p>
          {currentQuestion.options.map((option) => (
            <button key={option} onClick={() => handleAnswerSelect(2, option)}>
              {option}
            </button>
          ))}
          <p>Selected Option: {player2Answers[player2Answers.length - 1]}</p>
        </div>
      )}

      {namesSubmitted && !quizCompleted && (
        <button onClick={handleNextQuestion}>Next</button>
      )}

      {namesSubmitted && quizCompleted && (
        <div>
          <h2>{player1Name}'s Answers</h2>
          <p>{player1Answers.join(', ')}</p>

          <h2>{player2Name}'s Answers</h2>
          <p>{player2Answers.join(', ')}</p>

          
          {/* Compatibility Percentage */}
          {namesSubmitted && quizCompleted && (
            <div>
              <h2>Compatibility Percentage</h2>
              <p>{((sets[2].size / Math.min(sets[0].size, sets[1].size)) * 100).toFixed(2)}%</p>
              <VennDiagram data={sets} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
