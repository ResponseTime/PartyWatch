import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../app/store';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    room_name: undefined,
    videoURL: undefined,
  });
  const socket = useSelector((state: RootState) => state.socketIdReducer.socket);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom((prevroom) => ({
      ...prevroom,
      [e.target.name]: e.target.value,
    }));
  };

  const [response, setResponse] = useState<responseRoom>();
  interface GeneratedRoomResponse {
    generated_room: responseRoom;
  }
  type responseRoom = {
    playingVideoUrl: string;
    room_name: string;
    currentPlayingTime: number;
    room_size: number;
    room_id: string;
  };
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (room.room_name === undefined || room.videoURL === undefined) {
      setError('Room Name or Video URL Not Provided');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    const res = await fetch('http://localhost:3000/createRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...room, socket_id: socket.id }),
    });
    const response: GeneratedRoomResponse = await res.json();
    if (!res.ok) {
      setError('Something went wrong');
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    setResponse(response.generated_room);
  };

  const goToRoom = (room: responseRoom) => {
    navigate('/room', { state: { admin: true, room: room } });
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
        {!response && (
          <div className="flex flex-col gap-5 m-10 items-center">
            <input
              className="bg-transparent w-80 border-y text-[#FEE715] border-[#FEE715] rounded-md p-4 hover:bg-[#4f4d4d] transition-all ease-in"
              type="text"
              name="room_name"
              onChange={handleInputs}
              placeholder="Enter Room Name"
            />
            <input
              className="bg-transparent border-y text-[#FEE715] border-[#FEE715] w-80 rounded-md p-4  hover:bg-[#4f4d4d] transition-all ease-in"
              type="url"
              name="videoURL"
              onChange={handleInputs}
              placeholder="Enter Video URL"
            />
            <button
              className="text-2xl font-extrabold text-[#FEE715] border border-[#FEE715] rounded-md px-6 py-3 hover:bg-[#FEE715] hover:text-[#101820] transition-all"
              onClick={handleCreate}
            >
              Create Room
            </button>
          </div>
        )}
        {response && (
          <div className="flex flex-col items-center gap-5">
            <div className="bg-[#1E1E1E] text-[#FEE715] p-6 rounded-lg shadow-md border border-[#FEE715] text-center">
              <h2 className="text-2xl font-bold">Room Created Successfully!</h2>
              <p className="mt-2 text-lg">
                Room Name: <span className="font-semibold">{response.room_name}</span>
              </p>
              <p className="text-lg">
                Room ID: <span className="font-semibold">{response.room_id}</span>
              </p>
            </div>
            <button
              className="text-xl font-bold text-[#101820] bg-[#FEE715] px-8 py-3 rounded-lg shadow-lg hover:bg-[#FFD500] transition-all"
              onClick={() => {
                goToRoom(response);
              }}
            >
              Go to Room
            </button>
          </div>
        )}
      </div>
    </>
  );
}
