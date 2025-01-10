import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';

export default function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const socket = useSelector((state: RootState) => state.socketIdReducer.socket);

  const handleJoin = async () => {
    if (!roomId) {
      setError('Room ID is required');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    const res = await fetch('http://localhost:3000/joinRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room_id: roomId, socket_id: socket.id }),
    });
    if (!res.ok) {
      setError('Failed to join the room. Please try again.');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    const response = await res.json();
    navigate('/room', { state: { admin: false, room: response.room } });
  };

  return (
    <>
      <div className="text-[#FEE715] text-6xl font-extrabold m-4 tracking-wide drop-shadow-lg sm:text-7xl md:text-8xl">
        PartyWatch
      </div>
      {error && (
        <div
          className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 fixed transition-all ease-in translate-x-full animate-fromRight right-0 overflow-hidden"
          role="alert"
        >
          <p className="font-bold">Be Warned</p>
          <p>{error}</p>
        </div>
      )}

      <div className="w-screen h-screen bg-[#101820] flex flex-col justify-center items-center absolute z-[-1] top-0 overflow-hidden">
        <div className="flex flex-col gap-5 m-10">
          <input
            className="bg-transparent w-80 border-y text-[#FEE715] border-[#FEE715] rounded-md p-12 hover:bg-[#4f4d4d] transition-all ease-in"
            type="text"
            name="room_id"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
          />
          <button
            className="text-2xl font-extrabold text-[#FEE715]"
            onClick={handleJoin}
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
}
