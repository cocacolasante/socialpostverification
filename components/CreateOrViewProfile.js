"use client"
import { Web3Context } from "../context/Web3Context"
import { useContext, useEffect } from "react"
import YourPosts from "./YourPosts"
import CreateProfile from "./CreateProfile"
import UsersProfile from "./UsersProfile"

const CreateOrViewProfile = () => {
    const {currentProfile} = useContext(Web3Context)
    

  return (
    <div className="flex">
        {currentProfile === null ? <CreateProfile /> : (<>
          <UsersProfile profile={currentProfile} />
          <YourPosts />
        </>)}
        
    </div>
  )
}

export default CreateOrViewProfile