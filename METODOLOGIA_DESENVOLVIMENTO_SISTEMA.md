# Procedimento Metodológico de Desenvolvimento do Sistema de Validação por Especialistas (IDCGT-AP)

**Documento técnico-metodológico** — descreve, em nível de detalhamento compatível com pesquisa de doutorado, o procedimento adotado para a concepção, implementação, correção e validação do sistema computacional de apoio à **Validação de Conteúdo por Comitê de Especialistas (Técnica de Delphi/CVC)** do instrumento *IDCGT-AP — Instrumento de Diagnóstico de Competências Gerenciais e Transversais na Administração Pública*.

---

## 1. Enquadramento metodológico

A validação de conteúdo de instrumentos de medida em Ciências Sociais e Administração Pública exige, segundo a literatura consolidada (Pasquali, 2010; Hernández-Nieto, 2002; Alexandre & Coluci, 2011), um procedimento estruturado em que **juízes especialistas** avaliam cada item do instrumento segundo critérios pré-definidos (clareza, pertinência, relevância, representatividade), atribuindo notas em escala ordinal (1 a 5). A partir dessas notas, calcula-se um **Coeficiente de Validade de Conteúdo (CVC)** por item e por critério, que orienta a decisão de manutenção, revisão ou exclusão/reformulação do item.

Este trabalho desenvolveu um **sistema de coleta e tabulação automatizada** dessas avaliações, eliminando a tabulação manual em planilhas isoladas e reduzindo erros de cálculo, ao mesmo tempo em que assegura **sigilo das respostas** (os especialistas não têm acesso aos resultados de outros respondentes nem à decisão consolidada) e **rastreabilidade dos dados** (toda resposta é armazenada de forma centralizada e auditável).

O desenvolvimento seguiu o ciclo: *(i)* definição dos requisitos metodológicos; *(ii)* especificação do cálculo estatístico; *(iii)* implementação do instrumento digital; *(iv)* identificação e correção de não conformidades entre o cálculo programado e a regra metodológica definida; *(v)* implementação de controle de acesso e armazenamento persistente; *(vi)* validação funcional do sistema corrigido.

---

## 2. Fundamentação do cálculo do Coeficiente de Validade de Conteúdo (CVC)

### 2.1 Definição teórica

Para cada item *i* e critério *c* (Clareza, Pertinência, Relevância, Representatividade), o CVC é calculado como a razão entre a média das notas atribuídas pelos *n* juízes e a nota máxima da escala (5 pontos):

```
CVCic = (Σ Xij) / (n × Xmáx)
```

Onde:
- `Xij` = nota do juiz *j* para o item *i* no critério *c*;
- `n` = número de juízes que avaliaram o item;
- `Xmáx` = nota máxima da escala (5).

### 2.2 Regra de decisão adotada

Conforme as instruções do estudo, a decisão por item segue:

| Faixa de CVC | Decisão |
|---|---|
| CVC ≥ 0,80 | **Item aprovado** |
| 0,70 ≤ CVC < 0,80 | **Item sujeito a revisão** |
| CVC < 0,70 | **Item passível de exclusão ou reformulação** |

### 2.3 Não conformidade identificada na primeira versão

Na implementação inicial, o sistema aplicava adicionalmente um termo de correção de erro amostral inspirado em Hernández-Nieto (2002), do tipo:

```
Pei = 1 / n^n         CVCfinal = CVCi − Pei
```

Esse termo é adequado apenas em **comitês com número elevado de juízes**, pois `Pei` decresce rapidamente conforme `n` aumenta. Contudo, **com `n = 1` (situação observada durante os testes, e plausível em fases iniciais da coleta), `Pei = 1`, anulando integralmente o CVC** independentemente da nota atribuída — inclusive em casos de concordância máxima (nota 5 em todos os critérios, equivalente a 100% de concordância). Esse comportamento contraria diretamente a regra metodológica definida no estudo, resultando na exclusão sistemática de todos os itens.

### 2.4 Correção aplicada

O cálculo foi corrigido para utilizar diretamente a concordância (CVC = média/nota máxima) como critério de decisão, eliminando o termo `Pei` da regra de decisão (mantendo-o disponível apenas como métrica informativa complementar, sem influenciar a classificação). A correção foi validada por teste funcional automatizado (ver Seção 6).

---

## 3. Arquitetura técnica do sistema

