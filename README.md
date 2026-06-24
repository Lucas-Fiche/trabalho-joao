# IDCGT-AP — Instrumento de Diagnóstico de Competências de Gestão Territorial na Administração Pública

Sistema web (HTML/CSS/JavaScript) para coleta, consolidação e validação de conteúdo, por
juízes especialistas, do instrumento de pesquisa IDCGT-AP, com retaguarda de
armazenamento em Google Sheets (`apps-script.gs`) e painel administrativo restrito.

---

## Sumário

1. [Visão geral do sistema](#1-visão-geral-do-sistema)
2. [Percurso Metodológico](#2-percurso-metodológico)
3. [Como executar e configurar](#3-como-executar-e-configurar)
4. [Referências](#4-referências)

---

## 1. Visão geral do sistema

O sistema é composto por três artefatos:

- `index.html` — aplicação de página única que apresenta o instrumento aos especialistas,
  coleta as avaliações, calcula em tempo real os indicadores de validade de conteúdo e expõe
  um painel administrativo (com autenticação) para consulta individual e cumulativa das
  respostas.
- `apps-script.gs` — backend serverless (Google Apps Script) que persiste as respostas em uma
  planilha Google Sheets e valida a senha do administrador a partir de Propriedades do
  Script (fora do código-fonte público).
- `METODOLOGIA_DESENVOLVIMENTO_SISTEMA.md` — registro técnico, em nível de doutorado, do
  processo de construção e depuração do sistema (arquitetura, correções de cálculo, controle
  de versão).

Este README concentra-se no **percurso metodológico da validação de conteúdo por
especialistas**, fundamentando cada decisão de desenho do instrumento e do fluxo de coleta
nas referências metodológicas adotadas.

---

## 2. Percurso Metodológico

### 2.1 Delineamento metodológico da pesquisa

A presente pesquisa adota delineamento metodológico misto, com predominância quantitativa,
em consonância com o padrão observado na literatura de desenvolvimento e validação de
escalas e instrumentos de mensuração em ciências sociais aplicadas e administração pública
(Lengler et al., 2025; Paz & Odelius, 2021; Sousa et al., 2025). A dimensão quantitativa
expressa-se na operacionalização dos julgamentos dos especialistas em escores numéricos,
tratados estatisticamente por meio de indicadores de validade de conteúdo (CVC, I-CVI e
S-CVI/Ave) e de taxas de concordância; a dimensão qualitativa manifesta-se na geração inicial
dos itens — derivada da revisão teórico-empírica da literatura sobre competências de gestão
territorial — e no tratamento interpretativo das sugestões textuais emitidas pelos juízes, que
subsidiam a reformulação semântica dos itens antes da nova rodada de apreciação
(Lengler et al., 2025, p. 10; Creswell, 2010, conforme citado por Lengler et al., 2025).

O delineamento estrutura-se em três fases sequenciais e interdependentes — **teórica**,
**analítica** e **consensual** —, nomenclatura adaptada do modelo de validação por rodadas tipo
Delphi descrito por Costa et al. (2023, p. 999, Figura 1): (i) fase teórica, de delimitação
conceitual, desenho do instrumento e constituição do painel de juízes; (ii) fase analítica, de
aplicação do instrumento aos especialistas, tabulação dos julgamentos e cálculo dos
indicadores de validade de conteúdo; e (iii) fase consensual, de decisão sobre manutenção,
revisão ou exclusão de itens e consolidação da versão final do instrumento. Esse delineamento
é compatível com os procedimentos de validação semântica e de conteúdo descritos por
Pasquali (2010) e operacionalizado, no presente sistema, por meio de uma aplicação web que
automatiza a coleta, o cálculo dos indicadores e a geração dos relatórios de decisão por item.

### 2.2 Justificativa da validação por especialistas (juízes)

A adoção da validação de conteúdo por especialistas como etapa obrigatória e antecedente à
aplicação em campo do instrumento é amplamente recomendada na literatura de
psicometria e de desenvolvimento de escalas (Pasquali, 2010; Alexandre & Coluci, 2011) e foi
adotada de modo convergente pelos quatro estudos de referência utilizados na fundamentação
deste percurso metodológico:

- Paz e Odelius (2021) submeteram a escala de competências gerenciais a um painel de cinco
  juízes seniores das áreas de Administração e Psicologia, avaliando clareza de linguagem,
  pertinência prática e relevância teórica de cada item, com concordância de juízes exigida
  acima de 80% para a dimensão teórica (critério de Pasquali, 2010).
- Lengler et al. (2025) submeteram a escala de competências docentes a um painel de dez
  especialistas, justificando a etapa como necessária para garantir que os itens gerados a
  partir da revisão teórica de fato traduzissem, de forma compreensível e relevante, os
  construtos pedagógico, comportamental, comunicativo e tecnológico do constructo
  "competência docente".
- Sousa et al. (2025) trataram a validação de conteúdo como condição de validade aparente do
  instrumento, submetendo o mapeamento de competências a apreciação por representantes
  institucionais com formação acadêmica na área, antes da aplicação em larga escala junto a
  coordenadores, gerentes e equipes.
- Costa et al. (2023) recorreram à Técnica Delphi com painel amplo de 80 enfermeiros
  especialistas, sustentando que decisões sobre relevância, clareza e exequibilidade de itens
  de instrumentos voltados à prática profissional não podem prescindir do julgamento de quem
  vivencia o fenômeno mensurado.

A convergência entre esses estudos evidencia quatro funções essenciais desempenhadas pela
validação por especialistas, todas perseguidas no desenho do IDCGT-AP: (a) **validade de
conteúdo**, assegurando que o conjunto de itens representa adequadamente o domínio teórico do
constructo "competências de gestão territorial"; (b) **clareza**, garantindo compreensão
unívoca da redação dos itens pelo público-alvo; (c) **pertinência**, certificando a relação
direta entre item e prática profissional avaliada; e (d) **representatividade e adequação**,
verificando se a distribuição dos itens entre dimensões reflete proporcionalmente a
importância relativa de cada uma no constructo geral (Alexandre & Coluci, 2011; Pasquali,
2010).

### 2.3 Seleção dos especialistas: critérios, número de juízes e justificativa

A seleção do painel de juízes do IDCGT-AP seguiu critérios de elegibilidade definidos a partir
da triangulação dos procedimentos relatados nos quatro estudos de referência, resumidos no
Quadro 1.

**Quadro 1 — Critérios de seleção de especialistas nos estudos de referência e no IDCGT-AP**

| Critério | Paz e Odelius (2021) | Lengler et al. (2025) | Sousa et al. (2025) | Costa et al. (2023) | IDCGT-AP |
|---|---|---|---|---|---|
| Formação acadêmica mínima | Pós-graduação em Administração/Psicologia | Doutorado/docência em ensino superior | Formação acadêmica na área social | Enfermagem, com ou sem pós-graduação | Pós-graduação (lato ou stricto sensu) na área correlata ao instrumento |
| Experiência profissional | Atuação em gestão pública ou pesquisa em competências gerenciais | Docência efetiva em cursos de Administração | Atuação institucional em assistência social | Atuação na Estratégia Saúde da Família | Atuação profissional e/ou acadêmica comprovada na área de gestão territorial |
| Vinculação institucional | Não exclusiva a uma única instituição | 5 instituições distintas | Representantes institucionais variados | Recrutamento amplo (e-mail/redes sociais) | Especialistas de instituições/áreas diversas, evitando concentração institucional |
| Quantidade de juízes | 5 | 10 (8 respondentes) | Painel institucional (não detalhado) | 80 (31 respondentes na rodada final) | Dimensionado para garantir múltiplos julgamentos por item (n ≥ 3), com coleta contínua |

O campo `specialist.formacao`, `specialist.areaFormacao` e `specialist.areaAtuacao`,
registrado no formulário do IDCGT-AP (`index.html`) e persistido na planilha de respostas
(`apps-script.gs`), operacionaliza exatamente esses critérios de elegibilidade, permitindo
auditar, a posteriori, a adequação do perfil de cada juiz ao constructo avaliado.

Quanto ao número de juízes, a literatura consultada não converge para um valor fixo, mas
indica que o número adequado depende da finalidade da validação e da disponibilidade de
especialistas qualificados: Paz e Odelius (2021) trabalharam com 5 juízes seniores; Lengler et
al. (2025) com 10 especialistas (8 respondentes); Costa et al. (2023), por adotarem Técnica
Delphi com necessidade de busca de consenso estatístico robusto, recrutaram painel amplo de
80 especialistas. Hernández-Nieto (2002), referência teórica do cálculo do CVC empregado no
IDCGT-AP, não impõe número mínimo de juízes, mas recomenda cautela na interpretação do termo
de erro (Pei) quando n é pequeno — razão pela qual o sistema do IDCGT-AP foi ajustado (ver
`METODOLOGIA_DESENVOLVIMENTO_SISTEMA.md`, seção 2) para não permitir que esse termo de erro,
inflado artificialmente com poucos juízes, descarte itens com concordância plena. Adotou-se,
portanto, política de coleta contínua e cumulativa de julgamentos — o sistema recalcula os
indicadores a cada nova resposta registrada —, de modo que a robustez estatística da decisão
sobre cada item aumenta progressivamente conforme mais especialistas respondem, sem impor um
ponto de corte temporal rígido para o fechamento da rodada.

### 2.4 Procedimento de avaliação dos itens: escala Likert de quatro pontos

Em consonância com a recomendação da literatura de validação de instrumentos — segundo a qual
escalas de avaliação por juízes devem oferecer granularidade suficiente para discriminar
graus de adequação sem introduzir ambiguidade decisória (Pasquali, 2010) —, o IDCGT-AP adota
escala Likert de quatro pontos para julgamento de cada item, em cada um dos critérios de
análise (clareza, pertinência, relevância e representatividade). Essa escolha replica
diretamente o procedimento de Lengler et al. (2025, p. 10), no qual os especialistas
atribuíram pesos de 4, 3, 2 e 1 a cada item, possibilitando, a partir de uma linha de corte
quantitativa, a permanência dos itens com pontuação elevada e a exclusão dos itens com
pontuação baixa, complementada por análise qualitativa dos comentários para ajuste fino dos
itens mantidos. O mesmo princípio de escala curta e discriminativa é observado em Costa et al.
(2023), que utilizaram escala de 1 a 4 (Nenhuma/Pouco/Parcialmente/Extremamente relevante)
para avaliação Delphi por enfermeiros especialistas.

Optou-se pela escala de quatro pontos — em vez de escalas de cinco pontos como as utilizadas
por Paz e Odelius (2021) e por Lourenço et al. (2025) — por dois motivos teoricamente
justificados: (i) a ausência de ponto médio neutro força o juiz a posicionar-se entre
adequação e inadequação, reduzindo a tendência de resposta central (central tendency bias),
problema já discutido na literatura psicométrica; e (ii) a correspondência direta entre os
quatro níveis da escala e os quatro patamares de decisão do CVC (aprovação, revisão,
exclusão/reformulação e ausência de avaliação) facilita a interpretação do escore médio por
item diretamente em termos da regra de decisão adotada (seção 2.5). No sistema, cada critério
de cada item recebe nota de 1 a 5 em uma variante de implementação levemente ampliada (ver
`CRITERIA` em `index.html`), normalizada para a faixa [0,1] no cálculo do CVC — preservando a
lógica de pontuação ponderada empregada por Lengler et al. (2025) e por Hernández-Nieto
(2002).

### 2.5 Indicadores de análise da validade de conteúdo

O IDCGT-AP combina três famílias de indicadores, fundamentadas respectivamente em
Hernández-Nieto (2002), Polit et al. (2007, conforme citado por Lourenço et al., 2025) e
Pasquali (2010):

**a) Coeficiente de Validade de Conteúdo (CVC) por item e por critério.** Calculado, para cada
critério `c` do item `i`, como a razão entre a média dos escores atribuídos pelos juízes e o
escore máximo possível da escala:

```
CVCi,c = (Σ escores dos juízes) / (n_juízes × escore_máximo)
```

implementado na função `summarize()` de `index.html`:

```javascript
const avg = n ? vals.reduce((a,b)=>a+b,0)/n : 0;
const cvc = n ? avg/5 : 0;
```

O CVC médio do item — `mediaCVC` no código — corresponde à média do CVC entre os critérios
avaliados, sendo o indicador central da regra de decisão (item b, abaixo).

**b) Índice de Validade de Conteúdo por Item (I-CVI) e da Escala (S-CVI/Ave).** Seguindo Polit
et al. (2007, conforme citado por Lourenço et al., 2025, p. 20), o I-CVI corresponde à
proporção de juízes que classificam o item nas categorias superiores da escala (no IDCGT-AP,
escores ≥ 4 em escala de 5 pontos), operacionalizado no sistema pela variável `consenso`:

```javascript
const consenso = n ? vals.filter(v=>v>=4).length/n : 0;
```

O S-CVI/Ave (método da média) é obtido pela média dos I-CVI de todos os itens do instrumento
(`mediaConsenso`), fornecendo uma medida agregada da qualidade do instrumento como um todo.
Lourenço et al. (2025, citando Cassepp-Borges et al., 2010) recomendam I-CVI/CVC mínimo de
0,80 para que um item seja considerado satisfatório — limiar adotado integralmente no
IDCGT-AP.

**c) Taxa de Concordância entre Especialistas.** Complementarmente ao CVC e ao I-CVI, o
sistema calcula a proporção de juízes em concordância (escore ≥ 4) como indicador
independente de consenso, alinhado ao critério de concordância de juízes superior a 80%
recomendado por Pasquali (2010) e replicado operacionalmente por Paz e Odelius (2021) para a
validação da dimensão teórica de sua escala. Esse indicador também encontra paralelo no
coeficiente de Finn (modelo de via única) empregado por Lourenço et al. (2025) para avaliar
fidedignidade entre avaliadores (0,70 para clareza; 0,77 para pertinência), ainda que o
IDCGT-AP utilize a proporção simples de concordância, por sua maior transparência
interpretativa para o público leigo do painel administrativo.

**d) Critérios de decisão sobre os itens.** A regra de decisão adotada — explicitada no
enunciado do problema original e implementada em `summarize()` — replica a tripla
classificação amplamente referenciada na literatura de validação de instrumentos
(Hernández-Nieto, 2002; Alexandre & Coluci, 2011):

