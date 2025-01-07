import { configureStore } from '@reduxjs/toolkit'
import socketIdReducer from '../features/socketId/socketIdSlice'
export const store = configureStore({
  reducer: { socketIdReducer },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch