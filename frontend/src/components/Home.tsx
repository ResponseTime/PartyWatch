import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <div className="text-[#FEE715] text-6xl font-extrabold m-4 tracking-wide drop-shadow-lg sm:text-7xl md:text-8xl">
        PartyWatch
      </div>
      <div className='w-screen h-screen bg-[#101820] flex flex-col justify-end items-end absolute z-[-1] top-0'>
        <button className='text-[#FEE715] border-y border-[#FEE715] text-3xl font-extrabold w-80 rounded-md p-12 m-5 hover:bg-[#4f4d4d] transition-all ease-in' onClick={() => { navigate("/createRoom") }}>Create Room</button>
        <button className='text-[#FEE715] border-y border-[#FEE715] text-3xl font-extrabold w-80 rounded-md p-12 m-5 hover:bg-[#4f4d4d] transition-all ease-in' onClick={() => { navigate("/joinRoom") }}>Join Room</button>
      </div>
    </>
  )
}
