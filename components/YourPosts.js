"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from "../context/Web3Context"
import PostCard from './PostCard';


const YourPosts = ({maxPosts }) => {
    const {currentAccount, getAllUsersPost} = useContext(Web3Context)
    const [currentPosts, setCurrentPosts] = useState()
     


    const fetchPost = async () =>{
        try{
            let data = await getAllUsersPost(currentAccount)
            
            if(maxPosts && data.length > maxPosts){
                data = data.slice(0, maxPosts)
            }

            setCurrentPosts(data)


        }catch(err){
            console.log(err)
        }
    }   

    useEffect(()=>{
        
        fetchPost()
    },[currentAccount])

  return (
    <div className='text-center'>
        <h2 className="mb-4 text-3xl font-bold">Posts</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {currentPosts && console.log(currentPosts)}

            {currentPosts && currentPosts.map((post, i) =>{
                return (
                    <PostCard key={i} postNumber={post.postNumber} qrCodeSvg={post.qrCodeSvg} ipfsHash={post.ipfsHash} />           
                )
            })}
        </div>
        
    </div>
  )
}

export default YourPosts