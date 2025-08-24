import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom';
import Comment from './../Comment/Comment.jsx';
import CreateCommentModal from './../CreateCommentModal/CreateCommentModal.jsx';
import Updatepost from './../Updatepost/Updatepost';
import toast from 'react-hot-toast';


export default function UserPosts({ id }) {
  const queryClient = useQueryClient()
  
  function getUserPosts(){
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts?limit=2`,{
      headers : {
        token : localStorage.getItem("userToken"),
      }
    })
  }

  let {data, isError, isLoading, error} = useQuery({
    queryKey : ["userPosts"],
    queryFn :  getUserPosts,
  })
  
  function deletePost(postId){
    axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,{
      headers: {
        token: localStorage.getItem("userToken"),
      }
    }).then((res)=> {
      if(res.data.message === 'success'){
        toast.success("Post deleted")
        queryClient.invalidateQueries({ queryKey: ["userPosts"]});
      }
    }).catch((err)=>{
      toast.error("err.response.data.error");
      

    })
  }
  return <>
    {data?.data?.posts.map((post) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB"); 

  return (
    
    <div className="w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-800 text-white p-4 mx-auto">
      <Link key={post?.id} to={`/postdetails/${post?.id}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img src={post?.user.photo} className="size-[36px] rounded-full" alt="" />
          <p>{post?.user.name}</p>
        </div>
        <div className="text-xs text-slate-400">{formattedDate}</div>
      </div>

      {post?.body && <h2 className="mb-4">{post?.body}</h2>}
      {post?.image && (<img src={post?.image} className="w-full rounded-md" alt={post.body} />)}
      
    </Link>
      
      {post.comments.length > 0 && <Comment comment={post?.comments[0]}/>}

      {data?.data?.posts && <CreateCommentModal postId={post.id} />}
      
      <br/>
      
      <Updatepost id={post?.id} />

      <button onClick={() => deletePost(post?.id)} className=' bg-red-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 my-4 cursor-pointer'>Delete Post</button>
    </div>
    
  );
})}
  </>
}
