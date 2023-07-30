"use client";
import React, {useState, useEffect, useContext} from "react";
import { ethers } from "ethers";
import {VERIFICATIONADDRESS, VerificationAbi, PROFILEADDRESS, ProfileAbi, ZEROADDRESS} from "./constants"


// fetch smart contract
const fetchVerificationContract = (signerOrProvider) =>{
    return new ethers.Contract(VERIFICATIONADDRESS, VerificationAbi, signerOrProvider)
}

const fetchProfileContract = (signerOrProvider) =>{
    return new ethers.Contract(PROFILEADDRESS, ProfileAbi, signerOrProvider)
}

export const Web3Context = React.createContext()

export const Web3Provider = ({children}) =>{
    const [currentAccount, setCurrentAccount] = useState()
    const [currentFee, setCurrentFee] = useState(1)
    const [currentProfile, setCurrentProfile] = useState(null)
    const [viewedProfile, setViewedProfile] = useState(null)

    const createPost = async (ipfshash, qrsvg) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const VerificationContract = fetchVerificationContract(signer)

        const options = {
            value: currentFee // 1 wei (fee value)
        };
        
        
        try{
            let tx = await VerificationContract.makePost(ipfshash, qrsvg, {value: currentFee})
            let res = await tx.wait()

            
            // add db and push item to db


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

    const getSpecificPost = async (address, postNum) =>{
        
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            const verFicationContrct = fetchVerificationContract(provider)
            console.log(verFicationContrct)
            const data = await verFicationContrct.getSpecificPost(address, postNum)

            return data



        }catch(err){
            console.log(err)
        }
    }

    const getAllUsersPost = async (address) =>{
        if(!currentAccount) return;
        
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)

            const verFicationContrct = fetchVerificationContract(provider)
            
            
            const data = await verFicationContrct.getAllUsersPost(address)

            return data



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

        const fee = await contract.fee()
        
        setCurrentFee(fee.toString())
        
       
    }


    useEffect(()=>{
        checkIfWalletIsConnected()
        getFee()
        
    }, [])

    // functions for profile contract
    const createProfileAccount = async (username, _qrCode) =>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const ProfileContract = fetchProfileContract(signer)

        try{
            let tx = await ProfileContract.createProfile(username, _qrCode)
            let res = await tx.wait()
            if(res.status == 1){
                console.log("Success")
                fetchCurrentProfile()
            }else{
                console.log("Failure")
            }

        }catch(err){
            console.log(err)
        }

    }

    const fetchCurrentProfile = async () =>{
        if(!currentAccount) return setCurrentProfile(null);

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const ProfileContract = fetchProfileContract(provider)


        try {
            const profile = await ProfileContract.profiles(currentAccount)
            if(profile.username === ""){
                setCurrentProfile(null)
            }else {
                setCurrentProfile(profile)

            }
            

        }catch(err){
            console.log(err)

        }

    }
    const fetchUsersProfile = async (account) =>{
        if(!currentAccount) return setCurrentProfile(null);

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const ProfileContract = fetchProfileContract(provider)


        try {
            const profile = await ProfileContract.profiles(account)
            console.log(profile)
            if(profile.profileAddress === ZEROADDRESS){
                setViewedProfile(null)
            }else {
                setViewedProfile(profile)
                console.log(profile)

            }
            

        }catch(err){
            console.log(err)

        }

    }

    useEffect(()=>{
        fetchCurrentProfile()
    },[currentAccount])

    return (
        <Web3Context.Provider value={({
            connectToWallet,
            currentAccount,
            createPost,
            currentFee,
            getSpecificPost,
            getAllUsersPost,
            createProfileAccount,
            currentProfile,
            fetchCurrentProfile,
            fetchUsersProfile,
            viewedProfile


        })} >
            {children}
        </Web3Context.Provider>
    )
}

export const useWeb3Context = () => useContext(Web3Context)