"use client"
import React, { useState, useContext, useEffect } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import axios from 'axios'
const FormData = require('form-data')
import { Web3Context } from "../context/Web3Context"
import Image from 'next/image';


const CreateForm = () => {

    const {currentAccount, createPost} = useContext(Web3Context)
    
    // use state hook to store the uploaded file
    const [postToUpload, setPostToUpload] = useState(null)
    // post hash for uploaded post
    const [postCid, setPostCid] = useState(null)
    // ipfs hash for json file which is what is added to the smart contract
    const [jsonCid, setJsonCid] = useState(null)
    // the social platforms that the post will be uploaded to
    const [socialsToUpload, setSocialsToUpload] = useState()
    // set the post name
    const [postName, setPostName] = useState()
    // qr code
    const [qrCode, setQrCode] = useState()
    
    
    // CREATE UPLOAD FORM
    // PIN POST TO IPFS
    // USE POST CID TO ADD TO JSON
    // UPLOAD JSON TO PINATA
    // USE JSON CID AS IPFS HASH IN SMART CONTRACT
    
    
    
    const uploadToIpfs = async (e) =>{
        e.preventDefault()
        if(!postToUpload || !postName) return
        
        
        const formData = new FormData();
        formData.append("file", postToUpload)

        let metadata = JSON.stringify({
            name: postName,
            
        })
        formData.append("metadata", metadata)

        const options = JSON.stringify({
            cidVersion: 0,
            wrapWithDirectory: false
        })
        formData.append("pinataOptions", options)
        
        try {
            // upload media to ipfs
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
                maxBodyLength: "Infinity",
                headers: {
                  'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                  Authorization: process.env.NEXT_PUBLIC_PINATA_JWT
                }
            });
            console.log(res)

            // get ipfs hash from upload
            const fileHash = res.data.IpfsHash
            
            // complete the json metadata
            const fullMeta = JSON.stringify({
                user: currentAccount,
                postName,
                date: Date.now(),
                postHash: `https://ipfs.io/ipfs/${fileHash}`
                
            })

            // config for the axios call
            const config = {
                method: 'post',
                url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                headers: { 
                    'Content-Type': 'application/json', 
                    Authorization: process.env.NEXT_PUBLIC_PINATA_JWT
                },
                data: fullMeta
                  
            }
            // response
            const newRes = await axios(config)
            console.log(newRes)
            
            if(newRes.status !=200) return 

            
            // smart contract call
            try{
               await createPost(newRes.data.IpfsHash)
                
               createQRCode(newRes.data.IpfsHash)
                
            }catch(err){
                console.log(err)
            }
            

        }catch(err){
            console.log(err)
        }
    }

    const createQRCode = async (ipfsLink) =>{
        const newUrl = `https://ipfs.io/ipfs/${ipfsLink}`
        
        const qrSvg = await QRCode.toDataURL(newUrl)

        console.log(qrSvg)
        setQrCode(qrSvg)
        
    }

    const handleDownloadClick = () =>{
        if(!qrCode) return

        const blob = new Blob([qrCode], { type: 'image/svg+xml' });
        saveAs(blob, "qrcode.svg")
    }


  return (

    <div className='text-center'>
    <div>
        <h1>Upload Media For Verification</h1>
    </div>
        <div>
            <form onSubmit={uploadToIpfs} >
                <input onChange={e=>setPostName(e.target.value)} placeholder='Post name' />
                <br />
                <input onChange={e=>setPostToUpload(e.target.files[0])} type='file' name='postfile' ></input>
                <br/>
                <button className='border border-red-600' type='submit' >Upload Media</button>
            </form>
        </div>
        <div className='pl-10 text-center'>
            
        {qrCode && (<>

            <Image  width={500} height={500} src={qrCode} alt="qr code" />
            <p>Please right click on QRCode and click Save Image As to download</p>
        </>
        )}
        </div>
        
    </div>
  )
}

export default CreateForm