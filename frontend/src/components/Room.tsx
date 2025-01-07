import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player';
export default function Room() {
  const location = useLocation()
  const state = location.state;
  console.log(state)
  return (

    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ position: "relative", width: "50%", height: "50%" }}>
        <ReactPlayer
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
