import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './CreateRoom.css'
const CreateRoom = () => {
  const history = useHistory()
  //Replace username with name field after login route is made
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')
  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('Room Id and username is a required field')
      return
    }
    history.push({
      pathname: `/compiler/${roomId}`,
      state: {
        username,
      },
    })
    // toast.success(`Joined: ${roomId}`)
  }
  const createRoom = (e) => {
    setRoomId(uuid())
    toast.success('Room created')
  }
  return (
    <>
      <div className='input-wrapper'>
        <div className='input-container'>
          <p>Paste your invitation code down below</p>
          <div>
            <div className={roomId && 'mb-3'}>
              <input
                type='text'
                className='input-box'
                placeholder='Enter Room ID'
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
              />
              {<small>{!roomId && 'Room ID required'}</small>}
              {/* add checks for no room id */}
            </div>
            <div className={username && 'mb-3'}>
              <input
                type='text'
                className='input-box'
                placeholder='Enter Guest Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {!username ? <small>Username required</small> : <small> </small>}
            </div>
          </div>
          <button className='btn-join' onClick={joinRoom}>
            Join
          </button>
          <p>
            Don't have an invite code? Create your &nbsp;
            <Link to={'#'} style={{ color: '#000' }} onClick={createRoom}>
              own room
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default CreateRoom
