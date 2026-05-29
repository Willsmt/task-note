import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Terefa'
import * as enums from '../../utils/enums/Tarefa'

const tarefasSlice = createSlice({
  name: 'tarefas',

  initialState: [
    new Tarefa(
      'Estudar java',
      enums.Prioridade.IMPORTANTE,
      enums.Status.PENDENTE,
      '',
      1
    ),

    new Tarefa(
      'Estudar python',
      enums.Prioridade.IMPORTANTE,
      enums.Status.PENDENTE,
      '',
      2
    )
  ],

  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      return state.filter((tarefa) => tarefa.id !== action.payload)
    }
  }
})

export const { remover } = tarefasSlice.actions

export default tarefasSlice.reducer
