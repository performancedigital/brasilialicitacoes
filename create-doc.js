const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const allBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

const COR_STATUS = {
  verde: 'C6EFCE',
  amarelo: 'FFEB9C',
  vermelho: 'FFC7CE',
  azul: 'BDD7EE'
};

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 22 } } },
    paragraphStyles: [
      {
        id: 'Heading1',
        name: 'Heading 1',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 32, bold: true, font: 'Arial', color: '1F4E79' },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 },
      },
      {
        id: 'Heading2',
        name: 'Heading 2',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 26, bold: true, font: 'Arial', color: '2E75B5' },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 },
      },
      {
        id: 'Heading3',
        name: 'Heading 3',
        basedOn: 'Normal',
        next: 'Normal',
        quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: '404040' },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: 'bullet-list',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '\u2022',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: 'numbered-list',
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: '%1.',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: [
        // CAPA
        new Paragraph({ spacing: { before: 2000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'SAAS PREGÃO', bold: true, size: 56, color: '1F4E79' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400 },
          children: [new TextRun({ text: 'Sistema de Inteligência de Licitações', size: 32, color: '404040' })],
        }),
        new Paragraph({ spacing: { before: 800 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          shading: { fill: '1F4E79', type: ShadingType.CLEAR },
          spacing: { before: 400, after: 400 },
          children: [new TextRun({ text: 'DOCUMENTAÇÃO DE IMPLANTAÇÃO', bold: true, size: 36, color: 'FFFFFF' })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: 'APIs REST - Portais de Licitação', size: 28 })],
        }),
        new Paragraph({ spacing: { before: 1500 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Versão 1.0', size: 24, bold: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: 'Abril de 2026', size: 24 })],
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // SUMÁRIO
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('Sumário')],
        }),
        new Paragraph({ spacing: { before: 200 }, children: [new TextRun('1. Visão Geral do Projeto')] }),
        new Paragraph({ children: [new TextRun('2. Arquitetura de Integração')] }),
        new Paragraph({ children: [new TextRun('3. Etapas de Implantação')] }),
        new Paragraph({ children: [new TextRun('   3.1 Etapa 1: APIs Públicas')] }),
        new Paragraph({ children: [new TextRun('   3.2 Etapa 2: APIs com API Key')] }),
        new Paragraph({ children: [new TextRun('   3.3 Etapa 3: APIs com Token Bearer')] }),
        new Paragraph({ children: [new TextRun('4. Conectores Implementados')] }),
        new Paragraph({ children: [new TextRun('5. Variáveis de Ambiente')] }),
        new Paragraph({ children: [new TextRun('6. API de Teste')] }),
        new Paragraph({ children: [new TextRun('7. Checklist de Validação')] }),
        new Paragraph({ children: [new TextRun('8. Próximos Passos')] }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 1. VISÃO GERAL
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('1. Visão Geral do Projeto')],
        }),
        new Paragraph({
          spacing: { before: 200, after: 200 },
          children: [new TextRun('Este documento descreve a implantação completa das APIs REST utilizadas pelo SAAS Pregão para coleta de dados de licitações públicas brasileiras. O sistema integra 11 portais de licitação, organizados em 3 etapas por nível de complexidade de autenticação.')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('1.1 Objetivo')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('Automatizar a coleta de dados de licitações de diversos portais públicos, normalizando as informações em um formato padronizado para análise e inteligência de negócios.')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('1.2 Escopo')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('O projeto abrange a implementação de conectores para 11 portais de licitação, divididos em três categorias:')],
        }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: 'APIs Públicas (6 portais): ', bold: true }), new TextRun('Sem necessidade de autenticação')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: 'APIs com API Key (3 portais): ', bold: true }), new TextRun('Autenticação via chave de API')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: 'APIs com Token Bearer (3 portais): ', bold: true }), new TextRun('Autenticação via token OAuth/JWT')] }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 2. ARQUITETURA
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('2. Arquitetura de Integração')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('2.1 Estrutura de Conectores')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('Cada conector implementa a interface IConnector com os seguintes métodos:')],
        }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: 'fetchIncremental(): ', bold: true }), new TextRun('Busca licitações por período com paginação')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: 'normalize(): ', bold: true }), new TextRun('Converte dados da API para formato padronizado')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: 'validate(): ', bold: true }), new TextRun('Valida se os dados estão completos')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: 'healthCheck(): ', bold: true }), new TextRun('Verifica disponibilidade da API')] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('2.2 Fluxo de Dados')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('Scheduler (Cron) -> Connector Factory -> API Externa -> Normalização -> Banco de Dados')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('2.3 Localização dos Arquivos')],
        }),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [4500, 4860],
          rows: [
            new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 4500, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Componente', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 4860, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Caminho', bold: true, color: 'FFFFFF' })] })] }),
              ],
            }),
            ...[
              ['Interface IConnector', 'lib/integrations/core/connector.interface.ts'],
              ['Registry de Conectores', 'lib/integrations/registry.ts'],
              ['Conectores Individuais', 'lib/integrations/connectors/*.connector.ts'],
              ['API de Teste', 'app/api/test-connectors/route.ts'],
              ['Engine de Integração', 'lib/integrations/core/engine.ts'],
            ].map(([comp, path]) => new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(comp)] })] }),
                new TableCell({ borders: allBorders, width: { size: 4860, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: path, font: 'Courier New', size: 20 })] })] }),
              ],
            })),
          ],
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 3. ETAPAS DE IMPLANTAÇÃO
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('3. Etapas de Implantação')],
        }),
        
        // ETAPA 1
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          shading: { fill: COR_STATUS.verde, type: ShadingType.CLEAR },
          children: [new TextRun('3.1 Etapa 1: APIs Públicas (Concluída)')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun({ text: 'Status: ', bold: true }), new TextRun({ text: 'CONCLUÍDA', bold: true, color: '006100' }), new TextRun(' | Data: 17/04/2026')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('Conectores que não requerem autenticação. Implementação completa com health checks funcionando.')],
        }),
        
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2200, 2200, 1600, 1600, 1760],
          rows: [
            new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Portal', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Código', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Status', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Teste', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1760, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Variáveis', bold: true, color: 'FFFFFF' })] })] }),
              ],
            }),
            ...[
              ['PNCP', 'pncp', 'Implementado', 'OK', 'Nenhuma'],
              ['ComprasNet Federal', 'comprasnet', 'Implementado', 'OK', 'Nenhuma'],
              ['Compras Amazonas', 'compras-amazonas', 'Implementado', 'OK', 'Nenhuma'],
              ['ComprasNet Goiás', 'comprasnet-goias', 'Implementado', 'OK', 'Nenhuma'],
              ['Banpará', 'banpara', 'Implementado', 'OK', 'Nenhuma'],
              ['Licitacoes-e (BB)', 'licitacoes-e', 'Implementado', 'OK', 'Nenhuma'],
            ].map(([portal, codigo, status, teste, vars]) => new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(portal)] })] }),
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: codigo, font: 'Courier New', size: 20 })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: COR_STATUS.verde, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun(status)] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: COR_STATUS.verde, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun(teste)] })] }),
                new TableCell({ borders: allBorders, width: { size: 1760, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(vars)] })] }),
              ],
            })),
          ],
        }),
        
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        
        // ETAPA 2
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          shading: { fill: COR_STATUS.amarelo, type: ShadingType.CLEAR },
          children: [new TextRun('3.2 Etapa 2: APIs com API Key (Pendente)')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun({ text: 'Status: ', bold: true }), new TextRun({ text: 'AGUARDANDO CREDENCIAIS', bold: true, color: '9C5700' })]],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('Conectores implementados, aguardando obtenção das API Keys para ativação.')],
        }),
        
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2200, 2200, 1600, 1600, 1760],
          rows: [
            new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Portal', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Código', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Status', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'API Key', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1760, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Contato', bold: true, color: 'FFFFFF' })] })] }),
              ],
            }),
            ...[
              ['Compras RS', 'compras-rs', 'Implementado', 'Pendente', 'consultas@compras.rs.gov.br'],
              ['Compras RJ', 'compras-rj', 'Implementado', 'Pendente', 'sistemas@compras.rj.gov.br'],
              ['PE Integrado', 'pe-integrado', 'Implementado', 'Pendente', 'suporte@peintegrado.pe.gov.br'],
            ].map(([portal, codigo, status, key, contato]) => new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(portal)] })] }),
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: codigo, font: 'Courier New', size: 20 })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: COR_STATUS.verde, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun(status)] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: COR_STATUS.amarelo, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun(key)] })] }),
                new TableCell({ borders: allBorders, width: { size: 1760, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: contato, size: 18 })] })] }),
              ],
            })),
          ],
        }),
        
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        
        // ETAPA 3
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          shading: { fill: COR_STATUS.amarelo, type: ShadingType.CLEAR },
          children: [new TextRun('3.3 Etapa 3: APIs com Token Bearer (Pendente)')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun({ text: 'Status: ', bold: true }), new TextRun({ text: 'AGUARDANDO CREDENCIAIS', bold: true, color: '9C5700' })]],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('Conectores implementados com autenticação automática, aguardando credenciais.')],
        }),
        
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [2200, 2200, 1600, 1600, 1760],
          rows: [
            new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Portal', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Código', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Status', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Token', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1760, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Contato', bold: true, color: 'FFFFFF' })] })] }),
              ],
            }),
            ...[
              ['Compras Bahia', 'compras-bahia', 'Implementado', 'Pendente', 'atendimento@compras.ba.gov.br'],
              ['Compras MG', 'compras-mg', 'Implementado', 'Pendente', 'ouvidoria@compras.mg.gov.br'],
              ['E-Lic SC', 'e-lic-sc', 'Implementado', 'Pendente', 'suporte@e-lic.sc.gov.br'],
            ].map(([portal, codigo, status, token, contato]) => new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(portal)] })] }),
                new TableCell({ borders: allBorders, width: { size: 2200, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: codigo, font: 'Courier New', size: 20 })] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: COR_STATUS.verde, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun(status)] })] }),
                new TableCell({ borders: allBorders, width: { size: 1600, type: WidthType.DXA }, shading: { fill: COR_STATUS.amarelo, type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun(token)] })] }),
                new TableCell({ borders: allBorders, width: { size: 1760, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: contato, size: 18 })] })] }),
              ],
            })),
          ],
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 4. CONECTORES
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('4. Conectores Implementados')],
        }),
        new Paragraph({
          spacing: { before: 200, after: 200 },
          children: [new TextRun('Todos os conectores seguem o padrão de implementação com as seguintes características:')],
        }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('Paginação automática de resultados')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('Timeout de 20 segundos por requisição')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('Delay de 300ms entre requisições (rate limiting)')]}),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('Tratamento de erros com retry automático')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('Normalização de dados para formato padronizado')] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('4.1 Estrutura de Arquivos')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun({ text: 'lib/integrations/', font: 'Courier New', size: 20 })]
        }),
        new Paragraph({ indent: { left: 360 }, children: [new TextRun({ text: 'core/', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'connector.interface.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'engine.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'crypto.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 360 }, children: [new TextRun({ text: 'connectors/', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'pncp.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'comprasnet.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'compras-amazonas.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'comprasnet-goias.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'banpara.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'compras-rs.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'compras-rj.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'compras-bahia.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'compras-mg.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'pe-integrado.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'e-lic-sc.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 720 }, children: [new TextRun({ text: 'licitacoes-e.connector.ts', font: 'Courier New', size: 20 })] }),
        new Paragraph({ indent: { left: 360 }, children: [new TextRun({ text: 'registry.ts', font: 'Courier New', size: 20 })] }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 5. VARIÁVEIS DE AMBIENTE
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('5. Variáveis de Ambiente')],
        }),
        new Paragraph({
          spacing: { before: 200, after: 200 },
          children: [new TextRun('As seguintes variáveis devem ser configuradas no arquivo .env.local:')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('5.1 APIs com API Key')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'COMPRAS_RS_API_KEY=sua_api_key_aqui', font: 'Courier New', size: 20 })]
        }),
        new Paragraph({
          spacing: { before: 50, after: 100 },
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'COMPRAS_RJ_KEY=sua_api_key_aqui', font: 'Courier New', size: 20 })]
        }),
        new Paragraph({
          spacing: { before: 50, after: 100 },
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'PE_INTEGRADO_KEY=sua_api_key_aqui', font: 'Courier New', size: 20 })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('5.2 APIs com Token Bearer')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'COMPRAS_BA_USER=seu_usuario', font: 'Courier New', size: 20 })]
        }),
        new Paragraph({
          spacing: { before: 50, after: 100 },
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'COMPRAS_BA_PASS=sua_senha', font: 'Courier New', size: 20 })]
        }),
        new Paragraph({
          spacing: { before: 50, after: 100 },
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'COMPRAS_MG_TOKEN=seu_token_aqui', font: 'Courier New', size: 20 })]
        }),
        new Paragraph({
          spacing: { before: 50, after: 100 },
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'ELIC_SC_TOKEN=seu_token_aqui', font: 'Courier New', size: 20 })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('5.3 APIs Públicas')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun('Não requerem variáveis de ambiente.')],
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 6. API DE TESTE
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('6. API de Teste')],
        }),
        new Paragraph({
          spacing: { before: 200, after: 200 },
          children: [new TextRun('Foi criado um endpoint para testar os conectores por etapa:')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('6.1 Endpoint')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          shading: { fill: 'E7E6E6', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'GET /api/test-connectors?etapa={1|2|3|all}', font: 'Courier New', size: 20, bold: true })]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('6.2 Parâmetros')],
        }),
        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [1500, 2500, 5360],
          rows: [
            new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 1500, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Parâmetro', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Valores', bold: true, color: 'FFFFFF' })] })] }),
                new TableCell({ borders: allBorders, width: { size: 5360, type: WidthType.DXA }, shading: { fill: '1F4E79', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Descrição', bold: true, color: 'FFFFFF' })] })] }),
              ],
            }),
            ...[
              ['etapa', '1', 'Testa APIs Públicas (6 conectores)'],
              ['etapa', '2', 'Testa APIs com API Key (3 conectores)'],
              ['etapa', '3', 'Testa APIs com Token (3 conectores)'],
              ['etapa', 'all', 'Testa todas as APIs (12 conectores)'],
            ].map(([param, valores, desc]) => new TableRow({
              children: [
                new TableCell({ borders: allBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: param, font: 'Courier New', size: 20 })] })] }),
                new TableCell({ borders: allBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(valores)] })] }),
                new TableCell({ borders: allBorders, width: { size: 5360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun(desc)] })] }),
              ],
            })),
          ],
        }),
        
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('6.3 Exemplos de Uso')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [new TextRun({ text: 'Testar Etapa 1:', bold: true })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: 'curl https://performance-pregao.vercel.app/api/test-connectors?etapa=1', font: 'Courier New', size: 18 })]
        }),
        
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [new TextRun({ text: 'Resposta:', bold: true })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: '{', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 400 },
          children: [new TextRun({ text: '"tipo": "etapa",', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 400 },
          children: [new TextRun({ text: '"etapa": 1,', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 400 },
          children: [new TextRun({ text: '"nome": "APIs Públicas (sem credenciais)",', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 400 },
          children: [new TextRun({ text: '"resumo": {', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 600 },
          children: [new TextRun({ text: '"total": 6,', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 600 },
          children: [new TextRun({ text: '"sucessos": 6,', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 600 },
          children: [new TextRun({ text: '"falhas": 0', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 400 },
          children: [new TextRun({ text: '}', font: 'Courier New', size: 18 })]
        }),
        new Paragraph({
          shading: { fill: 'F2F2F2', type: ShadingType.CLEAR },
          indent: { left: 200 },
          children: [new TextRun({ text: '}', font: 'Courier New', size: 18 })]
        }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 7. CHECKLIST
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('7. Checklist de Validação')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('7.1 Etapa 1 - Concluída ✅')],
        }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector PNCP')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector ComprasNet')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector Compras Amazonas')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector ComprasNet Goiás')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector Banpará')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector Licitacoes-e')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Criar API de teste')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Deploy para produção')] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('7.2 Etapa 2 - Pendente ⏳')],
        }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector Compras RS')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector Compras RJ')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector PE Integrado')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Solicitar API Key Compras RS')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Solicitar API Key Compras RJ')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Solicitar API Key PE Integrado')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Configurar variáveis de ambiente')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Testar health checks')] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('7.3 Etapa 3 - Pendente ⏳')],
        }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector Compras Bahia')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector Compras MG')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[x] ', bold: true }), new TextRun('Implementar conector E-Lic SC')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Solicitar credenciais Compras Bahia')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Solicitar token Compras MG')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Solicitar token E-Lic SC')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Configurar variáveis de ambiente')] }),
        new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun({ text: '[ ] ', bold: true }), new TextRun('Testar autenticação')] }),
        
        new Paragraph({ children: [new PageBreak()] }),
        
        // 8. PRÓXIMOS PASSOS
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun('8. Próximos Passos')],
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('8.1 Imediato (Concluído)')],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          shading: { fill: COR_STATUS.verde, type: ShadingType.CLEAR },
          children: [new TextRun({ text: '✅ Etapa 1 finalizada: ', bold: true }), new TextRun('Todos os 6 conectores de APIs públicas implementados, testados e em produção.')]
        }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('8.2 Curto Prazo')],
        }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Solicitar credenciais para Etapas 2 e 3 usando o Guia de Solicitação')] }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Aguardar aprovações (prazo: 1-5 dias úteis)')] }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Configurar variáveis de ambiente no Vercel')] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('8.3 Médio Prazo')],
        }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Testar health checks das Etapas 2 e 3')] }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Executar sincronização de teste')] }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Validar qualidade dos dados coletados')] }),
        
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun('8.4 Longo Prazo')],
        }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Monitoramento contínuo das integrações')] }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Otimização de performance')] }),
        new Paragraph({ numbering: { reference: 'numbered-list', level: 0 }, children: [new TextRun('Adição de novos portais conforme demanda')] }),
        
        new Paragraph({ spacing: { before: 600 }, children: [] }),
        
        // RODAPÉ
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: '1F4E79' } },
          spacing: { before: 400 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'SAAS Pregão - Documentação de Implantação de APIs', size: 18, color: '666666' })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: 'Versão 1.0 - Abril/2026', size: 18, color: '666666' })]
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('docs/Documentacao_Implantacao_APIs.docx', buffer);
  console.log('Documentação criada com sucesso: docs/Documentacao_Implantacao_APIs.docx');
});
