import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';


export default function CreatePost() {

  let form = useForm({
    defaultValues: {
      body: '',
      image: '',
    },
  });

  let {register, handleSubmit} = form;

  async function handleAddPost(values){
  
    let myData = new FormData()
    myData.append("body", values.body);
    if (values.image && values.image.length > 0) {
      myData.append("image", values.image[0]);
}

    
  try{
    let response = await axios.post(`https://linked-posts.routemisr.com/posts`,myData, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });

    if(response.data.message === 'success'){
      toast.success('Post added successfully')
    }
  }
    catch(err){
      toast.error(err.response.data.error)
      
    }
    
    
    

  }

  return<>
  <div className='w-full lg:w-[80%] md:w-[60%] mx-auto bg-slate-700 p-4 rounded-lg my-12 '>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div>
          <input 
          type="text" 
          {...register("body")}
          className='w-full border-4  border-blue-300 rounded-lg p-4' 
          placeholder='Post Details' 
          />
        </div>
        <div className='my-4'>
          <label htmlFor="photo" className=' bg-blue-300 w-full block p-4 text-center cursor-pointer '>
            <i className='fas fa-image fa-2xl text-blue-600'></i>
            </label>
          <input type="file" {...register("image")} className='hidden ' id='photo'/>
        </div>
        <div>
          <button className='bg-blue-600 text-white w-full p-3 rounded-lg cursor-pointer '>Add Post</button>

        </div>
      </form>

  </div>
  </>
}
