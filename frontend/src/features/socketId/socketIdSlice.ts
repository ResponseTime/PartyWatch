import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SocketState {
  socketId: string
}

const initialState: SocketState = {
  socketId: ''
}

export const socketIdSlice = createSlice({
  name: 'socketId',
  initialState,
  reducers: {
    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload
    }
  },
})


export const { setSocketId } = socketIdSlice.actions

export default socketIdSlice.reducer