import { useNavigate } from 'react-router-dom'
import FiltroCard from '../../components/FiltroCard'
import * as S from './styles'
import { alterarTermo } from '../../store/reducers/filtro'
import { abrirModal, desativarKira } from '../../store/reducers/kira'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import * as enums from '../../utils/enums/Tarefa'
import { Campo } from '../../styles'
import { mockUser } from '../../mocks/users'

type Props = {
  mostrarFiltros: boolean
}

const BarraLateral = ({ mostrarFiltros }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const termo = useAppSelector((state) => state.filtro.termo)
  const kiraAtivo = useAppSelector((state) => state.kira.ativo)

  const alternarKira = () => {
    if (kiraAtivo) {
      dispatch(desativarKira())
    } else {
      dispatch(abrirModal())
    }
  }

  return (
    <S.Aside>
      <S.Usuario>
        <S.Avatar aria-hidden="true">{mockUser.name.charAt(0)}</S.Avatar>
        <S.UsuarioInfo>
          <strong>{mockUser.name}</strong>
          <span>{mockUser.role}</span>
        </S.UsuarioInfo>
      </S.Usuario>

      <div>
        {mostrarFiltros ? (
          <>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(e) => dispatch(alterarTermo(e.target.value))}
            />
            <S.Filtros>
              <FiltroCard
                valor={enums.Status.PENDENTE}
                criterio="status"
                legenda="pendentes"
              />
              <FiltroCard
                valor={enums.Status.CONCLUIDA}
                criterio="status"
                legenda="concluídas"
              />
              <FiltroCard
                valor={enums.Status.FRACASSOU}
                criterio="status"
                legenda="fracassadas"
              />
              <FiltroCard
                valor={enums.Prioridade.URGENTE}
                criterio="prioridade"
                legenda="urgentes"
              />
              <FiltroCard
                valor={enums.Prioridade.IMPORTANTE}
                criterio="prioridade"
                legenda="importantes"
              />
              <FiltroCard
                valor={enums.Prioridade.NORMAL}
                criterio="prioridade"
                legenda="normal"
              />
              <FiltroCard criterio="todas" legenda="todas" />
            </S.Filtros>
          </>
        ) : (
          <S.BotaoVoltar onClick={() => navigate('/')}>
            voltar a lista de tarefas
          </S.BotaoVoltar>
        )}
      </div>

      <S.BotaoKira $ativo={kiraAtivo} onClick={alternarKira}>
        {kiraAtivo ? 'Desativar Modo Kira' : 'Ativar Modo Kira'}
      </S.BotaoKira>
    </S.Aside>
  )
}

export default BarraLateral
