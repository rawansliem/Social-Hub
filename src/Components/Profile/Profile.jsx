import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import UserPosts from '../UserPosts/UserPosts';
import ChangePasswordModal from '../ChangePasswordModal/ChangePasswordModal';
import UploadProfilePhoto from '../UploadProfilePhoto/UploadProfilePhoto';

export default function Profile() {
  

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
  
  return (
    <>
      <div className='w-full md:w-[80%] lg:w-[60%] mx-auto my-12 p-4 text-center text-blue-900 font-bold border-2 border-slate-600 bg-slate-300 rounded-lg  '>
        <img src={data?.photo} className='size-[60px] mx-auto rounded-md border-2 border-blue-900 ' alt="" />
        <p>Name : {data?.name}</p>
        <p>Gender : {data?.gender}</p>
        <p>Email : {data?.email}</p>
        <p>Birthday : {data?.dateOfBirth}</p>

      </div>
      
      <div className='flex justify-center flex-col items-center gap-3 w-full md:w-[80%] lg:w-[60%] mx-auto my-12 p-4 text-center border-2 border-slate-200 bg-slate-600 rounded-lg  text-white'>
          <ChangePasswordModal/>
          <UploadProfilePhoto/>
      
      </div>

      {data && <UserPosts id={data?._id}/>}
      
    </>
    
  );
}
