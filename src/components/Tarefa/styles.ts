import styled, { css, keyframes } from 'styled-components'
import type { DefaultTheme } from 'styled-components'
import * as enums from '../../utils/enums/Tarefa'

type TagProps = {
  $prioridade?: enums.Prioridade
  $status?: enums.Status
  $parametro: 'status' | 'prioridade'
  theme: DefaultTheme
}

function retornaCorDeFundo(props: TagProps): string {
  if (props.$parametro === 'prioridade') {
    if (props.$prioridade === enums.Prioridade.URGENTE) {
      return props.theme.vermelho
    }

    if (props.$prioridade === enums.Prioridade.IMPORTANTE) {
      return props.theme.amarelo2
    }
  } else {
    if (props.$status === enums.Status.PENDENTE) {
      return props.theme.amarelo
    }

    if (props.$status === enums.Status.CONCLUIDA) {
      return props.theme.verde
    }

    if (props.$status === enums.Status.FRACASSOU) {
      return props.theme.crimson
    }
  }

  return props.theme.cinzaMedio
}

const alertaFracasso = keyframes`
  0% { transform: translateX(0); }
  15% { transform: translateX(-6px); }
  30% { transform: translateX(6px); }
  45% { transform: translateX(-4px); }
  60% { transform: translateX(4px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`

const pulsoVermelho = keyframes`
  0%, 100% { box-shadow: 0 0 0 rgba(255, 49, 49, 0); border-color: rgba(255, 49, 49, 0.6); }
  50% { box-shadow: 0 0 22px rgba(255, 49, 49, 0.55); border-color: rgba(255, 49, 49, 1); }
`

export const Card = styled.div<{ $fracassou?: boolean }>`
  background-color: ${(props) => props.theme.superficie};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.borda};

  label {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }

  ${(props) =>
    props.$fracassou &&
    css`
      border-color: ${props.theme.crimson};
      animation: ${alertaFracasso} 0.5s ease-in-out,
        ${pulsoVermelho} 2s ease-in-out infinite;
    `}
`

export const Titulo = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
  color: ${(props) => props.theme.textoForte};
`

export const Tag = styled.span<Omit<TagProps, 'theme'>>`
  padding: 4px 8px;
  color: ${(props) => props.theme.branco};
  font-weight: bold;
  font-size: 10px;
  background-color: ${(props) => retornaCorDeFundo(props)};
  border-radius: 8px;
  margin-right: 16px;
  display: inline-block;
`

export const Descricao = styled.textarea`
  color: ${(props) => props.theme.textoBase};
  font-size: 14px;
  line-height: 24px;
  font-family: ${(props) => props.theme.fonteMono};
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;
  resize: none;
  border: none;
  background-color: transparent;
`

export const CampoPrazo = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => props.theme.textoForte};
  }

  input {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.borda};
    background-color: ${(props) => props.theme.superficieAlta};
    color: ${(props) => props.theme.textoBase};
    font-size: 14px;
    font-family: ${(props) => props.theme.fonteMono};
    color-scheme: ${(props) => props.theme.colorScheme};
  }
`

export const AreaAlerta = styled.div`
  margin-top: 16px;
`

export const BarraAcoes = styled.div`
  border-top: 1px solid ${(props) => props.theme.borda};
  padding-top: 16px;
`

export const Botao = styled.button`
  font-weight: bold;
  font-size: 12px;
  color: ${(props) => props.theme.branco};
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.theme.preto};
  border-radius: 8px;
  margin-right: 8px;
`

export const BotaoSalvar = styled(Botao)`
  background-color: ${(props) => props.theme.verde};
`

export const BotaoCancelarRemover = styled(Botao)`
  background-color: ${(props) => props.theme.vermelho};
`
