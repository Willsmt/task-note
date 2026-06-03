import variaveis from './variaveis'

/**
 * Contrato do tema da aplicação.
 *
 * Mantém todas as chaves legadas de `variaveis` (para que os styled-components
 * existentes apenas troquem `variaveis.x` por `props.theme.x` sem mudar o layout)
 * e adiciona tokens semânticos usados pelos componentes do Modo Kira.
 */
export type Tema = typeof variaveis & {
  fundo: string
  superficie: string
  superficieAlta: string
  borda: string
  textoBase: string
  textoForte: string
  textoFraco: string
  crimson: string
  glowCrimson: string
  fontePrincipal: string
  fonteMono: string
}

/** Tema claro original ("Task Note" padrão). */
export const temaPadrao: Tema = {
  ...variaveis,
  fundo: '#ffffff',
  superficie: variaveis.cinzaClaro,
  superficieAlta: variaveis.branco,
  borda: variaveis.cinzaMedio,
  textoBase: variaveis.cinzaTexto,
  textoForte: variaveis.cinzaTitulo,
  textoFraco: variaveis.cinzaEscuro,
  crimson: variaveis.vermelho,
  glowCrimson: 'rgba(194, 54, 22, 0.4)',
  fontePrincipal: 'Roboto, sans-serif',
  fonteMono: "'Roboto Mono', monospace"
}

/**
 * Tema "Obsidian Crimson" do Modo Kira (dark, tenso e dramático).
 * Reaproveita as MESMAS chaves do tema padrão, apenas com valores escuros/vermelhos,
 * de modo que toda a aplicação re-skina automaticamente ao ativar o pacto.
 */
export const temaKira: Tema = {
  // --- chaves legadas remapeadas ---
  vermelho: '#ff453a', // Urgente / ações destrutivas
  verde: '#10b981', // Normal / Concluída
  amarelo: '#eab308', // Pendente
  amarelo2: '#d4a017', // Importante
  branco: '#f4f4f5', // texto sobre cores de acento
  cinzaClaro: '#1c1b1b', // superfície de card
  cinzaMedio: '#5e3f3c', // bordas / contadores
  cinzaEscuro: '#a1a1aa', // texto secundário
  cinzaTexto: '#a1a1aa',
  cinzaTitulo: '#e5e2e1',
  preto: '#2a2a2a', // superfície secundária (botão "Editar")
  cinzaFundo: '#18181b', // barra lateral
  azul: '#ff453a', // acento de filtro ativo (crimson no Kira)
  // --- tokens semânticos ---
  fundo: '#131313',
  superficie: 'rgba(30, 30, 30, 0.6)',
  superficieAlta: 'rgba(20, 20, 20, 0.95)',
  borda: 'rgba(255, 255, 255, 0.08)',
  textoBase: '#a1a1aa',
  textoForte: '#f4f4f5',
  textoFraco: '#71717a',
  crimson: '#ff3131',
  glowCrimson: 'rgba(255, 49, 49, 0.45)',
  fontePrincipal: "'Geist', 'Roboto', sans-serif",
  fonteMono: "'JetBrains Mono', 'Roboto Mono', monospace"
}
