import { useDispatch, useSelector } from 'react-redux'
import FiltroCard from '../../components/FiltroCard'
import * as S from './styles'
import { alterarTermo } from '../../store/reducers/filtro'
import { RootReducer } from '../../store'

const BarraLateral = () => {
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <div>
        <S.Campo
          type="text"
          placeholder="Buscar"
          value={termo}
          onChange={(e) => dispatch(alterarTermo(e.target.value))}
        />
        <S.Filtros>
          <FiltroCard legenda="pendentes" contador={2} />
          <FiltroCard legenda="concluídas" contador={5} />
          <FiltroCard legenda="urgentes" contador={6} />
          <FiltroCard legenda="importantes" contador={7} />
          <FiltroCard legenda="normal" contador={8} />
          <FiltroCard legenda="todas" contador={9} ativo />
        </S.Filtros>
      </div>
    </S.Aside>
  )
}

export default BarraLateral
