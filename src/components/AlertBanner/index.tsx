import * as S from './styles'

type Props = {
  titulo: string
  mensagem: string
  selo?: string
  onFechar?: () => void
}

/**
 * Banner de alerta no padrão "Critical Note" do design system.
 * Componente apresentacional reutilizado tanto inline (no card da tarefa)
 * quanto no log consolidado de punições do Modo Kira.
 */
const AlertBanner = ({ titulo, mensagem, selo, onFechar }: Props) => (
  <S.Banner role="alert">
    <S.Icone aria-hidden="true">&#9888;</S.Icone>
    <S.Conteudo>
      <S.Titulo>{titulo}</S.Titulo>
      <S.Mensagem>{mensagem}</S.Mensagem>
      {selo && <S.Selo>{selo}</S.Selo>}
    </S.Conteudo>
    {onFechar && (
      <S.Fechar onClick={onFechar} aria-label="Dispensar alerta">
        &times;
      </S.Fechar>
    )}
  </S.Banner>
)

export default AlertBanner
