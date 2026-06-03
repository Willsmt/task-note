import styled from 'styled-components'

type Props = {
  $ativo: boolean
}

export const Card = styled.div<Props>`
  padding: 8px;
  border: 1px solid
    ${(props) => (props.$ativo ? props.theme.azul : props.theme.borda)};
  background-color: ${(props) =>
    props.$ativo ? props.theme.superficieAlta : props.theme.superficie};
  color: ${(props) =>
    props.$ativo ? props.theme.azul : props.theme.textoFraco};
  border-radius: 8px;
  cursor: pointer;
`

export const Contador = styled.span`
  font-weight: bold;
  font-size: 24px;
  display: block;
`

export const Label = styled.span`
  font-size: 14px;
`
