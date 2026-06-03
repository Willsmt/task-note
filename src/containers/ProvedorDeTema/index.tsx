import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from '../../store/hooks'
import { temaKira, temaPadrao } from '../../styles/temas'
import EstiloGlobal from '../../styles'
import KiraTermsModal from '../../components/KiraTermsModal'
import SentencaModal from '../../components/SentencaModal'

type Props = {
  children: ReactNode
}

/**
 * Chaveia o tema de TODA a aplicação conforme o Modo Kira está ativo.
 * Também injeta o estilo global (que depende do tema) e o modal do pacto,
 * para que ambos reajam à virada visual.
 */
const ProvedorDeTema = ({ children }: Props) => {
  const kiraAtivo = useAppSelector((s) => s.kira.ativo)

  return (
    <ThemeProvider theme={kiraAtivo ? temaKira : temaPadrao}>
      <EstiloGlobal />
      {children}
      <KiraTermsModal />
      <SentencaModal />
    </ThemeProvider>
  )
}

export default ProvedorDeTema
