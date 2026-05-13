# Guia de Obtenção de API Keys - Portais de Licitações

## RESUMO EXECUTIVO

| Portal | Tipo de Acesso | Dificuldade | Status |
|--------|---------------|-------------|--------|
| **PNCP** | Público/Gratuito | Fácil | ✅ Sem autenticação |
| **Compras.gov** | Público/Gratuito | Fácil | ✅ Sem autenticação |
| **Compras RS** | Requer credenciais | Médio | ❌ API Key necessária |
| **Compras BA** | Requer credenciais | Médio | ❌ Login/Senha necessários |
| **Compras RJ** | Requer credenciais | Médio | ❌ API Key necessária |
| **Compras MG** | Requer credenciais | Médio | ❌ Token necessário |
| **PE Integrado** | Requer credenciais | Médio | ❌ API Key necessária |
| **E-Lic SC** | Requer credenciais | Médio | ❌ Token necessário |
| **Banpará** | Desconhecido | Alto | ❌ Sem documentação |
| **Compras AM** | Desconhecido | Alto | ❌ Sem documentação |
| **Compras GO** | Desconhecido | Alto | ❌ Sem documentação |
| **Licitações-e** | Requer credenciais | Médio | ❌ Acesso restrito |

---

## 1. PNCP (Portal Nacional de Contratações Públicas)

### Status: ✅ PÚBLICO E GRATUITO

**NÃO PRECISA DE API KEY!**

A API do PNCP é **pública, gratuita e não requer autenticação** para consultas básicas.

### Como usar:
```bash
# Endpoint de consulta
GET https://pncp.gov.br/api/consulta/v1/contratacoes/publicas

# Parâmetros:
# - dataInicial (YYYY-MM-DD)
# - dataFinal (YYYY-MM-DD)
# - pagina (número da página)
# - tamanhoPagina (máx 50)
```

### Documentação:
- Swagger UI: https://pncp.gov.br/api/consulta/swagger-ui/index.html
- Manual: https://www.gov.br/pncp/pt-br/central-de-conteudo/manuais

---

## 2. Compras.gov.br (Governo Federal)

### Status: ✅ PÚBLICO E GRATUITO

**NÃO PRECISA DE API KEY!**

### Como usar:
```bash
# Dados Abertos
GET https://dadosabertos.compras.gov.br/modulo-legado/1_consultarLicitacao

# Parâmetros:
# - dataInicial (YYYY-MM-DD)
# - dataFinal (YYYY-MM-DD)
# - pagina
```

### Documentação:
- Manual: https://www.gov.br/compras/pt-br/acesso-a-informacao/manuais/manual-dados-abertos/manual-api-compras.pdf
- Swagger: https://dadosabertos.compras.gov.br/swagger-ui/index.html

---

## 3. Compras RS (Rio Grande do Sul)

### Status: ❌ REQUER CREDENCIAIS

### Como obter acesso:

1. **Acesse o portal:** https://www.compras.rs.gov.br/
2. **Entre em contato:**
   - Central de Atendimento: **(51) 3210-3708**
   - Credenciamento: **(51) 3288-1160**
   - Email: Ver seção "Fale Conosco" no portal

3. **Solicite:**
   - Acesso à API de dados abertos
   - API Key para integração

4. **Portal de Dados Abertos RS:**
   - http://dados.rs.gov.br/ (pode ter datasets públicos)

---

## 4. Compras BA (Bahia)

### Status: ❌ REQUER CREDENCIAIS

### Como obter acesso:

1. **Acesse o portal:** https://www.comprasnet.ba.gov.br/
2. **Entre em contato:**
   - Telefone: **(71) 3115-1608**
   - Email: Ver seção "Fale Conosco"

3. **Solicite credenciais de acesso à API**

### Variáveis necessárias:
```bash
COMPRAS_BA_USER=seu_usuario
COMPRAS_BA_PASS=sua_senha
```

---

## 5. Compras RJ (Rio de Janeiro)

### Status: ❌ REQUER CREDENCIAIS

### Como obter acesso:

