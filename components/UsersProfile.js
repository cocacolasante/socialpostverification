import React from 'react'
import Image from 'next/image'

const UsersProfile = ({profile}) => {
  return (
    <div className='p-8'>
        <h2>Username: {profile.username}</h2>
        <Image width={200} height={200} src={profile.profileQRCode} alt='qr code' />

    </div>
  )
}

export default UsersProfile