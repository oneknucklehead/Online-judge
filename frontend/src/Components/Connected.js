import React from 'react'
import Avatar from 'react-avatar'
import './Connected.css'
const Connected = ({ username }) => {
  return (
    <div className='connected'>
      <Avatar name={username} size={40} round='8px' />
      <span className='username'>{username}</span>
    </div>
  )
}

export default Connected
