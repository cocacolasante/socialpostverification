import React from 'react'
import DisplayUsersPosts from '../../../../components/DisplayUsersPosts'
import { getUsersProfileServer, getUsersPostsServer } from '../../../../context/ServerSideContext'

async function getServerSideProps(props) {
  // const {params} = query
  const address = props.address
  console.log(address)
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
  // const profile = await getUsersProfileServer(address)
  // const posts = await getUsersPostsServer(address)


  return (
    <div>
      <DisplayUsersPosts profile={props.profile} posts={props.posts} />   
    </div>
  )
}

  

export default Page