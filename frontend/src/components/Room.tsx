import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player';
export default function Room() {
  const location = useLocation()
  const state = location.state;
  console.log(state)
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {state?.room?.playingVideoUrl ? (
        <ReactPlayer
          url={state.room.playingVideoUrl}
          controls
          width="50%"
          height="50%"
        />
      ) : (
        <p>No video to play</p>
      )}
    </div>
  )
}