O sistema foi implementado como uma **aplicação web single-file** (HTML + CSS + JavaScript, sem dependências externas de frameworks), de modo a permitir hospedagem simples (GitHub Pages, qualquer servidor estático, ou execução local) sem necessidade de infraestrutura de back-end tradicional.

```
┌──────────────────────┐        POST (resposta)        ┌─────────────────────────┐
│  Navegador do         │ ─────────────────────────────▶│  Google Apps Script      │
│  Especialista         │                                │  (Web App / doPost)      │
│  (index.html)         │                                │                          │
│                       │        GET (sincronização      │  ├─ grava linha na       │
│  - Formulário 39 itens│         /JSONP, restrita ao    │  │  planilha Google Sheets│
│  - Cálculo local      │         administrador)         │  └─ valida senha (ação   │
│    (cache/preview)    │ ◀─────────────────────────────│     checkPassword) via   │
└──────────────────────┘                                │     PropertiesService    │
         │                                               └─────────────────────────┘
         │ e-mail (FormSubmit)                                       │
         ▼                                                            ▼
 jploliveira19@gmail.com                                  Google Sheets (planilha)
  (cópia individual de                                     = base de dados central,
   cada resposta)                                           auditável e exportável
```

### 3.1 Componentes

| Componente | Tecnologia | Função |
|---|---|---|
| `index.html` | HTML5, CSS3, JavaScript (ES6) | Formulário, cálculo do CVC, painel administrativo |
| `apps-script.gs` | Google Apps Script (JavaScript/V8) | Backend serverless: grava e lê respostas, valida senha |
| Planilha Google Sheets | — | Base de dados central, persistente e exportável |
| FormSubmit | Serviço de terceiros (e-mail transacional) | Notificação por e-mail ao administrador |

---

## 4. Implementação: controle de acesso e confidencialidade dos resultados

### 4.1 Requisito metodológico

Em estudos Delphi/CVC, **o respondente não deve ter acesso aos resultados consolidados** (princípio de cegamento, que evita efeitos de ancoragem entre rodadas e preserva a independência dos julgamentos). Apenas o pesquisador responsável (administrador) deve acessar o painel de resultados.

### 4.2 Implementação

O painel de resultados e a listagem de respostas brutas foram isolados em seções da interface (`panel-section`, `data-section`) cujo acesso é condicionado a uma flag de sessão (`sessionStorage`), liberada somente após autenticação:

```javascript
function showTab(tab, e) {
  if ((tab === 'panel' || tab === 'data') && !isAdmin()) { adminLogin(); return; }
  // ... exibição normal da aba
}

function isAdmin() {
  return sessionStorage.getItem("idcgt_admin") === "1";
}
```

Ao concluir o envio, o especialista é mantido na própria tela do formulário, recebendo apenas uma mensagem de confirmação — sem redirecionamento ao painel:

```javascript
function submitResponse() {
  try {
    const data = collectForm();
    const all = getResponses(); all.push(data); setResponses(all);
    refreshTables();
    sendToSheets(data);
    sendToAdmin(data);
    alert("Resposta enviada com sucesso! Obrigado pela sua participação.\n\n" +
          "Suas respostas foram registradas e encaminhadas ao administrador " +
          "da pesquisa. Os resultados são de uso exclusivo do administrador.");
    resetForm(false);
    showTab('form');
  } catch (e) { alert(e.message); }
}
```

### 4.3 Autenticação sem senha exposta no código-fonte

Em uma primeira versão, a senha do administrador era uma constante no JavaScript do `index.html` — solução inadequada por dois motivos metodológicos/técnicos: *(i)* qualquer pessoa com acesso ao código-fonte (público, em repositório Git) teria acesso à senha; *(ii)* alterações na senha exigiriam novo *commit* e *deploy* do sistema.

A senha foi então migrada para as **Propriedades do Script** do Google Apps Script — um cofre de configuração interno ao projeto, não exposto no código nem no HTML, e editável sem necessidade de reimplantação:

```javascript
// apps-script.gs
function checkAdminPassword(password) {
  var stored = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!stored) return false; // sem senha configurada → acesso bloqueado por padrão
  return password === stored;
}

function doGet(e) {
  var params = (e && e.parameter) || {};
  if (params.action === 'checkPassword') {
    return respond({ ok: checkAdminPassword(params.password || '') }, params.callback);
  }
  // ... demais ações (listagem de respostas)
}
```

No front-end, a validação passa a ocorrer por chamada remota (JSONP, para compatibilidade com o modelo de publicação do Apps Script, que não permite cabeçalhos CORS personalizados em requisições simples):

