import { useEffect, useRef } from 'react'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  definirPrazoTarefa,
  registrarAlerta,
  exibirSentenca
} from '../../store/reducers/kira'
import { marcarFracasso } from '../../store/reducers/tarefas'
import { useContagemRegressiva } from '../../hooks/useContagemRegressiva'
import { sortearFrase } from '../../utils/motivationalQuotes'
import { formatarPrazo } from '../../utils/datas'

type Props = {
  tarefaId: number
  titulo: string
  /** Prazo final absoluto (data/hora ISO) definido pelo usuário. */
  prazoFinal?: string
}

/**
 * Cronômetro regressivo do Modo Kira, acoplado ao card da tarefa.
 *
 * - Usa o `prazoFinal` absoluto (data + hora) escolhido pelo usuário; quando a
 *   tarefa não tem um, gera um prazo default a partir da duração padrão e o
 *   armazena no Redux (sobrevive ao reload via localStorage).
 * - Ao esgotar com a tarefa ainda pendente, marca fracasso, registra o alerta e
 *   dispara a Sentença do Caderno (id determinístico evita duplicatas).
 */
const KiraTimer = ({ tarefaId, titulo, prazoFinal }: Props) => {
  const dispatch = useAppDispatch()
  const prazoArmazenado = useAppSelector((s) => s.kira.prazos[tarefaId])
  const duracaoPadrao = useAppSelector((s) => s.kira.duracaoPadraoSegundos)

  const prazoEfetivo = prazoFinal ?? prazoArmazenado

  useEffect(() => {
    if (!prazoFinal && !prazoArmazenado) {
      const novoPrazo = new Date(
        Date.now() + duracaoPadrao * 1000
      ).toISOString()
      dispatch(definirPrazoTarefa({ id: tarefaId, prazo: novoPrazo }))
    }
  }, [prazoFinal, prazoArmazenado, duracaoPadrao, tarefaId, dispatch])

  const { segundosRestantes, expirado, formatado } =
    useContagemRegressiva(prazoEfetivo)

  // Garante que o fracasso de um mesmo prazo seja processado uma única vez.
  const fracassoProcessado = useRef(false)
  useEffect(() => {
    fracassoProcessado.current = false
  }, [prazoEfetivo])

  useEffect(() => {
    if (expirado && prazoEfetivo && !fracassoProcessado.current) {
      fracassoProcessado.current = true

      dispatch(marcarFracasso(tarefaId))

      dispatch(
        registrarAlerta({
          id: `${tarefaId}-${prazoEfetivo}`,
          tarefaId,
          tituloTarefa: titulo,
          mensagem: `O tempo para "${titulo}" esgotou. Kira registrou sua procrastinação.`,
          prazo: prazoEfetivo,
          timestamp: new Date().toISOString(),
          segundosExcedidos: Math.max(
            0,
            Math.floor((Date.now() - new Date(prazoEfetivo).getTime()) / 1000)
          )
        })
      )

      const { frase, autor } = sortearFrase()
      dispatch(exibirSentenca({ frase, autor }))
    }
  }, [expirado, prazoEfetivo, tarefaId, titulo, dispatch])

  const critico = !expirado && segundosRestantes <= 60

  return (
    <S.Relogio
      $critico={critico}
      $expirado={expirado}
      title={
        prazoEfetivo
          ? `Prazo final: ${formatarPrazo(prazoEfetivo)}`
          : 'Cronômetro do Modo Kira'
      }
    >
      <S.Rotulo>{expirado ? 'Tempo esgotado' : 'Prazo Kira'}</S.Rotulo>
      <span>{expirado ? '00:00' : formatado}</span>
    </S.Relogio>
  )
}

export default KiraTimer
