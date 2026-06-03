import styled, { keyframes } from 'styled-components'
import { breakpoints } from '../../styles/variaveis'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const subir = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.2s ease-out;
`

export const Modal = styled.div`
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 32px;
  border-radius: 12px;
  background-color: #131313;
  border: 1px solid #ff3131;
  box-shadow: 0 0 40px rgba(255, 49, 49, 0.35);
  color: #e5e2e1;
  font-family: 'Geist', 'Roboto', sans-serif;
  animation: ${subir} 0.25s ease-out;

  @media (max-width: ${breakpoints.celular}) {
    padding: 24px 20px;
  }
`

export const Selo = styled.span`
  display: inline-block;
  font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #ff3131;
  margin-bottom: 12px;
`

export const Titulo = styled.h2`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
`

export const Subtitulo = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #a1a1aa;
  margin-bottom: 24px;
`

export const Regras = styled.ol`
  list-style: none;
  margin-bottom: 24px;

  li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 14px;
    font-size: 14px;
    line-height: 1.55;
    color: #d4d4d8;
    counter-increment: regra;
  }

  li::before {
    content: counter(regra);
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background-color: rgba(255, 49, 49, 0.15);
    border: 1px solid #ff3131;
    color: #ff3131;
    font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
    font-size: 11px;
    font-weight: 700;
  }
`

export const ListaWrapper = styled.div`
  counter-reset: regra;
`

export const Aceite = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 24px;
  font-size: 13px;
  color: #a1a1aa;
  cursor: pointer;

  input {
    margin-top: 2px;
    accent-color: #ff3131;
  }
`

export const Acoes = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`

const BotaoBase = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
`

export const BotaoRecusar = styled(BotaoBase)`
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.15);
  color: #a1a1aa;

  &:hover {
    border-color: #a1a1aa;
    color: #e5e2e1;
  }
`

export const BotaoAceitar = styled(BotaoBase)`
  background-color: #ff3131;
  color: #ffffff;

  &:hover:not(:disabled) {
    box-shadow: 0 0 16px rgba(255, 49, 49, 0.55);
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`
