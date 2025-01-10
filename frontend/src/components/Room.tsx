import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export default function Room() {
  const location = useLocation();
  const state = location.state;
  console.log(state);
  const socket = useSelector((state: RootState) => state.socketIdReducer.socket);
  const [play, setPlay] = useState<boolean>();
  const [duration, setDuration] = useState<number>();
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    socket?.on('play', () => {
      setPlay(true);
    });
    socket?.on('pause', (duration: number) => {
      setPlay(false);
      if (playerRef) {
        playerRef.current?.seekTo(duration, 'seconds');
      }
    });
  }, [socket]);

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-[#101820]"
    >
      <div className="text-[#FEE715] text-5xl font-extrabold mb-6 tracking-wide drop-shadow-lg sm:text-6xl md:text-7xl">
        PartyWatch Room
      </div>
      <div
        className="relative bg-[#1E1E1E] border border-[#FEE715] rounded-xl shadow-xl flex justify-center items-center"
        style={{
          width: '80%',
          maxWidth: '800px',
          aspectRatio: '16/9',
          overflow: 'hidden',
        }}
      >
        <ReactPlayer
          ref={playerRef}
          playing={play}
          onProgress={(progress) => {
            console.log(progress.playedSeconds);
            setDuration(progress.playedSeconds);
          }}
          onPause={() => {
            socket.emit('pause', state.room.room_name, duration);
          }}
          onPlay={() => {
            socket.emit('play', state.room.room_name);
          }}
          url={state.room.playingVideoUrl}
          controls={state.admin}
          width="100%"
          height="100%"
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                fs: 0,
              },
            },
          }}
        />
        {!state.admin && (
          <div
            className="absolute top-0 left-0 w-full h-full z-10 bg-transparent"
            style={{ cursor: 'not-allowed' }}
          />
        )}
      </div>
      <div className="text-[#FEE715] mt-4 text-lg font-semibold">
        {state.admin
          ? 'You are the admin. You have full control over the playback.'
          : 'You are a viewer. Playback is controlled by the admin.'}
      </div>
    </div>
  );
}
