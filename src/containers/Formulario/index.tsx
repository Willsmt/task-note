import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContainer, Titulo } from '../../styles/index'
import { Campo } from '../../styles'
import { Form, Opcoes, Opcao, CampoPrazo, Botao } from './styles'
import * as enums from '../../utils/enums/Tarefa'

import { cadastrar } from '../../store/reducers/tarefas'
import { useAppDispatch } from '../../store/hooks'
import { inputLocalParaIso } from '../../utils/datas'

const Formulario = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.NORMAL)
  const [prazoFinal, setPrazoFinal] = useState('')

  const cadastrarTarefa = (e: FormEvent) => {
    e.preventDefault()

    dispatch(
      cadastrar({
        titulo,
        prioridade,
        descricao,
        status: enums.Status.PENDENTE,
        prazoFinal: inputLocalParaIso(prazoFinal)
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Nova tarefa</Titulo>
      <Form onSubmit={cadastrarTarefa}>
        <Campo
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          type="text"
          placeholder="Título"
        />
        <Campo
          value={descricao}
          onChange={({ target }) => setDescricao(target.value)}
          as="textarea"
          placeholder="Descrição da tarefa"
        />
        <Opcoes>
          <p>Prioridade</p>
          {Object.values(enums.Prioridade).map((prioridade) => (
            <Opcao key={prioridade}>
              <input
                value={prioridade}
                name="prioridade"
                type="radio"
                onChange={(e) =>
                  setPrioridade(e.target.value as enums.Prioridade)
                }
                id={prioridade}
                defaultChecked={prioridade === enums.Prioridade.NORMAL}
              />
              <label htmlFor={prioridade}>{prioridade}</label>
            </Opcao>
          ))}
        </Opcoes>
        <CampoPrazo>
          <label htmlFor="prazo">Prazo final (data e hora)</label>
          <input
            id="prazo"
            type="datetime-local"
            value={prazoFinal}
            onChange={(e) => setPrazoFinal(e.target.value)}
          />
          <small>
            Opcional. Define o cronômetro da tarefa. Se vazio, o Modo Kira usa o
            prazo padrão.
          </small>
        </CampoPrazo>
        <Botao type="submit">Cadastrar</Botao>
      </Form>
    </MainContainer>
  )
}

export default Formulario
