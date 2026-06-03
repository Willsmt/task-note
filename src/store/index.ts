import { configureStore } from '@reduxjs/toolkit'
import tarefasReducer from './reducers/tarefas'
import filtroReducer from './reducers/filtro'
import kiraReducer from './reducers/kira'
import { carregarEstado, salvarEstado } from '../utils/localStorage'

const estadoPersistido = carregarEstado()

export const store = configureStore({
  reducer: {
    tarefas: tarefasReducer,
    filtro: filtroReducer,
    kira: kiraReducer
  },
  // Hidrata a partir do localStorage; na primeira execução cai no estado inicial (mocks).
  preloadedState: estadoPersistido
    ? { tarefas: estadoPersistido.tarefas, kira: estadoPersistido.kira }
    : undefined
})

// Após qualquer alteração do usuário, persiste tarefas + kira (filtro é efêmero).
store.subscribe(() => {
  const { tarefas, kira } = store.getState()
  salvarEstado({ tarefas, kira })
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
