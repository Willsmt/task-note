import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Terefa'
import * as enums from '../../utils/enums/Tarefa'
import { mockTasks } from '../../mocks/tasks'

export type TarefasState = {
  itens: Tarefa[]
}
const initialState: TarefasState = {
  itens: mockTasks
}
const tarefasSlice = createSlice({
  name: 'tarefas',

  initialState,

  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((tarefa) => tarefa.id !== action.payload)
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLocaleLowerCase() ===
          action.payload.titulo.toLocaleLowerCase()
      )
      if (tarefaJaExiste) {
        alert('Já existe uma tarefa coom esse nome')
      } else {
        const ultimaTerefa = state.itens[state.itens.length - 1]

        const tarafaNova = {
          ...action.payload,
          id: ultimaTerefa ? ultimaTerefa.id + 1 : 1
        }
        state.itens.push(tarafaNova)
      }
    },
    alterarStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload.id
      )
      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    },
    marcarFracasso: (state, action: PayloadAction<number>) => {
      const indexDaTarefa = state.itens.findIndex(
        (t) => t.id === action.payload
      )
      if (
        indexDaTarefa >= 0 &&
        state.itens[indexDaTarefa].status === enums.Status.PENDENTE
      ) {
        state.itens[indexDaTarefa].status = enums.Status.FRACASSOU
      }
    }
  }
})

export const { remover, editar, cadastrar, alterarStatus, marcarFracasso } =
  tarefasSlice.actions

export default tarefasSlice.reducer
