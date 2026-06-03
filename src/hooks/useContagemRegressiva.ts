import { useEffect, useState } from 'react'

export type ContagemRegressiva = {
  segundosRestantes: number
  expirado: boolean
  formatado: string
}

function calcularRestante(prazoIso?: string): number {
  if (!prazoIso) return 0
  const diffMs = new Date(prazoIso).getTime() - Date.now()
  return Math.max(0, Math.floor(diffMs / 1000))
}

function formatar(segundos: number): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  const dias = Math.floor(segundos / 86400)
  const horas = Math.floor((segundos % 86400) / 3600)
  const min = Math.floor((segundos % 3600) / 60)
  const seg = segundos % 60

  if (dias > 0) {
    return `${dias}d ${pad(horas)}:${pad(min)}:${pad(seg)}`
  }
  if (horas > 0) {
    return `${pad(horas)}:${pad(min)}:${pad(seg)}`
  }
  return `${pad(min)}:${pad(seg)}`
}

/**
 * Conta o tempo regressivo até `prazoIso` usando um `setInterval` local.
 *
 * Mantém o "tick" fora do Redux (evita escrever no store a cada segundo);
 * a store só é tocada quando o tempo realmente esgota (no componente que usa o hook).
 */
export function useContagemRegressiva(prazoIso?: string): ContagemRegressiva {
  const [segundosRestantes, setSegundosRestantes] = useState<number>(() =>
    calcularRestante(prazoIso)
  )

  useEffect(() => {
    setSegundosRestantes(calcularRestante(prazoIso))

    if (!prazoIso) return

    const intervalo = setInterval(() => {
      setSegundosRestantes(calcularRestante(prazoIso))
    }, 1000)

    return () => clearInterval(intervalo)
  }, [prazoIso])

  return {
    segundosRestantes,
    expirado: Boolean(prazoIso) && segundosRestantes <= 0,
    formatado: formatar(segundosRestantes)
  }
}
