import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'

function App() {
  const [socketId, setSocketId] = useState<string>()
  useEffect(() => {
    const socket = io("http://localhost:3000")
    socket.on("connect", () => {
      console.log(socket.id)
      setSocketId(socket.id)
    })
    return () => {
      socket.disconnect()
    }
  }, [])
  const [room, setRoom] = useState({
    "room_name": "",
    "videoURL": ""
  })

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
    console.log(response)
  }
  const [roomId, setRoomId] = useState<string>()
  const handleJoin = async () => {
    const res = await fetch("http://localhost:3000/joinRoom", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room_id: roomId, socket_id: socketId })
    })
    const response = await res.json()
    console.log(response)
  }
  return (
    <>
      <input type="text" name='room_name' onChange={handleInputs} />
      <input type="url" name="videoURL" onChange={handleInputs} />
      <button onClick={handleCreate}>Create Room</button>

      <input type="text" name="room_id" onChange={(e) => { setRoomId(e.target.value) }} />
      <button onClick={handleJoin}>Join Room</button>
    </>
  )
}

export default App
