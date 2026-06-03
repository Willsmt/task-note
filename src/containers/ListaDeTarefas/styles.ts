import styled from 'styled-components'

export const BotaoLimpar = styled.button`
  margin-bottom: 24px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  background-color: transparent;
  color: ${(props) => props.theme.textoFraco};
  border: 1px solid ${(props) => props.theme.borda};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.crimson};
    border-color: ${(props) => props.theme.crimson};
  }
`
