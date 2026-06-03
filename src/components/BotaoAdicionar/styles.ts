import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoints } from '../../styles/variaveis'

export const Circulo = styled(Link)`
  height: 64px;
  width: 64px;
  background-color: ${(props) => props.theme.acaoFundo};
  color: ${(props) => props.theme.branco};
  position: fixed;
  bottom: 40px;
  right: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  text-decoration: none;
  transition: all 0.3s ease;
  border: ${(props) =>
    props.theme.kira ? `1px solid ${props.theme.crimson}` : 'none'};
  box-shadow: ${(props) =>
    props.theme.kira ? `0 0 12px ${props.theme.glowCrimson}` : 'none'};

  &:hover {
    background-color: ${(props) => props.theme.acaoFundoHover};
    transform: scale(1.1) rotate(10deg);
    box-shadow: 0 0 18px ${(props) => props.theme.glowCrimson};
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 56px;
    width: 56px;
    font-size: 32px;
    bottom: 20px;
    right: 20px;
  }
`
