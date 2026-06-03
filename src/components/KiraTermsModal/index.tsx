import { useState } from 'react'
import * as S from './styles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { aceitarTermos, fecharModal } from '../../store/reducers/kira'

const REGRAS = [
  'Toda tarefa pendente será vigiada por um cronômetro implacável. O tempo não perdoa.',
  'A procrastinação é crime. Tarefas com o prazo esgotado serão registradas no livro de punições.',
  'Não há pausas silenciosas: cada segundo perdido é contabilizado contra você.',
  'Concluir a tarefa antes do tempo é a única forma de absolvição.',
  'Ao aceitar, você abdica do conforto. O mundo agora é escuro, e o foco é a única lei.'
]

/**
 * Modal do "pacto" do Modo Kira: regras fictícias rigorosas sobre procrastinação.
 * Só após o aceite explícito o tema dark/crimson é ativado.
 */
const KiraTermsModal = () => {
  const dispatch = useAppDispatch()
  const modalAberto = useAppSelector((s) => s.kira.modalAberto)
  const [aceito, setAceito] = useState(false)

  if (!modalAberto) return null

  const recusar = () => {
    setAceito(false)
    dispatch(fecharModal())
  }

  const confirmar = () => {
    if (aceito) {
      dispatch(aceitarTermos())
      setAceito(false)
    }
  }

  return (
    <S.Overlay onClick={recusar}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Selo>Termos de Instruções &mdash; Modo Kira</S.Selo>
        <S.Titulo>O Pacto Contra a Procrastinação</S.Titulo>
        <S.Subtitulo>
          A partir do aceite, este não é mais um gerenciador de tarefas comum.
          Ele se torna o justiceiro do seu foco. Leia as regras antes de selar o
          pacto.
        </S.Subtitulo>

        <S.ListaWrapper>
          <S.Regras>
            {REGRAS.map((regra) => (
              <li key={regra}>{regra}</li>
            ))}
          </S.Regras>
        </S.ListaWrapper>

        <S.Aceite>
          <input
            type="checkbox"
            checked={aceito}
            onChange={(e) => setAceito(e.target.checked)}
          />
          <span>
            Eu li e aceito as instruções. Assumo total responsabilidade pela
            minha produtividade perante o Modo Kira.
          </span>
        </S.Aceite>

        <S.Acoes>
          <S.BotaoRecusar onClick={recusar}>Recusar</S.BotaoRecusar>
          <S.BotaoAceitar onClick={confirmar} disabled={!aceito}>
            Aceito o pacto
          </S.BotaoAceitar>
        </S.Acoes>
      </S.Modal>
    </S.Overlay>
  )
}

export default KiraTermsModal
