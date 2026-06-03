export type CategoriaFrase =
  | 'Disciplina'
  | 'Persistência'
  | 'Foco'
  | 'Ação'
  | 'Responsabilidade'
  | 'Superação'
  | 'Execução'

export type FraseMotivacional = {
  frase: string
  autor: string
  categoria: CategoriaFrase
}

/**
 * Frases de reflexão e reengajamento exibidas na "Sentença do Caderno"
 * quando uma tarefa fracassa. O tom é motivacional — nunca humilhante.
 */
export const motivationalQuotes: FraseMotivacional[] = [
  {
    frase:
      'Disciplina é escolher entre o que você quer agora e o que você quer mais.',
    autor: 'Abraham Lincoln',
    categoria: 'Disciplina'
  },
  {
    frase: 'A diferença entre o impossível e o possível está na determinação.',
    autor: 'Tommy Lasorda',
    categoria: 'Superação'
  },
  {
    frase:
      'Você não precisa ser ótimo para começar, mas precisa começar para ser ótimo.',
    autor: 'Zig Ziglar',
    categoria: 'Ação'
  },
  {
    frase: 'Sucesso é a soma de pequenos esforços repetidos diariamente.',
    autor: 'Robert Collier',
    categoria: 'Execução'
  },
  {
    frase: 'Não conte os dias. Faça os dias contarem.',
    autor: 'Muhammad Ali',
    categoria: 'Foco'
  },
  {
    frase: 'Um objetivo sem plano é apenas um desejo.',
    autor: 'Antoine de Saint-Exupéry',
    categoria: 'Foco'
  },
  {
    frase: 'Ação é a chave fundamental para todo sucesso.',
    autor: 'Pablo Picasso',
    categoria: 'Ação'
  },
  {
    frase: 'A persistência realiza o impossível.',
    autor: 'Provérbio Chinês',
    categoria: 'Persistência'
  },
  {
    frase:
      'O sucesso depende de preparação, trabalho duro e aprendizado com os erros.',
    autor: 'Colin Powell',
    categoria: 'Responsabilidade'
  },
  {
    frase: 'O futuro depende do que você faz hoje.',
    autor: 'Mahatma Gandhi',
    categoria: 'Ação'
  },
  {
    frase: 'A motivação faz você começar. O hábito faz você continuar.',
    autor: 'Jim Ryun',
    categoria: 'Disciplina'
  },
  {
    frase: 'O segredo para seguir em frente é começar.',
    autor: 'Mark Twain',
    categoria: 'Ação'
  },
  {
    frase: 'Grandes conquistas exigem grandes disciplinas.',
    autor: 'Jim Rohn',
    categoria: 'Disciplina'
  },
  {
    frase: 'Você se torna aquilo que faz repetidamente.',
    autor: 'Adaptado de Aristóteles',
    categoria: 'Execução'
  },
  {
    frase: 'Feito é melhor que perfeito.',
    autor: 'Sheryl Sandberg',
    categoria: 'Execução'
  },
  {
    frase: 'A excelência não é um ato, mas um hábito.',
    autor: 'Aristóteles',
    categoria: 'Disciplina'
  },
  {
    frase:
      'Não espere por circunstâncias perfeitas. Comece com o que você tem.',
    autor: 'George Herbert',
    categoria: 'Ação'
  },
  {
    frase: 'Coragem é resistência ao medo, não ausência dele.',
    autor: 'Mark Twain',
    categoria: 'Superação'
  },
  {
    frase: 'Pequenos progressos diários geram resultados extraordinários.',
    autor: 'Robin Sharma',
    categoria: 'Persistência'
  },
  {
    frase:
      'Se algo é importante o suficiente, faça mesmo que as chances estejam contra você.',
    autor: 'Elon Musk',
    categoria: 'Persistência'
  }
]

/** Sorteia uma frase motivacional aleatória da lista. */
export function sortearFrase(): FraseMotivacional {
  const indice = Math.floor(Math.random() * motivationalQuotes.length)
  return motivationalQuotes[indice]
}
