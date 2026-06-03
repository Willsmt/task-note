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
 * Cronômetro regressivo acoplado ao card da tarefa.
 *
 * - A contagem é exibida sempre que houver um prazo: o `prazoFinal` absoluto
 *   (data + hora) escolhido pelo usuário funciona inclusive com o Modo Kira
 *   desligado.
 * - Com o Modo Kira ativo, ganha duas camadas extras: gera um prazo default a
 *   partir da duração padrão quando a tarefa não tem prazo próprio (persistido
 *   no Redux/localStorage) e, ao esgotar com a tarefa pendente, marca fracasso,
 *   registra o alerta e dispara a Sentença do Caderno (id determinístico evita
 *   duplicatas).
 */
const KiraTimer = ({ tarefaId, titulo, prazoFinal }: Props) => {
  const dispatch = useAppDispatch()
  const kiraAtivo = useAppSelector((s) => s.kira.ativo)
  const prazoArmazenado = useAppSelector((s) => s.kira.prazos[tarefaId])
  const duracaoPadrao = useAppSelector((s) => s.kira.duracaoPadraoSegundos)

  // Sem Kira, só conta se a tarefa tiver um prazo próprio; o prazo default é
  // um recurso exclusivo do Modo Kira.
  const prazoEfetivo = prazoFinal ?? (kiraAtivo ? prazoArmazenado : undefined)

  useEffect(() => {
    if (kiraAtivo && !prazoFinal && !prazoArmazenado) {
      const novoPrazo = new Date(
        Date.now() + duracaoPadrao * 1000
      ).toISOString()
      dispatch(definirPrazoTarefa({ id: tarefaId, prazo: novoPrazo }))
    }
  }, [kiraAtivo, prazoFinal, prazoArmazenado, duracaoPadrao, tarefaId, dispatch])

  const { segundosRestantes, expirado, formatado } =
    useContagemRegressiva(prazoEfetivo)

  // Garante que o fracasso de um mesmo prazo seja processado uma única vez.
  const fracassoProcessado = useRef(false)
  useEffect(() => {
    fracassoProcessado.current = false
  }, [prazoEfetivo])

  useEffect(() => {
    // A punição (fracasso/alerta/sentença) é exclusiva do Modo Kira; no modo
    // normal o cronômetro apenas chega a "Tempo esgotado".
    if (kiraAtivo && expirado && prazoEfetivo && !fracassoProcessado.current) {
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
  }, [kiraAtivo, expirado, prazoEfetivo, tarefaId, titulo, dispatch])

  const critico = !expirado && segundosRestantes <= 60

  return (
    <S.Relogio
      $critico={critico}
      $expirado={expirado}
      title={
        prazoEfetivo
          ? `Prazo final: ${formatarPrazo(prazoEfetivo)}`
          : 'Cronômetro da tarefa'
      }
    >
      <S.Rotulo>
        {expirado ? 'Tempo esgotado' : kiraAtivo ? 'Prazo Kira' : 'Prazo'}
      </S.Rotulo>
      <span>{expirado ? '00:00' : formatado}</span>
    </S.Relogio>
  )
}

export default KiraTimer
