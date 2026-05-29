import styled from 'styled-components'
import variaveis from '../../styles/variaveis'

export const Form = styled.form`
  max-width: 547px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  color: ${variaveis.cinzaTexto};

  display: flex;
  flex-direction: column;

  textarea {
    resize: none;
    margin: 16px 0;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${variaveis.cinzaMedio};
    font-size: 16px;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${variaveis.verde};
      box-shadow: 0 0 6px rgba(68, 189, 50, 0.4);
    }
  }
`

export const Opcoes = styled.div`
  margin-bottom: 16px;

  p {
    margin-bottom: 6px;
    font-weight: bold;
    color: ${variaveis.cinzaTitulo};
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
    color: ${variaveis.branco}; /* texto branco por padrão */
  }

  /* Cores específicas para cada label */
  label[for='urgente'] {
    background-color: ${variaveis.vermelho};
  }

  label[for='importante'] {
    background-color: ${variaveis.amarelo2};
  }

  label[for='normal'] {
    background-color: ${variaveis.verde};
  }

  /* Quando o radio está selecionado */
  input[type='radio']:checked + label {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
`

export const Botao = styled.button`
  background-color: ${variaveis.verde};
  color: ${variaveis.branco};
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${variaveis.amarelo2};
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(68, 189, 50, 0.6);
  }

  &:active {
    transform: scale(0.98);
  }
`

export const Opcao = styled.div`
  display: inline;
  text-transform: capitalize;
`
