import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { setSocket } from './features/socketId/socketIdSlice'
import CreateRoom from './components/CreateRoom'
import JoinRoom from './components/JoinRoom'
import Room from './components/Room'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const socket = io("https://party-watch-giiq.vercel.app")
    socket.on("connect", () => {
      if (socket.id) {
        dispatch(setSocket(socket))
      }
    })
    socket.on("synctimeClient", (currentTime: number) => {
      console.log(currentTime)
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<Home />} />
        <Route path='/room' element={<Room />} />
        <Route path='/createRoom' element={<CreateRoom />} />
        <Route path='/joinRoom' element={<JoinRoom />} />
      </Routes>
    </Router>
  )
}

export default App
