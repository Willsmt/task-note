import styled from 'styled-components'
import variaveis from '../../styles/variaveis'

export const Aside = styled.aside`
  padding: 16px;
  background-color: ${variaveis.cinzaFundo};
  height: 100vh;
`

export const Filtros = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 16px;
`

export const BotaoVoltar = styled.button`
  background-color: ${variaveis.verde};
  color: ${variaveis.branco};
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${variaveis.amarelo2};
    transform: scale(1.05);
    box-shadow: 0 0 8px rgba(68, 189, 50, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }
`
