/* eslint-disable react/no-unescaped-entities */
"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState()




  return (
<div className="py-8 text-center text-white bg-blue-500">
  <div>
    <h1 className="mb-4 text-4xl font-bold">Search For A User</h1>
  </div>
  <div className="flex flex-col items-center space-y-4">
    <label className="text-lg font-bold">Enter User's Address</label>
    <div className="flex items-center space-x-2">
      <input 
        type="text"
        placeholder="address"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-64 px-4 py-2 text-black border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 hover:shadow-lg"
      />
      <Link
        href={`/findposts/${searchQuery}`}
        className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300 hover:shadow-lg"
      >
        Search
      </Link>
    </div>
  </div>
  
</div>

  )
}

export default SearchBar