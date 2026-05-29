import FiltroCard from '../../components/FiltroCard'
import * as S from './styles'

const BarraLateral = () => (
  <S.Aside>
    <div>
      <S.Campo type="text" placeholder="Buscar" />
      <S.Filtros>
        <FiltroCard legenda="pedentes" contador={2} />
        <FiltroCard legenda="concluidas" contador={5} />
        <FiltroCard legenda="urgentes" contador={6} />
        <FiltroCard legenda="importantes" contador={7} />
        <FiltroCard legenda="normal" contador={8} />
        <FiltroCard legenda="todas" contador={9} ativo />
      </S.Filtros>
    </div>
  </S.Aside>
)

export default BarraLateral
