import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { questions } from '../data/questions';
import Question from './Question';
import { Modal } from 'antd';
import BonusAnimation from './BonusAnimation';

const Quiz = ({ updateScore }) => {
  const { level } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bonusPoints, setBonusPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const levelData = questions.find(q => q.level === level);
    if (levelData) {
      setFilteredQuestions(levelData.questions);
    }

    const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
    if (completedLevels.find(completed => completed.level === level)) {
      setIsCompleted(true);
    }
  }, [level]);

  useEffect(() => {
    if (isCompleted) {
      Modal.warning({
        title: 'Уровень уже завершен',
        content: 'Вы не получите дополнительных баллов за повторное прохождение этого уровня.',
      });
    }
  }, [isCompleted]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = (correctAnswers + (isCorrect ? 1 : 0)) * 10;
      setBonusPoints(finalScore);
      if (!isCompleted) {
        updateScore(finalScore);

        const completedLevels = JSON.parse(localStorage.getItem('completedLevels') || '[]');
        completedLevels.push({ level, score: finalScore });
        localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
      }
      Modal.confirm({
        title: 'Викторина завершена',
        content: `Вы ответили правильно на ${correctAnswers + (isCorrect ? 1 : 0)} из ${filteredQuestions.length} вопросов!`,
        okText: 'Вернуться на главную',
        onOk: () => {
          navigate('/');
        }
      });
    }
  };

  if (filteredQuestions.length === 0) {
    return <div>Нет вопросов для этого уровня.</div>;
  }

  return (
    <div>
      <Question questionData={filteredQuestions[currentQuestionIndex]} onAnswer={handleAnswer} />
      {bonusPoints > 0 && <BonusAnimation points={bonusPoints} />}
    </div>
  );
};

export default Quiz;
