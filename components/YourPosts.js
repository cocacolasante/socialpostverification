"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from "../context/Web3Context"
import Image from 'next/image';
import PostCard from './PostCard';


const YourPosts = () => {
    const {currentAccount, getAllUsersPost} = useContext(Web3Context)
    const [currentPosts, setCurrentPosts] = useState()
     


    const fetchPost = async () =>{
        try{
            const data = await getAllUsersPost(currentAccount)
            console.log(data)

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