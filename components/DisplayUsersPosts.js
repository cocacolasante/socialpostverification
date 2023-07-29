"use client"
import React, { useState, useEffect, useContext } from 'react';
import { Web3Context } from '../context/Web3Context';
import PostCard from './PostCard';
import Image from 'next/image';


const DisplayUsersPosts = ({ address }) => {
  const [usersPosts, setUsersPosts] = useState();
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { getAllUsersPost, viewedProfile, fetchUsersProfile } = useContext(Web3Context);

  const fetchPageData = async () => {
    try {
      const data = await getAllUsersPost(address);
      if (data == undefined) {
        setIsErr(true);
        setIsLoading(false);
        return;
      }
      setUsersPosts(data);
      setIsErr(false);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsErr(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
    fetchUsersProfile(address);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='text-center'>
          <h2 className='text-4xl'>Loading...</h2>
        </div>
      ) : !isErr ? (
        <div className='pt-6 pl-6'>
          {viewedProfile && (
            <div className='float-left'>
              <h2>User: {viewedProfile.username}</h2>
              <Image src={viewedProfile.profileQRCode} alt='profile qr code' height={200} width={200} />
            </div>
          )}
          <div className='flex flex-col items-center'>
            <div className='flex flex-wrap justify-center space-x-2'>
              {usersPosts.map((post, i) => {
                return (
                  <PostCard
                    key={i}
                    ipfsHash={post.ipfsHash}
                    qrCodeSvg={post.qrCodeSvg}
                    postNumber={post.postNumber}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <h2 className='text-4xl'>NO USER PROFILE FOUND</h2>
        </div>
      )}
    </>
  );
};



export default DisplayUsersPosts;
