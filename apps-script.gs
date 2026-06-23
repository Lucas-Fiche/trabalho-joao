/**
 * Base de dados em Google Sheets para o Formulário de Validação IDCGT-AP.
 *
 * Este código roda no Google Apps Script (vinculado a uma planilha) e expõe um
 * Web App que:
 *   - doPost: recebe uma resposta (JSON) e grava uma linha na planilha;
 *   - doGet : devolve TODAS as respostas (usado pelo painel do administrador,
 *             via JSONP, para sincronizar em qualquer dispositivo).
 *
 * Passo a passo de configuração: ver o final deste arquivo.
 */

var SHEET_NAME = 'Respostas';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var sheet = getSheet();
    var data = JSON.parse(e.postData.contents);
    var sp = data.specialist || {};
    sheet.appendRow([
      new Date(),                 // Recebido em
      data.id || '',              // ID
      data.timestamp || '',       // Data/Hora informada
      sp.nome || '',
      sp.email || '',
      sp.formacao || '',
      sp.areaFormacao || '',
      sp.areaAtuacao || '',
      JSON.stringify(data)        // JSON completo (lido de volta pelo painel)
    ]);
    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var params = (e && e.parameter) || {};
  var callback = params.callback;

  // Ação de login: verifica a senha do administrador (armazenada nas
  // Propriedades do Script, fora do código e fora do HTML).
  if (params.action === 'checkPassword') {
    var ok = checkAdminPassword(params.password || '');
    return respond({ ok: ok }, callback);
  }

  var sheet = getSheet();
  var values = sheet.getDataRange().getValues();
  var responses = [];
  // Coluna 9 (índice 8) = JSON completo. Linha 0 = cabeçalho.
  for (var i = 1; i < values.length; i++) {
    var raw = values[i][8];
    if (raw) {
      try { responses.push(JSON.parse(raw)); } catch (ignore) {}
    }
  }
  return respond(responses, callback);
}

// Compara a senha informada com a propriedade ADMIN_PASSWORD do script.
// Configurar em: Editor do Apps Script > ⚙️ Configurações do projeto >
// Propriedades do script > Adicionar propriedade do script.
function checkAdminPassword(password) {
  var stored = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!stored) return false; // sem senha configurada, acesso bloqueado por padrão
  return password === stored;
}

function respond(obj, callback) {
  var payload = JSON.stringify(obj);
  if (callback) {
    // Resposta JSONP (usada pelo painel do administrador).
    return ContentService
      .createTextOutput(callback + '(' + payload + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Recebido em', 'ID', 'Data/Hora', 'Nome', 'E-mail',
      'Formação', 'Área de formação', 'Área de atuação', 'JSON completo'
    ]);
  }
  return sheet;
}

function jsonOutput(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------------------
 * COMO CONFIGURAR (passo a passo)
 * ------------------------------------------------------------------
 * 1. Acesse https://sheets.google.com e crie uma planilha em branco
 *    (ex.: "Validacao IDCGT-AP"). Use a conta jploliveira19@gmail.com.
 * 2. No menu, clique em: Extensões > Apps Script.
 * 3. Apague qualquer conteúdo existente e cole TODO este arquivo.
 *    Clique no ícone de salvar (disquete).
 * 4. Clique em "Implantar" (Deploy) > "Nova implantação" (New deployment).
 *    - Em "Selecionar tipo", escolha "App da Web" (Web app).
 *    - Descrição: qualquer texto (ex.: "API Validacao").
 *    - Executar como (Execute as): "Eu" (Me).
 *    - Quem pode acessar (Who has access): "Qualquer pessoa" (Anyone).
 *    - Clique em "Implantar".
 * 5. Autorize o acesso quando solicitado (escolha a conta, "Avançado" >
 *    "Acessar o projeto", "Permitir"). Isso é normal para scripts próprios.
 * 6. Copie a "URL do app da Web" (algo como
 *    https://script.google.com/macros/s/AKfy.../exec).
 * 7. Cole essa URL na constante SHEETS_URL no arquivo index.html.
 *
 * 8. Configure a SENHA do administrador (fora do código e fora do HTML):
 *    a) No editor do Apps Script, clique no ícone de engrenagem
 *       "Configurações do projeto" (Project Settings), no menu lateral.
 *    b) Role até "Propriedades do script" (Script properties) e clique em
 *       "Adicionar propriedade do script" (Add script property).
 *    c) Propriedade: ADMIN_PASSWORD   |   Valor: a senha escolhida.
 *    d) Clique em "Salvar propriedades do script".
 *    e) Para trocar a senha depois, edite essa mesma propriedade — não é
 *       necessário alterar o código nem o HTML.
 *
 * IMPORTANTE: a cada vez que você ALTERAR este código, faça
 * "Implantar > Gerenciar implantações > (editar) > Nova versão" para
 * publicar a atualização (a URL permanece a mesma). A alteração da
 * Propriedade do Script (senha) NÃO exige nova implantação.
 * ------------------------------------------------------------------ */
