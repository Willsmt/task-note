import Tarefa from '../components/Tarefa'
import { Titulo } from '../components/Tarefa/styles'
import { Container } from './styles'

const tarefas = [
  {
    titulo: 'estudar react',
    descricao: 'baixar fatura',
    prioridade: 'importante',
    status: 'pedente'
  },
  {
    titulo: 'pagar conta',
    descricao: 'baixar fatura',
    prioridade: 'importante',
    status: 'pedente'
  },
  {
    titulo: 'ir para academia',
    descricao: 'baixar fatura',
    prioridade: 'importante',
    status: 'pedente'
  }
]

const ListaDeTarefas = () => (
  <Container>
    <p>2 tarefas marcadas como: &quot;categoria &quot; e &quot;termo&quot;</p>
    <ul>
      {tarefas.map((t) => (
        <li key={t.titulo}>
          <Tarefa
            descricao={t.descricao}
            titulo={t.titulo}
            prioridade={t.prioridade}
            status={t.status}
          />
        </li>
      ))}
    </ul>
  </Container>
)

export default ListaDeTarefas
