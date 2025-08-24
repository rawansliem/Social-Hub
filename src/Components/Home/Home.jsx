import React, { useContext, useEffect, useState  } from 'react'
import { PostContext } from '../../Context/PostContext.jsx';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Comment from './../Comment/Comment';
import { Link } from 'react-router-dom';
import CreateCommentModal from '../CreateCommentModal/CreateCommentModal.jsx';
import CreatePost from '../CreatePost/CreatePost.jsx';


export default function Home() {

    // let { getAllPosts } = useContext(PostContext);

    // const [posts, setposts] = useState([]);

    // async function  getPosts() {
    //   let res = await getAllPosts();
  
    //     if(res.length) {
    //       setposts(res);
    //       console.log(res);
    //     }
        
        
    // } 

    // useEffect(()=>{
    //   getPosts();
    // },[]);
    
    function getAllPosts(){
      return axios.get(`https://linked-posts.routemisr.com/posts?limit=50`,{
        headers : {
          token : localStorage.getItem("userToken")
        },
      })
    }
    let {data, isError, isLoading, error} = useQuery({
      queryKey : ["getPosts"],
      queryFn : getAllPosts,      // func call api
      // staleTime : 20000,
      // retry : 5 ,
      // retryDelay : 3000 ,
      // refetchInterval : 2000 ,
      // refetchIntervalInBackground : true ,
      // refetchOnWindowFocus : true ,
      // gcTime : 4000 ,
      // select : (data) => data?.data?.posts ,

      
    })
    
    if(isError){
      return <h3>{error.message}</h3>
    }
    
    if(isLoading){
      return <div className='spinner'></div>
    }


  return (
  <>
  <CreatePost />
  {data?.data?.posts.map((post) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-GB"); 

  return (
    
    <div className="w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-200 p-4 mx-auto">
      <Link key={post.id} to={`/postdetails/${post.id}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <img src={post.user.photo} className="size-[36px] rounded-full" alt="" />
          <p>{post.user.name}</p>
        </div>
        <div className="text-xs text-slate-400">{formattedDate}</div>
      </div>

      {post.body && <h2 className="mb-4">{post.body}</h2>}
      {post.image && (<img src={post.image} className="w-full rounded-md" alt={post.body} />)}
      

      <Comment comment={post.comments[0]}/>
    </Link>
      <CreateCommentModal postId={post.id} />
    </div>
    
  );
})}

    
  

  </>
  );
}
