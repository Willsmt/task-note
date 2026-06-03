import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Container } from './styles'
import { store } from './store'
import ProvedorDeTema from './containers/ProvedorDeTema'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/novo',
    element: <Cadastro />
  }
])

function App() {
  return (
    <Provider store={store}>
      <ProvedorDeTema>
        <Container>
          <RouterProvider router={rotas} />
        </Container>
      </ProvedorDeTema>
    </Provider>
  )
}

export default App
