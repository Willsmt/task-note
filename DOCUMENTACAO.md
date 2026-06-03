# 📚 Documentação de Estudos — Task Note

Este documento explica **a arquitetura do projeto** e **o passo a passo das funcionalidades que implementamos**, com foco em aprendizado. A ideia é que, lendo aqui, você entenda não só _o que_ foi feito, mas _por quê_.

---

## 1. Visão geral da arquitetura

### 1.1. Camadas

O projeto separa responsabilidades em duas pastas principais:

- **`components/`** — componentes **de apresentação** (recebem dados via `props` e desenham UI). Ex.: `Tarefa`, `AlertBanner`, `KiraTimer`.
- **`containers/`** — componentes **conectados** ao estado global e à lógica. Ex.: `ListaDeTarefas`, `Formulario`, `BarraLateral`.

Essa divisão (apresentação × container) facilita o reúso: o `AlertBanner`, por exemplo, é usado tanto dentro do card de uma tarefa quanto no log de punições da lista.

### 1.2. Estado global com Redux Toolkit

O estado vive em três _slices_ (fatias), cada uma num arquivo de `store/reducers/`:

| Slice     | O que guarda                                         | Persiste?        |
| --------- | ---------------------------------------------------- | ---------------- |
| `tarefas` | lista de tarefas (CRUD + status)                     | ✅ sim           |
| `filtro`  | termo de busca e critério de filtro                  | ❌ não (é só UI) |
| `kira`    | se o Modo Kira está ativo, prazos, alertas, sentença | ✅ sim           |

**Por que Redux Toolkit?** Ele reduz o _boilerplate_ do Redux clássico. Com `createSlice` você escreve "mutações" diretas no estado (ex.: `state.itens.push(...)`) e o Toolkit usa o **Immer** por baixo dos panos para gerar um novo estado imutável automaticamente.

### 1.3. Persistência sem backend (`localStorage`)

Em `store/index.ts`:

```ts
const estadoPersistido = carregarEstado()

export const store = configureStore({
  reducer: { tarefas, filtro, kira },
  preloadedState: estadoPersistido
    ? { tarefas: estadoPersistido.tarefas, kira: estadoPersistido.kira }
    : undefined
})

store.subscribe(() => {
  const { tarefas, kira } = store.getState()
  salvarEstado({ tarefas, kira })
})
```

- `preloadedState`: na **primeira execução** não há nada salvo → cai no estado inicial (os _mocks_). Nas próximas, hidrata do `localStorage`.
- `store.subscribe(...)`: roda a cada mudança no estado e salva `tarefas` + `kira`. O `filtro` fica de fora de propósito (é estado efêmero de interface).

### 1.4. Theming com styled-components

Em `ProvedorDeTema`, um `<ThemeProvider>` troca **todo** o tema da aplicação conforme `kira.ativo`:

```tsx
<ThemeProvider theme={kiraAtivo ? temaKira : temaPadrao}>
```

Os componentes acessam cores via `props.theme.x`. Como os dois temas têm **as mesmas chaves** (só mudam os valores), a aplicação inteira re-skina sozinha ao ativar o Modo Kira.

---

## 2. As funcionalidades que implementamos

> Esta seção documenta, em ordem, o trabalho feito nesta etapa do projeto.

### 2.1. 🐛 Corrigir o cronômetro do modo normal

**Problema:** ao definir um prazo na tarefa, o cronômetro ignorava o valor e usava sempre o padrão de 25 min. Além disso, o cronômetro só aparecia com o Modo Kira ligado.

**Causa raiz:** o `ListaDeTarefas` renderizava cada `<Tarefa>` **sem passar** a prop `prazoFinal`. Então o `KiraTimer` recebia `undefined` e caía no prazo default.

**Decisão de design:** o cronômetro deve aparecer **sempre que houver prazo**, mesmo com o Kira desligado. O Modo Kira só adiciona a _punição_ (fracasso + alerta + sentença) por cima.

**O que mudamos:**

1. `ListaDeTarefas` passou a repassar `prazoFinal={t.prazoFinal}`.
2. No card (`Tarefa`), a condição de exibir o timer virou:
   ```tsx
   {pendente && (kiraAtivo || prazoFinal) && <KiraTimer ... />}
   ```
3. No `KiraTimer`, separamos a **contagem** (sempre que houver prazo) da **punição** (só no Kira):

   ```tsx
   // prazo só "default" no Kira; no modo normal precisa de prazo próprio
   const prazoEfetivo = prazoFinal ?? (kiraAtivo ? prazoArmazenado : undefined)

   // a punição só dispara com o Kira ativo
   if (kiraAtivo && expirado && prazoEfetivo && !fracassoProcessado.current) { ... }
   ```

**Conceito de React aqui:** o `useContagemRegressiva` é um **custom hook**. Ele encapsula um `setInterval` que recalcula os segundos restantes a cada 1s e **limpa o intervalo** no `return` do `useEffect` (evita _memory leak_). O "tick" fica fora do Redux de propósito — não faria sentido escrever no estado global a cada segundo.

---

### 2.2. 🎨 Datepicker invisível no modo normal

**Problema:** o ícone de calendário/relógio do `<input type="datetime-local">` só aparecia no Modo Kira.

**Causa raiz:** os inputs tinham `color-scheme: dark` **fixo**. O navegador desenha o ícone do picker conforme esse `color-scheme`:

- Kira (fundo escuro) → ícone claro = visível ✅
- Normal (fundo branco) → ícone claro = invisível sobre o branco ❌

