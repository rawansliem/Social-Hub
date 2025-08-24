import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast';



export default function DeleteComment({id}) {
  let queryClient = useQueryClient()

  function handleDeleteComment(){

    axios.delete(`https://linked-posts.routemisr.com/comments/${id}`,{
      headers : {
        token : localStorage.getItem("userToken"),
      }
    })
    .then((res) => {
      if(res.data.message === 'success'){
        toast.success(" Comment Deleted successfully");
        queryClient.invalidateQueries({queryKey: ["userPosts"]});
        queryClient.invalidateQueries({queryKey: ["getSinglePost"]});
      }
    })
    .catch((err) => {
      toast.error("Failed to delete comment !")
    })
  }
  
  
  
  return <>
    <button onClick={handleDeleteComment} > Delete Comment </button>
</>
}
