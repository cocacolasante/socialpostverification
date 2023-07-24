import React from 'react'
import DisplayUsersPosts from '../../../../components/DisplayUsersPosts'


const page = ({params}) => {
  const address = params.address
  return (
    <div>
      <DisplayUsersPosts address={address} />
    </div>
  )
}

export default page