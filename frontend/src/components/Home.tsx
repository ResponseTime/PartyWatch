import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <button onClick={() => { navigate("/createRoom") }}>Create Room</button>
      <button onClick={() => { navigate("/joinRoom") }}>Join Room</button>
    </>
  )
}
