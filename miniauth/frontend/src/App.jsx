import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './assets/components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import AllUser from './pages/AllUser';
import toast from 'react-hot-toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = async () => {
    try {
      const user = await axios.get("/profile")
      if(user){
        setIsLoggedIn(true)
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <div className="w-screen min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar checkLogin={checkLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* Page Content */}
      <main className="pt-4">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/alluser" element={<AllUser />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;