import BarraLateral from './containers/BarraLateral'
import ListaDeTarefas from './containers/ListaDeTarefas'
import EstiloGlobal, { Container } from './styles'

function App() {
  return (
    <div>
      <EstiloGlobal />
      <Container>
        <BarraLateral />
        <ListaDeTarefas />
      </Container>
    </div>
  )
}

export default App
