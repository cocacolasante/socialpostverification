"use client"
import Image from "next/image"
import {useState, useEffect} from "react"


const PostCard = ({postNumber, qrCodeSvg, ipfsHash}) => {
  const [postMedia, setPostMedia] = useState()
  const fetchIpfsData = async () =>{
    const data = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`)
    const jsondata = await data.json()
    console.log(jsondata.postHash)
    setPostMedia(jsondata.postHash)


  }

  useEffect(()=>{
    fetchIpfsData()
  },[])

  return (
    <div className="space-x-2">
        {/* MAKE API CALL TO IPFS TO GET JSON DATA FOR POST IMAGE AND NAME */}
        <p>Post Num: {postNumber.toString()} </p>
        <Image width={100} height={100} alt="svg" src={qrCodeSvg} />
        {postMedia && <Image width={250} height={250} alt="svg" src={postMedia} />}
    <p><a target="_blank" href={`https://ipfs.io/ipfs/${ipfsHash}`}>IPFS Link</a></p>
</div>
  )
}

export default PostCard