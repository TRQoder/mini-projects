import React from 'react';
import { useNavigate } from 'react-router';

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  return (

    <div className="flex justify-center items-center h-screen bg-white">
      {!isLoggedIn && navigate("/login") }
      <h1 className="text-4xl font-semibold text-gray-800">
        Welcome to Home 🏠
      </h1>
    </div>
  );
};

export default Home;