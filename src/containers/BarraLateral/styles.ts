import styled from 'styled-components'
import { breakpoints } from '../../styles/variaveis'

export const Aside = styled.aside`
  padding: 16px;
  background-color: ${(props) => props.theme.cinzaFundo};
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: ${breakpoints.tablet}) {
    height: auto;
  }
`

export const Filtros = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${breakpoints.celular}) {
    grid-template-columns: 1fr 1fr;
  }
`

export const Usuario = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(props) => props.theme.borda};
`

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: ${(props) => props.theme.branco};
  background-color: ${(props) => props.theme.crimson};
`

export const UsuarioInfo = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 14px;
    color: ${(props) => props.theme.textoForte};
  }

  span {
    font-size: 12px;
    color: ${(props) => props.theme.textoFraco};
  }
`

export const BotaoKira = styled.button<{ $ativo: boolean }>`
  width: 100%;
  margin-top: 16px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${(props) => props.theme.fonteMono};
  letter-spacing: 0.03em;
  background-color: ${(props) =>
    props.$ativo ? 'transparent' : props.theme.crimson};
  color: ${(props) =>
    props.$ativo ? props.theme.crimson : props.theme.branco};
  border: 1px solid ${(props) => props.theme.crimson};

  &:hover {
    box-shadow: 0 0 12px ${(props) => props.theme.glowCrimson};
    transform: scale(1.02);
  }
`

export const BotaoVoltar = styled.button`
  background-color: ${(props) => props.theme.acaoFundo};
  color: ${(props) => props.theme.branco};
  border: ${(props) =>
    props.theme.kira ? `1px solid ${props.theme.crimson}` : 'none'};
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${(props) => props.theme.fontePrincipal};

  &:hover {
    background-color: ${(props) => props.theme.acaoFundoHover};
    transform: scale(1.05);
    box-shadow: 0 0 8px ${(props) => props.theme.glowCrimson};
  }

  &:active {
    transform: scale(0.95);
  }
`
