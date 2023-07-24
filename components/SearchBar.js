"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Web3Context } from "../context/Web3Context"
import Link from 'next/link';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState()
    const {getAllUsersPost} = useContext(Web3Context)


    const handleSearch = async (e) =>{
      e.preventDefault()
      if(!searchQuery) return;
      try{
        const usersPosts = await getAllUsersPost(searchQuery)
        console.log(usersPosts)



      }catch(err){
        console.log(err)
      }
    }

  return (
    <>
    <div>
        <h1>Search For A User</h1>
    </div>
    <div>
      
      <label >Enter Users Address</label>
      <input type='text' placeholder='address' onChange={e=>setSearchQuery(e.target.value)} />
      <Link href={`/findposts/${searchQuery}`} >Search</Link>

    </div>

    </>
  )
}

export default SearchBar