**Tabela 1 — Regra de decisão por item no IDCGT-AP**

| Faixa de CVC | Decisão | Status no sistema |
|---|---|---|
| CVC ≥ 0,80 | Item aprovado, mantido sem alteração | `Aprovado` |
| 0,70 ≤ CVC < 0,80 | Item sujeito a revisão de redação | `Revisão` |
| CVC < 0,70 | Item sujeito a exclusão ou reformulação integral | `Exclusão/Reformulação` |

```javascript
let status = "Sem dados";
if (valid.length) {
  status = mediaCVC >= .80 ? "Aprovado"
         : mediaCVC >= .70 ? "Revisão"
         : "Exclusão/Reformulação";
}
```

### 2.6 Tratamento das sugestões qualitativas dos especialistas

Coerentemente com o caráter misto do delineamento (seção 2.1), o instrumento captura, junto a
cada julgamento quantitativo, um campo de observação textual livre por item, seguindo a lógica
de complementaridade entre análise quantitativa e qualitativa descrita por Lengler et al.
(2025, p. 10): após a linha de corte quantitativa baseada nos pesos atribuídos pelos juízes,
"também foi realizada uma análise qualitativa dos feedbacks para ajuste e manutenção de itens
considerados relevantes para a pesquisa". No IDCGT-AP, essas observações são armazenadas
integralmente no objeto JSON de cada resposta (campo `observacoes` por item, persistido tanto
na planilha Google Sheets quanto no e-mail automático enviado ao administrador via
`sendToAdmin()`), de modo que, mesmo quando um item atinge CVC ≥ 0,80 e é estatisticamente
aprovado, sugestões de redação registradas pelos juízes permanecem disponíveis para
apreciação editorial antes da consolidação da versão final do instrumento — replicando o
procedimento de ajuste fino observado em Lengler et al. (2025) e a etapa de "análise da
primeira/segunda rodada" do modelo Delphi de Costa et al. (2023, Figura 1).

