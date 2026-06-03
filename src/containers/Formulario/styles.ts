import styled from 'styled-components'

export const Form = styled.form`
  max-width: 547px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.theme.textoBase};

  display: flex;
  flex-direction: column;

  textarea {
    resize: none;
    margin: 16px 0;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.borda};
    background-color: ${(props) => props.theme.superficieAlta};
    color: ${(props) => props.theme.textoBase};
    font-size: 16px;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.verde};
      box-shadow: 0 0 6px ${(props) => props.theme.glowCrimson};
    }
  }
`

export const Opcoes = styled.div`
  margin-bottom: 16px;

  p {
    margin-bottom: 6px;
    font-weight: bold;
    color: ${(props) => props.theme.textoForte};
  }

  input[type='radio'] {
    display: none; /* esconde o radio padrão */
  }

  label {
    display: inline-block;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 8px;
    transition: all 0.3s ease;
    color: ${(props) => props.theme.branco};
  }

  /* Cores específicas para cada label */
  label[for='urgente'] {
    background-color: ${(props) => props.theme.vermelho};
  }

  label[for='importante'] {
    background-color: ${(props) => props.theme.amarelo2};
  }

  label[for='normal'] {
    background-color: ${(props) => props.theme.verde};
  }

  /* Quando o radio está selecionado */
  input[type='radio']:checked + label {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
`

export const CampoPrazo = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
    color: ${(props) => props.theme.textoForte};
  }

  input {
    width: 240px;
    max-width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.borda};
    background-color: ${(props) => props.theme.superficieAlta};
    color: ${(props) => props.theme.textoBase};
    font-size: 14px;
    font-family: ${(props) => props.theme.fonteMono};
    color-scheme: dark;
  }

  small {
    display: block;
    margin-top: 6px;
    font-weight: 400;
    color: ${(props) => props.theme.textoFraco};
  }
`

export const Botao = styled.button`
  background-color: ${(props) => props.theme.verde};
  color: ${(props) => props.theme.branco};
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.amarelo2};
    transform: scale(1.05);
    box-shadow: 0 0 10px ${(props) => props.theme.glowCrimson};
  }

  &:active {
    transform: scale(0.98);
  }
`

export const Opcao = styled.div`
  display: inline;
  text-transform: capitalize;
`
