import type { TarefasState } from '../store/reducers/tarefas'
import type { KiraState } from '../store/reducers/kira'

/**
 * Persistência local (sem backend).
 *
 * Apenas as fatias que representam dados do usuário (`tarefas` e `kira`) são
 * salvas. A fatia `filtro` é efêmera (estado de UI) e não é persistida.
 */
export type EstadoPersistido = {
  tarefas: TarefasState
  kira: KiraState
}

const CHAVE = 'task-note:estado'

export function carregarEstado(): EstadoPersistido | undefined {
  try {
    const serializado = localStorage.getItem(CHAVE)
    if (serializado === null) {
      return undefined
    }
    return JSON.parse(serializado) as EstadoPersistido
  } catch {
    return undefined
  }
}

export function salvarEstado(estado: EstadoPersistido): void {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado))
  } catch {
    // Armazenamento indisponível (modo privado/cota): ignora silenciosamente.
  }
}