### 2.7 Fluxo metodológico completo: da elaboração inicial à versão final validada

O fluxo metodológico do IDCGT-AP integra as etapas descritas nos quatro estudos de referência
em um processo único de seis estágios, ilustrado na Figura 1.

**Figura 1 — Fluxograma metodológico da validação de conteúdo por especialistas (IDCGT-AP)**

```
┌─────────────────────────┐
│ 1. Revisão teórica e     │   Geração dos itens a partir da literatura sobre
│    geração inicial dos   │   competências de gestão territorial
│    itens                 │   (Lengler et al., 2025; Sousa et al., 2025)
└───────────┬───────────────┘
            ▼
┌─────────────────────────┐
│ 2. Estruturação do        │   Definição de dimensões/critérios e redação
│    instrumento e          │   preliminar dos itens
│    pré-análise interna    │   (Paz & Odelius, 2021)
└───────────┬───────────────┘
            ▼
┌─────────────────────────┐
│ 3. Constituição do painel │   Seleção de especialistas por critérios de
│    de juízes              │   elegibilidade (formação, atuação, instituição)
│                            │   (Costa et al., 2023; Lengler et al., 2025)
└───────────┬───────────────┘
            ▼
┌─────────────────────────┐
│ 4. Coleta das avaliações  │   Aplicação do instrumento via formulário web
│    (escala Likert de 4    │   (index.html), com registro automático em
│    pontos + comentários)  │   planilha (apps-script.gs)
└───────────┬───────────────┘
            ▼
┌─────────────────────────┐
│ 5. Cálculo dos indicadores│   CVC, I-CVI, S-CVI/Ave e Taxa de Concordância,
│    de validade de conteúdo│   recalculados a cada nova resposta (summarize())
└───────────┬───────────────┘
            ▼
┌─────────────────────────┐
│ 6. Decisão e consolidação │   Aprovação, revisão ou exclusão/reformulação por
│    da versão final         │   item; tratamento das sugestões qualitativas;
│                            │   publicação da versão final do instrumento
└─────────────────────────┘
```

