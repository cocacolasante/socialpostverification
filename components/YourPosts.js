"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from "../context/Web3Context"
import { ethers } from "ethers";
import { VERIFICATIONADDRESS } from '../context/constants';
import verificationAbi from "../artifacts/contracts/Verification.sol/Verification.json"
import Image from 'next/image';


const YourPosts = () => {
    const {currentAccount, getSpecificPost, getAllUsersPost} = useContext(Web3Context)
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
    <div>
        <h2>Post 1</h2>
        {currentPosts && console.log(currentPosts)}
        {/* {currentPost && <Image width={500} height={500} alt='svg' src={currentPost} />} */}
        {currentPosts && currentPosts.map((post, i) =>{
            return (
                <div key={i}>
                    {/* MAKE API CALL TO IPFS TO GET JSON DATA FOR POST IMAGE AND NAME */}
                    <p>Post Num: {post.postNumber.toString()} </p>
                    <Image width={100} height={100} alt="svg" src={post.qrCodeSvg} />
                    <p><a href={`https://ipfs.io/ipfs/${post.ipfsHash}`}>IPFS Link</a></p>
                </div>
            )
        })}
    </div>
  )
}

export default YourPosts