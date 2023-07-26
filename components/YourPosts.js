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
            console.log(data)
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
    <>
        <h2>Posts</h2>
        <div className='flex'>
            {currentPosts && console.log(currentPosts)}

            {currentPosts && currentPosts.map((post, i) =>{
                return (
                    <PostCard key={i} postNumber={post.postNumber} qrCodeSvg={post.qrCodeSvg} ipfsHash={post.ipfsHash} />           
                )
            })}
        </div>
        
    </>
  )
}

export default YourPosts