import styled, { createGlobalStyle } from 'styled-components'

const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${(props) => props.theme.fontePrincipal};
    list-style: none;
  }

  body {
    background-color: ${(props) => props.theme.fundo};
    color: ${(props) => props.theme.textoBase};
    transition: background-color 0.4s ease, color 0.4s ease;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 224px auto;
  min-height: 100vh;
`

export const MainContainer = styled.main`
  padding: 0 40px;
  height: 100vh;
  overflow-y: scroll;
`

export const Titulo = styled.h2`
  display: block;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => props.theme.textoForte};
`

export const Campo = styled.input`
  padding: 8px;
  background-color: ${(props) => props.theme.superficieAlta};
  border-radius: 8px;
  font-weight: bold;
  color: ${(props) => props.theme.textoBase};
  border: 1px solid ${(props) => props.theme.borda};
  width: 100%;
`

export default EstiloGlobal
