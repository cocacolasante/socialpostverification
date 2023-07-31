import {ethers} from "ethers"
import verification from "./verification.json"
import profile from "./profile.json"

export const VERIFICATIONADDRESSTESTING = ethers.utils.getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3")
export const VERIFICATIONADDRESS = ethers.utils.getAddress("0xF51C9dbaEbEAA4f1b58aD2d609170EC0cA326a6E")
export const VerificationAbi = verification.abi

export const PROFILEADDRESSTESTING = ethers.utils.getAddress("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
export const PROFILEADDRESS = ethers.utils.getAddress("0x4E539d65ff12913f380CBD7DdE1e7f5B7b5feCD1")
export const ProfileAbi = profile.abi

export const ZEROADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000000")


export const websiteUrl = `https://socialpostverification.vercel.app/findposts/`

export const testNetwork = "polygon Mumbai"
