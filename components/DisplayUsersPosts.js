"use client"
import React,{useState, useEffect, useContext} from 'react'
import { Web3Context } from "../context/Web3Context"
import PostCard from './PostCard'

const DisplayUsersPosts = ({address}) => {
    const [usersPosts, setUsersPosts] = useState()

    const {getAllUsersPost} = useContext(Web3Context)

    const fetchPageData = async () =>{
        try{
            const data = await getAllUsersPost(address)
            console.log(data)
            setUsersPosts(data)
        }catch(err){
            console.log(err)

        }
    }
    
    useEffect(()=>{
        fetchPageData()
    },[])
    
  return (
    <>
        <div className='flex'>
            {usersPosts && (
                usersPosts.map((post, i) =>{
                    return (
                        <PostCard key={i} ipfsHash={post.ipfsHash} qrCodeSvg={post.qrCodeSvg} postNumber={post.postNumber} />
                    )
                })
            )}
        </div>
        
    </>
  )
}

export default DisplayUsersPosts