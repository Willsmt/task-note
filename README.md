# Task Note 📝

Aplicação de **lista de tarefas** construída em React + TypeScript, com um modo especial de produtividade: o **Modo Kira** — um sistema de prazos com cronômetro regressivo, alertas de procrastinação e "sentenças" motivacionais quando uma tarefa fracassa.

Projeto desenvolvido no módulo de **React da EBAC**.

---

## ✨ Funcionalidades

### Modo normal
- ✅ Criar, editar e remover tarefas
- 🏷️ Prioridades: **urgente**, **importante** e **normal**
- 🔄 Status: **pendente**, **concluída** e **fracassou**
- 🔍 Busca por título e filtros por prioridade/status
- ⏱️ Cronômetro opcional: ao definir um **prazo final** na tarefa, o card mostra a contagem regressiva
- 💾 Persistência automática no **localStorage** (sem backend)

### Modo Kira 🔴
Ativado por um botão na barra lateral, com um **modal de aceite de termos** (o "pacto"). Ao ativar:
- 🎨 Toda a interface troca para o tema escuro **"Obsidian Crimson"**
- ⏳ Toda tarefa pendente ganha um cronômetro (usa o prazo da tarefa ou um **prazo padrão de 25 min**)
- ⚠️ Quando o tempo esgota, a tarefa é marcada como **fracassou**, gera um **alerta de procrastinação** e exibe uma **Sentença do Caderno** (frase motivacional aleatória)
- 🔒 Tarefas fracassadas ficam **seladas**: não podem mais mudar de status nem ser editadas — só removidas

---

## 🛠️ Tecnologias

| Categoria | Ferramenta |
|---|---|
| Biblioteca de UI | **React 18** |
| Linguagem | **TypeScript** |
| Estado global | **Redux Toolkit** + **React Redux** |
| Rotas | **React Router DOM 7** |
| Estilização | **styled-components** (com theming) |
| Build/Toolchain | **Create React App** (react-scripts) |
| Qualidade | **ESLint** + **Prettier** |

> Aplicação **front-end only**: não há servidor. Os dados nascem de _mocks_ e são persistidos no `localStorage` do navegador.

---

## 🚀 Como rodar

Pré-requisitos: **Node.js** (16+) e **npm**.

```bash
# instalar dependências
npm install

# rodar em desenvolvimento (http://localhost:3000)
npm start

# gerar build de produção
npm run build

# rodar os testes
npm test
```

---

## 📁 Estrutura do projeto

```
src/
├── components/          # Componentes de apresentação
│   ├── AlertBanner/      # Banner de alerta (procrastinação / log)
│   ├── BotaoAdicionar/   # Botão flutuante "+"
│   ├── FiltroCard/       # Card de filtro da barra lateral
│   ├── KiraTermsModal/   # Modal de aceite dos termos do Modo Kira
│   ├── KiraTimer/        # Cronômetro regressivo do card
│   ├── SentencaModal/    # Modal da "Sentença do Caderno"
│   └── Tarefa/           # Card de uma tarefa
├── containers/          # Componentes conectados ao estado/lógica
│   ├── BarraLateral/     # Busca, filtros e botão do Modo Kira
│   ├── Formulario/       # Cadastro de nova tarefa
│   ├── ListaDeTarefas/   # Lista filtrada + log de punições
│   └── ProvedorDeTema/   # Troca de tema conforme o Modo Kira
├── hooks/
│   └── useContagemRegressiva.ts  # Lógica do cronômetro (setInterval)
├── mocks/               # Dados iniciais (tarefas, usuário, etc.)
├── models/
│   └── Terefa.ts         # Classe/modelo de Tarefa
├── pages/               # Home e Cadastro
├── store/               # Redux: store, hooks tipados e reducers
│   └── reducers/         # tarefas, filtro, kira
├── styles/              # Estilo global, temas, variáveis e breakpoints
└── utils/               # Datas, enums, localStorage, frases motivacionais
```

---

## 📱 Responsividade

Layout adaptável com breakpoints em **768px** (tablet) e **480px** (celular): no mobile a barra lateral e a lista se empilham em coluna única e o conteúdo passa a rolar de forma natural.

---

## 📚 Documentação de estudos

Para uma explicação detalhada das decisões técnicas e do passo a passo das funcionalidades, veja **[DOCUMENTACAO.md](./DOCUMENTACAO.md)**.

---

## 👤 Autor

Desenvolvido por **Willsmt** durante o curso da EBAC.
