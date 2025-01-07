import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../app/store'

export default function CreateRoom() {
  const navigate = useNavigate()
  const [room, setRoom] = useState({
    "room_name": "",
    "videoURL": ""
  })
  const socketId = useSelector((state: RootState) => state.socketIdReducer.socketId)
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom((prevroom) => ({
      ...prevroom,
      [e.target.name]: e.target.value
    }))
  }

  const handleCreate = async () => {
    const res = await fetch("http://localhost:3000/createRoom", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...room, socket_id: socketId })
    })
    const response = await res.json()
    navigate("/room", { state: { 'admin': true, room: response.generated_room } })
  }
  return (
    <div>
      <input type="text" name='room_name' onChange={handleInputs} />
      <input type="url" name="videoURL" onChange={handleInputs} />
      <button onClick={handleCreate}>Create Room</button>
    </div>
  )
}
