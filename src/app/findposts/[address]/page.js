import React from 'react'
import DisplayUsersPosts from '../../../../components/DisplayUsersPosts'
import { ethers } from 'ethers'
import { PROFILEADDRESS } from '../../../../context/constants'
import { ProfileAbi } from '../../../../context/constants'
import { ZEROADDRESS } from '../../../../context/constants'

async function getProfileData(address){
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const ProfileContract = new ethers.Contract(PROFILEADDRESS, ProfileAbi, provider)
  console.log(ProfileContract)

  try {
    const profile = await ProfileContract.profiles(address)
    if(profile.profileAddress == ZEROADDRESS){
        return null
    }else {
        return profile

    }
    

}catch(err){
    console.log(err)

}
}

const page = async ({params}) => {
  const address = params.address

  // const profileData = await getProfileData(address)
  // console.log(profileData)

  
  return (
    <div>
      <DisplayUsersPosts address={address} />   
    </div>
  )
}

  

export default page