Esse fluxo corresponde, em estrutura, ao modelo de três etapas (teórica, analítica,
consensual) de Costa et al. (2023, Figura 1), com a etapa teórica subdividida nos estágios 1 a
3, a etapa analítica correspondente aos estágios 4 e 5, e a etapa consensual ao estágio 6. A
automatização da etapa analítica — cálculo em tempo real dos indicadores a cada resposta
recebida — constitui a principal contribuição operacional do IDCGT-AP em relação aos
procedimentos manuais (planilhas eletrônicas avulsas) relatados nos quatro estudos de
referência.

### 2.8 Articulação entre etapas metodológicas e literatura de referência

**Quadro 2 — Vinculação entre estágios do fluxo metodológico e recomendações da literatura**

| Estágio do IDCGT-AP | Recomendação da literatura | Fonte |
|---|---|---|
| Geração inicial dos itens | Itens devem derivar de fundamentos teóricos e empíricos consolidados, e não de intuição do pesquisador | Lengler et al. (2025, p. 10); DeVellis (2017, conforme citado por Lengler et al., 2025) |
| Constituição do painel de juízes | Especialistas devem ter formação e experiência profissional comprovadas na área do constructo, oriundos de instituições diversas | Costa et al. (2023); Lengler et al. (2025) |
| Escala de julgamento | Uso de escala curta (quatro pontos), sem ponto neutro, para discriminação objetiva da adequação dos itens | Lengler et al. (2025); Costa et al. (2023) |
| Cálculo de indicadores quantitativos | Emprego do CVC (Hernández-Nieto, 2002) e do I-CVI/S-CVI (Polit et al., 2007) com limiar mínimo de 0,80 | Paz & Odelius (2021); Lourenço et al. (2025) |
| Concordância entre juízes | Concordância de juízes superior a 80% como critério de validação semântica/teórica | Pasquali (2010); Paz & Odelius (2021) |
| Tratamento de sugestões qualitativas | Combinação de corte quantitativo com análise qualitativa dos comentários dos juízes | Lengler et al. (2025) |
| Decisão final sobre os itens | Classificação tripla — aprovação, revisão, exclusão/reformulação — conforme faixas de CVC | Hernández-Nieto (2002); Alexandre & Coluci (2011) |
| Recálculo cumulativo dos indicadores | Atualização dos resultados a cada novo julgamento recebido, sem fechamento rígido de rodada | Costa et al. (2023) — adaptação do modelo Delphi de rodadas sucessivas |

