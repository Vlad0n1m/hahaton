import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const generateRandomUsers = (numUsers, currentUserScore) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      key: i,
      name: `User${i + 1}`,
      score: Math.floor(Math.random() * 1000),
    });
  }
  users.push({
    key: numUsers,
    name: 'You',
    score: currentUserScore,
  });
  return users.sort((a, b) => b.score - a.score);
};

const Leaderboard = ({ currentScore }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const data = generateRandomUsers(10, currentScore);
    setLeaderboardData(data);
  }, [currentScore]);

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Счет',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => b.score - a.score,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Лидерборд</h1>
      <Table
        columns={columns}
        dataSource={leaderboardData}
        rowClassName={(record) => (record.name === 'You' ? 'bg-blue-100' : '')}
      />
    </div>
  );
};

export default Leaderboard;
