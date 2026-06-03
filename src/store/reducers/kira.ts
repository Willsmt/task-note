import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Alerta de procrastinação gerado quando o cronômetro de uma tarefa esgota.
 *
 * Estrutura propositalmente limpa e serializável — pronta para, no futuro,
 * ser enviada a uma planilha do Google Sheets (controle de procrastinação).
 *
 * O `id` é determinístico (`tarefaId-prazo`) para que o mesmo estouro nunca
 * gere alertas duplicados.
 */
export type AlertaProcrastinacao = {
  id: string
  tarefaId: number
  tituloTarefa: string
  mensagem: string
  prazo: string
  timestamp: string
  segundosExcedidos: number
}

/** Sentença do Caderno: frase de reengajamento exibida quando uma tarefa fracassa. */
export type Sentenca = {
  frase: string
  autor: string
}

export type KiraState = {
  ativo: boolean
  termosAceitos: boolean
  modalAberto: boolean
  /** Prazo padrão (em segundos) aplicado às tarefas sem prazo próprio. */
  duracaoPadraoSegundos: number
  /** Mapa tarefaId -> deadline (ISO). */
  prazos: Record<number, string>
  alertas: AlertaProcrastinacao[]
  /** Sentença atualmente exibida no modal; null quando fechado. */
  sentenca: Sentenca | null
}

const initialState: KiraState = {
  ativo: false,
  termosAceitos: false,
  modalAberto: false,
  duracaoPadraoSegundos: 25 * 60,
  prazos: {},
  alertas: [],
  sentenca: null
}

const kiraSlice = createSlice({
  name: 'kira',
  initialState,
  reducers: {
    abrirModal: (state) => {
      state.modalAberto = true
    },
    fecharModal: (state) => {
      state.modalAberto = false
    },
    aceitarTermos: (state) => {
      state.termosAceitos = true
      state.ativo = true
      state.modalAberto = false
      // Recalcula os prazos default a cada ativação (evita prazos antigos persistidos).
      state.prazos = {}
    },
    desativarKira: (state) => {
      state.ativo = false
      state.prazos = {}
    },
    definirDuracao: (state, action: PayloadAction<number>) => {
      state.duracaoPadraoSegundos = action.payload
    },
    definirPrazoTarefa: (
      state,
      action: PayloadAction<{ id: number; prazo: string }>
    ) => {
      state.prazos[action.payload.id] = action.payload.prazo
    },
    removerPrazoTarefa: (state, action: PayloadAction<number>) => {
      delete state.prazos[action.payload]
    },
    registrarAlerta: (state, action: PayloadAction<AlertaProcrastinacao>) => {
      const jaExiste = state.alertas.some((a) => a.id === action.payload.id)
      if (!jaExiste) {
        state.alertas.unshift(action.payload)
      }
    },
    limparAlertas: (state) => {
      state.alertas = []
    },
    exibirSentenca: (state, action: PayloadAction<Sentenca>) => {
      state.sentenca = action.payload
    },
    fecharSentenca: (state) => {
      state.sentenca = null
    }
  }
})

export const {
  abrirModal,
  fecharModal,
  aceitarTermos,
  desativarKira,
  definirDuracao,
  definirPrazoTarefa,
  removerPrazoTarefa,
  registrarAlerta,
  limparAlertas,
  exibirSentenca,
  fecharSentenca
} = kiraSlice.actions

export default kiraSlice.reducer