### 2.9 Tabela metodológica comparativa

**Tabela 2 — Síntese comparativa dos estudos de referência e contribuição para o IDCGT-AP**

| Autor (ano) | Objetivo da validação | Quantidade de especialistas | Método de análise empregado | Critérios de validação adotados | Contribuição para o IDCGT-AP |
|---|---|---|---|---|---|
| Paz e Odelius (2021) | Validar conteúdo e estrutura de escala de competências gerenciais no setor público | 5 juízes seniores (Administração/Psicologia) | CVC (Hernández-Nieto, 2002); concordância de juízes | CVC < 0,80 → exclusão do item; concordância > 80% para dimensão teórica | Fundamentou a fórmula do CVC e o limiar de 0,80 utilizado na regra de decisão (Tabela 1) |
| Lengler et al. (2025) | Validar conteúdo de escala de competências docentes em cursos de Administração | 10 especialistas (8 respondentes) | Atribuição de pesos (4 a 1) com linha de corte quantitativa + análise qualitativa | Permanência de itens com pontuação elevada; exclusão dos de baixa pontuação; ajuste por comentários | Fundamentou a escala Likert de quatro pontos e o tratamento combinado quantitativo-qualitativo das sugestões (seções 2.4 e 2.6) |
| Costa et al. (2023) | Validar matriz de competências para enfermeiros da Estratégia Saúde da Família | 80 especialistas convidados (31 respondentes na rodada final) | Técnica Delphi (rodadas sucessivas); IVC; Alfa de Cronbach | Consenso > 80% por rodada; IVC = 100%; Alfa ≥ 0,80 | Fundamentou o modelo de fluxo em três etapas (teórica, analítica, consensual) e o recálculo cumulativo a cada nova resposta (seção 2.7) |
| Sousa et al. (2025) | Mapear e validar competências profissionais de coordenadores da assistência social | Painel institucional (autoavaliação e heteroavaliação triangulada) | Validação aparente e de conteúdo por representantes institucionais; análise estatística descritiva (SPSS) | Aprovação por especialistas antes da aplicação em larga escala | Fundamentou a justificativa da validação por especialistas como etapa antecedente obrigatória (seção 2.2) e a lógica de descrição de competências por desempenho/condição/critério |

