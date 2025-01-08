import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
export default function Room() {
  const location = useLocation()
  const state = location.state;
  console.log(state)
  const socket = useSelector((state: RootState) => state.socketIdReducer.socket)
  const [play, setPlay] = useState<boolean>()
  const [duration, setDuration] = useState<number>()
  useEffect(() => {
    socket?.on("play", () => {
      setPlay(true)
    })
    socket?.on("pause", (duration: number) => {
      if (playerRef) {
        playerRef.current?.seekTo(duration, "seconds")
      }
      setPlay(false)
    })
  }, [])
  const playerRef = useRef<ReactPlayer | null>(null)
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ position: "relative", width: "50%", height: "50%" }}>
        <ReactPlayer
          ref={playerRef}
          playing={play}
          onProgress={(progress) => {
            console.log(progress.playedSeconds)
            setDuration(progress.playedSeconds)
          }}
          onPause={() => {
            socket.emit("pause", state.room.room_name, duration)
          }}
          onPlay={() => {
            socket.emit("play", state.room.room_name)
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
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              cursor: "not-allowed",
            }}
          />
        )}
      </div>

    </div>
  )
}