```javascript
function adminLogin() {
  const pwd = prompt("Área restrita ao administrador.\nDigite a senha de acesso:");
  if (pwd === null) return;
  const url = SHEETS_URL + "?action=checkPassword&password=" + encodeURIComponent(pwd);
  jsonpFetch(url, function(err, data) {
    if (err || !data) { alert("Não foi possível validar a senha agora."); return; }
    if (data.ok) { sessionStorage.setItem("idcgt_admin", "1"); applyAdminUI(); showTab('panel'); }
    else alert("Senha incorreta.");
  });
}
```

---

## 5. Implementação: armazenamento persistente e centralizado (Google Sheets)

### 5.1 Requisito metodológico

A coleta de dados de pesquisa exige um repositório **persistente, centralizado e auditável**, acessível independentemente do dispositivo utilizado pelo respondente — diferentemente do armazenamento em `localStorage` do navegador, que é local a cada máquina e não atende a esse requisito isoladamente.

### 5.2 Backend serverless (Google Apps Script)

Optou-se por um *Web App* em Google Apps Script vinculado a uma planilha Google Sheets, por tratar-se de solução gratuita, de baixa complexidade operacional e amplamente utilizada em pesquisas acadêmicas. O backend expõe duas rotas:

```javascript
// Grava cada resposta como uma linha na planilha
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = getSheet();
    var data = JSON.parse(e.postData.contents);
    var sp = data.specialist || {};
    sheet.appendRow([
      new Date(), data.id || '', data.timestamp || '',
      sp.nome || '', sp.email || '', sp.formacao || '',
      sp.areaFormacao || '', sp.areaAtuacao || '',
      JSON.stringify(data)   // JSON completo, para reconstrução fiel no painel
    ]);
    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Devolve todas as respostas (uso exclusivo do administrador)
function doGet(e) {
  var sheet = getSheet();
  var values = sheet.getDataRange().getValues();
  var responses = [];
  for (var i = 1; i < values.length; i++) {
    var raw = values[i][8];
    if (raw) { try { responses.push(JSON.parse(raw)); } catch (ignore) {} }
  }
  return respond(responses, e.parameter.callback);
}
```

O uso de `LockService` previne condições de corrida (*race conditions*) quando múltiplos especialistas enviam respostas simultaneamente — requisito relevante em coletas com janela de resposta concorrente.

### 5.3 Sincronização do painel administrativo

```javascript
function syncFromSheets(silent) {
  jsonpFetch(SHEETS_URL, function(err, data) {
    if (err || !Array.isArray(data)) { if (!silent) alert("Falha ao sincronizar."); return; }
    setResponses(data);
    refreshTables();
  });
}
```

A sincronização ocorre automaticamente ao administrador autenticado abrir o painel, e pode ser repetida manualmente (botão "Sincronizar com Google Sheets"), garantindo que o painel reflita o estado consolidado de **todos os dispositivos** que enviaram respostas — e não apenas o cache local do navegador do administrador.

### 5.4 Redundância de canal (e-mail)

Como medida de segurança contra indisponibilidade do backend, cada resposta também é encaminhada por e-mail ao administrador via serviço de formulário transacional (FormSubmit), preservando uma cópia íntegra mesmo em eventual falha de rede na gravação na planilha:

```javascript
function sendToAdmin(data) {
  const payload = { _subject: `Validação IDCGT-AP — nova resposta (${data.id})`,
    DadosCompletos_JSON: JSON.stringify(data), /* ...demais campos resumidos... */ };
  fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload)
  }).catch(() => {});
}
```

---

## 6. Implementação: cálculo cumulativo e individual

### 6.1 Requisito metodológico

A literatura sobre validação por comitê de especialistas recomenda o acompanhamento do CVC **à medida que as respostas são recebidas** (monitoramento incremental), além da possibilidade de **inspeção individual** por juiz (para identificar outliers ou padrões de resposta atípicos) e da **visão consolidada (cumulativa)**, que é a base da decisão final por item.

### 6.2 Implementação

A função `summarize(res)` foi desenhada para operar sobre **qualquer subconjunto de respostas**, permitindo reaproveitá-la tanto na visão cumulativa quanto na individual:

