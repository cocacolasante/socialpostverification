import {ethers} from "ethers"
import verification from "./verification.json"
import profile from "./profile.json"

export const VERIFICATIONADDRESS = ethers.utils.getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3")
export const VerificationAbi = verification.abi

export const PROFILEADDRESS = ethers.utils.getAddress("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512")
export const ProfileAbi = profile.abi

export const ZEROADDRESS = ethers.utils.getAddress("0x0000000000000000000000000000000000000000")


export const websiteUrl = `http://localhost:3000/findposts/`
