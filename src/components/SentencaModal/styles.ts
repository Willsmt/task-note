import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const revelar = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

const brilho = keyframes`
  0%, 100% { box-shadow: 0 0 40px rgba(255, 49, 49, 0.25); }
  50% { box-shadow: 0 0 64px rgba(255, 49, 49, 0.5); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  animation: ${fadeIn} 0.25s ease-out;
`

export const Modal = styled.div`
  width: 100%;
  max-width: 560px;
  padding: 48px 40px;
  text-align: center;
  border-radius: 16px;
  background: radial-gradient(circle at top, #1a1010 0%, #131313 70%);
  border: 1px solid #ff3131;
  color: #e5e2e1;
  font-family: 'Geist', 'Roboto', sans-serif;
  animation: ${revelar} 0.35s ease-out, ${brilho} 3s ease-in-out infinite;
`

export const Selo = styled.span`
  display: inline-block;
  font-family: 'JetBrains Mono', 'Roboto Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #ff3131;
  margin-bottom: 12px;
`

export const Titulo = styled.h2`
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 32px;
  color: #f4f4f5;
`

export const Frase = styled.blockquote`
  font-size: 22px;
  line-height: 1.5;
  font-weight: 600;
  font-style: italic;
  color: #f4f4f5;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: '\\201C';
    display: block;
    font-size: 56px;
    line-height: 0.2;
    color: #ff3131;
    margin-bottom: 16px;
  }
`

export const Autor = styled.cite`
  display: block;
  font-style: normal;
  font-size: 14px;
  letter-spacing: 0.05em;
  color: #a1a1aa;
  margin-bottom: 40px;

  &::before {
    content: '— ';
  }
`

export const Botao = styled.button`
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  background-color: #ff3131;
  color: #ffffff;
  border: none;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 0 20px rgba(255, 49, 49, 0.6);
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.98);
  }
`
