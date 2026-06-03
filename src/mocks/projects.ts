/**
 * Projetos SIMULADOS.
 *
 * Dados puramente locais usados para dar contexto às tarefas. Sem backend.
 */
export type Projeto = {
  id: string
  nome: string
  cor: string
}

export const mockProjects: Projeto[] = [
  { id: 'proj_estudos', nome: 'Estudos', cor: '#ff453a' },
  { id: 'proj_carreira', nome: 'Carreira', cor: '#eab308' },
  { id: 'proj_pessoal', nome: 'Pessoal', cor: '#10b981' }
]
