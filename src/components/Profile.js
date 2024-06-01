import React from 'react';



const Profile = () => {
  const score = parseInt(localStorage.getItem('score') || '0');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Личный кабинет</h1>
      <p>Ваши бонусы: {score}</p>

    </div>
  );
};

export default Profile;
