import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import Quiz from './components/Quiz';
import LevelList from './components/LevelList';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import 'tailwindcss/tailwind.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [score, setScore] = useState(parseInt(localStorage.getItem('score') || '0'));
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setScore(parseInt(localStorage.getItem('score') || '0'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateScore = (points) => {
    const newScore = score + points;
    setScore(newScore);
    localStorage.setItem('score', newScore);
  };

  return (
    <Layout className="layout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: 'white', fontSize: '20px' }}>МЧС теория</div>
        <div style={{ color: 'white', marginRight: '20px' }}>Бонусы: {score}</div>
      </Header>
      <Content style={{ padding: '20px', marginTop: 64 }}>
        <Routes>
          <Route path="/quiz/:level" element={<Quiz updateScore={updateScore} />} />
          <Route path="/" element={<LevelList />} />
          <Route path="/leaderboard" element={<Leaderboard currentScore={score} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Content>
      <Footer style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', padding: 0 }}>
        <Menu mode="horizontal" selectedKeys={[location.pathname]} style={{ display: 'flex', justifyContent: 'center' }}>
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Уровни</Link>
          </Menu.Item>
          <Menu.Item key="/leaderboard" icon={<TrophyOutlined />}>
            <Link to="/leaderboard">Лидерборд</Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined />}>
            <Link to="/profile">Личный кабинет</Link>
          </Menu.Item>
        </Menu>
      </Footer>
    </Layout>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
