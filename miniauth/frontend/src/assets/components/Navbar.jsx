import React from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { useEffect } from 'react';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  const checkLogin = async () => {
    try {
      const user = await axios.get("/profile")
      if (user) {
        setIsLoggedIn(true)
      }
    } catch (error) {
      toast.error("fetching failed")
    }
  }
  useEffect(() => {
    checkLogin()
  }, [])
  const logoutHandler = async () => {
    try {
      await axios.get("/logout")
      setIsLoggedIn(false);
      toast.success("Logged Out");
      navigate("/login")
    } catch (error) {
      toast.error("failed")
    }
  }
  return (
    <div className="w-full h-16 bg-slate-800 text-amber-200 flex items-center justify-between px-6 shadow-xl">
      {/* Navigation Links */}
      <nav>
        <ul className="flex gap-6 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-white transition duration-200">Home</Link>
          </li>
          {isLoggedIn && <li>
            <Link to="/alluser" className="hover:text-white transition duration-200">All users</Link>
          </li>}
          <li>
            <Link to="/" className="hover:text-white transition duration-200">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        {!isLoggedIn && (
          <>
            <Link to="/login">
              <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200">
                Sign Up
              </button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <>

            <button
              onClick={logoutHandler}
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
            >
              Log Out
            </button>


            <button className="px-4 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition duration-200"
              onClick={() => { navigate("/dashboard") }}>
              Dashboard
            </button>

          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;