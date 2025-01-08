import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

export interface SocketState {
  socket: any
}

const initialState: SocketState = {
  socket: undefined
}

export const socketIdSlice = createSlice({
  name: 'socketId',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | undefined>) => {
      state.socket = action.payload
    }
  },
})


export const { setSocket } = socketIdSlice.actions

export default socketIdSlice.reducer