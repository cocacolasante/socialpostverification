"use client";
import React, {useState, useEffect, useContext} from "react";
import { ethers } from "ethers";
import {VERIFICATIONADDRESS, VerificationAbi} from "./constants"

// fetch smart contract
const fetchVerificationContract = (signerOrProvider) =>{
    return ethers.Contract(VERIFICATIONADDRESS, VerificationAbi, signerOrProvider)
}

export const Web3Context = React.createContext()

export const Web3Provider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState()


    const checkIfWalletIsConnected = async () =>{
        try{
            if(!window.ethereum){
                alert("please install metamask extension")
            }

            const accounts = await window.ethereum.request({method: "eth_accounts"})
            if(accounts.length >0){
                const active = accounts[0]
                setCurrentAccount(active)

                console.log("connected")

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


    useEffect(()=>{
        checkIfWalletIsConnected()
    }, [])


    return (
        <Web3Context.Provider value={({
            connectToWallet,
            currentAccount,

        })} >
            {children}
        </Web3Context.Provider>
    )
}