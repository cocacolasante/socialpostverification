"use client"
import React,{useState, useEffect, useContext} from 'react'
import { Web3Context } from "../context/Web3Context"
import PostCard from './PostCard'

const DisplayUsersPosts = ({address}) => {
    const [usersPosts, setUsersPosts] = useState()
    const [isErr, setIsErr] = useState(false)

    const {getAllUsersPost} = useContext(Web3Context)

    const fetchPageData = async () =>{
        try{
            const data = await getAllUsersPost(address)
            if(data == undefined) {
                setIsErr(true)
                return
            }
            setUsersPosts(data)
            setIsErr(false)
        }catch(err){
            console.log(err)
            setIsErr(true)
            
        }
    }
    
    useEffect(()=>{
        fetchPageData()
    },[])
    
  return (
    <>
        {!isErr ? <div className='flex'>
            {usersPosts && (
                usersPosts.map((post, i) =>{
                    return (
                        <PostCard key={i} ipfsHash={post.ipfsHash} qrCodeSvg={post.qrCodeSvg} postNumber={post.postNumber} />
                    )
                })
            )}
        </div> :
        (
            <div className='text-center'>
                <h2>NO USER FOUND</h2>
            </div>
        )}
        
    </>
  )
}

export default DisplayUsersPosts