```javascript
function summarize(res) {
  return ITEMS.map(item => {
    const criterionRows = CRITERIA.map(c => {
      const vals = res.map(r => r.scores?.[item.id]?.[c]).filter(v => Number.isFinite(v));
      const n = vals.length;
      const avg = n ? vals.reduce((a,b)=>a+b,0)/n : 0;
      const cvc = n ? avg/5 : 0;                  // CVC = média / nota máxima
      const consenso = n ? vals.filter(v=>v>=4).length/n : 0;
      return { criterion: c, n, avg, cvc, consenso };
    });
    const valid = criterionRows.filter(r => r.n > 0);
    const mediaCVC = valid.length ? valid.reduce((a,b)=>a+b.cvc,0)/valid.length : 0;
    let status = "Sem dados";
    if (valid.length) status = mediaCVC >= .80 ? "Aprovado" : mediaCVC >= .70 ? "Revisão" : "Exclusão/Reformulação";
    return { ...item, mediaCVC, status, criterionRows };
  });
}
```

A interface oferece alternância entre os dois modos de visão, recalculando a cada nova resposta sincronizada:

```javascript
function setView(v) {
  currentView = v;
  document.getElementById("individual-controls").classList.toggle("hidden", v !== "individual");
  refreshTables();
}
```

---

## 7. Validação funcional do sistema (testes)

Após cada correção, o comportamento do cálculo foi verificado por **execução isolada do motor de cálculo** (extraído do HTML e executado em ambiente Node.js, com simulação de respostas), cobrindo os cenários críticos da regra metodológica:

```javascript
// Cenários de teste e resultados observados
show('1 especialista, notas 5 (100% de concordância)', [mk(5)]);
// → CVC = 1.000 | Consenso = 100% | Decisão = Aprovado

show('1 especialista, notas 4', [mk(4)]);
// → CVC = 0.800 | Decisão = Aprovado

show('3 especialistas, notas 5', [mk(5), mk(5), mk(5)]);
// → CVC = 1.000 | Decisão = Aprovado

show('1 especialista, notas 3', [mk(3)]);
// → CVC = 0.600 | Consenso = 0% | Decisão = Exclusão/Reformulação

show('0 especialistas (sem dados)', []);
// → Decisão = Sem dados
```

Os resultados confirmaram a conformidade do cálculo corrigido com a regra de decisão (Seção 2.2), eliminando a anomalia identificada na Seção 2.3.

---

## 8. Controle de versão e rastreabilidade do desenvolvimento

Todo o desenvolvimento foi versionado em repositório Git, com histórico de *commits* documentando cada intervenção de forma independente e rastreável — prática recomendada para garantir a **auditabilidade do processo de construção do instrumento de pesquisa**, frequentemente exigida em apêndices metodológicos de teses e dissertações:

1. *Corrige cálculo do CVC, restringe resultados ao admin e envia respostas por e-mail*
2. *Integra Google Sheets como base de dados central das respostas*
3. *Move a senha do administrador para as Propriedades do Script (Apps Script)*

---

## 9. Síntese do procedimento (linha do tempo)

| Etapa | Ação | Justificativa metodológica |
|---|---|---|
| 1 | Diagnóstico do sistema existente | Identificar não conformidades entre código e protocolo metodológico |
| 2 | Correção do cálculo do CVC | Garantir aderência às regras I, II e III definidas no estudo |
| 3 | Restrição de acesso aos resultados | Preservar o cegamento do respondente, princípio do método Delphi/CVC |
| 4 | Notificação por e-mail ao administrador | Garantir recebimento imediato e redundante de cada resposta |
| 5 | Implementação de visão cumulativa e individual | Permitir monitoramento incremental da coleta e auditoria por juiz |
| 6 | Integração com Google Sheets | Centralizar a base de dados, com persistência e exportabilidade |
| 7 | Migração da senha para Propriedades do Script | Eliminar credenciais no código-fonte público, princípio de segurança da informação |
| 8 | Testes funcionais automatizados | Validar formalmente a conformidade do cálculo com a regra de decisão |

---

## 10. Referências

- PASQUALI, L. *Instrumentação psicológica: fundamentos e práticas*. Porto Alegre: Artmed, 2010.
- HERNÁNDEZ-NIETO, R. A. *Contributions to statistical analysis*. Mérida: Universidad de Los Andes, 2002.
- ALEXANDRE, N. M. C.; COLUCI, M. Z. O. Validade de conteúdo nos processos de construção e adaptação de instrumentos de medidas. *Ciência & Saúde Coletiva*, v. 16, n. 7, p. 3061-3068, 2011.
