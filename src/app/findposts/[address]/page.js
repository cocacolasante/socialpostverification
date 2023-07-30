import React from 'react'
import DisplayUsersPosts from '../../../../components/DisplayUsersPosts'
import { getUsersProfileServer, getUsersPostsServer } from '../../../../context/ServerSideContext'



const page = async ({params}) => {
  const address = params.address
  
  const profile = await getUsersProfileServer(address)
  const posts = await getUsersPostsServer(address)


  return (
    <div>
      <DisplayUsersPosts profile={profile} posts={posts} />   
    </div>
  )
}

  

export default page