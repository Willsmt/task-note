import { useState, useEffect, ChangeEvent } from 'react'
import * as S from './styles'
import { remover, editar, alterarStatus } from '../../store/reducers/tarefas'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import KiraTimer from '../KiraTimer'
import AlertBanner from '../AlertBanner'
import TarefaClass from '../../models/Terefa'
import * as enums from '../../utils/enums/Tarefa'
import { isoParaInputLocal, inputLocalParaIso } from '../../utils/datas'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id,
  prazoFinal
}: Props) => {
  const dispatch = useAppDispatch()
  const kiraAtivo = useAppSelector((s) => s.kira.ativo)
  const alerta = useAppSelector((s) =>
    s.kira.alertas.find((a) => a.tarefaId === id)
  )
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')
  const [prazoEdit, setPrazoEdit] = useState('')

  const pendente = status === enums.Status.PENDENTE
  const fracassou = status === enums.Status.FRACASSOU

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  useEffect(() => {
    setPrazoEdit(isoParaInputLocal(prazoFinal))
  }, [prazoFinal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
    setPrazoEdit(isoParaInputLocal(prazoFinal))
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alterarStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card $fracassou={fracassou}>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
          disabled={fracassou}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>

      <S.Tag $parametro="prioridade" $prioridade={prioridade}>
        {prioridade}
      </S.Tag>

      <S.Tag $parametro="status" $status={status}>
        {status}
      </S.Tag>

      {pendente && (kiraAtivo || prazoFinal) && (
        <KiraTimer tarefaId={id} titulo={titulo} prazoFinal={prazoFinal} />
      )}

      {kiraAtivo && alerta && (
        <S.AreaAlerta>
          <AlertBanner
            titulo="Procrastinação detectada"
            mensagem={alerta.mensagem}
            selo={`Registrado às ${new Date(
              alerta.timestamp
            ).toLocaleTimeString('pt-BR')}`}
          />
        </S.AreaAlerta>
      )}

      <S.Descricao
        disabled={!estaEditando}
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      {estaEditando && (
        <S.CampoPrazo>
          <label htmlFor={`prazo-${id}`}>Prazo final (data e hora)</label>
          <input
            id={`prazo-${id}`}
            type="datetime-local"
            value={prazoEdit}
            onChange={(e) => setPrazoEdit(e.target.value)}
          />
        </S.CampoPrazo>
      )}

      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <S.BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id,
                    prazoFinal: inputLocalParaIso(prazoEdit)
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </S.BotaoSalvar>

            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            {!fracassou && (
              <S.Botao onClick={() => setEstaEditando(true)}>Editar</S.Botao>
            )}

            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Tarefa
