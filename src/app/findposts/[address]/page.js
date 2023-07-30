import React from 'react'
import DisplayUsersPosts from '../../../../components/DisplayUsersPosts'

async function getStaticProps(){
  
}

const page = async ({params}) => {
  const address = params.address
  
  return (
    <div>
      <DisplayUsersPosts address={address} />   
    </div>
  )
}

  

export default page