import Tarefa from '../../components/Tarefa'
import AlertBanner from '../../components/AlertBanner'
import { BotaoLimpar } from './styles'
import { MainContainer, Titulo } from '../../styles/index'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { limparAlertas } from '../../store/reducers/kira'

const ListaDeTarefas = () => {
  const dispatch = useAppDispatch()
  const { itens } = useAppSelector((state) => state.tarefas)
  const { termo, criterio, valor } = useAppSelector((state) => state.filtro)
  const { ativo: kiraAtivo, alertas } = useAppSelector((state) => state.kira)

  const filtraTarefas = () => {
    let tarefasFiltradas = itens

    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter((item) =>
        item.titulo.toLowerCase().includes(termo.toLowerCase())
      )
    }

    if (criterio === 'prioridade' && valor) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.prioridade === valor
      )
    } else if (criterio === 'status' && valor) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) => item.status === valor
      )
    }

    return tarefasFiltradas
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ``

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio} = ${valor}`}" ${complementacao}`
    }

    return mensagem
  }

  const tarefas = filtraTarefas()
  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>

      {kiraAtivo && alertas.length > 0 && (
        <div>
          {alertas.map((a) => (
            <AlertBanner
              key={a.id}
              titulo={`Punição: ${a.tituloTarefa}`}
              mensagem={a.mensagem}
              selo={`Log Kira · ${new Date(a.timestamp).toLocaleString(
                'pt-BR'
              )}`}
            />
          ))}
          <BotaoLimpar onClick={() => dispatch(limparAlertas())}>
            Limpar log de punições
          </BotaoLimpar>
        </div>
      )}

      <ul>
        {tarefas.map((t) => (
          <li key={t.id}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              titulo={t.titulo}
              prioridade={t.prioridade}
              status={t.status}
              prazoFinal={t.prazoFinal}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
