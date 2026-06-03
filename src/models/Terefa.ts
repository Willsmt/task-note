import * as enums from '../utils/enums/Tarefa'

class Tarefa {
  titulo: string
  prioridade: enums.Prioridade
  status: enums.Status
  descricao: string
  id: number
  /** Prazo final (data/hora ISO) do Modo Kira. Opcional: quando ausente, usa o default global. */
  prazoFinal?: string

  constructor(
    titulo: string,
    prioridade: enums.Prioridade,
    status: enums.Status,
    descricao: string,
    id: number,
    prazoFinal?: string
  ) {
    this.titulo = titulo
    this.prioridade = prioridade
    this.status = status
    this.descricao = descricao
    this.id = id
    this.prazoFinal = prazoFinal
  }
}

export default Tarefa
