import React, { useEffect } from 'react';
import axios from '../api/axiosConfig';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Dashboard = ({setIsLoggedIn}) => {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({})
  const getUserDetail = async () => {
    try {
      const user = await axios.get("/profile")
      setuserDetails(user.data.user)
    } catch (error) {
      toast.error("fetching failed")
    }
  }
  useEffect(() => {
    getUserDetail()

  }, [])

  const deleteHandler = async()=>{
     try {
      const user = await axios.get("/deleteuser")
      // setuserDetails(user.data.user)
      toast.success("User deleted successfully")
      setIsLoggedIn(false);
      navigate("/login")
    } catch (error) {
      toast.error("fetching failed")
    }
  }


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div><h1 className="text-3xl font-bold text-blue-700">
        Welcome to Your Dashboard 🚀
      </h1></div>
      <div className='text-2xl text-blue-950'>

       <h2> Name : {userDetails.username}</h2>
       <h2> Email :{userDetails.email}</h2>
       <button
       onClick={deleteHandler}
       className='px-5 py-2 bg-cyan-200 rounded'>Delete</button>

      </div>
    </div>
  );
};

export default Dashboard;