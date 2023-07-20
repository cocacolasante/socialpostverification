"use client"
import { useState } from "react"

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState()
    
  return (
    <div>
        <h1>Search For A User</h1>
        <input type='text'  />
    </div>
  )
}

export default SearchBar