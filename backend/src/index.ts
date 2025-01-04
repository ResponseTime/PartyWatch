import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const socket_map: Map<string, Socket> = new Map()

type room_info = {
  playingVideo_url: string,
  room_name: string,
  currentPlayingTime: string,
  room_size: number,
}

const room_map: Map<string, room_info> = new Map()

io.on("connection", (socket) => {
  socket_map.set(socket.id, socket)
  socket.on("syncTimeServer", (roomId, currentTime) => {
    const current = room_map.get(roomId);
    if (!current) {
      return
    }
    room_map.set(roomId, {
      ...current,
      currentPlayingTime: currentTime,
    })
  })

  socket.on("updateVideoServer", (roomId, videoURL) => {
    const current = room_map.get(roomId);
    if (!current) {
      return
    }
    room_map.set(roomId, {
      ...current,
      playingVideo_url: videoURL,
    })
    socket.to(current.room_name).emit("updateVideoClient", videoURL)
  })
});

function syncTime(room: room_info) {
  io.to(room.room_name).emit("synctimeClient", room.currentPlayingTime)
}

app.post("/joinRoom", (req, res) => {
  /**
   * Handles a POST request to join watch party room.
   *
   * This route retrieves the `socket_id` and `room_id` from the request body, finds the associated
   * socket in the `socket_map`, and makes it join the specific room.
   * Finally, it responds with a JSON object indicating success.
   */
  try {

    const user_socket_id = req.body.socket_id;
    const room_wanted = req.body.room_id;

    const room = room_map.get(room_wanted);
    const user_socket = socket_map.get(user_socket_id);

    if (!room || !user_socket) {
      const error = !room
        ? "Cannot Find Room to Join"
        : "User Websocket not found";
      res.status(200).json({ Error: error });
      return
    }

    user_socket.join(room.room_name);
    syncTime(room)
    res.json({ Success: true });
  } catch (e) {
    res.status(500).json({ Error: "Internal Server Error" })
  }
})


httpServer.listen(3000);