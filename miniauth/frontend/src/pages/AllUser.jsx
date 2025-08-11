import { useEffect } from 'react'
import axios from '../api/axiosConfig'
import React from 'react'
import { useState } from 'react'

const AllUser = () => {
    const [users, setUsers] = useState([])
    const allUserDetails = async () => {
        const { data } = await axios.get("/users")
        setUsers(data.users)

    }
    useEffect(() => {
        allUserDetails()
    }, [])

    return (
        <div className='flex flex-col justify-center items-center h-full'>
            <h1 className='text-3xl mb-5'>All user Details</h1>
            <ul>
            {users.map((item)=>(
                <li key={item._id} className='text-xl border my-3 p-3 rounded hover:scale-101'>
                    <div>id : {item._id}</div>
                    <div>username : {item.username}</div>
                    <div>email :{item.email}</div>
                    <div>hashed password :{item.password}</div>
                    
                </li>
            ))}
            </ul>
        </div>
    )
}

export default AllUser