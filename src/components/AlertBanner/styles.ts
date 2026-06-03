import styled, { keyframes } from 'styled-components'

const surgir = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`

export const Banner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.superficieAlta};
  border: 1px solid ${(props) => props.theme.crimson};
  box-shadow: 0 0 18px ${(props) => props.theme.glowCrimson};
  animation: ${surgir} 0.25s ease-out;
`

export const Icone = styled.div`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${(props) => props.theme.crimson};
  color: ${(props) => props.theme.branco};
  font-size: 20px;
  font-weight: bold;
`

export const Conteudo = styled.div`
  flex: 1;
`

export const Titulo = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.textoForte};
  margin-bottom: 4px;
`

export const Mensagem = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${(props) => props.theme.textoBase};
`

export const Selo = styled.span`
  display: inline-block;
  margin-top: 8px;
  font-family: ${(props) => props.theme.fonteMono};
  font-size: 11px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${(props) => props.theme.crimson};
`

export const Fechar = styled.button`
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.textoFraco};
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: ${(props) => props.theme.crimson};
  }
`
