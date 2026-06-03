import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { fecharSentenca } from '../../store/reducers/kira'

/**
 * "Sentença do Caderno": modal central exibido quando uma tarefa fracassa.
 *
 * Não humilha — apresenta uma frase de reflexão/reengajamento e exige o
 * fechamento explícito ("Voltar à execução") para continuar usando o sistema.
 */
const SentencaModal = () => {
  const dispatch = useAppDispatch()
  const sentenca = useAppSelector((s) => s.kira.sentenca)

  if (!sentenca) return null

  return (
    <S.Overlay role="dialog" aria-modal="true" aria-label="Sentença do Caderno">
      <S.Modal>
        <S.Selo>Modo Kira</S.Selo>
        <S.Titulo>Sentença do Caderno</S.Titulo>
        <S.Frase>{sentenca.frase}</S.Frase>
        <S.Autor>{sentenca.autor}</S.Autor>
        <S.Botao onClick={() => dispatch(fecharSentenca())}>
          Voltar à execução
        </S.Botao>
      </S.Modal>
    </S.Overlay>
  )
}

export default SentencaModal
