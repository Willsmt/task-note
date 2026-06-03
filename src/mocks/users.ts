/**
 * Usuário autenticado SIMULADO.
 *
 * Não há login real nem backend: a aplicação se comporta como se houvesse uma
 * sessão ativa, mas todos os dados vêm exclusivamente deste mock.
 */
export type Usuario = {
  id: string
  name: string
  role: string
  avatar: string
}

export const mockUser: Usuario = {
  id: '1',
  name: 'Willians',
  role: 'Developer',
  avatar: '/avatar.png'
}

export const mockUsers: Usuario[] = [mockUser]
