import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { questions } from '../data/questions';
import { Button } from 'antd';

const LevelList = () => {
  const [completedLevels, setCompletedLevels] = useState([]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeftUntilTomorrow());

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedLevels') || '[]');
    setCompletedLevels(completed);

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeftUntilTomorrow());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const levels = questions.map(q => q.level);

  const getQuestionCountForLevel = (level) => {
    const levelData = questions.find(q => q.level === level);
    return levelData ? levelData.questions.length : 0;
  };

  const availableLevels = levels.filter(level => !completedLevels.find(completed => completed.level === level));

  return (
    <>
      <div className="bg-yellow-200 p-4 mb-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold">Коллаборация МЧС X Halyk Bank</h2>
        <p>При прохождении уровней дается 1 халык бонус = 1 тенге.</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Доступные уровни</h1>
        <div>
          {availableLevels.length > 0 ? (
            availableLevels.map((level) => (
              <div key={level} className="block p-2 mb-2 border rounded hover:bg-gray-100">
                <Link to={`/quiz/${level}`} className="block">
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Link>
                <span className="text-sm text-gray-600">Вопросы: {getQuestionCountForLevel(level)}</span>
              </div>
            ))
          ) : (
            <div className="text-gray-600">Нет доступных уровней</div>
          )}
          <div className="block p-2 mb-2 border rounded bg-gray-100">
            <span>Новый вопрос откроется завтра!</span>
            <div>Время до открытия: {formatTimeLeft(timeLeft)}</div>
          </div>
        </div>
      </div>
      {completedLevels.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h1 className="text-2xl font-bold mb-4">Завершенные уровни</h1>
          {completedLevels.map(({ level, score }) => (
            <div key={level} className="block p-2 mb-2 border rounded bg-gray-200">
              <div className="flex justify-between items-start">
                <span className="font-bold">{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                <div className="flex flex-col items-end">
                  <span>Бонусы: {score}</span>
                  <Link to={`/quiz/${level}`} className="block mt-2">
                    <Button type="primary" size="small" className="rounded-full">
                      Пройти снова
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const getTimeLeftUntilTomorrow = () => {
  const now = new Date();
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  return tomorrow - now;
};

const formatTimeLeft = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}ч ${minutes}м ${seconds}с`;
};

export default LevelList;
