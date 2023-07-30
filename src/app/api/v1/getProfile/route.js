import { ethers } from 'ethers'
import { NextResponse } from 'next/server'
import { testNetwork } from '../../../../../context/constants'
import { ProfileAbi } from '../../../../../context/constants'
import { PROFILEADDRESS } from '../../../../../context/constants'
 
export async function GETProfile(request) {
    // const { searchParams } = new URL(request.url)
    // const address = searchParams.get("address")

    // const provider = new ethers.providers.AlchemyProvider(testNetwork, process.env.MUMBAI_API)
    // const ProfileContract = new ethers.Contract(PROFILEADDRESS, ProfileAbi, provider)
    


    // const res = await ProfileContract.profiles(address)


    // const data = await res.json()
    
    return NextResponse.json({ data: "testing" })
}