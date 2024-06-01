import React from 'react';
import { Button } from 'antd';

const Question = ({ questionData, onAnswer }) => {
  const { question, options, correctAnswer } = questionData;

  const handleAnswer = (answer) => {
    const isCorrect = answer === correctAnswer;
    onAnswer(isCorrect);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{question}</h2>
      <div className="flex flex-col">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(option)}
            className="mb-2"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Question;
