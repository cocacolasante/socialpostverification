"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from "../context/Web3Context"
import { ethers } from "ethers";
import { VERIFICATIONADDRESS } from '../context/constants';
import verificationAbi from "../artifacts/contracts/Verification.sol/Verification.json"



const fetchVerificationContract = (signerOrProvider) =>{
    return new ethers.Contract(VERIFICATIONADDRESS, verificationAbi.abi, signerOrProvider)
}
const YourPosts = () => {
    const {currentAccount, getSpecificPost} = useContext(Web3Context)
    const [currentPost, setCurrentPost] = useState()


    const fetchPost = async (postNum) =>{
        if(!currentAccount) return console.log("not connected")
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            
            const verFicationContrct = fetchVerificationContract(provider)
            
            console.log(verFicationContrct)
            console.log(currentAccount)
            const data = await verFicationContrct.getSpecificPost(currentAccount, postNum)
            console.log(data)

           


            
            // setCurrentPost(data)

        }catch(err){
            console.log(err)
        }
    }   

    useEffect(()=>{
        
        fetchPost(1)
    },[currentAccount])

  return (
    <div>
        <h2>Post 1</h2>
        {currentPost && console.log(currentPost)}
    </div>
  )
}

export default YourPosts