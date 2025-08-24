import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ChangePasswordModal() {

  const [isShow, setisShow]= useState(false);
  const form = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
    }
  });
  let {register, handleSubmit} = form

  function changeShow(){
    setisShow(!isShow); 
  }

  function handleChangePassword(values){
    axios.patch(`https://linked-posts.routemisr.com/users/change-password`, values, {
      headers: {
        token : localStorage.getItem('userToken'),
      }
    })
    .then((res) => {
      if(res.data.message === 'success'){
        localStorage.setItem('userToken', res.data.token)
        toast.success('Password changed successfully')
      }
    }).catch((err) => {
      toast.error('Password not correct')
    })
  }

  return (
    

<div>
  <button onClick={changeShow} data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Change Password
</button>


{isShow && <div id="authentication-modal" tabindex="-1" aria-hidden="true" 
    className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-md max-h-full">
       
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Change Password
                </h3>
                <button onClick={changeShow} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <i className='fas fa-close'></i>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
           
            <div className="p-4 md:p-5">
                <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-4" action="#">
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Your Current Password </label>
                        <input type="password" {...register("password")} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Your New Password</label>
                        <input type="Password" {...register("newPassword")} id="newPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change your password</button>
                    
                </form>
            </div>
        </div>
    </div>
</div> }
</div>

);
    
  
}