**O que mudamos:** criamos um token de tema `colorScheme` (`'light'` no padrão, `'dark'` no Kira) e trocamos o valor fixo por:

```ts
color-scheme: ${(props) => props.theme.colorScheme};
```

**Lição:** controles **nativos** do navegador (date, time, color, scrollbars) respeitam a propriedade CSS `color-scheme`. Ela não é só estética — afeta a legibilidade desses widgets.

---

### 2.3. 🔴 Estilizar os botões para o Modo Kira

**Objetivo:** os botões (Nova tarefa, Voltar, Cadastrar e as Prioridades) estavam verdes/amarelos mesmo no Modo Kira, destoando do visual crimson.

**O que mudamos:** em vez de "if isKira" espalhado, criamos **tokens semânticos** no tema:

```ts
// temaPadrao
acaoFundo: verde,  acaoFundoHover: amarelo2,  kira: false
// temaKira
acaoFundo: '#c1121f', acaoFundoHover: '#ff3131', kira: true
```

Os botões passaram a usar `props.theme.acaoFundo` / `acaoFundoHover`. O sinalizador booleano `kira` é usado para detalhes só do Modo Kira (borda crimson, glow, fonte mono, `letter-spacing`).

**Lição (design tokens):** preferir **nomes semânticos** (`acaoFundo`) a nomes de cor (`verde`). Assim, trocar o tema é só trocar o valor do token — nenhum componente precisa saber qual cor é.

---

### 2.4. 📱 Responsividade (tablet e celular)

**O que fizemos:** criamos breakpoints reutilizáveis em `styles/variaveis.ts`:

```ts
export const breakpoints = { tablet: '768px', celular: '480px' }
```

E aplicamos `@media (max-width: ...)` nos pontos que quebravam:

| Elemento                | Desktop                  | Mobile (≤768px)                            |
| ----------------------- | ------------------------ | ------------------------------------------ |
| `Container`             | grid `224px + auto`      | **coluna única**                           |
| `MainContainer`         | `100vh` + scroll próprio | altura auto, scroll natural, padding menor |
| `Aside` (barra lateral) | `100vh`                  | altura automática                          |
| Filtros                 | 2 colunas                | 3 (tablet) / 2 (celular)                   |
| Botão "+"               | 64px                     | 56px e mais perto das bordas               |
| Modais                  | padding grande           | padding reduzido no celular                |

**Pré-requisito que já existia:** a `<meta name="viewport">` no `index.html`. Sem ela, o celular renderiza a página como se fosse desktop e o `@media` não "pega".

---

### 2.5. ↕️ Espaçamento do alerta no card

**Problema:** quando a tarefa fracassava, o `AlertBanner` ficava colado nas tags de prioridade/status (porque o timer some quando a tarefa não está mais pendente).

**Por que não mexer no `AlertBanner`?** Ele é **compartilhado** com o log de punições. Adicionar margem nele afetaria os dois lugares.

**Solução:** envolvemos o alerta **só dentro do card** num wrapper com `margin-top: 16px` (`S.AreaAlerta`). Mantém o componente reutilizável intacto.

**Lição:** espaçamento de "vizinhança" geralmente pertence ao **contexto que posiciona** o componente, não ao componente em si.

---

### 2.6. 🔒 Selar a tarefa fracassada

**Objetivo:** uma missão que fracassou não deve voltar para pendente/concluída — fica selada, só dá pra remover.

**O que mudamos em `Tarefa`:**

1. Checkbox desabilitado: `disabled={fracassou}`.
2. Botão "Editar" escondido quando `fracassou` — sobra apenas "Remover".

O reducer já protegia parte disso: `marcarFracasso` só transforma em `FRACASSOU` tarefas que estavam `PENDENTE`. Agora a UI completa a regra, travando a interação.

---

## 3. Conceitos-chave para revisar

- **Custom hooks** (`useContagemRegressiva`): extrair lógica com estado/efeitos para reutilizar.
- **`useEffect` + cleanup**: sempre limpar timers/listeners no `return`.
- **`useRef` como "flag"** (`fracassoProcessado`): guardar um valor entre renders **sem** causar re-render (usado para não processar o mesmo fracasso duas vezes).
- **Redux Toolkit + Immer**: "mutar" o estado no reducer é seguro porque o Immer gera a cópia imutável.
- **Theming**: um único `ThemeProvider` troca a aparência de todo o app; componentes só leem `props.theme`.
- **Design tokens semânticos**: nomear por função (`acaoFundo`) e não por cor (`verde`).
- **`color-scheme`**: afeta a renderização de controles nativos do navegador.
- **Media queries + viewport meta**: a dupla necessária para responsividade real no mobile.

---

## 4. Pontos de atenção / dívidas técnicas

Coisas notadas que ficam como sugestão de melhoria futura:

- **`models/Terefa.ts`**: o arquivo tem erro de digitação no nome ("Terefa" → "Tarefa"). Renomear exigiria atualizar os imports.
- **`enums/Tarefa.ts`**: `Status.PENDENTE = 'pendete'` (sem o "n"). Como o valor é usado de forma consistente em todo lugar, funciona — mas é um typo no dado.
- **Validação no cadastro**: a checagem de título duplicado usa `alert()`; poderia virar uma mensagem na própria UI.

> Esses itens **não foram corrigidos** para não mudar comportamento durante esta etapa, mas ficam registrados aqui para estudo.
