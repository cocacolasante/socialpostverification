import {ethers} from "ethers"
import verification from "./verification.json"

export const VERIFICATIONADDRESS = ethers.utils.getAddress("0x5FbDB2315678afecb367f032d93F642f64180aa3")
export const VerificationAbi = verification.abi
