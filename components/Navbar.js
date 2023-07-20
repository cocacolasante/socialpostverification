"use client"
import Link from "next/link"
import { useContext } from "react"
import { Web3Context } from "../context/Web3Context"

const Navbar = () => {
  const {connectToWallet, currentAccount} = useContext(Web3Context)
  
    
  return (
    <nav className='flex pt-2 pl-2'>
        <ul className='flex space-x-3 '>
            <Link href="/">Home</Link>
            <Link href="createpost">Create Post</Link>
            <Link href="findposts">Find users posts</Link>
            <Link href="yourposts" >Your Posts</Link>
        </ul>
        <div className='pr-6 ml-auto'>
        {/* create the network catch for the correct blockchain */}
        {!currentAccount ? <button onClick={connectToWallet} >Connect</button> : <button onClick={null} >{currentAccount.slice(0, 4)}...{currentAccount.slice(-6)}</button> }
            
        </div>
    </nav>
  )
}

export default Navbar