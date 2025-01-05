import { randomUUID } from "crypto";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}))
type room_info = {
  playingVideoUrl: string,
  room_name: string,
  currentPlayingTime: number,
  room_size: number,
  room_id: string,
}

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});
const socket_map: Map<string, Socket> = new Map()
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
      playingVideoUrl: videoURL,
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
   * Finally, it responds with a JSON object of the room.
   */
  try {
    console.log(req.body)
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
    room.room_size += 1
    user_socket.join(room.room_name);
    console.log(user_socket.rooms)
    res.json({ room });
    syncTime(room)
  } catch (e) {
    res.status(500).json({ Error: "Internal Server Error" })
  }
})

app.post("/createRoom", (req, res) => {
  /**
   * Handles a POST request to join watch party room.
   *
   * This route retrieves the `socket_id`, `room_name`, and `videoURL` from the request body, creates the room, finds the associated
   * socket in the `socket_map`, and makes it join the specific room.
   * Finally, it responds with a JSON object of the Generated Room.
   */
  try {
    console.log(req.body)
    const user_socket_id = req.body.socket_id;
    const videoURL = req.body.videoURL;
    const room_name = req.body.room_name;
    const roomId = randomUUID()
    const generated_room: room_info = {
      playingVideoUrl: videoURL,
      room_name: room_name,
      currentPlayingTime: 0.0,
      room_size: 1,
      room_id: roomId
    }
    room_map.set(roomId, generated_room)
    const user_socket = socket_map.get(user_socket_id)
    if (!user_socket) {
      res.status(500).json({ Error: "User socket not found" })
      return
    }
    user_socket.join(generated_room.room_name)
    console.log(user_socket.rooms)
    res.status(200).json({ generated_room })
  } catch (e) {
    res.status(500).json({ Error: "Internal Server Error" })
  }
})

httpServer.listen(3000);