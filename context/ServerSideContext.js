import { ethers } from "ethers";

import {VERIFICATIONADDRESS, VerificationAbi, PROFILEADDRESS, ProfileAbi, ZEROADDRESS} from "./constants"

const alchemyApiKey = process.env.NEXT_PUBLIC_MUMBAI_API
const mumbaiRpcUrl = process.env.NEXT_PUBLIC_MUMBAI_URL



const provider = new ethers.providers.JsonRpcProvider(mumbaiRpcUrl, {
    name: "mumbai",
    chainId: 80001,
    headers: {
      Authorization: `Bearer ${alchemyApiKey}`
    }
  });

// console.log(provider)
export const getUsersProfileServer = async (accountNumber) =>{
    const ProfileContract = new ethers.Contract(PROFILEADDRESS, ProfileAbi, provider)

    try {
        const profile = await ProfileContract.profiles(accountNumber)
        
        const formattedData = {
            profileAddress: profile[0],
            username: profile[1],
            profileQrCode: profile[2]
        }

        return formattedData

    }catch(err){
        console.log(err)
        return null
    }
    
}

export const getUsersPostsServer = async (accountNumber) =>{
    const VerificationContract = new ethers.Contract(VERIFICATIONADDRESS, VerificationAbi, provider)
    try {
        const posts = await VerificationContract.getAllUsersPost(accountNumber)
        const formattedPosts = posts.map((post) =>{
            return {
                postNumber: post[0].toString(),
                ipfsHash: post[1],
                qrCodeSvg: post[2]
            }
        })
        return formattedPosts

    }catch(err){
        console.log(err)
        return null
    }
    
}