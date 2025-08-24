import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import Comment from './../Comment/Comment';


export default function PostDetails() {

  let {id} = useParams();

  function getSinglePost(){
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
      headers : {
        token : localStorage.getItem("userToken"), 
      }
    })
  } 

  let {data, isError, isLoading, error } = useQuery({
    queryKey: ["getSinglePost"],
    queryFn:  getSinglePost,
    select : (data) => data?.data?.post
  });
  console.log(data);
  
  const formattedDate = new Date(data?.createdAt).toLocaleDateString("en-GB"); 

  return (
    <div className="w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-200 p-4 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img src={data?.user.photo} className="size-[36px] rounded-full" alt="" />
          <p>{data?.user.name}</p>
        </div>
        <div className="text-xs text-slate-400">{formattedDate}</div>
      </div>

      {data?.body && <h2 className="mb-4">{data?.body}</h2>}
      {data?.image && (<img src={data?.image} className="w-full rounded-md" alt={data.body} />)}

      {data?.comments.map((comment) => <Comment key={comment.id}  comment={comment}/> )}
    </div>
  )
}
