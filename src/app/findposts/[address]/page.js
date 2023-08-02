import React from 'react'
import DisplayUsersPosts from '../../../../components/DisplayUsersPosts'
import { getUsersProfileServer, getUsersPostsServer } from '../../../../context/ServerSideContext'

async function getServerSideProps(props) {
  const address = props.address

  const profile = await getUsersProfileServer(address)

  const posts = await getUsersPostsServer(address)

  return{
    profile,
    posts
  }
}

const Page = async ({params}) => {

  const props = await getServerSideProps(params)
  console.log(props)


  return (
    <div>
      <DisplayUsersPosts profile={props.profile} posts={props.posts} />   
    </div>
  )
}

  

export default Page