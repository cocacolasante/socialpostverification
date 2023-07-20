"use client";
import React, {useState, useEffect, useContext} from "react";
import { ethers } from "ethers";
import {VERIFICATIONADDRESS, VerificationAbi} from "./constants"

// fetch smart contract
const fetchVerificationContract = (signerOrProvider) =>{
    return new ethers.Contract(VERIFICATIONADDRESS, VerificationAbi, signerOrProvider)
}

export const Web3Context = React.createContext()

export const Web3Provider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState()
    const [currentFee, setCurrentFee] = useState()

    const createPost = async (ipfshash) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const VerificationContract = fetchVerificationContract(signer)

        const options = {
            value: BigInt(1000000000000000000)// 1 wei (fee value)
        };
        

        try{
            let tx = await VerificationContract.makePost(ipfshash, options)
            let res = await tx.wait()

            console.log(await res)
            if(res.status ==1){
                console.log("Success")
                alert(`https://ipfs.io/ipfs/${ipfshash}`)
            }else {
                console.log("Error")
            }

        }catch(err){
            console.log(err)
        }
    }


    const checkIfWalletIsConnected = async () =>{
        try{
            if(!window.ethereum){
                alert("please install metamask extension")
            }

            const accounts = await window.ethereum.request({method: "eth_accounts"})
            if(accounts.length >0){
                const active = accounts[0]

                setCurrentAccount(active)


            }


        }catch (err){
            console.log(err)
        }
    }

    const connectToWallet = async () =>{
        try{
            if(!window.ethereum){
                alert("please install metamask extension")
                
            }

            const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
            if(accounts.length >0){
                const current = accounts[0]
                setCurrentAccount(current)
            }
        }catch(err){
            console.log(err)
        }
    }

    const getFee = async () =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        
        const contract = fetchVerificationContract(provider)

        console.log(contract)
        const fee = await contract.fee()
        
       
    }


    useEffect(()=>{
        checkIfWalletIsConnected()
        // getFee()
    }, [])


    return (
        <Web3Context.Provider value={({
            connectToWallet,
            currentAccount,
            createPost,
            currentFee

        })} >
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3Context = () => useContext(Web3Context)