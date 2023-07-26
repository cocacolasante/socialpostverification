"use client"
import Image from "next/image"
import {useState, useEffect} from "react"
import nextSvg from "../public/next.svg"
import ImageLoader from "./ImageLoader"



const PostCard = ({postNumber, qrCodeSvg, ipfsHash}) => {
  const [postMedia, setPostMedia] = useState()
  
  

  
  const fetchIpfsData = async () =>{
    const data = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`)

    
    const jsondata = await data.json()
    
    setPostMedia(jsondata.postHash)



  }

 

  useEffect(()=>{
    fetchIpfsData()
  },[])

  return (
    <div className="p-4 space-y-2 border rounded shadow-md">
      <p className="text-xl font-bold">Post Num: {postNumber.toString()} </p>
      <ImageLoader imageUrl={qrCodeSvg} />
      
      {postMedia && <ImageLoader imageUrl={postMedia} />}
      
      <p><a className="text-blue-500" target="_blank" rel="noopener noreferrer" href={`https://ipfs.io/ipfs/${ipfsHash}`}>IPFS Link</a></p>
    </div>
  )
}

export default PostCard