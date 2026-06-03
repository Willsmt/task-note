import Tarefa from '../models/Terefa'
import * as enums from '../utils/enums/Tarefa'

/**
 * Estado inicial das tarefas (mock).
 *
 * Carregado apenas na primeira execução; depois disso o estado real vem do
 * localStorage. Substitui os itens que antes ficavam inline no reducer.
 */
export const mockTasks: Tarefa[] = [
  {
    id: 1,
    descricao: 'Estudar JavaScript revendo o exercicio do modulo 7',
    prioridade: enums.Prioridade.NORMAL,
    status: enums.Status.CONCLUIDA,
    titulo: 'Estudar JavaScript'
  },
  {
    id: 2,
    descricao: 'Estudar Python revendo o exercicio do modulo final',
    prioridade: enums.Prioridade.IMPORTANTE,
    status: enums.Status.PENDENTE,
    titulo: 'Estudar Python'
  },
  {
    id: 3,
    descricao: 'Claude code, completar curso',
    prioridade: enums.Prioridade.URGENTE,
    status: enums.Status.PENDENTE,
    titulo: 'Estudar IA'
  }
]
