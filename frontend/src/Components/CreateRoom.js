import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './CreateRoom.css'
const CreateRoom = () => {
  //Replace username with name field after login route is made
  const [roomId, setRoomId] = useState('')
  const createRoom = () => {
    setRoomId()
  }
  return (
    <>
      <div className='input-wrapper'>
        <div className='input-container'>
          <p>Paste your invitation code down below</p>
          <input
            type='text'
            className='input-box'
            placeholder='Enter Room ID'
          />
          <input
            type='text'
            className='input-box'
            placeholder='Enter Guest Username'
          />
          <button className='btn-join'>Join</button>
          <p>
            Don't have an invite code? Create your{' '}
            <Link to='' style={{ color: '#000' }}>
              own room
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default CreateRoom