### 2.10 Síntese metodológica

A articulação entre os quatro referenciais consultados — Lengler et al. (2025), Paz e Odelius
(2021), Costa et al. (2023) e Sousa et al. (2025) — permitiu consolidar, no IDCGT-AP, um
percurso metodológico que (i) fundamenta teoricamente a necessidade da validação por
especialistas; (ii) operacionaliza critérios objetivos e replicáveis de seleção do painel de
juízes; (iii) adota instrumento de coleta com escala psicometricamente justificada; (iv)
calcula indicadores de validade de conteúdo (CVC, I-CVI, S-CVI/Ave e taxa de concordância)
amplamente reconhecidos na literatura nacional e internacional; e (v) trata de forma integrada
os resultados quantitativos e as contribuições qualitativas dos especialistas, characterizando
um procedimento compatível com o rigor exigido em dissertações de mestrado profissional.

---

## 3. Como executar e configurar

1. Hospede `index.html` em qualquer servidor estático (GitHub Pages, Netlify, etc.).
2. Configure o backend de persistência seguindo as instruções no final de `apps-script.gs`
   (criação da planilha, implantação como Web App e definição da Propriedade do Script
   `ADMIN_PASSWORD`).
3. Atualize a constante `SHEETS_URL` em `index.html` com a URL do Web App publicado.
4. Distribua o link do formulário aos especialistas; o painel administrativo é acessado pela
   aba "Painel" após autenticação por senha (validada no servidor, nunca no código-fonte).

Para o detalhamento técnico da implementação (arquitetura, correções de cálculo, controle de
versão), consulte `METODOLOGIA_DESENVOLVIMENTO_SISTEMA.md`.

## 4. Referências

Alexandre, N. M. C., & Coluci, M. Z. O. (2011). Validade de conteúdo nos processos de
construção e adaptação de instrumentos de medidas. *Ciência & Saúde Coletiva, 16*(7),
3061–3068.

Costa, J. R. B. et al. (2023). Elaboração de instrumento e validação de uma matriz de
competências para enfermeiros da Estratégia Saúde da Família. *Arquivos de Ciências da Saúde
da UNIPAR, 27*(1), 996–1006.

Hernández-Nieto, R. A. (2002). *Contributions to statistical analysis: The coefficients of
proportional variance, content validity and kappa*. Universidad de Los Andes.

Lengler, F. R., Amboni, N., Tezza, R., & Búrigo, R. (2025). Competências docentes em cursos de
Administração: Validação de uma escala de medição. *Organizações em Contexto, 21*.

Lourenço, L. J. et al. (2025). Adaptação e validação brasileira do Questionário de
Competências de Carreira. *Revista Brasileira de Orientação Profissional, 26*(1), 17–29.

Pasquali, L. (2010). *Instrumentação psicológica: Fundamentos e práticas*. Artmed.

Paz, M. G. T., & Odelius, C. C. (2021). Escala de competências gerenciais em um contexto de
gestão pública: Desenvolvimento e evidências de validação. *Cadernos Gestão Pública e
Cidadania, 28*(97), 360–387.

Sousa, T. C. et al. (2025). Mapeamento de competências profissionais de coordenadores da
assistência social. *Revista Ibero-Americana de Humanidades, Ciências e Educação, 11*(11),
6369–6392.
