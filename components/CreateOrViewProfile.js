"use client"
import { Web3Context } from "../context/Web3Context"
import { useContext, useEffect } from "react"
import YourPosts from "./YourPosts"
import CreateProfile from "./CreateProfile"

const CreateOrViewProfile = () => {
    const {currentProfile} = useContext(Web3Context)
    

  return (
    <div>
        {currentProfile === null ? <CreateProfile /> : <YourPosts />}
    </div>
  )
}

export default CreateOrViewProfile