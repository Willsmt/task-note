/** Utilitários de conversão entre ISO (armazenado) e o valor de inputs datetime-local. */

const pad = (n: number): string => String(n).padStart(2, '0')

/**
 * Converte uma data ISO para o formato aceito por `<input type="datetime-local">`
 * ("YYYY-MM-DDTHH:mm"), respeitando o fuso horário local.
 */
export function isoParaInputLocal(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

/**
 * Converte o valor de um input datetime-local ("YYYY-MM-DDTHH:mm", horário local)
 * para uma string ISO. Retorna undefined quando vazio/ inválido.
 */
export function inputLocalParaIso(valor: string): string | undefined {
  if (!valor) return undefined
  const d = new Date(valor)
  if (Number.isNaN(d.getTime())) return undefined
  return d.toISOString()
}

/** Formata uma data ISO de forma legível em pt-BR (data + hora:min). */
export function formatarPrazo(iso?: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
