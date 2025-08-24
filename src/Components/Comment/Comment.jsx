import React from 'react';
import UpdateComment from './../UpdateComment/UpdateComment';
import DeleteComment from '../DeleteComment/DeleteComment';


const Comment = ({comment}) =>  {

  if (!comment) {
    return <p className="text-gray-400">Loading comment...</p>;
  }

  let {commentCreator, createdAt, content, _id } = comment;

  return <>
    <div className='w-full flex flex-col rounded-md border-2 my-2 p-3 border-slate-900 bg-slate-500 text-white'>
      <div className='flex  justify-between items-center '>
        <div className='flex gap-2 items-center'>
        <img src={commentCreator?.photo} className='size-[36px]' alt="" />
        <p>{commentCreator?.name}</p>
        </div>
        <span className='text-slate-300 text-sm' >{createdAt}</span>

      </div>
      <div className='content px-12 '>
        {content}
      </div>
      <div className='my-3 p-4 bg-slate-200 flex flex-col gap-3 w-[40%] font-semibold '>
        <button className='bg-yellow-500 p-2 rounded-md w-full cursor-pointer '><UpdateComment id={_id}/></button>
        <button className='bg-red-500 p-2 rounded-md w-full cursor-pointer '><DeleteComment id={_id} /></button>

      </div>
    </div>

  
    </>
  
};
export default Comment;

