/**
 * Métricas de produtividade SIMULADAS.
 *
 * Valores estáticos locais (sem backend) para alimentar futuros painéis de
 * analytics e dar a sensação de uma aplicação completa.
 */
export type Analytics = {
  taxaDeSucesso: number
  tempoMedioConclusaoHoras: number
  totalRegistradas: number
  urgentesPendentes: number
}

export const mockAnalytics: Analytics = {
  taxaDeSucesso: 94.2,
  tempoMedioConclusaoHoras: 7.4,
  totalRegistradas: 128,
  urgentesPendentes: 4
}
