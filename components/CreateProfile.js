/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState, useContext, useEffect } from 'react';
import { websiteUrl } from '../context/constants';
import QRCode from 'qrcode';
import { Web3Context } from "../context/Web3Context"
import Image from 'next/image';

const CreateProfile = () => {
    const [qrCode, setQrCode] = useState()
    const [newUsername, setNewUsername] = useState()

    const {currentAccount, createProfileAccount} = useContext(Web3Context)

    const clientCreateProfile = async (e) =>{
      e.preventDefault()
      if(!newUsername) return;

      try{
        const qrProfile = await createQRCode()

        await createProfileAccount(newUsername, qrProfile)

      }catch(err){
        console.log(err)
      }
    }
    
    const createQRCode = async () =>{
        const newUrl = websiteUrl + currentAccount
        
        const qrSvg = await QRCode.toDataURL(newUrl)

        console.log(qrSvg)
        setQrCode(qrSvg)
        return qrSvg
    }

    
  return (
    <div className='text-center'>
      <form onSubmit={e=>clientCreateProfile(e)} >
        
        <input placeholder='Enter Your Username' type='text' onChange={e=>setNewUsername(e.target.value)} />

        <button onClick={clientCreateProfile} type='submit'>Create Profile</button>
      </form>
      <div className='pl-10 text-center'>
        {qrCode && (
          <>
            <Image width={500} height={500} src={qrCode} alt='qr code' />

            <p className='text-lg font-bold'>Please right-click on QRCode and click "Save Image As" to download</p>
          </>
        )}
      </div>

    </div>
  )
}

export default CreateProfile