1. **Portal de Compras RJ:** Buscar site oficial
2. **Entre em contato com a SEFAZ-RJ ou órgão responsável**
3. **Solicite API Key para integração**

### Variável necessária:
```bash
COMPRAS_RJ_KEY=sua_api_key
```

---

## 6. Compras MG (Minas Gerais)

### Status: ❌ REQUER CREDENCIAIS

### Como obter acesso:

1. **Acesse:** https://compras.mg.gov.br/
2. **Entre em contato:**
   - Use o formulário de contato do portal
   - Solicite acesso à API/documentação técnica

3. **Solicite token de acesso**

### Variável necessária:
```bash
COMPRAS_MG_TOKEN=seu_token
```

---

## 7. PE Integrado (Pernambuco)

### Status: ❌ REQUER CREDENCIAIS

### Como obter acesso:

1. **Portal de Licitações de Pernambuco**
2. **Entre em contato:**
   - Procure a SECAD-PE ou órgão de compras do estado
   - Solicite credenciais de API

### Variável necessária:
```bash
PE_INTEGRADO_KEY=sua_api_key
```

---

## 8. E-Lic SC (Santa Catarina)

### Status: ❌ REQUER CREDENCIAIS

### Como obter acesso:

1. **Acesse:** https://e-lic.sc.gov.br/
2. **CIASC - Companhia de Informática de SC**
3. **Entre em contato:**
   - Telefone: **(48) 3666-4000**
   - Email: Ver portal de contato da CIASC

4. **Solicite token de acesso à API**

### Variável necessária:
```bash
ELIC_SC_TOKEN=seu_token
```

---

## 9. Banpará (Pará)

### Status: ❌ SEM DOCUMENTAÇÃO

### Como obter acesso:

1. **Portal:** https://www.banpara.b.br/ (ou similar)
2. **Entre em contato:**
   - Banco do Pará / SEFAZ-PA
   - Solicite informações sobre API de licitações

---

## 10. Compras AM (Amazonas)

### Status: ❌ SEM DOCUMENTAÇÃO

### Como obter acesso:

1. **Portal do Estado do Amazonas**
2. **Entre em contato com a SEFAZ-AM**
3. **Verifique se existe portal de dados abertos do estado**

---

## 11. Compras GO (Goiás)

### Status: ❌ SEM DOCUMENTAÇÃO

### Como obter acesso:

1. **Portal de Compras de Goiás**
2. **Entre em contato com a SEFAZ-GO**

---

## 12. Licitações-e (Banco do Brasil)

### Status: ❌ ACESSO RESTRITO

### Como obter acesso:

1. **Portal:** https://licitacoes-e.bb.com.br/
2. **Acesso geralmente restrito a:**
   - Órgãos públicos
   - Fornecedores credenciados
   - Entidades conveniadas

3. **Entre em contato com o Banco do Brasil:**
   - Agência de relacionamento
   - Ou órgão responsável pelas compras

---

## RECOMENDAÇÕES

### Prioridade de Implementação:

1. **Alta Prioridade (Fácil):**
   - ✅ PNCP (já funciona, sem auth)
   - ✅ Compras.gov (já funciona, sem auth)

2. **Média Prioridade (Requer contato):**
   - Compras RS
   - Compras BA
   - Compras RJ
   - Compras MG

3. **Baixa Prioridade (Difícil/Documentação limitada):**
   - Banpará
   - Compras AM
   - Compras GO
   - Licitações-e

### Próximos Passos:

1. **Corrigir o conector do PNCP** (está retornando HTTP 400)
2. **Verificar se Compras.gov está buscando corretamente**
3. **Entrar em contato com os portais que precisam de credenciais**
4. **Considerar web scraping** para portais sem API pública

---

## CONTATOS ÚTEIS

| Portal | Telefone | Email/Site |
|--------|----------|------------|
| Compras RS | (51) 3210-3708 | www.compras.rs.gov.br |
| Compras BA | (71) 3115-1608 | www.comprasnet.ba.gov.br |
| E-Lic SC | (48) 3666-4000 | www.ciasc.sc.gov.br |
| PNCP | - | www.gov.br/pncp |
| Compras.gov | - | www.gov.br/compras |
