import styled, { css, keyframes } from 'styled-components'

const pulsar = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`

type RelogioProps = {
  $critico: boolean
  $expirado: boolean
}

export const Relogio = styled.div<RelogioProps>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 6px 12px;
  border-radius: 8px;
  font-family: ${(props) => props.theme.fonteMono};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.05em;
  border: 1px solid ${(props) => props.theme.borda};
  background-color: ${(props) => props.theme.superficie};
  color: ${(props) => props.theme.textoForte};

  ${(props) =>
    props.$critico &&
    !props.$expirado &&
    css`
      color: ${props.theme.crimson};
      border-color: ${props.theme.crimson};
      box-shadow: 0 0 12px ${props.theme.glowCrimson};
      animation: ${pulsar} 1s ease-in-out infinite;
    `}

  ${(props) =>
    props.$expirado &&
    css`
      color: ${props.theme.branco};
      background-color: ${props.theme.crimson};
      border-color: ${props.theme.crimson};
    `}
`

export const Rotulo = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0.8;
`
