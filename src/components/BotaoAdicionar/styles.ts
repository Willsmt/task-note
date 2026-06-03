import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Circulo = styled(Link)`
  height: 64px;
  width: 64px;
  background-color: ${(props) => props.theme.verde};
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

  &:hover {
    background-color: ${(props) => props.theme.amarelo2};
    transform: scale(1.1) rotate(10deg);
    box-shadow: 0 0 15px ${(props) => props.theme.glowCrimson};
  }
`
