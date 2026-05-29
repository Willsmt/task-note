import { configureStore } from '@reduxjs/toolkit'
import tarefasReducer from './reducers/tarefas'

export const store = configureStore({
  reducer: {
    tarefas: tarefasReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
