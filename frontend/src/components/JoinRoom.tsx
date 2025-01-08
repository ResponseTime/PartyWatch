import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useNavigate } from 'react-router-dom'

export default function JoinRoom() {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState<string>()
  const socket = useSelector((state: RootState) => state.socketIdReducer.socket)
  const handleJoin = async () => {
    const res = await fetch("http://localhost:3000/joinRoom", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room_id: roomId, socket_id: socket.id })
    })
    const response = await res.json()
    console.log(response)
    navigate("/room", { state: { 'admin': false, room: response.room } })
  }
  return (
    <div>
      <input type="text" name="room_id" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setRoomId(e.target.value) }} />
      <button onClick={handleJoin}>Join Room</button>
    </div>
  )
}
