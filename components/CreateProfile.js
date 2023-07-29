import React, { useState, useContext, useEffect } from 'react';
import { websiteUrl } from '../context/constants';
import QRCode from 'qrcode';
import { Web3Context } from "../context/Web3Context"

const CreateProfile = () => {
    const [qrcode, setQrCode] = useState()
    const {currentAccount, createPost} = useContext(Web3Context)

    const createQRCode = async () =>{
        const newUrl = websiteUrl + currentAccount
        
        const qrSvg = await QRCode.toDataURL(newUrl)

        console.log(qrSvg)
        setQrCode(qrSvg)
        return qrSvg
    }

    
  return (
    <div>

    </div>
  )
}

export default CreateProfile