import React from 'react'

const Navbar = () => {

    
  return (
    <nav className='flex pt-2 pl-2'>
        <ul className='flex space-x-3 '>
            <li>Home</li>
            <li>Create Post</li>
            <li>Find users posts</li>
            <li>Your Posts</li>
        </ul>
        <div className='pr-6 ml-auto'>
            <button >Connect</button>
        </div>
    </nav>
  )
}

export default Navbar