import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './../../Context/UserContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Navbar() {
  let navigate = useNavigate()

  let {userLogin, setuserLogin } = useContext(UserContext);

  function signout(){
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      }
    });
  }

let {data, isError, isLoading} = useQuery({
    queryKey : ["userData"],
    queryFn :  getUserData,
    select : (data) => data?.data?.user,
  });
  

  return <>
    

<nav className="bg-gradient-to-r from-[#0D1B2A] to-[#87CEFA] border-gray-200">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
      <span className="self-center text-3xl font-bold whitespace-nowrap  text-blue-400 ">
        Social Hub 
        </span>
    </Link>
    <div className="flex gap-4 items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
     
      {userLogin  !== null ?( 
        <>
      <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-10 h-10 rounded-full " src={data?.photo} alt="user photo"/>
      </button>
      <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">{data?.name}</span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{data?.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Profile
                  </Link>
          </li>
          <li>
            <span 
                onClick={signout}
                className="block-cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sign Out
                  </span>
          </li>
       
        </ul>
        
      </div>
        </>
        ) : (
          <ul className='text-white flex gap-4'>
              <li>
                <Link to="register">Register</Link>
              </li>
              <li>
                <Link to="login">Login</Link>
              </li>
          
          </ul>
          
        )}
      
    </div>
  </div>
</nav>

  
  
  </>
} 